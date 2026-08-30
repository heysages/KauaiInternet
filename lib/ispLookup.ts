import { isPrivateIp } from "@/lib/clientIp";

export type IspInfo = {
  ispName: string | null;
  ispOrg: string | null;
  asn: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
};

const cache = new Map<string, { info: IspInfo; expires: number }>();
const CACHE_MS = 60 * 60 * 1000;

const EMPTY: IspInfo = {
  ispName: null,
  ispOrg: null,
  asn: null,
  country: null,
  region: null,
  city: null,
};

type IpApiResponse = {
  status?: string;
  isp?: string;
  org?: string;
  as?: string;
  country?: string;
  regionName?: string;
  city?: string;
};

export async function lookupIsp(ip: string | undefined): Promise<IspInfo> {
  if (!ip || isPrivateIp(ip)) return { ...EMPTY, ispName: "Local network" };

  const cached = cache.get(ip);
  if (cached && cached.expires > Date.now()) return cached.info;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,isp,org,as,country,regionName,city`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return EMPTY;
    const data = (await res.json()) as IpApiResponse;
    if (data.status !== "success") return EMPTY;

    const info: IspInfo = {
      ispName: data.isp ?? null,
      ispOrg: data.org ?? null,
      asn: data.as ?? null,
      country: data.country ?? null,
      region: data.regionName ?? null,
      city: data.city ?? null,
    };
    cache.set(ip, { info, expires: Date.now() + CACHE_MS });
    return info;
  } catch {
    return EMPTY;
  }
}
