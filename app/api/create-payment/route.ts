import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://elfname.pro").trim().replace(/\/$/, "");
    const successUrl = `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/`;

    const body = [
      "payment_method_types[0]=card",
      "line_items[0][price_data][currency]=usd",
      `line_items[0][price_data][product_data][name]=${encodeURIComponent("Elf Name Generator - 10 Credits")}`,
      `line_items[0][price_data][product_data][description]=${encodeURIComponent("Generate 10 elf names with AI")}`,
      "line_items[0][price_data][unit_amount]=100",
      "line_items[0][quantity]=1",
      "mode=payment",
      `success_url=${encodeURIComponent(successUrl)}`,
      `cancel_url=${encodeURIComponent(cancelUrl)}`,
    ].join("&");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Stripe API error:", JSON.stringify(data));
      return NextResponse.json({ error: "Stripe error" }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to create payment session", detail: message }, { status: 500 });
  }
}
