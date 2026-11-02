import type { Metadata } from "next";
import { Home } from "lucide-react";
import Link from "next/link";
import GatewaySidebar from "@/components/auth/GatewaySidebar";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Community Gateway",
  description:
    "Create your EcoBond profile or sign in — join neighborhood tree plantings, earn impact credits, and lead conservation drives across Bangladesh.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-secondary/60">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
            >
              <Home className="size-3.5" /> Home
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-xs font-medium text-foreground">Community Gateway</span>
          </nav>
          <span className="hidden items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary shadow-sm sm:inline-flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Delia Stewardship Network
          </span>
        </div>
      </div>

      {/* Panels */}
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="grid min-h-[calc(100dvh-6rem)] overflow-hidden rounded-3xl bg-card shadow-sm lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <GatewaySidebar />
          <AuthCard />
        </div>
      </main>
    </div>
  );
}
