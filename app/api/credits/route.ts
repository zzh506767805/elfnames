import { NextResponse } from "next/server";
import { getCredits } from "@/lib/credits";

export async function GET() {
  const credits = await getCredits();
  return NextResponse.json({ credits });
}
