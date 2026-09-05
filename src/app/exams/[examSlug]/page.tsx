"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  Layers,
  Calculator,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  FileCheck2,
  ExternalLink,
  Lock,
  Unlock,
  CheckCircle2,
  HelpCircle,
  Search,
  Zap,
  Target,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BarChart2,
  Check,
  Award,
  Filter,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getExamSyllabus, SyllabusSection, SyllabusSubtopic } from "@/lib/syllabus-data";
import { getCanonicalExamData, CanonicalExamChaptersData } from "@/lib/canonical-chapters";
import { TopicPracticeModal } from "@/components/practice/TopicPracticeModal";

export default function ExamDetailPage({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}) {
  const resolvedParams = use(params);
  const exam = getExamSyllabus(resolvedParams.examSlug);
  const canonicalData = getCanonicalExamData(resolvedParams.examSlug);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"chapters" | "subtopics">("chapters");
  const [syllabusSearch, setSyllabusSearch] = useState("");
  const [filterTaxonomy, setFilterTaxonomy] = useState<"ALL" | "OFFICIAL" | "RECOMMENDED">("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [userProgressMap, setUserProgressMap] = useState<Record<string, any>>({});

  const [practiceModalState, setPracticeModalState] = useState<{
    isOpen: boolean;
    topicName: string;
    topicSlug: string;
    chapterName?: string;
    chapterSlug?: string;
    subtopicName?: string;
    subtopicSlug?: string;
  }>({
    isOpen: false,
    topicName: "",
    topicSlug: "",
  });

  // Fetch chapter progress from API
  useEffect(() => {
    async function loadChapters() {
      try {
        const res = await fetch(`/api/exams/${resolvedParams.examSlug}/chapters`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.sections) {
            const pMap: Record<string, any> = {};
            for (const sec of data.sections) {
              for (const top of sec.topics) {
                for (const ch of top.chapters) {
                  if (ch.userProgress) {
                    pMap[ch.slug] = ch.userProgress;
                  }
                }
              }
            }
            setUserProgressMap(pMap);
          }
        }
      } catch (err) {
        console.error("Could not fetch user chapter progress:", err);
      }
    }
    loadChapters();
  }, [resolvedParams.examSlug]);

  if (!exam) {
    notFound();
  }

  const currentSection = exam.sections[activeSectionIndex] || exam.sections[0];
  const currentCanonicalSection =
    canonicalData?.sections[activeSectionIndex] || canonicalData?.sections[0];

  // Calculate overall syllabus stats
  const allSubtopics: SyllabusSubtopic[] = exam.sections.flatMap((s) =>
    s.topics.flatMap((t) => t.subtopics)
  );
  const totalSubtopics = allSubtopics.length;
  const masteredSubtopics = allSubtopics.filter((st) => st.status === "MASTERED").length;
  const inProgressSubtopics = allSubtopics.filter((st) => st.status === "IN_PROGRESS").length;
  const weakSubtopics = allSubtopics.filter((st) => st.status === "WEAK").length;
  const completionPercentage = Math.round(
    ((masteredSubtopics * 1 + inProgressSubtopics * 0.5) / (totalSubtopics || 1)) * 100
  );

  // Canonical chapters count for this exam
  const allCanonicalChapters = canonicalData
    ? canonicalData.sections.flatMap((s) => s.topics.flatMap((t) => t.chapters))
    : [];
  const officialChapterCount = allCanonicalChapters.filter(
    (c) => c.taxonomyType === "OFFICIAL_SYLLABUS"
  ).length;
  const recommendedChapterCount = allCanonicalChapters.length - officialChapterCount;

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/exams" className="hover:text-white transition-colors">
            Exams Directory
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{exam.examName}</span>
        </div>

        {/* Hero Banner with Authority Badges */}
        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {exam.shortName} ({exam.examName})
                </h1>
                <Badge variant="verified" className="text-xs">
                  OFFICIAL 2026 BLUEPRINT
                </Badge>
                <Badge variant="indigo" className="text-xs">
                  {exam.difficulty}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-indigo-200/90 font-medium mt-1">
                {exam.fullForm} • Conducted by {exam.conductingBody}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {exam.description}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2">
              <a
                href={exam.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <span>Official Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>Total Duration</span>
              </div>
              <p className="text-base font-bold text-white">{exam.durationMinutes} Minutes</p>
              <span className="text-[10px] text-slate-400">
                {exam.sections[0]?.durationMinutes ? "Locked Section Timers" : "Flexible Section Time"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Layers className="h-3.5 w-3.5 text-emerald-400" />
                <span>Canonical Chapters</span>
              </div>
              <p className="text-base font-bold text-white">
                {allCanonicalChapters.length} Chapters Seeded
              </p>
              <span className="text-[10px] text-slate-400">
                {officialChapterCount > 0 ? `${officialChapterCount} Official Syllabus` : ""}
                {officialChapterCount > 0 && recommendedChapterCount > 0 ? " • " : ""}
                {recommendedChapterCount > 0 ? `${recommendedChapterCount} Recommended Prep` : ""}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Target className="h-3.5 w-3.5 text-amber-400" />
                <span>Mastery Progress</span>
              </div>
              <p className="text-base font-bold text-white">{completionPercentage}% Completed</p>
              <span className="text-[10px] text-slate-400">
                {masteredSubtopics} Mastered • {weakSubtopics} Weak
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Calculator className="h-3.5 w-3.5 text-blue-400" />
                <span>Marking Scheme</span>
              </div>
              <p className="text-base font-bold text-white">
                +{exam.sections[0]?.marksPerQuestion || 3} / -{exam.sections[0]?.negativeMarks || 1} Scheme
              </p>
              <span className="text-[10px] text-slate-400">
                {exam.examSlug === "cat" ? "On-Screen Basic Calc" : "Standard Manual"}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            <Link href={`/mocks?exam=${exam.examSlug}`}>
              <Button variant="accent" size="sm" className="gap-2 shadow-lg shadow-indigo-600/20">
                <FileCheck2 className="h-4 w-4" />
                <span>Launch {exam.shortName} Mock Test</span>
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="secondary" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span>Full Practice Bank</span>
              </Button>
            </Link>
            <button
              onClick={() => {
                const firstTopic = currentCanonicalSection?.topics[0];
                const firstChapter = firstTopic?.chapters[0];
                setPracticeModalState({
                  isOpen: true,
                  topicName: firstTopic?.name || currentSection.name,
                  topicSlug: firstTopic?.slug || currentSection.slug,
                  chapterName: firstChapter?.name,
                  chapterSlug: firstChapter?.slug,
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/30 transition-colors cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span>Quick Drill ({currentSection.name.split(" ")[0]})</span>
            </button>
          </div>
        </div>

        {/* Section Tabs & Interactive Syllabus Engine */}
        <div className="space-y-6" id="syllabus">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-400" />
                  <span>Canonical Taxonomy &amp; Chapter Engine</span>
                </h2>
                <Badge variant="verified" className="text-[10px]">
                  V2 Architecture
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Every topic is structured into standardized chapters with canonical taxonomy governance (Official Syllabus vs. Recommended Preparation).
              </p>
            </div>

            {/* View Mode Switcher & Section Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
                <button
                  onClick={() => setViewMode("chapters")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === "chapters"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Canonical Chapters
                </button>
                <button
                  onClick={() => setViewMode("subtopics")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === "subtopics"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Subtopic Units
                </button>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {exam.sections.map((section, idx) => (
                  <button
                    key={section.slug}
                    onClick={() => setActiveSectionIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeSectionIndex === idx
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span>{section.name}</span>
                    <span className="ml-1.5 text-[10px] opacity-80">({section.questionCount}Q)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Taxonomy Governance Explainer Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Taxonomy Governance Standard</h3>
                  <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                    Exam Board Specification
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  <span className="text-emerald-400 font-semibold">Official Syllabus:</span> Formally published syllabus units officially specified by the exam conducting body.
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-indigo-400 font-semibold">Recommended Preparation Taxonomy:</span> Standardized canonical chapters scientifically curated from the past 10 years of tested question blueprints.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>{officialChapterCount} Official</span>
                <span className="text-slate-400 mx-1">|</span>
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                <span>{recommendedChapterCount} Recommended</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search chapters or topics..."
                value={syllabusSearch}
                onChange={(e) => setSyllabusSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-medium">Taxonomy:</span>
                {(["ALL", "OFFICIAL", "RECOMMENDED"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterTaxonomy(t)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      filterTaxonomy === t
                        ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {t === "ALL" ? "All" : t === "OFFICIAL" ? "Official" : "Recommended"}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-medium">Status:</span>
                {(["ALL", "MASTERED", "IN_PROGRESS", "NEEDS_REVISION"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      filterStatus === st
                        ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {st === "ALL" ? "All" : st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: CANONICAL CHAPTERS (V2 ENGINE) */}
          {viewMode === "chapters" && (
            <div className="space-y-4">
              {currentCanonicalSection?.topics.map((topic) => {
                const filteredChapters = topic.chapters.filter((ch) => {
                  const matchesSearch =
                    ch.name.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
                    ch.description.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
                    topic.name.toLowerCase().includes(syllabusSearch.toLowerCase());
                  if (!matchesSearch) return false;

                  if (filterTaxonomy === "OFFICIAL" && ch.taxonomyType !== "OFFICIAL_SYLLABUS") {
                    return false;
                  }
                  if (
                    filterTaxonomy === "RECOMMENDED" &&
                    ch.taxonomyType !== "RECOMMENDED_PREPARATION_TAXONOMY"
                  ) {
                    return false;
                  }

                  const userProg = userProgressMap[ch.slug];
                  const userStatus = userProg?.masteryStatus || "NOT_STARTED";
                  if (filterStatus !== "ALL" && userStatus !== filterStatus) {
                    return false;
                  }

                  return true;
                });

                if (filteredChapters.length === 0) return null;

                return (
                  <Card key={topic.slug} className="bg-slate-900/60 border-slate-800 overflow-hidden">
                    <CardHeader className="bg-slate-950/50 py-3.5 px-5 border-b border-slate-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-bold text-white">
                              {topic.name}
                            </CardTitle>
                            {topic.weightage && (
                              <Badge variant="outline" className="text-[10px] text-indigo-300 border-indigo-500/30">
                                {topic.weightage}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {filteredChapters.length} canonical chapters under {currentSection.name}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setPracticeModalState({
                              isOpen: true,
                              topicName: topic.name,
                              topicSlug: topic.slug,
                            })
                          }
                          className="text-xs text-indigo-400 hover:text-indigo-300 gap-1.5 h-8"
                        >
                          <Zap className="h-3.5 w-3.5" />
                          <span>Practice Full Topic</span>
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 divide-y divide-slate-800/60">
                      {filteredChapters.map((chapter) => {
                        const userProg = userProgressMap[chapter.slug];
                        const masteryStatus = userProg?.masteryStatus || "NOT_STARTED";

                        return (
                          <div
                            key={chapter.slug}
                            className="p-4 sm:p-5 hover:bg-slate-800/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-2 max-w-3xl">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono font-bold text-slate-300">
                                  #{String(chapter.orderIndex).padStart(2, "0")}
                                </span>
                                <h4 className="text-sm sm:text-base font-semibold text-white">
                                  {chapter.name}
                                </h4>
                                {chapter.taxonomyType === "OFFICIAL_SYLLABUS" ? (
                                  <Badge className="bg-emerald-950/80 border-emerald-500/40 text-emerald-300 text-[10px] font-medium">
                                    Official Syllabus
                                  </Badge>
                                ) : (
                                  <Badge className="bg-indigo-950/80 border-indigo-500/40 text-indigo-300 text-[10px] font-medium">
                                    Recommended Prep Taxonomy
                                  </Badge>
                                )}

                                {masteryStatus !== "NOT_STARTED" && (
                                  <Badge
                                    variant={
                                      masteryStatus === "MASTERED"
                                        ? "verified"
                                        : masteryStatus === "NEEDS_REVISION"
                                        ? "warning"
                                        : "indigo"
                                    }
                                    className="text-[10px]"
                                  >
                                    {masteryStatus.replace("_", " ")}
                                  </Badge>
                                )}
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed">
                                {chapter.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                                <div className="flex items-center gap-1 text-slate-300">
                                  <Clock className="h-3 w-3 text-indigo-400" />
                                  <span>15-20 Min Mastery Test</span>
                                </div>
                                <span>•</span>
                                <span>
                                  {userProg?.questionsAttempted
                                    ? `${userProg.questionsAttempted} Qs Attempted (${userProg.accuracyPct}% Accuracy)`
                                    : "Not practiced yet"}
                                </span>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setPracticeModalState({
                                    isOpen: true,
                                    topicName: topic.name,
                                    topicSlug: topic.slug,
                                    chapterName: chapter.name,
                                    chapterSlug: chapter.slug,
                                  })
                                }
                                className="text-xs h-8 gap-1.5 border-slate-800 hover:bg-slate-800"
                              >
                                <Zap className="h-3.5 w-3.5 text-indigo-400" />
                                <span>Practice Drill</span>
                              </Button>

                              <Link
                                href={`/quiz/${chapter.slug}?chapter=${chapter.slug}&exam=${exam.examSlug}&timed=true&test=true&title=${encodeURIComponent(
                                  chapter.name + " Mastery Test"
                                )}`}
                              >
                                <Button
                                  variant="accent"
                                  size="sm"
                                  className="text-xs h-8 gap-1.5 shadow-sm shadow-indigo-600/20"
                                >
                                  <Target className="h-3.5 w-3.5" />
                                  <span>Chapter Test</span>
                                </Button>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: SUBTOPIC UNITS (LEGACY V1 ENGINE) */}
          {viewMode === "subtopics" && (
            <div className="space-y-4">
              {currentSection.topics.map((topic) => {
                const filteredSubtopics = topic.subtopics.filter((st) => {
                  const matchesSearch =
                    st.name.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
                    topic.name.toLowerCase().includes(syllabusSearch.toLowerCase());
                  if (!matchesSearch) return false;
                  if (filterStatus === "ALL") return true;
                  return st.status === filterStatus;
                });

                if (filteredSubtopics.length === 0) return null;

                return (
                  <Card key={topic.slug} className="bg-slate-900/60 border-slate-800 overflow-hidden">
                    <CardHeader className="bg-slate-950/40 py-3 px-5 border-b border-slate-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-bold text-white">
                              {topic.name}
                            </CardTitle>
                            {topic.weightage && (
                              <Badge variant="outline" className="text-[10px] text-indigo-300 border-indigo-500/30">
                                {topic.weightage}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {filteredSubtopics.length} subtopic units curated for {exam.shortName}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setPracticeModalState({
                              isOpen: true,
                              topicName: topic.name,
                              topicSlug: topic.slug,
                            })
                          }
                          className="text-xs text-indigo-400 hover:text-indigo-300 gap-1.5 h-8"
                        >
                          <Zap className="h-3.5 w-3.5" />
                          <span>Practice Full Topic</span>
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 divide-y divide-slate-800/60">
                      {filteredSubtopics.map((subtopic) => (
                        <div
                          key={subtopic.slug}
                          className="p-4 hover:bg-slate-800/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-200">
                                {subtopic.name}
                              </span>
                              <Badge
                                variant={
                                  subtopic.status === "MASTERED"
                                    ? "verified"
                                    : subtopic.status === "WEAK"
                                    ? "warning"
                                    : "indigo"
                                }
                                className="text-[10px]"
                              >
                                {subtopic.status ? subtopic.status.replace("_", " ") : "READY"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <span>Accuracy: {subtopic.accuracy || 75}%</span>
                              <span>•</span>
                              <span>
                                Concepts: {subtopic.completedCount || 3}/{subtopic.conceptsCount || 4}
                              </span>
                            </div>
                          </div>

                          {/* Action buttons for subtopic */}
                          <div className="flex items-center gap-2 shrink-0">
                            <Link href={`/learn/${currentSection.slug}/${subtopic.slug}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-8 gap-1.5 border-slate-800 hover:bg-slate-800"
                              >
                                <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                                <span>Concepts</span>
                              </Button>
                            </Link>

                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() =>
                                setPracticeModalState({
                                  isOpen: true,
                                  topicName: topic.name,
                                  topicSlug: topic.slug,
                                  subtopicName: subtopic.name,
                                  subtopicSlug: subtopic.slug,
                                })
                              }
                              className="text-xs h-8 gap-1.5 shadow-sm shadow-indigo-600/20"
                            >
                              <Target className="h-3.5 w-3.5" />
                              <span>Practice</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Practice Modal */}
        <TopicPracticeModal
          isOpen={practiceModalState.isOpen}
          onClose={() =>
            setPracticeModalState((prev) => ({ ...prev, isOpen: false }))
          }
          topicName={practiceModalState.topicName}
          topicSlug={practiceModalState.topicSlug}
          chapterName={practiceModalState.chapterName}
          chapterSlug={practiceModalState.chapterSlug}
          subtopicName={practiceModalState.subtopicName}
          subtopicSlug={practiceModalState.subtopicSlug}
          examSlug={exam.examSlug}
        />
      </div>
    </AppShell>
  );
}
