import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  ALT_SESSION_COOKIE_NAME,
} from "@/lib/session";
import { verifyPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const isDemoStudent = body.isDemoStudent === true || email === "aman.sharma@aptiverse.ai";
    const isDemoAdmin = body.isDemoAdmin === true || email === "admin@aptiverse.ai";

    if (!email && !isDemoStudent && !isDemoAdmin) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    let targetEmail = email;
    let targetName = "Student Aspirant";
    let targetRole: "STUDENT" | "ADMIN" = "STUDENT";
    let targetExam = "cat";
    let dbUser = null;

    if (isDemoAdmin) {
      targetEmail = "admin@aptiverse.ai";
      targetName = "Dr. Rajesh Iyer (SME Lead)";
      targetRole = "ADMIN";
      targetExam = "cat";

      dbUser = await db.user.findUnique({
        where: { email: targetEmail },
        include: { profile: true },
      });
    } else if (isDemoStudent) {
      targetEmail = "aman.sharma@aptiverse.ai";
      targetName = "Aman Sharma";
      targetRole = "STUDENT";
      targetExam = "cat";

      dbUser = await db.user.findUnique({
        where: { email: targetEmail },
        include: { profile: true },
      });
    } else {
      if (!password) {
        return NextResponse.json(
          { success: false, error: "Password is required." },
          { status: 400 }
        );
      }

      dbUser = await db.user.findUnique({
        where: { email: targetEmail },
        include: { profile: true },
      });

      if (!dbUser) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password." },
          { status: 401 }
        );
      }

      if (dbUser.passwordHash) {
        const isPasswordValid = verifyPassword(password, dbUser.passwordHash);
        if (!isPasswordValid) {
          return NextResponse.json(
            { success: false, error: "Invalid email or password." },
            { status: 401 }
          );
        }
      }
    }

    const userId = dbUser?.id || (isDemoAdmin ? "admin-001" : isDemoStudent ? "student-001" : `user-${Date.now()}`);
    const finalRole = (dbUser?.role as "STUDENT" | "ADMIN") || targetRole;
    const finalName = dbUser?.name || targetName;
    const finalExam = dbUser?.profile?.targetExamSlug || targetExam;

    const token = await createSessionToken({
      userId,
      email: targetEmail,
      name: finalName,
      role: finalRole,
      targetExam: finalExam,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: targetEmail,
        name: finalName,
        role: finalRole,
        targetExam: finalExam,
      },
    });

    // Set cookie on response for Next.js middleware and SSR
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
    console.error("Sign-in error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Authentication failed." },
      { status: 500 }
    );
  }
}
