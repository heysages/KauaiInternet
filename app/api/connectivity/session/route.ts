import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getClientIp, maskIp } from "@/lib/clientIp";
import { lookupIsp } from "@/lib/ispLookup";

export async function GET() {
  const hdrs = await headers();
  const ip = getClientIp(hdrs);
  const isp = await lookupIsp(ip);

  return NextResponse.json({
    ipMasked: ip ? maskIp(ip) : "unknown",
    ispName: isp.ispName,
    ispOrg: isp.ispOrg,
    asn: isp.asn,
    country: isp.country,
    region: isp.region,
    city: isp.city,
  });
}
