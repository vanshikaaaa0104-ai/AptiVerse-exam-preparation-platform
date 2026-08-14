"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Clock,
  Layers,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
  Filter,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MockTestsCatalogPage() {
  const [filterType, setFilterType] = useState<"ALL" | "FULL" | "SECTIONAL">("ALL");
  const [selectedExam, setSelectedExam] = useState("all");

  const mockTests = [
    {
      id: "cat-2026-national-full-mock-01",
      title: "CAT 2026 National Full Mock #01",
      exam: "cat",
      examName: "CAT 2026",
      isFullMock: true,
      durationMin: 120,
      questions: 66,
      marks: 198,
      status: "LIVE",
      sections: "VARC (24Q) • DILR (20Q) • QA (22Q)",
      desc: "Official 120-minute simulation with 3 locked 40-minute sections. Standard +3 / -1 marking scheme.",
      percentileTarget: "99.2 %ile Benchmark: ~94 Marks",
    },
    {
      id: "xat-2026-comprehensive-simulator-01",
      title: "XAT 2026 Comprehensive Simulator #01",
      exam: "xat",
      examName: "XAT 2026",
      isFullMock: true,
      durationMin: 205,
      questions: 101,
      marks: 101,
      status: "LIVE",
      sections: "VALR (26Q) • DM (22Q) • QADI (28Q) • GK (25Q)",
      desc: "Full Part 1 + Part 2 simulation with -0.10 unattempted question penalty deduction beyond 8 skips.",
      percentileTarget: "99.0 %ile Benchmark: ~42 Marks",
    },
    {
      id: "snap-2026-speed-sprint-01",
      title: "SNAP 2026 Speed Sprint Mock #01",
      exam: "snap",
      examName: "SNAP 2026",
      isFullMock: true,
      durationMin: 60,
      questions: 60,
      marks: 60,
      status: "LIVE",
      sections: "English (15Q) • Analytical LR (25Q) • Quant/DI (20Q)",
      desc: "60-minute high-speed precision test. Free navigation across all 3 sections. +1 / -0.25 marking.",
      percentileTarget: "99.0 %ile Benchmark: ~44 Marks",
    },
    {
      id: "cat-qa-sectional-01",
      title: "CAT Quantitative Aptitude Sectional #01",
      exam: "cat",
      examName: "CAT 2026",
      isFullMock: false,
      durationMin: 40,
      questions: 22,
      marks: 66,
      status: "LIVE",
      sections: "Arithmetic (9Q) • Algebra (7Q) • Geometry (4Q) • Modern Math (2Q)",
      desc: "Strict 40-minute sectional speed test calibrated to official CAT QA difficulty and TITA questions.",
      percentileTarget: "99.0 %ile Benchmark: ~38 Marks",
    },
    {
      id: "cat-dilr-sectional-01",
      title: "CAT DILR Sectional Simulator #01",
      exam: "cat",
      examName: "CAT 2026",
      isFullMock: false,
      durationMin: 40,
      questions: 20,
      marks: 60,
      status: "LIVE",
      sections: "4 Sets of 5 Questions each (2 DI + 2 LR)",
      desc: "40-minute DILR test featuring round-robin tournament brackets and matrix constraint tables.",
      percentileTarget: "99.0 %ile Benchmark: ~32 Marks",
    },
    {
      id: "xat-dm-sectional-01",
      title: "XAT Decision Making Sectional #01",
      exam: "xat",
      examName: "XAT 2026",
      isFullMock: false,
      durationMin: 45,
      questions: 22,
      marks: 22,
      status: "LIVE",
      sections: "Ethical Dilemmas • Business Strategy Cases",
      desc: "45-minute specialist drill with multi-stakeholder business tradeoff caselets.",
      percentileTarget: "99.0 %ile Benchmark: ~14 Marks",
    },
  ];

  const filteredMocks = mockTests.filter((mock) => {
    if (selectedExam !== "all" && mock.exam !== selectedExam) return false;
    if (filterType === "FULL" && !mock.isFullMock) return false;
    if (filterType === "SECTIONAL" && mock.isFullMock) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                National Mock Test Series
              </h1>
              <Badge variant="verified">EXAM SIMULATOR</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-fidelity exam environments with locked sectional timings, official marking schemes, and scaled percentile predictions.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(["ALL", "FULL", "SECTIONAL"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === type
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {type === "ALL" ? "All Mock Tests" : type === "FULL" ? "Full-Length Mocks" : "Sectional Tests"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Exams" },
              { id: "cat", label: "CAT 2026" },
              { id: "xat", label: "XAT 2026" },
              { id: "snap", label: "SNAP 2026" },
            ].map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedExam(e.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedExam === e.id
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mock Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMocks.map((mock) => (
            <Card
              key={mock.id}
              className="border border-slate-800 bg-[#0e1422] p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="indigo" className="text-[10px]">
                        {mock.examName}
                      </Badge>
                      <Badge variant="success" className="text-[10px]">
                        {mock.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {mock.title}
                    </CardTitle>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{mock.desc}</p>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                  <p className="text-[10px] text-slate-400 font-sans uppercase">Sectional Structure</p>
                  <p className="font-semibold text-white mt-0.5">{mock.sections}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-sans uppercase">Duration</p>
                    <p className="font-bold text-white">{mock.durationMin}m</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-sans uppercase">Questions</p>
                    <p className="font-bold text-white">{mock.questions} Qs</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-sans uppercase">Marks</p>
                    <p className="font-bold text-white">{mock.marks}</p>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" />
                  <span>{mock.percentileTarget}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <Link href={`/mocks/${mock.id}/instructions`} className="w-full">
                  <Button variant="default" className="w-full justify-between group">
                    <span>Read Instructions & Attempt</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
