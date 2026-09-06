"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Target,
  Flame,
  Trophy,
  Award,
  Zap,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  GraduationCap,
  Save,
  Mail,
  Phone,
  Layers,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStoredCurrentUser, setStoredCurrentUser, UserProfile } from "@/lib/auth-storage";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser();
    return null;
  });
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().name;
    return "";
  });
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().email;
    return "";
  });
  const [phone, setPhone] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().phone || "";
    return "";
  });
  const [targetExam, setTargetExam] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().targetExam || "cat";
    return "cat";
  });
  const [targetDate, setTargetDate] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().targetDate || "2026-11-29";
    return "2026-11-29";
  });
  const [prepLevel, setPrepLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().prepLevel || "Intermediate";
    return "Intermediate";
  });
  const [dailyGoal, setDailyGoal] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().dailyQuestionGoal || 25;
    return 25;
  });
  const [studyTimeMin, setStudyTimeMin] = useState(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().dailyStudyTimeMin || 120;
    return 120;
  });
  const [preferredTime, setPreferredTime] = useState<"Morning" | "Afternoon" | "Evening" | "Night">(() => {
    if (typeof window !== "undefined") return getStoredCurrentUser().preferredStudyTime || "Evening";
    return "Evening";
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const examNames: Record<string, string> = {
      cat: "CAT 2026",
      xat: "XAT 2026",
      nmat: "NMAT 2026",
      snap: "SNAP 2026",
      cmat: "CMAT 2026",
      mat: "MAT 2026",
      "mah-cet": "MAH MBA CET 2026",
    };

    const updated: UserProfile = {
      ...user,
      name,
      email,
      phone,
      targetExam,
      targetExamName: examNames[targetExam] || targetExam.toUpperCase(),
      targetDate,
      prepLevel,
      dailyQuestionGoal: dailyGoal,
      dailyStudyTimeMin: studyTimeMin,
      preferredStudyTime: preferredTime,
    };

    setStoredCurrentUser(updated);
    setUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const exams = [
    { id: "cat", label: "CAT 2026" },
    { id: "xat", label: "XAT 2026" },
    { id: "snap", label: "SNAP 2026" },
    { id: "nmat", label: "NMAT 2026" },
    { id: "cmat", label: "CMAT 2026" },
    { id: "mat", label: "MAT 2026" },
    { id: "mah-cet", label: "MAH CET 2026" },
  ];

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200 pb-12">
        {/* Profile Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-extrabold text-xl text-white shadow-xl shadow-indigo-500/25 shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{name || "Student Aspirant"}</h1>
                <Badge variant="verified">
                  {user?.role === "ADMIN" ? "ADMINISTRATOR" : "VERIFIED ASPIRANT"}
                </Badge>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{email}</p>
              <p className="text-xs text-indigo-400 font-mono mt-1 font-semibold">
                Targeting {user?.targetExamName || "CAT 2026"} (Target Date: {targetDate})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-center">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 min-w-[70px]">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Level</p>
              <p className="text-base sm:text-lg font-bold text-white">{user?.level || 4}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 min-w-[70px]">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Streak</p>
              <p className="text-base sm:text-lg font-bold text-amber-400">{user?.currentStreak || 12}d 🔥</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 min-w-[70px]">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Total XP</p>
              <p className="text-base sm:text-lg font-bold text-indigo-400">{user?.totalXp || 2450}</p>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Profile and exam study preferences updated successfully!</span>
          </div>
        )}

        {/* Profile Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-6">
            <div className="space-y-1 pb-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Personal Information</h2>
                <p className="text-xs text-slate-400">Manage your contact credentials and identification.</p>
              </div>
              <Badge variant="outline" className="text-[10px] text-indigo-300">
                AptiVerse V2.0 ID: {user?.id}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  placeholder="+91 98765 43210"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  <span>Preparation Baseline</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setPrepLevel(lvl)}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        prepLevel === lvl
                          ? "bg-indigo-600 text-white border-indigo-500"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Exam & Goal Settings */}
          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-6">
            <div className="space-y-1 pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">Target Entrance Exam Preferences</h2>
              <p className="text-xs text-slate-400">
                Your dashboard recommendations, adaptive drills, and mock timers adjust automatically to your selection.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Primary Target Exam
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {exams.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => setTargetExam(exam.id)}
                    className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                      targetExam === exam.id
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {exam.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Target Exam Date</span>
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-slate-400" />
                  <span>Daily Question Target</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[15, 25, 40].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setDailyGoal(count)}
                      className={`p-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        dailyGoal === count
                          ? "bg-indigo-600 text-white border-indigo-500"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Preferred Study Time</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["Morning", "Evening"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPreferredTime(t)}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        preferredTime === t
                          ? "bg-indigo-600 text-white border-indigo-500"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" variant="accent" size="sm" className="gap-2 px-6 font-bold shadow-md shadow-indigo-600/20">
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}
