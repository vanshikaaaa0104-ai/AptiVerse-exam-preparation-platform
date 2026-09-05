import { NextRequest, NextResponse } from "next/server";
import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
  ALT_SESSION_COOKIE_NAME,
} from "@/lib/session";

export async function GET(req: NextRequest) {
  const token =
    req.cookies.get(SESSION_COOKIE_NAME)?.value ||
    req.cookies.get(ALT_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ session: null });
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return NextResponse.json({ session: null });
  }

  return NextResponse.json({
    session: {
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        targetExam: payload.targetExam || "cat",
      },
      expires: new Date((payload.exp || 0) * 1000).toISOString(),
    },
  });
}
