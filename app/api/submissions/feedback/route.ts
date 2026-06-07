import { NextRequest, NextResponse } from "next/server";
import { mergeAttribution } from "@/lib/mergeAttribution";
import { createSubmission } from "@/lib/submissionsDb";
import type { CommunityFeedbackPriority } from "@/types/network";

export async function POST(request: NextRequest) {
  let body: {
    priorities?: CommunityFeedbackPriority[];
    otherNote?: string;
    locationLabel?: string;
    attribution?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.priorities?.length) {
    return NextResponse.json({ error: "Select at least one priority" }, { status: 400 });
  }

  const message = [
    `Priorities: ${body.priorities.join(", ")}`,
    body.otherNote ? `Other: ${body.otherNote}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const submission = await createSubmission({
    kind: "feedback",
    locationLabel: body.locationLabel,
    message,
    metadata: mergeAttribution(
      { priorities: body.priorities, otherNote: body.otherNote ?? null },
      body.attribution
    ),
  });

  return NextResponse.json({ ok: true, id: submission?.id, stored: Boolean(submission) });
}
