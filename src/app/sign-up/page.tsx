"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Target,
  Compass,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { registerNewUser } from "@/lib/auth-storage";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/onboarding";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [targetExam, setTargetExam] = useState("cat");
  const [prepLevel, setPrepLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const exams = [
    { id: "cat", label: "CAT 2026", desc: "IIMs & Tier-1" },
    { id: "gmat", label: "GMAT 2026", desc: "GMAC & Global B-Schools" },
    { id: "xat", label: "XAT 2026", desc: "XLRI & Tier-1" },
    { id: "nmat", label: "NMAT 2026", desc: "NMIMS & Adaptive" },
    { id: "snap", label: "SNAP 2026", desc: "SIBM & Speed" },
    { id: "cmat", label: "CMAT 2026", desc: "AICTE / NTA" },
    { id: "mat", label: "MAT 2026", desc: "AIMA 4x/yr" },
    { id: "mah-cet", label: "MAH CET 2026", desc: "JBIMS & State" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Establish server session via API
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          targetExam,
          prepLevel,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Registration failed");
      }

      // 2. Synchronize client-side storage
      registerNewUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        targetExam,
        prepLevel,
      });

      setSuccessMessage("Account created successfully! Initializing workspace...");

      // 3. Redirect
      setTimeout(() => {
        const destination = returnTo && returnTo !== "/dashboard" ? returnTo : "/onboarding";
        router.push(destination);
        router.refresh();
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[200px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-6 group">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">AptiVerse</span>
            <Badge variant="indigo" className="text-[10px] px-1.5 py-0 uppercase">V2.0</Badge>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-bold tracking-tight text-white">
          Create Your Aspirant Account
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400">
          Personalized curriculum, adaptive drills & verified exam mocks
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-white">Aspirant Registration</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Set up your profile to activate your diagnostic study plan.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aman Sharma"
                    className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aspirant@gmail.com"
                    className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Choose Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full h-10 px-3 pr-10 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Primary Target Exam</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Can switch anytime</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {exams.map((exam) => {
                    const isSelected = targetExam === exam.id;
                    return (
                      <button
                        key={exam.id}
                        type="button"
                        onClick={() => setTargetExam(exam.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? "bg-indigo-600/20 border-indigo-500 text-white shadow-xs"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                        }`}
                      >
                        <p className={`text-xs font-bold ${isSelected ? "text-indigo-300" : "text-white"}`}>
                          {exam.label}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{exam.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-teal-400" />
                  <span>Current Preparation Stage</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Beginner", label: "Beginner", desc: "Starting concepts" },
                    { id: "Intermediate", label: "Intermediate", desc: "Solving drills" },
                    { id: "Advanced", label: "Advanced", desc: "Mock testing" },
                  ].map((level) => {
                    const isSelected = prepLevel === level.id;
                    return (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setPrepLevel(level.id as any)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          isSelected
                            ? "bg-teal-500/20 border-teal-500 text-white shadow-xs"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                        }`}
                      >
                        <p className="text-xs font-bold">{level.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{level.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                variant="accent"
                disabled={isLoading}
                className="w-full h-10 text-sm font-semibold gap-2 shadow-md shadow-indigo-600/20 mt-2"
              >
                <span>{isLoading ? "Creating Account..." : "Create Account & Start"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="pt-2 text-center">
              <p className="text-xs text-slate-400">
                Already registered?{" "}
                <Link
                  href={`/sign-in${returnTo && returnTo !== "/onboarding" && returnTo !== "/dashboard" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
                  className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080c14] flex items-center justify-center text-slate-400 text-sm">
          Loading Sign Up...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
