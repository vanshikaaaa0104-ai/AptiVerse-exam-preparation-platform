import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  ALT_SESSION_COOKIE_NAME,
} from "@/lib/session";

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
    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 }
      );
    }

    let dbUser = null;
    try {
      dbUser = await db.user.findUnique({
        where: { email },
        include: { profile: true },
      });

      if (!dbUser) {
        dbUser = await db.user.create({
          data: {
            email,
            name,
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
      } else {
        // Update name and profile if exists
        dbUser = await db.user.update({
          where: { id: dbUser.id },
          data: { name },
          include: { profile: true },
        });
      }
    } catch (dbErr) {
      console.warn("DB user sync skipped:", dbErr);
    }

    const userId = dbUser?.id || `user-${Date.now()}`;
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
      httpOnly: false,
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
