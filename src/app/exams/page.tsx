"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Clock,
  Layers,
  Award,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Filter,
  CheckCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INITIAL_EXAMS_DATA } from "@/lib/seed-data";

export default function ExamsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "national" | "speed" | "adaptive">("all");

  const filteredExams = INITIAL_EXAMS_DATA.filter((exam) => {
    const matchesSearch =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === "all") return true;
    if (filterType === "national") return ["cat", "xat", "cmat"].includes(exam.slug);
    if (filterType === "speed") return ["snap", "mah-cet", "mat"].includes(exam.slug);
    if (filterType === "adaptive") return ["nmat"].includes(exam.slug);
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-200">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Official Exam Directory
              </h1>
              <Badge variant="verified">100% VERIFIED BLUEPRINTS</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Authoritative structure, duration, marking schemes, and preparation taxonomies derived from convening body gazettes.
            </p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by exam name or conducting body..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All 7 Exams
            </button>
            <button
              onClick={() => setFilterType("national")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "national"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Tier-1 National (CAT / XAT / CMAT)
            </button>
            <button
              onClick={() => setFilterType("speed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "speed"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              High-Speed Precision (SNAP / CET / MAT)
            </button>
            <button
              onClick={() => setFilterType("adaptive")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === "adaptive"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Computer-Adaptive (NMAT)
            </button>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card
              key={exam.slug}
              className="border border-slate-800 bg-[#0e1422] flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
            >
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {exam.shortName}
                      </CardTitle>
                      <Badge variant="verified" className="text-[10px]">
                        {exam.version.verificationStatus}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-slate-400 mt-0.5">
                      {exam.name}
                    </CardDescription>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {exam.conductingBody}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {exam.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                {/* Structural Specs */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center font-mono">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-sans">Duration</p>
                    <p className="text-xs font-bold text-white">{exam.version.totalDurationMinutes}m</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-sans">Questions</p>
                    <p className="text-xs font-bold text-white">{exam.version.totalQuestions} Qs</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-sans">Marks</p>
                    <p className="text-xs font-bold text-white">{exam.version.totalMarks}</p>
                  </div>
                </div>

                {/* Section breakdown tags */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Official Sections ({exam.sections.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.sections.map((sec) => (
                      <span
                        key={sec.slug}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {sec.name} ({sec.questionCount}Q)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  >
                    <span>Full Blueprint & Syllabus</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                    title="Official Authority Portal"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
