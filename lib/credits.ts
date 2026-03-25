import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "credits_token";
const SECRET = new TextEncoder().encode(
  process.env.CREDITS_SECRET || "elfname-credits-secret-key-2026"
);

interface CreditPayload {
  credits: number;
}

export async function getCredits(): Promise<number> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return 0;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return (payload as unknown as CreditPayload).credits || 0;
  } catch {
    return 0;
  }
}

export async function setCredits(credits: number): Promise<string> {
  const token = await new SignJWT({ credits } as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return token;
}

export async function consumeCredit(): Promise<{ success: boolean; remaining: number }> {
  const current = await getCredits();
  if (current <= 0) {
    return { success: false, remaining: 0 };
  }
  const remaining = current - 1;
  await setCredits(remaining);
  return { success: true, remaining };
}

export async function addCredits(amount: number): Promise<number> {
  const current = await getCredits();
  const newTotal = current + amount;
  await setCredits(newTotal);
  return newTotal;
}
