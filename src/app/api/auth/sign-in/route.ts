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

    if (isDemoAdmin) {
      targetEmail = "admin@aptiverse.ai";
      targetName = "Dr. Rajesh Iyer (SME Lead)";
      targetRole = "ADMIN";
      targetExam = "cat";
    } else if (isDemoStudent) {
      targetEmail = "aman.sharma@aptiverse.ai";
      targetName = "Aman Sharma";
      targetRole = "STUDENT";
      targetExam = "cat";
    } else {
      if (!password) {
        return NextResponse.json(
          { success: false, error: "Password is required." },
          { status: 400 }
        );
      }
      targetName = email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    }

    // Attempt to find or create in database
    let dbUser = null;
    try {
      dbUser = await db.user.findUnique({
        where: { email: targetEmail },
        include: { profile: true },
      });

      if (!dbUser) {
        dbUser = await db.user.create({
          data: {
            email: targetEmail,
            name: targetName,
            role: targetRole,
            profile: {
              create: {
                targetExamSlug: targetExam,
                targetYear: 2026,
              },
            },
          },
          include: { profile: true },
        });
      }
    } catch (dbErr) {
      console.warn("DB user sync skipped:", dbErr);
    }

    const userId = dbUser?.id || (isDemoAdmin ? "admin-001" : isDemoStudent ? "student-001" : `user-${Date.now()}`);
    const finalRole = (dbUser?.role as "STUDENT" | "ADMIN") || targetRole;
    const finalName = dbUser?.name || targetName;

    const token = await createSessionToken({
      userId,
      email: targetEmail,
      name: finalName,
      role: finalRole,
      targetExam,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: targetEmail,
        name: finalName,
        role: finalRole,
        targetExam,
      },
    });

    // Set cookie on response for Next.js middleware and SSR
    const cookieOptions = {
      path: "/",
      httpOnly: false, // Accessible by client and server
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
