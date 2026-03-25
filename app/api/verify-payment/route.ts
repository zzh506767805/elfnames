import { NextRequest, NextResponse } from "next/server";
import { addCredits } from "@/lib/credits";

export const dynamic = "force-dynamic";

const verifiedSessions = new Set<string>();

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  if (verifiedSessions.has(sessionId)) {
    return NextResponse.json({ success: true, already_processed: true });
  }

  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { "Authorization": `Bearer ${key}` },
    });
    const session = await res.json();

    if (session.payment_status !== "paid") {
      return NextResponse.json({ success: false, reason: "not_paid" });
    }

    verifiedSessions.add(sessionId);
    const newTotal = await addCredits(10);

    return NextResponse.json({ success: true, credits: newTotal });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
