"use client";

import React from "react";
import Link from "next/link";
import { Layers, ChevronLeft, Award, Clock, Target, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function SectionAnalyticsPage() {
  const sections = [
    {
      name: "Quantitative Aptitude",
      slug: "qa",
      accuracy: 76,
      mastery: 72,
      attempts: 145,
      avgTime: "1m 45s",
      strongestTopic: "Percentages (88%)",
      weakestTopic: "Time & Work (48%)",
      status: "STRONG",
    },
    {
      name: "Data Interpretation & Logical Reasoning",
      slug: "dilr",
      accuracy: 64,
      mastery: 61,
      attempts: 98,
      avgTime: "2m 20s",
      strongestTopic: "Games & Tournaments (78%)",
      weakestTopic: "Linear Arrangements (53%)",
      status: "NEEDS_PRACTICE",
    },
    {
      name: "Verbal Ability & Reading Comprehension",
      slug: "varc",
      accuracy: 78,
      mastery: 74,
      attempts: 105,
      avgTime: "1m 25s",
      strongestTopic: "Para Summary (85%)",
      weakestTopic: "Para Jumbles (57%)",
      status: "STRONG",
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
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sectional Strength & Balance
              </h1>
              <Badge variant="indigo">DIAGNOSTICS</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comparative analysis across CAT 2026 sections ensuring balanced sectional cutoff clearance.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {sections.map((sec) => (
            <Card key={sec.slug} className="border border-slate-800 bg-[#0e1422] p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{sec.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {sec.attempts} total practice questions attempted
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={sec.status === "STRONG" ? "success" : "warning"}>
                    {sec.status === "STRONG" ? "Strong Track" : "Needs Remediation"}
                  </Badge>
                  <span className="text-xl font-extrabold font-mono text-white">
                    {sec.mastery}% Mastery
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Accuracy Rate</span>
                  <span className="text-emerald-400 font-mono">{sec.accuracy}%</span>
                </div>
                <Progress value={sec.accuracy} className="h-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-sans uppercase">Strongest Topic</p>
                  <p className="text-emerald-400 font-bold mt-0.5">{sec.strongestTopic}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-sans uppercase">Weakest Topic</p>
                  <p className="text-amber-400 font-bold mt-0.5">{sec.weakestTopic}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-sans uppercase">Average Pace</p>
                  <p className="text-blue-400 font-bold mt-0.5">{sec.avgTime} / Q</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
