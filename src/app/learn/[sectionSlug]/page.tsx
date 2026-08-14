"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  ChevronRight,
  Sparkles,
  BarChart2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TRACK_TOPICS_DATA: Record<
  string,
  {
    title: string;
    description: string;
    topics: {
      slug: string;
      name: string;
      subdomain: string;
      conceptsCount: number;
      completedCount: number;
      accuracy: number;
      status: "MASTERED" | "IN_PROGRESS" | "WEAK" | "NOT_STARTED";
      weightage: string;
      subtopics: string[];
    }[];
  }
> = {
  quant: {
    title: "Quantitative Aptitude",
    description:
      "Core mathematical topics ranging from foundational arithmetic to advanced geometric theorems and modern algebra.",
    topics: [
      {
        slug: "time-speed-distance",
        name: "Time, Speed & Distance",
        subdomain: "Arithmetic",
        conceptsCount: 6,
        completedCount: 4,
        accuracy: 76,
        status: "IN_PROGRESS",
        weightage: "8-10% of QA",
        subtopics: ["Relative Speed & Trains", "Races & Circular Tracks", "Boats & Streams", "Average Speed"],
      },
      {
        slug: "time-work",
        name: "Time & Work",
        subdomain: "Arithmetic",
        conceptsCount: 5,
        completedCount: 3,
        accuracy: 48,
        status: "WEAK",
        weightage: "8-10% of QA",
        subtopics: ["LCM Units & Man-Days", "Pipes & Cisterns", "Alternating Days Work", "Efficiency Ratios"],
      },
      {
        slug: "percentages",
        name: "Percentages & Profit-Loss",
        subdomain: "Arithmetic",
        conceptsCount: 7,
        completedCount: 5,
        accuracy: 82,
        status: "MASTERED",
        weightage: "10-12% of QA",
        subtopics: ["Successive % Changes", "Dishonest Merchant Faulty Balances", "Simple & Compound Interest", "Installments"],
      },
      {
        slug: "quadratic-equations",
        name: "Quadratic Equations & Algebra",
        subdomain: "Algebra",
        conceptsCount: 6,
        completedCount: 4,
        accuracy: 70,
        status: "IN_PROGRESS",
        weightage: "12-15% of QA",
        subtopics: ["Vieta Roots & Discriminant", "Inequalities & Wavy Curve", "Maxima & Minima", "Functions & Graphs"],
      },
      {
        slug: "triangles-circles",
        name: "Geometry & Mensuration",
        subdomain: "Geometry",
        conceptsCount: 8,
        completedCount: 5,
        accuracy: 65,
        status: "IN_PROGRESS",
        weightage: "12-14% of QA",
        subtopics: ["Similarity & Congruence", "Circle Tangents & Chords", "Apollonius Theorem", "3D Solid Mensuration"],
      },
    ],
  },
  dilr: {
    title: "Data Interpretation & Logical Reasoning",
    description:
      "Analytical puzzles, seating arrangements, matrix matching, and tabular graph interpretation sets.",
    topics: [
      {
        slug: "arrangements",
        name: "Linear & Circular Arrangements",
        subdomain: "Logical Reasoning",
        conceptsCount: 5,
        completedCount: 3,
        accuracy: 53,
        status: "WEAK",
        weightage: "25% of DILR",
        subtopics: ["Facing In/Out Arrangements", "Multi-Attribute Matrix", "Conditional Team Selection"],
      },
      {
        slug: "tournaments",
        name: "Games & Tournaments",
        subdomain: "Logical Reasoning",
        conceptsCount: 4,
        completedCount: 3,
        accuracy: 78,
        status: "IN_PROGRESS",
        weightage: "25% of DILR",
        subtopics: ["Round-Robin Deduction", "Knockout Bracket Math", "Points Table Invariants"],
      },
      {
        slug: "tables-caselets",
        name: "Missing Data Tables & Caselets",
        subdomain: "Data Interpretation",
        conceptsCount: 6,
        completedCount: 4,
        accuracy: 68,
        status: "IN_PROGRESS",
        weightage: "25% of DILR",
        subtopics: ["Matrix Reconstruction", "Dual Pie Chart Intersections", "Data Sufficiency"],
      },
    ],
  },
  varc: {
    title: "Verbal Ability & Reading Comprehension",
    description:
      "Passage comprehension, central idea identification, critical inferences, and verbal coherence sets.",
    topics: [
      {
        slug: "reading-comprehension",
        name: "Reading Comprehension Mastery",
        subdomain: "Reading Comprehension",
        conceptsCount: 8,
        completedCount: 6,
        accuracy: 74,
        status: "IN_PROGRESS",
        weightage: "66% of VARC",
        subtopics: ["Central Thesis Extraction", "Tone & Attitude Spectrum", "Direct & Indirect Inferences", "Fact vs Opinion"],
      },
      {
        slug: "para-jumbles",
        name: "Para Jumbles & Coherence",
        subdomain: "Verbal Ability",
        conceptsCount: 4,
        completedCount: 2,
        accuracy: 57,
        status: "WEAK",
        weightage: "18% of VARC",
        subtopics: ["Mandatory Pairs & Pronouns", "Acronym Chronology", "TITA Sequencing Hacks"],
      },
      {
        slug: "para-summary",
        name: "Para Summary & Odd Sentence",
        subdomain: "Verbal Ability",
        conceptsCount: 4,
        completedCount: 3,
        accuracy: 80,
        status: "MASTERED",
        weightage: "16% of VARC",
        subtopics: ["Distortion Avoidance", "Over-generalization Traps", "Central Thread Tracking"],
      },
    ],
  },
  special: {
    title: "Exam-Specific Subjects",
    description:
      "Targeted modules for XAT Decision Making, CMAT Innovation, MAT Economy, and MAH CET Abstract Reasoning.",
    topics: [
      {
        slug: "xat-dm",
        name: "XAT Decision Making",
        subdomain: "XAT Specialist",
        conceptsCount: 5,
        completedCount: 3,
        accuracy: 64,
        status: "IN_PROGRESS",
        weightage: "100% of XAT DM",
        subtopics: ["Ethical Dilemmas & Fiduciary Duty", "Business Strategy Cases", "HR Conflict Mediation"],
      },
      {
        slug: "cmat-innovation",
        name: "CMAT Innovation & Entrepreneurship",
        subdomain: "CMAT Specialist",
        conceptsCount: 4,
        completedCount: 2,
        accuracy: 70,
        status: "IN_PROGRESS",
        weightage: "20% of CMAT",
        subtopics: ["Venture Capital & Cap Tables", "Lean Startup & MVP", "Intellectual Property & Patents"],
      },
    ],
  },
};

export default function SectionDetailPage({
  params,
}: {
  params: Promise<{ sectionSlug: string }>;
}) {
  const resolvedParams = use(params);
  const track = TRACK_TOPICS_DATA[resolvedParams.sectionSlug];

  if (!track) {
    notFound();
  }

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/learn" className="hover:text-white transition-colors">
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{track.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {track.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {track.description}
            </p>
          </div>
        </div>

        {/* Topic List Cards */}
        <div className="space-y-4">
          {track.topics.map((topic) => {
            const completionPct = Math.round(
              (topic.completedCount / topic.conceptsCount) * 100
            );

            return (
              <Card
                key={topic.slug}
                className="border border-slate-800 bg-[#0e1422] p-5 sm:p-6 hover:border-slate-700 transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Info & Subtopics */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {topic.name}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                        {topic.subdomain}
                      </span>
                      {topic.status === "WEAK" ? (
                        <Badge variant="destructive" className="text-[10px]">
                          WEAK AREA ({topic.accuracy}%)
                        </Badge>
                      ) : topic.status === "MASTERED" ? (
                        <Badge variant="success" className="text-[10px]">
                          MASTERED ({topic.accuracy}%)
                        </Badge>
                      ) : (
                        <Badge variant="indigo" className="text-[10px]">
                          IN PROGRESS ({topic.accuracy}%)
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {topic.subtopics.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800/80"
                        >
                          • {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Progress & Action */}
                  <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4 shrink-0 lg:w-56 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                    <div className="w-full space-y-1.5 text-right">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-mono font-bold text-white">
                          {topic.completedCount} / {topic.conceptsCount} Concepts
                        </span>
                      </div>
                      <Progress value={completionPct} className="h-2" />
                    </div>

                    <Link href={`/learn/${resolvedParams.sectionSlug}/${topic.slug}`} className="w-full sm:w-auto lg:w-full">
                      <Button variant="default" size="sm" className="w-full justify-center gap-1.5">
                        <span>Learn Concepts</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
