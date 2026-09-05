import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, ALT_SESSION_COOKIE_NAME } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Signed out successfully." });

  response.cookies.delete(SESSION_COOKIE_NAME);
  response.cookies.delete(ALT_SESSION_COOKIE_NAME);

  return response;
}
