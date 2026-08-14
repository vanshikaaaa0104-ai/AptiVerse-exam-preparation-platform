"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, ShieldCheck, UserCheck, Lock, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handleDemoStudent = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoAdmin = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative">
      {/* Background radial glow */}
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
            Sign in to continue your personalized preparation
          </p>
        </div>

        <Card className="border border-slate-800 bg-[#0e1422]/90 shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
            <CardDescription className="text-xs">
              Enter your credentials or use instant demo access below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@aptiverse.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Password</span>
                  </label>
                  <a href="#" className="text-[11px] text-indigo-400 hover:underline">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                className="w-full py-2.5 mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#0e1422] px-2 text-slate-400 font-semibold tracking-wider">
                  Or Instant Demo Access
                </span>
              </div>
            </div>

            {/* Quick Demo Access Pills */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoStudent}
                className="p-2.5 rounded-xl border border-indigo-500/30 bg-indigo-950/30 hover:bg-indigo-900/40 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                  <span>Student Demo</span>
                  <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">CAT 2026 Aspirant</p>
              </button>

              <button
                type="button"
                onClick={handleDemoAdmin}
                className="p-2.5 rounded-xl border border-amber-500/30 bg-amber-950/30 hover:bg-amber-900/40 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                  <span>Admin / Reviewer</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Full Verification Suite</p>
              </button>
            </div>
          </CardContent>

          <CardFooter className="pt-0 justify-center">
            <p className="text-xs text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                Register Free
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
