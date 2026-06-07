import { NextRequest, NextResponse } from "next/server";
import { mergeAttribution } from "@/lib/mergeAttribution";
import { createSubmission } from "@/lib/submissionsDb";

export async function POST(request: NextRequest) {
  let body: {
    category?: string;
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
    kind: "concern",
    name: body.nameOrOrg?.trim(),
    locationLabel: body.locationLabel,
    message: body.message.trim(),
    metadata: mergeAttribution(
      { category: body.category, lat: body.lat, lng: body.lng },
      body.attribution
    ),
  });

  return NextResponse.json({ ok: true, id: submission?.id, stored: Boolean(submission) });
}
