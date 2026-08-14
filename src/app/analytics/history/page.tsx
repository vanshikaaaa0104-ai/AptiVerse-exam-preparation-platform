"use client";

import React from "react";
import Link from "next/link";
import { Clock, ChevronLeft, Award, CheckCircle2, Target, ArrowRight, Layers } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AttemptHistoryPage() {
  const history = [
    {
      id: "cat-mock-01",
      title: "CAT 2026 National Full Mock #01",
      type: "FULL_MOCK",
      date: "Today, 2:40 PM",
      score: "+84 / 198",
      accuracy: "78.9%",
      percentile: "98.4 %ile",
      duration: "118 mins",
    },
    {
      id: "drill-06",
      title: "Arithmetic Speed Sprint #06",
      type: "PRACTICE_DRILL",
      date: "Yesterday, 6:15 PM",
      score: "+24 / 30",
      accuracy: "80.0%",
      percentile: "—",
      duration: "14 mins",
    },
    {
      id: "drill-05",
      title: "DILR Tournament Sets #05",
      type: "PRACTICE_DRILL",
      date: "12 Aug 2026",
      score: "+27 / 30",
      accuracy: "84.0%",
      percentile: "—",
      duration: "16 mins",
    },
    {
      id: "drill-04",
      title: "Time & Work Weak Area Drill",
      type: "WEAK_AREA",
      date: "11 Aug 2026",
      score: "+15 / 30",
      accuracy: "50.0%",
      percentile: "—",
      duration: "18 mins",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/analytics" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Analytics</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test & Drill Attempt History
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Chronological log of all completed assessments with score cards and solution links.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {history.map((item) => (
            <Card
              key={item.id}
              className="border border-slate-800 bg-[#0e1422] p-5 hover:border-slate-700 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <Badge variant={item.type === "FULL_MOCK" ? "verified" : "indigo"} className="text-[10px]">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{item.date} • {item.duration}</p>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-sans uppercase">Score</p>
                    <p className="font-bold text-indigo-400">{item.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-sans uppercase">Accuracy</p>
                    <p className="font-bold text-emerald-400">{item.accuracy}</p>
                  </div>
                  {item.percentile !== "—" && (
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-sans uppercase">Percentile</p>
                      <p className="font-bold text-purple-400">{item.percentile}</p>
                    </div>
                  )}
                  <Link href={`/quiz/${item.id}/result`}>
                    <Button variant="outline" size="sm" className="text-xs ml-2">
                      <span>Review</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
