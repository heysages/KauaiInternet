# Deploying to kauaiinternet.com

## 1. Deploy on Vercel

```bash
npm run build
npx vercel --prod
```

Or connect the GitHub repo in the [Vercel dashboard](https://vercel.com/new).

Set these environment variables in Vercel → Project → Settings → Environment Variables:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://kauaiinternet.com` |
| `MAPBOX_ACCESS_TOKEN` | No | Better address search (else OpenStreetMap) |
| `RESEND_API_KEY` | No | Email support form submissions |
| `SUPPORT_NOTIFY_EMAIL` | No | Where support emails go (default: hello@kauaiinternet.com) |

## 2. Connect domain (GoDaddy)

Your domain uses GoDaddy nameservers (`domaincontrol.com`).

### In Vercel

1. Project → **Settings** → **Domains**
2. Add `kauaiinternet.com` and `www.kauaiinternet.com`
3. Copy the DNS records Vercel shows

### In GoDaddy

1. [DNS Management](https://dcc.godaddy.com/manage/) for kauaiinternet.com
2. Remove parking/forwarding records pointing to GoDaddy
3. Add:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

DNS can take up to 48 hours; usually under 1 hour.

## 3. Verify

- https://kauaiinternet.com loads the community map
- Address search returns Kauai results
- Support form submits (check Vercel function logs; email if Resend is configured)
