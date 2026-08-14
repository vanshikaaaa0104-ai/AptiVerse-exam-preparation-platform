"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, CheckCircle2, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetExam, setTargetExam] = useState("cat");
  const [isLoading, setIsLoading] = useState(false);

  const exams = [
    { id: "cat", label: "CAT 2026" },
    { id: "xat", label: "XAT 2026" },
    { id: "snap", label: "SNAP 2026" },
    { id: "nmat", label: "NMAT 2026" },
    { id: "cmat", label: "CMAT 2026" },
    { id: "mat", label: "MAT 2026" },
    { id: "mah-cet", label: "MAH CET" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">AptiVerse</span>
          </Link>
          <p className="text-sm text-slate-400">
            Create your account & configure your target entrance exam
          </p>
        </div>

        <Card className="border border-slate-800 bg-[#0e1422]/90 shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold">Join AptiVerse</CardTitle>
            <CardDescription className="text-xs">
              Start your diagnostic assessment and unlock intelligent prep
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              {/* Target Exam Selection Grid */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-medium text-slate-300">
                  Select Primary Target Exam
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {exams.map((exam) => {
                    const isSelected = targetExam === exam.id;
                    return (
                      <button
                        key={exam.id}
                        type="button"
                        onClick={() => setTargetExam(exam.id)}
                        className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                            : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {exam.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                variant="accent"
                className="w-full py-2.5 mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Setting Up Dashboard..." : "Create Account & Start"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="pt-0 justify-center">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
