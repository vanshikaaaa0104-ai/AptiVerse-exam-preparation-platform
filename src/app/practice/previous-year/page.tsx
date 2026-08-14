"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileCheck, ShieldCheck, Clock, Layers, ArrowRight, ChevronLeft, Filter } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PreviousYearPage() {
  const [selectedExam, setSelectedExam] = useState("cat");

  const pastPapers = [
    {
      id: "cat-2024-s1",
      exam: "cat",
      title: "CAT 2024 Slot 1 (Verified Pattern)",
      desc: "Complete 66-question paper with 40-min sectional locks across VARC, DILR, and QA.",
      questions: 66,
      duration: "120 mins",
      difficulty: "HARD",
      status: "AUTHENTIC",
    },
    {
      id: "cat-2024-s2",
      exam: "cat",
      title: "CAT 2024 Slot 2 (Verified Pattern)",
      desc: "Authentic slot 2 questions including modern algebra quadratics and games/tournaments sets.",
      questions: 66,
      duration: "120 mins",
      difficulty: "HARD",
      status: "AUTHENTIC",
    },
    {
      id: "xat-2024",
      exam: "xat",
      title: "XAT 2024 Official Paper",
      desc: "Complete Part 1 (VALR, Decision Making, QADI) with authentic ethical business dilemmas.",
      questions: 76,
      duration: "175 mins",
      difficulty: "HARD",
      status: "AUTHENTIC",
    },
    {
      id: "snap-2024-t1",
      exam: "snap",
      title: "SNAP 2024 Test 1 Speed Set",
      desc: "60-minute speed drill across General English, Analytical LR, and Quant.",
      questions: 60,
      duration: "60 mins",
      difficulty: "MEDIUM",
      status: "AUTHENTIC",
    },
  ];

  const filtered = pastPapers.filter(
    (p) => selectedExam === "all" || p.exam === selectedExam
  );

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/practice" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Practice Hub</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Previous Year Papers
              </h1>
              <Badge variant="verified">VERIFIED PAST PATTERNS</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Real past question patterns with comprehensive step-by-step solutions and speed shortcuts.
            </p>
          </div>
        </div>

        {/* Exam filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All Papers" },
            { id: "cat", label: "CAT (IIMs)" },
            { id: "xat", label: "XAT (XLRI)" },
            { id: "snap", label: "SNAP (SIU)" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedExam(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedExam === item.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {filtered.map((paper) => (
            <Card
              key={paper.id}
              className="border border-slate-800 bg-[#0e1422] p-5 sm:p-6 hover:border-slate-700 transition-all duration-200 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {paper.title}
                    </h3>
                    <Badge variant="verified" className="text-[10px]">
                      {paper.status}
                    </Badge>
                    <Badge variant="destructive" className="text-[10px]">
                      {paper.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{paper.desc}</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>Questions: <strong className="text-white">{paper.questions}</strong></span>
                    <span>Duration: <strong className="text-white">{paper.duration}</strong></span>
                  </div>
                </div>

                <Link href={`/quiz/${paper.id}`} className="shrink-0">
                  <Button variant="default" size="sm" className="gap-2">
                    <span>Solve Paper</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
