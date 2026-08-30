# Email setup — backend inbox (no traditional mailbox)

Kauai Internet uses a **backend-first email model**:

- Public forms save to **Supabase** (primary record)
- **Resend** sends outbound replies from the admin panel
- **Inbound email** hits a webhook → stored in Supabase → visible in `/admin/inbox`

You do not need Google Workspace or Outlook for hello@kauaiinternet.com.

## 1. Outbound (replies from admin)

1. Create a free account at [resend.com](https://resend.com)
2. Add domain **kauaiinternet.com** in [Resend → Domains](https://resend.com/domains)
3. Add the DNS records Resend shows (see **Vercel DNS** below)
4. In Vercel project env vars:
   - `RESEND_API_KEY` — API key from Resend (needs **Sending access**)
   - `RESEND_FROM_EMAIL` — `Kauai Internet <hello@kauaiinternet.com>`
   - `SUPPORT_NOTIFY_EMAIL` — optional override (default: `troy@troysnyder.com`)
5. Click **Verify DNS Records** in Resend when records are saved

Admin → **Interest** → select a submission → **Send reply** uses Resend.

### Vercel DNS (kauaiinternet.com uses Vercel nameservers)

DNS is managed in **Vercel**, not GoDaddy:

1. [Vercel → Domains](https://vercel.com/dashboard/domains) → **kauaiinternet.com** → **DNS Records**  
   (or Project → Settings → Domains → kauaiinternet.com → Manage DNS)
2. Resend → Domains → **kauaiinternet.com** → **Records** tab — copy each row into Vercel.

Typical **sending** records (exact DKIM value is unique — copy from Resend):

| Vercel type | Name | Value | Priority |
|-------------|------|-------|----------|
| TXT | `resend._domainkey` | *(long string from Resend)* | — |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | `10` |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | — |

**Vercel field tips**

- **Name** = host only: `send` or `resend._domainkey` (not the full domain)
- Leave TTL as default
- For MX, set Priority to `10`
- Do **not** remove existing `@` / `www` records (site will break)

Optional **DMARC** (Resend shows under Records):

| TXT | `_dmarc` | `v=DMARC1; p=none;` |

3. Wait 2–10 minutes, then **Verify DNS Records** in Resend  
4. Status should become **Verified**

## 2. Inbound (hello@ → backend)

After **sending** is verified in Resend:

1. Resend → **Webhooks** → Add webhook:
   - URL: `https://kauaiinternet.com/api/webhooks/inbound-email`
   - Event: `email.received`
2. Set optional `INBOUND_EMAIL_WEBHOOK_SECRET` in Vercel (same value as webhook secret header).
3. Resend → domain **kauaiinternet.com** → enable **Receiving** and add the **MX record(s)** Resend shows in **Vercel DNS**.

**Note:** Root-domain MX for receiving can conflict with other email on `@`. If you use personal mail at `@kauaiinternet.com`, use a subdomain (e.g. `mail.kauaiinternet.com`) for Resend receiving instead.

When someone emails hello@kauaiinternet.com, the message is stored in **Admin → Email Inbox** and a copy is sent to **troy@troysnyder.com** (when Resend is configured).

### Alternative: Forward Email (simpler, no MX change)

If you prefer not to change MX yet:

- Use [ForwardEmail.net](https://forwardemail.net) free tier with a **webhook** to the same URL above, or
- Keep forms as the primary capture path (already working without inbound mail)

## 3. Admin access

Set in Vercel:

| Variable | Example |
|----------|---------|
| `ADMIN_PASSWORD` | strong password you choose |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fumfusuegvmvmhxrhyey.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase → Settings → API (server only, never public) |

Sign in at **https://kauaiinternet.com/admin**

## 4. What gets collected

| Source | Stored as |
|--------|-----------|
| Get Involved form | `support` |
| Community feedback | `feedback` |
| Map observations | `observation` |
| Map questions | `concern` |
| Inbound email | `support` + inbox log |

Export all data: **Admin → Reports → Download CSV**
