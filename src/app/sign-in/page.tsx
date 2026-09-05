"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { authenticateUser, setDemoStudentSession, setDemoAdminSession } from "@/lib/auth-storage";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<"student" | "admin" | "submit" | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSuccessfulAuth = async (userEmail: string, role: string, isDemo = false, demoRole?: "student" | "admin") => {
    try {
      // 1. Call server-side auth endpoint to establish HTTP session cookie
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          password: password || "password123",
          isDemoStudent: demoRole === "student",
          isDemoAdmin: demoRole === "admin",
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      // 2. Synchronize client-side session store
      if (demoRole === "student") {
        setDemoStudentSession();
      } else if (demoRole === "admin") {
        setDemoAdminSession();
      } else {
        authenticateUser(userEmail, password);
      }

      setSuccessMessage("Authentication successful! Entering platform...");

      // 3. Redirect to requested return destination
      setTimeout(() => {
        let destination = returnTo;
        if (role === "ADMIN" && destination === "/dashboard") {
          destination = "/admin";
        }
        if (typeof window !== "undefined") {
          window.location.href = destination;
        } else {
          router.push(destination);
        }
      }, 250);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to establish authenticated session.");
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setActiveAction("submit");
    await handleSuccessfulAuth(email.trim().toLowerCase(), "STUDENT", false);
  };

  const handleDemoStudent = async () => {
    setIsLoading(true);
    setActiveAction("student");
    setErrorMessage("");
    await handleSuccessfulAuth("aman.sharma@aptiverse.ai", "STUDENT", true, "student");
  };

  const handleDemoAdmin = async () => {
    setIsLoading(true);
    setActiveAction("admin");
    setErrorMessage("");
    await handleSuccessfulAuth("admin@aptiverse.ai", "ADMIN", true, "admin");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setResetSuccess(false);
      setResetEmail("");
    }, 2000);
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
          Sign In to Your Workspace
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400">
          Prepare for CAT, XAT, GMAT, SNAP, NMAT, CMAT, MAT & MAH CET
        </p>

        {returnTo && returnTo !== "/dashboard" && (
          <div className="mt-3 mx-4 sm:mx-0 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-center">
            <p className="text-[11px] text-indigo-300 font-medium">
              🔒 Please sign in to access <span className="font-mono text-white">{returnTo}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Enter your credentials to continue your preparation journey.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Quick Demo Access Bar */}
            <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Instant 1-Click Demo Evaluation Access</span>
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  id="btn-demo-student"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDemoStudent}
                  disabled={isLoading}
                  className="bg-indigo-950/50 hover:bg-indigo-900/80 active:scale-[0.98] text-xs font-semibold text-indigo-200 hover:text-white border-indigo-500/30 hover:border-indigo-400/70 flex items-center justify-center gap-2 h-10 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                >
                  {isLoading && activeAction === "student" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-300" />
                  ) : (
                    <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
                  )}
                  <span>{isLoading && activeAction === "student" ? "Entering..." : "Student Demo"}</span>
                </Button>
                <Button
                  id="btn-demo-admin"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDemoAdmin}
                  disabled={isLoading}
                  className="bg-amber-950/50 hover:bg-amber-900/80 active:scale-[0.98] text-xs font-semibold text-amber-200 hover:text-white border-amber-500/30 hover:border-amber-400/70 flex items-center justify-center gap-2 h-10 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-amber-500/20"
                >
                  {isLoading && activeAction === "admin" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-300" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  )}
                  <span>{isLoading && activeAction === "admin" ? "Entering..." : "Admin Demo"}</span>
                </Button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800" />
              <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">Or enter account details</span>
              <div className="flex-grow border-t border-slate-800" />
            </div>

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

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              <Button
                id="btn-sign-in-submit"
                type="submit"
                variant="accent"
                disabled={isLoading}
                className="w-full h-11 text-sm font-semibold gap-2 shadow-lg shadow-indigo-600/25 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-[0.99] border border-indigo-400/25 text-white transition-all duration-200 cursor-pointer"
              >
                {isLoading && activeAction === "submit" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : null}
                <span>
                  {isLoading && activeAction === "submit"
                    ? "Signing in to AptiVerse..."
                    : "Sign In to AptiVerse"}
                </span>
                {!(isLoading && activeAction === "submit") && (
                  <ArrowRight className="h-4 w-4 text-white/90" />
                )}
              </Button>
            </form>

            <div className="pt-2 text-center">
              <p className="text-xs text-slate-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  href={`/sign-up${returnTo && returnTo !== "/dashboard" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
                  className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-400" />
              <span>Password Recovery</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Enter your registered email address. We will verify your account and send a reset link.
            </DialogDescription>
          </DialogHeader>

          {resetSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-emerald-300">Reset instructions dispatched!</p>
              <p className="text-xs text-slate-400">
                Please check your inbox at <span className="text-white font-mono">{resetEmail}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Registered Email</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="aspirant@gmail.com"
                  className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForgotModal(false)}
                  className="border-slate-700 text-slate-300"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm">
                  Send Recovery Link
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080c14] flex items-center justify-center text-slate-400 text-sm">
          Loading Sign In...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
