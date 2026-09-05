"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Target,
  FileCheck2,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const supportedExams = [
    {
      slug: "cat",
      name: "CAT 2026",
      fullName: "Common Admission Test",
      authority: "IIMs",
      duration: "120 Mins",
      questions: "66 Qs",
      patternStatus: "VERIFIED",
      accent: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30",
      description: "3 strictly locked 40-min sections: VARC, DILR, QA. +3 / -1 marking scheme.",
    },
    {
      slug: "xat",
      name: "XAT 2026",
      fullName: "Xavier Aptitude Test",
      authority: "XLRI Jamshedpur",
      duration: "175 + 30 Mins",
      questions: "76 + 25 Qs",
      patternStatus: "VERIFIED",
      accent: "from-purple-500/20 to-indigo-500/10 border-purple-500/30",
      description: "VALR, Decision Making, QA-DI, GK & Essay. Unattempted penalty deduction beyond 8 skips.",
    },
    {
      slug: "snap",
      name: "SNAP 2026",
      fullName: "Symbiosis National Aptitude Test",
      authority: "SIU",
      duration: "60 Mins",
      questions: "60 Qs",
      patternStatus: "VERIFIED",
      accent: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
      description: "High-speed 60-minute test across General English, Analytical LR, and Quant/DI.",
    },
    {
      slug: "nmat",
      name: "NMAT by GMAC",
      fullName: "NMAT Official Assessment",
      authority: "GMAC",
      duration: "120 Mins",
      questions: "108 Qs",
      patternStatus: "VERIFIED",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
      description: "Candidate chooses section order. 3 locked sections, +3/0 no negative marking.",
    },
    {
      slug: "cmat",
      name: "CMAT 2026",
      fullName: "Common Management Admission Test",
      authority: "NTA",
      duration: "180 Mins",
      questions: "100 Qs",
      patternStatus: "VERIFIED",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
      description: "5 sections including Innovation & Entrepreneurship and General Awareness. +4 / -1.",
    },
    {
      slug: "mat",
      name: "MAT 2026",
      fullName: "Management Aptitude Test",
      authority: "AIMA",
      duration: "120 Mins",
      questions: "150 Qs",
      patternStatus: "VERIFIED",
      accent: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
      description: "150 questions across 5 sections including Economic & Business Environment.",
    },
    {
      slug: "mah-cet",
      name: "MAH MBA CET",
      fullName: "Maharashtra MBA/MMS CET",
      authority: "State CET Cell",
      duration: "150 Mins",
      questions: "200 Qs",
      patternStatus: "VERIFIED",
      accent: "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
      description: "200 speed questions with Abstract/Visual Reasoning and zero negative marking.",
    },
  ];

  const methodologySteps = [
    {
      step: "01",
      title: "Canonical Concepts",
      desc: "Learn core concepts once in a unified knowledge graph. Theory, LaTeX formulas, and common traps tailored to your target exam.",
      icon: BookOpen,
      color: "text-indigo-400",
    },
    {
      step: "02",
      title: "Adaptive Practice",
      desc: "Solve verified questions with zero client answer leakage. Instant 5-state palette telemetry and resilient timer.",
      icon: Target,
      color: "text-blue-400",
    },
    {
      step: "03",
      title: "4-Part Solutions",
      desc: "Every question includes Detailed Proof, Speed Shortcut, Concept Tested, and Common Distractor Pitfalls.",
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
    {
      step: "04",
      title: "Next Best Action",
      desc: "Our deterministic engine pinpoints your $<60\%$ accuracy areas and serves targeted 10-minute remediation drills.",
      icon: Sparkles,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-[#080c14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">AptiVerse</span>
              <Badge variant="indigo" className="text-[10px] px-1.5 py-0">SaaS</Badge>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#exams" className="hover:text-white transition-colors">Exams</Link>
            <Link href="#methodology" className="hover:text-white transition-colors">Methodology</Link>
            <Link href="#features" className="hover:text-white transition-colors">Platform Features</Link>
            <Link href="/learn" className="hover:text-white transition-colors">Curriculum</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="accent" size="sm" className="gap-1.5">
                <span>Enter Platform</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>The Operating System for Management Entrance Exams</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            PREPARE SMARTER. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-300 bg-clip-text text-transparent">
              SCORE BETTER.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            One intelligent preparation platform for <span className="text-white font-medium">CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH CET</span> and beyond. Master concepts, conquer weak areas with adaptive drills, and simulate real exam conditions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="accent" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6">
                <span>Start Preparing Now</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#exams" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6">
                <span>Explore Official Blueprints</span>
              </Button>
            </Link>
          </div>

          {/* Trust points */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Verified Exam Blueprints</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-400" />
              <span>Zero Client Answer Leakage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Unified Canonical Knowledge Graph</span>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Exams Catalog */}
      <section id="exams" className="py-16 border-t border-slate-800/80 bg-[#0b0f19]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="indigo">Official Exam Coverage</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Built for Every Premier Entrance Exam
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Every exam simulator is calibrated to its latest official authority notifications, sectional timing constraints, and scoring rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportedExams.map((exam) => (
              <Card
                key={exam.slug}
                className={`border bg-gradient-to-b ${exam.accent} hover:border-slate-600 transition-all duration-200 group flex flex-col justify-between`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{exam.name}</span>
                        <Badge variant="verified" className="text-[10px]">
                          {exam.patternStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{exam.fullName}</p>
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-1 rounded bg-slate-900/80 text-slate-300 border border-slate-700">
                      {exam.authority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exam.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-indigo-400" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-blue-400" />
                      <span>{exam.questions}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                    >
                      <span>View Blueprint & Syllabus</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The AptiVerse Learning Loop */}
      <section id="methodology" className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="success">The Pedagogical Loop</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              How AptiVerse Accelerates Your Mastery
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              A continuous, data-driven cycle engineered to convert your weak areas into reliable scoring strengths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step) => (
              <Card key={step.step} className="border border-slate-800 bg-[#0e1422]/70 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-slate-700">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 border-t border-slate-800/80 bg-gradient-to-b from-[#0b0f19] to-[#080c14]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to experience a modern preparation system?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Jump directly into your dashboard, set your daily goals, and start practicing with verified questions.
          </p>
          <div>
            <Link href="/dashboard">
              <Button variant="accent" size="lg" className="gap-2 px-8 py-6 text-base shadow-xl shadow-indigo-600/20">
                <span>Enter AptiVerse Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-400">
        <p>© 2026 AptiVerse Preparation Platform. Built for academic excellence.</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Exam names, trademarks, and convening body designations (CAT/IIMs, XAT/XLRI, SNAP/SIU, NMAT/GMAC, CMAT/NTA, MAT/AIMA, CET) belong to their respective authorities and are used strictly for reference purposes.
        </p>
      </footer>
    </div>
  );
}
