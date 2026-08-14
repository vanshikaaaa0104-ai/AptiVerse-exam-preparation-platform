"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trophy, Award, Flame, Zap, ShieldCheck, Target, ArrowUp, ArrowDown } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LeaderboardPage() {
  const [boardType, setBoardType] = useState<"WEEKLY_XP" | "CAT_MOCK">("WEEKLY_XP");

  const leaderboardData = [
    { rank: 1, name: "Rohan Verma", target: "CAT 2026", xp: 4820, mockScore: 98, streak: 24, isUser: false },
    { rank: 2, name: "Sneha Mukherjee", target: "XAT 2026", xp: 4350, mockScore: 92, streak: 19, isUser: false },
    { rank: 3, name: "Aditya Nair", target: "CAT 2026", xp: 3980, mockScore: 88, streak: 16, isUser: false },
    { rank: 4, name: "Aman Sharma (You)", target: "CAT 2026", xp: 2450, mockScore: 84, streak: 12, isUser: true },
    { rank: 5, name: "Pooja Hegde", target: "SNAP 2026", xp: 2210, mockScore: 80, streak: 11, isUser: false },
    { rank: 6, name: "Kunal Deshmukh", target: "NMAT 2026", xp: 1980, mockScore: 78, streak: 9, isUser: false },
    { rank: 7, name: "Divya Kapoor", target: "CMAT 2026", xp: 1850, mockScore: 74, streak: 8, isUser: false },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                National Leaderboards
              </h1>
              <Badge variant="indigo">WEEKLY RESET IN 2D 14H</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Compete with serious MBA aspirants nationwide based on weekly practice consistency and mock test scores.
            </p>
          </div>
        </div>

        {/* Board Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBoardType("WEEKLY_XP")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              boardType === "WEEKLY_XP"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Weekly XP & Consistency Rank
          </button>
          <button
            onClick={() => setBoardType("CAT_MOCK")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              boardType === "CAT_MOCK"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            CAT Full Mock #01 Percentile Board
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0e1422]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-sans uppercase">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Aspirant</th>
                <th className="p-4">Target Exam</th>
                <th className="p-4">Streak</th>
                <th className="p-4 text-right">
                  {boardType === "WEEKLY_XP" ? "Weekly XP" : "Raw Score"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leaderboardData.map((user) => (
                <tr
                  key={user.rank}
                  className={`transition-colors ${
                    user.isUser
                      ? "bg-indigo-950/40 font-bold border-l-4 border-indigo-500"
                      : "hover:bg-slate-900/40"
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {user.rank === 1 ? (
                        <Trophy className="h-4 w-4 text-amber-400" />
                      ) : user.rank === 2 ? (
                        <Trophy className="h-4 w-4 text-slate-300" />
                      ) : user.rank === 3 ? (
                        <Trophy className="h-4 w-4 text-amber-600" />
                      ) : (
                        <span className="text-slate-400">#{user.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-sans font-semibold text-white">
                    {user.name}
                  </td>
                  <td className="p-4 text-slate-300">{user.target}</td>
                  <td className="p-4 text-amber-400 font-bold">
                    {user.streak}d 🔥
                  </td>
                  <td className="p-4 text-right font-bold text-indigo-400">
                    {boardType === "WEEKLY_XP" ? `${user.xp} XP` : `${user.mockScore} / 198`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
