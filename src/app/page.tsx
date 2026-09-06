"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Target,
  FileCheck2,
  Flame,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
      accent: "from-indigo-500/10 dark:from-indigo-500/20 to-blue-500/5 dark:to-blue-500/10",
      borderGlow: "hover:shadow-indigo-500/15",
      description: "3 strictly locked 40-min sections: VARC, DILR, QA. +3 / -1 marking scheme.",
      featured: true,
    },
    {
      slug: "xat",
      name: "XAT 2026",
      fullName: "Xavier Aptitude Test",
      authority: "XLRI Jamshedpur",
      duration: "175 + 30 Mins",
      questions: "76 + 25 Qs",
      patternStatus: "VERIFIED",
      accent: "from-purple-500/10 dark:from-purple-500/20 to-indigo-500/5 dark:to-indigo-500/10",
      borderGlow: "hover:shadow-purple-500/15",
      description: "VALR, Decision Making, QA-DI, GK & Essay. Unattempted penalty deduction beyond 8 skips.",
      featured: true,
    },
    {
      slug: "snap",
      name: "SNAP 2026",
      fullName: "Symbiosis National Aptitude Test",
      authority: "SIU",
      duration: "60 Mins",
      questions: "60 Qs",
      patternStatus: "VERIFIED",
      accent: "from-blue-500/10 dark:from-blue-500/20 to-cyan-500/5 dark:to-cyan-500/10",
      borderGlow: "hover:shadow-blue-500/15",
      description: "High-speed 60-minute test across General English, Analytical LR, and Quant/DI.",
      featured: false,
    },
    {
      slug: "nmat",
      name: "NMAT by GMAC",
      fullName: "NMAT Official Assessment",
      authority: "GMAC",
      duration: "120 Mins",
      questions: "108 Qs",
      patternStatus: "VERIFIED",
      accent: "from-emerald-500/10 dark:from-emerald-500/20 to-teal-500/5 dark:to-teal-500/10",
      borderGlow: "hover:shadow-emerald-500/15",
      description: "Candidate chooses section order. 3 locked sections, +3/0 no negative marking.",
      featured: false,
    },
    {
      slug: "cmat",
      name: "CMAT 2026",
      fullName: "Common Management Admission Test",
      authority: "NTA",
      duration: "180 Mins",
      questions: "100 Qs",
      patternStatus: "VERIFIED",
      accent: "from-amber-500/10 dark:from-amber-500/20 to-orange-500/5 dark:to-orange-500/10",
      borderGlow: "hover:shadow-amber-500/15",
      description: "5 sections including Innovation & Entrepreneurship and General Awareness. +4 / -1.",
      featured: false,
    },
    {
      slug: "gmat",
      name: "GMAT Focus",
      fullName: "Graduate Management Admission Test",
      authority: "GMAC",
      duration: "135 Mins",
      questions: "64 Qs",
      patternStatus: "VERIFIED",
      accent: "from-violet-500/10 dark:from-violet-500/20 to-purple-500/5 dark:to-purple-500/10",
      borderGlow: "hover:shadow-violet-500/15",
      description: "3 sections: Quant, Verbal, Data Insights. Adaptive difficulty engine with question review/edit.",
      featured: false,
    },
  ];

  const methodologySteps = [
    {
      step: "01",
      title: "Master Concepts First",
      desc: "Comprehensive 216-chapter curriculum with core derivations, shortcut formulas, and distractor traps.",
      icon: BookOpen,
      color: "text-indigo-600 dark:text-indigo-400",
      glow: "shadow-indigo-500/20",
    },
    {
      step: "02",
      title: "Adaptive Practice",
      desc: "Solve verified questions with zero client answer leakage. Instant 5-state palette telemetry and resilient timer.",
      icon: Target,
      color: "text-blue-600 dark:text-blue-400",
      glow: "shadow-blue-500/20",
    },
    {
      step: "03",
      title: "4-Part Solutions",
      desc: "Every question includes Detailed Proof, Speed Shortcut, Concept Tested, and Common Distractor Pitfalls.",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
    {
      step: "04",
      title: "Next Best Action",
      desc: "Our deterministic engine pinpoints your <60% accuracy areas and serves targeted 10-minute remediation drills.",
      icon: Sparkles,
      color: "text-amber-600 dark:text-amber-400",
      glow: "shadow-amber-500/20",
    },
  ];

  const platformStats = [
    { label: "Verified Questions", value: "5,000+", icon: Target },
    { label: "Exam Blueprints", value: "8", icon: FileCheck2 },
    { label: "Canonical Chapters", value: "216", icon: BookOpen },
    { label: "Active Aspirants", value: "12K+", icon: Flame },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-200 selection:bg-indigo-500 selection:text-white overflow-hidden relative">
      {/* Navigation Header — Glassmorphic */}
      <header className="glass-topbar sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">AptiVerse</span>
              <Badge variant="indigo" className="text-[10px] px-1.5 py-0">SaaS</Badge>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Link href="#exams" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Exams</Link>
            <Link href="#methodology" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Methodology</Link>
            <Link href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Platform Features</Link>
            <Link href="/learn" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Curriculum</Link>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-slate-800 dark:text-slate-200 font-semibold">Sign In</Button>
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

      {/* Hero Section — Glassmorphic with Ambient Orbs */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden">
        {/* Ambient floating orbs */}
        <div className="ambient-orb ambient-orb-indigo w-[520px] h-[520px] top-[-10%] left-[15%] opacity-80 dark:opacity-50" />
        <div className="ambient-orb ambient-orb-blue w-[420px] h-[420px] top-[20%] right-[8%] opacity-70 dark:opacity-40" />
        <div className="ambient-orb ambient-orb-purple w-[380px] h-[380px] bottom-[-5%] left-[5%] opacity-65 dark:opacity-40" />
        <div className="ambient-orb ambient-orb-rose w-[320px] h-[320px] top-[40%] right-[30%] opacity-60 dark:opacity-35" />
        <div className="ambient-orb ambient-orb-teal w-[300px] h-[300px] bottom-[10%] right-[20%] opacity-55 dark:opacity-30" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>The Operating System for Management Entrance Exams</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            PREPARE SMARTER. <br />
            <span className="gradient-text-animated">
              SCORE BETTER.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            One intelligent preparation platform for <span className="text-slate-900 dark:text-white font-bold">CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH CET</span> and beyond. Master concepts, conquer weak areas with adaptive drills, and simulate real exam conditions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="accent" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 shadow-lg shadow-indigo-500/25">
                <span>Start Preparing Now</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#exams" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6">
                <span>Explore Official Blueprints</span>
              </Button>
            </Link>
          </div>

          {/* Trust points in glass pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-800 dark:text-slate-200 font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Verified Exam Blueprints</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Zero Client Answer Leakage</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle">
              <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Unified Canonical Knowledge Graph</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats — Neumorphic Pods */}
      <section className="py-8 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((stat) => (
              <div key={stat.label} className="neu-stat p-5 text-center space-y-2">
                <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{stat.value}</p>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Exams — Bento Grid with Glass Cards */}
      <section id="exams" className="py-20 relative">
        <div className="ambient-orb ambient-orb-indigo w-[400px] h-[400px] top-[10%] right-[-5%]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <Badge variant="indigo">Official Exam Coverage</Badge>
            <h2 className="text-3xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
              Built for Every Premier Entrance Exam
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto">
              Every exam simulator is calibrated to its latest official authority notifications, sectional timing constraints, and scoring rules.
            </p>
          </div>

          {/* Bento Grid: Featured exams span wider */}
          <div className="bento-grid">
            {supportedExams.map((exam) => (
              <Card
                key={exam.slug}
                className={`${exam.featured ? "bento-half" : "bento-third"} group flex flex-col justify-between bg-gradient-to-b ${exam.accent} hover:shadow-xl ${exam.borderGlow} transition-all duration-300`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-heading text-slate-900 dark:text-white">{exam.name}</span>
                        <Badge variant="verified" className="text-[10px]">
                          {exam.patternStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{exam.fullName}</p>
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-1 rounded-lg glass-subtle text-slate-800 dark:text-slate-200">
                      {exam.authority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {exam.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 dark:border-white/[0.06] text-xs font-mono text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{exam.questions}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors"
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

      {/* The AptiVerse Learning Loop — Neumorphic Step Cards */}
      <section id="methodology" className="py-20 relative">
        <div className="ambient-orb ambient-orb-blue w-[350px] h-[350px] bottom-[10%] left-[-5%]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <Badge variant="success">The Pedagogical Loop</Badge>
            <h2 className="text-3xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">
              How AptiVerse Accelerates Your Mastery
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto">
              A continuous, data-driven cycle engineered to convert your weak areas into reliable scoring strengths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step) => (
              <div key={step.step} className="glass-card rounded-2xl p-6 space-y-4 group hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className={`neu-icon ${step.color} ${step.glow}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-slate-400/50 dark:text-white/[0.12] group-hover:text-slate-700/60 dark:group-hover:text-white/[0.2] transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold font-heading text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner — Glass Panel */}
      <section className="py-20 relative">
        <div className="ambient-orb ambient-orb-purple w-[400px] h-[400px] top-[20%] left-[30%]" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="glass-card rounded-3xl p-10 sm:p-14 text-center space-y-6" style={{ animation: "glow-border 4s ease-in-out infinite" }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Ready to experience a modern preparation system?
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-200 max-w-xl mx-auto leading-relaxed">
              Jump directly into your dashboard, set your daily goals, and start practicing with verified questions.
            </p>
            <div className="pt-2">
              <Link href="/dashboard">
                <Button variant="accent" size="lg" className="gap-2 px-8 py-6 text-base shadow-xl shadow-indigo-600/25">
                  <span>Enter AptiVerse Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-white/[0.06] py-8 text-center text-xs text-slate-700 dark:text-slate-300">
        <p>© 2026 AptiVerse Preparation Platform. Built for academic excellence.</p>
        <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
          Exam names, trademarks, and convening body designations (CAT/IIMs, XAT/XLRI, SNAP/SIU, NMAT/GMAC, CMAT/NTA, MAT/AIMA, CET) belong to their respective authorities and are used strictly for reference purposes.
        </p>
      </footer>
    </div>
  );
}
