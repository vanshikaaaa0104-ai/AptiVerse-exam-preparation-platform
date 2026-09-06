import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  ALT_SESSION_COOKIE_NAME,
} from "@/lib/session";
import { hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim();
    const password = body.password || "";
    const targetExam = body.targetExam || "cat";

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    const passwordHash = hashPassword(password);

    const dbUser = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "STUDENT",
        profile: {
          create: {
            targetExamSlug: targetExam,
            targetYear: 2026,
          },
        },
      },
      include: { profile: true },
    });

    const userId = dbUser.id;
    const token = await createSessionToken({
      userId,
      email,
      name,
      role: "STUDENT",
      targetExam,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        email,
        name,
        role: "STUDENT",
        targetExam,
      },
    });

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      sameSite: "lax" as const,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: process.env.NODE_ENV === "production",
    };

    response.cookies.set(SESSION_COOKIE_NAME, token, cookieOptions);
    response.cookies.set(ALT_SESSION_COOKIE_NAME, token, cookieOptions);

    return response;
  } catch (err: any) {
    console.error("Sign-up error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Registration failed." },
      { status: 500 }
    );
  }
}
