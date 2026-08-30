import { NextRequest, NextResponse } from "next/server";
import { mergeAttribution } from "@/lib/mergeAttribution";
import { createSubmission } from "@/lib/submissionsDb";
import { notifySupportTeam } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  let body: {
    observationType?: string;
    message?: string;
    lat?: number;
    lng?: number;
    locationLabel?: string;
    nameOrOrg?: string;
    attribution?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const submission = await createSubmission({
    kind: "observation",
    name: body.nameOrOrg?.trim(),
    locationLabel: body.locationLabel,
    message: body.message.trim(),
    metadata: mergeAttribution(
      {
        observationType: body.observationType,
        lat: body.lat,
        lng: body.lng,
        dataConfidence: "community",
      },
      body.attribution
    ),
  });

  await notifySupportTeam({
    subject: `New map observation${body.observationType ? `: ${body.observationType}` : ""}`,
    text: [
      body.nameOrOrg ? `From: ${body.nameOrOrg}` : null,
      body.locationLabel ? `Location: ${body.locationLabel}` : null,
      body.observationType ? `Type: ${body.observationType}` : null,
      "",
      body.message.trim(),
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return NextResponse.json({ ok: true, id: submission?.id, stored: Boolean(submission) });
}
