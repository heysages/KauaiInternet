import { NextRequest, NextResponse } from "next/server";
import { mergeAttribution } from "@/lib/mergeAttribution";
import { createSubmission } from "@/lib/submissionsDb";
import { notifySupportTeam } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    locationLabel?: string;
    siteType?: string;
    elevation?: string;
    hasPower?: boolean;
    hasInternet?: boolean;
    hasRoofOrTower?: boolean;
    hasSolar?: boolean;
    hasBackupPower?: boolean;
    willingToHostAntennas?: boolean;
    technicalHelp?: boolean;
    sponsorInterest?: boolean;
    pilotInterest?: boolean;
    message?: string;
    mayContact?: boolean;
    attribution?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.locationLabel?.trim()) {
    return NextResponse.json({ error: "Name, email, and location are required" }, { status: 400 });
  }
  if (!body.mayContact) {
    return NextResponse.json({ error: "Contact consent required" }, { status: 400 });
  }

  const adminMetadata = {
    phone: body.phone?.trim() ?? null,
    siteType: body.siteType ?? "home",
    elevation: body.elevation?.trim() ?? null,
    hasPower: Boolean(body.hasPower),
    hasInternet: Boolean(body.hasInternet),
    hasRoofOrTower: Boolean(body.hasRoofOrTower),
    hasSolar: Boolean(body.hasSolar),
    hasBackupPower: Boolean(body.hasBackupPower),
    willingToHostAntennas: Boolean(body.willingToHostAntennas),
    technicalHelp: Boolean(body.technicalHelp),
    sponsorInterest: Boolean(body.sponsorInterest),
    pilotInterest: Boolean(body.pilotInterest),
    visibility: "adminOnly",
  };

  const messageLines = [
    `Site type: ${body.siteType}`,
    body.elevation ? `Elevation: ${body.elevation}` : null,
    `Power: ${body.hasPower ? "yes" : "no"}`,
    `Internet: ${body.hasInternet ? "yes" : "no"}`,
    `Roof/tower: ${body.hasRoofOrTower ? "yes" : "no"}`,
    `Solar: ${body.hasSolar ? "yes" : "no"}`,
    `Backup power: ${body.hasBackupPower ? "yes" : "no"}`,
    `Host antennas: ${body.willingToHostAntennas ? "yes" : "no"}`,
    body.pilotInterest ? "North Shore pilot interest: yes" : null,
    body.message?.trim() ? `\n${body.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const submission = await createSubmission({
    kind: "node-application",
    name: body.name.trim(),
    email: body.email.trim(),
    locationLabel: body.locationLabel.trim(),
    message: messageLines,
    metadata: mergeAttribution(adminMetadata, body.attribution),
  });

  await notifySupportTeam({
    subject: `Host a Node: ${body.name.trim()} — ${body.locationLabel.trim()}`,
    text: messageLines,
    threadKey: body.email.trim().toLowerCase(),
    replyTo: body.email.trim(),
  });

  return NextResponse.json({ ok: true, id: submission?.id, stored: Boolean(submission) });
}
