"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Target,
  Users,
  Layers,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Plus,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminOverviewPage() {
  const stats = [
    { label: "Total Question Bank", value: "1,240", change: "+45 this week", icon: Target, color: "text-indigo-400" },
    { label: "Verification Queue", value: "12 Pending", change: "4 Drafts • 8 In Review", icon: FileCheck2, color: "text-amber-400" },
    { label: "Active Full Mocks", value: "14 Live", change: "CAT / XAT / SNAP", icon: Sparkles, color: "text-emerald-400" },
    { label: "Registered Aspirants", value: "3,820", change: "+240 this month", icon: Users, color: "text-blue-400" },
  ];

  return (
    <AppShell userRole="ADMIN">
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Admin & Content Governance Suite
              </h1>
              <Badge variant="warning">ADMIN PRIVILEGES</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curate canonical question graphs, audit 4-stage verification queues, and configure exam blueprint simulators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/questions/new">
              <Button variant="accent" size="sm" className="gap-1.5 shadow-md shadow-indigo-600/20">
                <Plus className="h-4 w-4" />
                <span>Author New Question</span>
              </Button>
            </Link>
            <Link href="/admin/verification">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Audit Queue (12)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <Card key={idx} className="border border-slate-800 bg-[#0e1422] p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{s.label}</span>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-white font-mono">{s.value}</p>
              <p className="text-[11px] text-slate-400 font-medium">{s.change}</p>
            </Card>
          ))}
        </div>

        {/* Admin Navigation Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between group hover:border-slate-700">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                4-Stage Verification Queue
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review and approve draft questions with mandatory 10-point mathematical proof and copyright clearance checklists.
              </p>
            </div>
            <Link href="/admin/verification">
              <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                <span>Open Verification Queue</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between group hover:border-slate-700">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 w-fit">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                Question Bank Repository
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter and inspect 1,240+ questions across Quant, DILR, VARC, and exam specialists with tag taxonomies.
              </p>
            </div>
            <Link href="/admin/questions">
              <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                <span>Manage Questions</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4 flex flex-col justify-between group hover:border-slate-700">
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Mock Test Builder
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assemble official exam version blueprints, configure locked sectional timers, and deploy live all-India full mocks.
              </p>
            </div>
            <Link href="/admin/mock-tests">
              <Button variant="outline" size="sm" className="w-full justify-between mt-2">
                <span>Mock Assembler</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
