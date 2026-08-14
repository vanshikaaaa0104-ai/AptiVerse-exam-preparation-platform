"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Target, Flame, Trophy, Award, Zap, Settings, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const [targetExam, setTargetExam] = useState("cat");
  const [dailyGoal, setDailyGoal] = useState(25);

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-extrabold text-xl text-white shadow-xl shadow-indigo-500/25">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Aman Sharma</h1>
                <Badge variant="verified">VERIFIED ASPIRANT</Badge>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">aman.sharma@aptiverse.ai</p>
              <p className="text-xs text-indigo-400 font-mono mt-1 font-semibold">
                Targeting CAT 2026 (99.5+ Percentile Goal)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-center">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Level</p>
              <p className="text-lg font-bold text-white">4</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Streak</p>
              <p className="text-lg font-bold text-amber-400">12d 🔥</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] text-slate-400 font-sans uppercase">Total XP</p>
              <p className="text-lg font-bold text-indigo-400">2,450</p>
            </div>
          </div>
        </div>

        {/* Target Exam & Goal Settings */}
        <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-6">
          <div className="space-y-1 pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">Target Entrance Exam Preferences</h2>
            <p className="text-xs text-slate-400">Your dashboard recommendations adjust automatically to your selected target exam.</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Primary Examination
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "cat", label: "CAT 2026" },
                { id: "xat", label: "XAT 2026" },
                { id: "snap", label: "SNAP 2026" },
                { id: "nmat", label: "NMAT 2026" },
                { id: "cmat", label: "CMAT 2026" },
                { id: "mat", label: "MAT 2026" },
                { id: "mah-cet", label: "MAH CET 2026" },
              ].map((exam) => (
                <button
                  key={exam.id}
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

          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Daily Practice Target
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 25, 40].map((count) => (
                <button
                  key={count}
                  onClick={() => setDailyGoal(count)}
                  className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                    dailyGoal === count
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {count} Questions / Day
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
