import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export function formatTimeRemaining(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/30";
  if (accuracy >= 60) return "text-blue-500 bg-blue-500/10 border-blue-500/30";
  if (accuracy >= 40) return "text-amber-500 bg-amber-500/10 border-amber-500/30";
  return "text-red-500 bg-red-500/10 border-red-500/30";
}
