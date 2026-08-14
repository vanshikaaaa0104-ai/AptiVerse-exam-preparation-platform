"use client";

import React from "react";
import Link from "next/link";
import { Flame, Zap, Award, Target, Clock, ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DailyChallengePage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/practice" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Practice Hub</span>
          </Link>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/30 via-[#0e1422] to-[#0e1422] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                <Flame className="h-6 w-6 fill-red-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Today&apos;s Daily Challenge
                </h1>
                <p className="text-xs text-red-400 font-medium">12-Day Active Streak</p>
              </div>
            </div>

            <Badge variant="warning" className="text-xs font-mono font-bold">
              +150 XP REWARD
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Solve 5 curated questions spanning Quantitative Aptitude, DILR, and Verbal Ability to keep your streak active and strengthen cross-subject agility.
          </p>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center font-mono text-xs">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-sans">Questions</p>
              <p className="text-sm font-bold text-white">5 Qs</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-sans">Target Time</p>
              <p className="text-sm font-bold text-white">8 mins</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-sans">XP Bonus</p>
              <p className="text-sm font-bold text-emerald-400">+150 XP</p>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/quiz/daily-challenge-today">
              <Button variant="accent" size="lg" className="w-full justify-center gap-2 shadow-xl shadow-red-500/20">
                <Target className="h-4 w-4" />
                <span>Start Daily Challenge</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
