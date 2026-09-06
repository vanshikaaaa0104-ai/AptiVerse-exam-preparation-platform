"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  Calendar,
  Layers,
  GraduationCap,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStoredCurrentUser, setStoredCurrentUser, UserProfile } from "@/lib/auth-storage";

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      return getStoredCurrentUser();
    }
    return null;
  });
  const [dailyGoal, setDailyGoal] = useState(() => {
    if (typeof window !== "undefined") {
      return getStoredCurrentUser().dailyQuestionGoal || 25;
    }
    return 25;
  });
  const [studyTimeMin, setStudyTimeMin] = useState(() => {
    if (typeof window !== "undefined") {
      return getStoredCurrentUser().dailyStudyTimeMin || 120;
    }
    return 120;
  });
  const [preferredTime, setPreferredTime] = useState<"Morning" | "Afternoon" | "Evening" | "Night">(() => {
    if (typeof window !== "undefined") {
      return getStoredCurrentUser().preferredStudyTime || "Evening";
    }
    return "Evening";
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCompleteOnboarding = () => {
    if (!user) return;
    setIsGenerating(true);

    const updated: UserProfile = {
      ...user,
      dailyQuestionGoal: dailyGoal,
      dailyStudyTimeMin: studyTimeMin,
      preferredStudyTime: preferredTime,
      isOnboarded: true,
      lastTopic: {
        title: `${user.targetExam.toUpperCase()} Diagnostic Assessment`,
        section: "Core Foundations",
        href: `/exams/${user.targetExam}`,
        progress: 0,
      },
    };

    setStoredCurrentUser(updated);

    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  const getExamDisplay = (examId: string) => {
    const map: Record<string, string> = {
      cat: "CAT (Common Admission Test)",
      xat: "XAT (Xavier Aptitude Test)",
      nmat: "NMAT by GMAC",
      snap: "SNAP (Symbiosis National Aptitude)",
      "mah-cet": "MAH MBA CET",
      cmat: "CMAT (National Testing Agency)",
      mat: "MAT (AIMA Management Aptitude)",
    };
    return map[examId] || examId.toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center text-slate-400 text-xs">
        Loading preferences...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center p-4 py-12 selection:bg-indigo-500 selection:text-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Welcome to AptiVerse V2.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personalize Your Study Rhythm, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Let&apos;s configure your daily goals and calibration baseline for{" "}
            <span className="text-indigo-400 font-bold">{getExamDisplay(user.targetExam)}</span>.
          </p>
        </div>

        {step === 1 ? (
          <Card className="border border-slate-800 bg-[#0e1422]/90 shadow-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-400" />
                <span>Step 1: Review Profile &amp; Set Study Pace</span>
              </h2>
              <p className="text-xs text-slate-400">
                Calibrate daily volume to maintain optimal cognitive retention.
              </p>
            </div>

            {/* Profile Confirmation Pill */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Target Exam</p>
                <p className="text-white font-bold mt-0.5">{user.targetExam.toUpperCase()} 2026</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Prep Level</p>
                <p className="text-indigo-300 font-bold mt-0.5">{user.prepLevel}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Exam Date</p>
                <p className="text-white font-bold mt-0.5">{user.targetDate}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Email</p>
                <p className="text-slate-300 truncate mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Daily Question Goal */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Daily Practice Volume (Questions)</span>
                <span className="text-indigo-400 font-bold">{dailyGoal} questions / day</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 40, 60].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setDailyGoal(goal)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      dailyGoal === goal
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md ring-1 ring-indigo-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <span className="block text-sm font-extrabold">{goal}</span>
                    <span className="text-[10px] opacity-75">
                      {goal === 15 ? "Light" : goal === 25 ? "Standard" : goal === 40 ? "Intensive" : "Hardcore"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Time & Preferred Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Daily Study Time</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[60, 120, 180].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setStudyTimeMin(mins)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        studyTimeMin === mins
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {mins / 60} hrs
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Preferred Study Time</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["Morning", "Afternoon", "Evening", "Night"] as const).map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setPreferredTime(time)}
                      className={`p-2 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        preferredTime === time
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="accent"
              onClick={() => setStep(2)}
              className="w-full py-3 text-xs font-bold gap-2 shadow-lg shadow-indigo-600/20"
            >
              <span>Review Plan &amp; Finalize</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        ) : (
          <Card className="border border-slate-800 bg-[#0e1422]/90 shadow-2xl p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-emerald-500/25">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">
                Your Personalized Preparation Plan is Ready!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                We have generated a targeted adaptive curriculum for{" "}
                <span className="text-white font-bold">{getExamDisplay(user.targetExam)}</span>.
              </p>
            </div>

            {/* Plan Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <Flame className="h-3 w-3 text-amber-400" /> Daily Target
                </span>
                <p className="text-white font-bold">{dailyGoal} Questions / Day</p>
                <p className="text-[11px] text-slate-400">{studyTimeMin / 60} Hours Focused Study</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <BookOpen className="h-3 w-3 text-indigo-400" /> Syllabus Coverage
                </span>
                <p className="text-white font-bold">100% Comprehensive</p>
                <p className="text-[11px] text-slate-400">Sectional &amp; Topic Drills</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-1">
                  <Award className="h-3 w-3 text-teal-400" /> Adaptive Engine
                </span>
                <p className="text-white font-bold">Mistake Book Active</p>
                <p className="text-[11px] text-slate-400">Zero-Weakness Recovery</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep(1)}
                className="text-xs"
              >
                Back to Edit
              </Button>
              <Button
                type="button"
                variant="accent"
                onClick={handleCompleteOnboarding}
                disabled={isGenerating}
                className="py-3 px-8 text-xs font-bold gap-2 shadow-lg shadow-indigo-600/25"
              >
                {isGenerating ? (
                  <span>Loading Dashboard...</span>
                ) : (
                  <>
                    <span>Start Preparing</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
