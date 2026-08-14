"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Lock,
  Calculator,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MockInstructionsPage({
  params,
}: {
  params: Promise<{ mockId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (!agreed) return;
    router.push(`/mocks/${resolvedParams.mockId}/attempt`);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/mocks" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Mock Catalog</span>
          </Link>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-[#0e1422] to-[#0e1422] space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="verified">OFFICIAL SIMULATION</Badge>
            <Badge variant="indigo">CAT 2026</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CAT 2026 National Full Mock #01 — Instructions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Please review the examination regulations, sectional timing rules, and evaluation scheme carefully before proceeding.
          </p>
        </div>

        {/* Key Rules Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Duration</span>
              <Clock className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="text-xl font-bold text-white font-mono">120 Minutes</p>
            <p className="text-[11px] text-amber-400 flex items-center gap-1">
              <Lock className="h-3 w-3" /> 40 mins per section (Locked)
            </p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Total Questions</span>
              <Layers className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-xl font-bold text-white font-mono">66 Questions</p>
            <p className="text-[11px] text-slate-400">Total Marks: 198</p>
          </Card>

          <Card className="border border-slate-800 bg-[#0e1422] p-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Marking Scheme</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-emerald-400 font-mono">+3.0 / -1.0</p>
            <p className="text-[11px] text-slate-400">TITA Questions: 0 Negative</p>
          </Card>
        </div>

        {/* Section Sequence & Timing Table */}
        <Card className="border border-slate-800 bg-[#0e1422] p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Section Sequence & Timing Rules</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-sans uppercase">
                <tr>
                  <th className="p-3">Order</th>
                  <th className="p-3">Section Name</th>
                  <th className="p-3">Questions</th>
                  <th className="p-3">Time Allocated</th>
                  <th className="p-3">Navigation Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-3 text-indigo-400 font-bold">1</td>
                  <td className="p-3 font-sans font-semibold text-white">
                    Verbal Ability & Reading Comprehension (VARC)
                  </td>
                  <td className="p-3">24 Qs</td>
                  <td className="p-3 text-amber-400 font-bold">40 Mins</td>
                  <td className="p-3 font-sans text-slate-400">Auto-advances at 40m</td>
                </tr>
                <tr>
                  <td className="p-3 text-indigo-400 font-bold">2</td>
                  <td className="p-3 font-sans font-semibold text-white">
                    Data Interpretation & Logical Reasoning (DILR)
                  </td>
                  <td className="p-3">20 Qs</td>
                  <td className="p-3 text-amber-400 font-bold">40 Mins</td>
                  <td className="p-3 font-sans text-slate-400">No backward jumping to VARC</td>
                </tr>
                <tr>
                  <td className="p-3 text-indigo-400 font-bold">3</td>
                  <td className="p-3 font-sans font-semibold text-white">
                    Quantitative Aptitude (QA)
                  </td>
                  <td className="p-3">22 Qs</td>
                  <td className="p-3 text-amber-400 font-bold">40 Mins</td>
                  <td className="p-3 font-sans text-slate-400">Auto-submits on completion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Examination Declaration */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-300 leading-relaxed">
              I have read and understood all the instructions above. I understand that sections are strictly timed at 40 minutes each and that once a section expires, I cannot return to it.
            </span>
          </label>

          <Button
            variant="accent"
            size="lg"
            disabled={!agreed}
            onClick={handleStart}
            className="w-full justify-center gap-2 shadow-xl shadow-indigo-600/20 py-6 text-base"
          >
            <span>I Am Ready to Begin Full Mock</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
