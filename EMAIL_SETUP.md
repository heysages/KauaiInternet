# Email setup — backend inbox (no traditional mailbox)

Kauai Internet uses a **backend-first email model**:

- Public forms save to **Supabase** (primary record)
- **Resend** sends outbound replies from the admin panel
- **Inbound email** hits a webhook → stored in Supabase → visible in `/admin/inbox`

You do not need Google Workspace or Outlook for hello@kauaiinternet.com.

## 1. Outbound (replies from admin)

1. Create a free account at [resend.com](https://resend.com)
2. Add and verify domain **kauaiinternet.com**
3. In Vercel, set:
   - `RESEND_API_KEY` — API key from Resend
   - `RESEND_FROM_EMAIL` — `Kauai Internet <hello@kauaiinternet.com>`
   - `SUPPORT_NOTIFY_EMAIL` — where you want alerts (your personal email is fine)

Admin → **Interest** → select a submission → **Send reply** uses Resend.

## 2. Inbound (hello@ → backend)

After verifying the domain in Resend:

1. Resend Dashboard → **Receiving** → add webhook URL:
   ```
   https://kauaiinternet.com/api/webhooks/inbound-email
   ```
2. Set optional `INBOUND_EMAIL_WEBHOOK_SECRET` in Vercel and send the same value as header `x-webhook-secret` from Resend (or your proxy).
3. Add Resend's **MX records** in GoDaddy DNS (Resend shows exact values after domain verify).

When someone emails hello@kauaiinternet.com, the message is stored and appears in **Admin → Email Inbox**.

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
