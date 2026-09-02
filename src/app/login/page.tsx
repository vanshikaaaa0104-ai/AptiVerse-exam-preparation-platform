"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { authenticateUser, setDemoStudentSession, setDemoAdminSession } from "@/lib/auth-storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

    try {
      const auth = authenticateUser(email, password);
      if (!auth.success) {
        setErrorMessage(auth.error || "Failed to sign in. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage(auth.isNewUser ? "Welcome! Account created successfully. Initializing onboarding..." : "Signed in successfully! Redirecting...");

      setTimeout(() => {
        if (auth.user?.role === "ADMIN") {
          router.push("/admin");
        } else if (auth.user && !auth.user.isOnboarded) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }, 400);
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDemoStudent = () => {
    setIsLoading(true);
    setDemoStudentSession();
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoAdmin = () => {
    setIsLoading(true);
    setDemoAdminSession();
    setTimeout(() => {
      router.push("/admin");
    }, 400);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSuccess(true);
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
            <Badge variant="indigo" className="text-[10px]">
              V2.0
            </Badge>
          </Link>
          <p className="text-sm text-slate-400">
            Sign in to continue your personalized entrance exam preparation
          </p>
        </div>

        <Card className="border border-slate-800 bg-[#0e1422]/90 shadow-2xl">
          <CardHeader className="space-y-1 pb-4 border-b border-slate-800/80">
            <CardTitle className="text-xl font-bold text-white">Sign In to AptiVerse</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Access your personalized dashboard, mistake book, and full mocks
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-5 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@aptiverse.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setResetEmail(email);
                      setResetSuccess(false);
                      setShowForgotModal(true);
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="accent"
                className="w-full py-2.5 mt-2 text-xs font-bold"
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

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDemoStudent}
                disabled={isLoading}
                className="text-xs font-semibold gap-1.5 border-slate-800 hover:bg-indigo-950/30 hover:border-indigo-500/40"
              >
                <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>Demo Student</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDemoAdmin}
                disabled={isLoading}
                className="text-xs font-semibold gap-1.5 border-slate-800 hover:bg-amber-950/30 hover:border-amber-500/40"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>Demo Admin</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Create Account Banner */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-center space-y-1">
          <p className="text-xs text-slate-300">
            New to AptiVerse?{" "}
            <Link href="/register" className="text-indigo-400 font-bold hover:underline">
              Create an Account
            </Link>
          </p>
          <p className="text-[11px] text-slate-400">
            Free diagnostic test &amp; full access to all 7 exam syllabi
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-400" />
              <span>Password Recovery</span>
            </DialogTitle>
            <DialogDescription>
              Enter the email address linked to your AptiVerse account to reset your credentials.
            </DialogDescription>
          </DialogHeader>

          {resetSuccess ? (
            <div className="py-4 space-y-4 text-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A verification reset code has been sent to{" "}
                  <span className="text-indigo-300 font-semibold">{resetEmail}</span>. (Demo Mode: You can sign in using any password).
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowForgotModal(false)}
                className="w-full text-xs font-bold"
              >
                Return to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@aptiverse.ai"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowForgotModal(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm" className="text-xs font-bold">
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
