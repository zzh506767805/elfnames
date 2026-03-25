import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { addCredits } from "@/lib/credits";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

// Track verified sessions to prevent double-crediting (in-memory, resets on deploy)
const verifiedSessions = new Set<string>();

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  // Prevent double-crediting
  if (verifiedSessions.has(sessionId)) {
    return NextResponse.json({ success: true, already_processed: true });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ success: false, reason: "not_paid" });
    }

    verifiedSessions.add(sessionId);
    const newTotal = await addCredits(10);

    return NextResponse.json({ success: true, credits: newTotal });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
