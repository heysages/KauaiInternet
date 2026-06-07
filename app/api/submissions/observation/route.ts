import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissionsDb";

export async function POST(request: NextRequest) {
  let body: {
    observationType?: string;
    message?: string;
    lat?: number;
    lng?: number;
    locationLabel?: string;
    nameOrOrg?: string;
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
    metadata: {
      observationType: body.observationType,
      lat: body.lat,
      lng: body.lng,
      dataConfidence: "community",
    },
  });

  return NextResponse.json({ ok: true, id: submission?.id, stored: Boolean(submission) });
}
