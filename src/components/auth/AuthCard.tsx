"use client";

import { useState, type ReactNode } from "react";
import {
  Eye,
  EyeOff,
  Globe,
  Lightbulb,
  Link2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient, signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/toast"
import SignInForm from "@/components/auth/SignInForm";


export const inputClasses =
  "h-11 w-full rounded-xl border border-input bg-card text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const STRENGTH_LABELS = ["Weak", "Weak", "Fair", "Good", "Secure"];

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.64h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.44-5 3.44-8.57Z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.12 0 5.74-1.03 7.62-2.79l-3.72-2.9c-1.03.7-2.36 1.1-3.9 1.1-3 0-5.55-2.02-6.46-4.74H1.7v2.98A11.5 11.5 0 0 0 12 23.5Z"
      />
      <path
        fill="#FBBC05"
        d="M5.54 14.17a6.9 6.9 0 0 1 0-4.34V6.85H1.7a11.5 11.5 0 0 0 0 10.3l3.84-2.98Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.08c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.73 1.64 15.12.5 12 .5A11.5 11.5 0 0 0 1.7 6.85l3.84 2.98C6.45 7.1 9 5.08 12 5.08Z"
      />
    </svg>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-sm font-medium text-foreground">
      {children} <span className="text-red-500">*</span>
    </span>
  );
}

export function FieldIcon({ icon: Icon }: { icon: typeof User }) {
  return (
    <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
  );
}

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState<"create" | "signin">("create");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Password strength (mock, no validation library)
  const [password, setPassword] = useState("");
  const strength = Math.min(
    4,
    (password.length >= 8 ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[a-zA-Z]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0)
  );

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
    const { data, error } = await authClient.signUp.email({
      name: String(user.name),
      email: String(user.email),
      password: String(user.password),
      image: user.imageUrl ? String(user.imageUrl) : undefined,
    })

    if (data) {
      console.log(data);
      redirect('/')
    } else {
      console.log(error);
    }

  }

  const handleGoogleAuth = async () => {
    console.log("Google");
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      redirect("/")
    }
    console.log(error);
  }


  return (
    <section className="flex flex-col p-6 sm:p-8 lg:p-12">
      {/* Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Auth mode"
          className="flex rounded-full bg-muted p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "create"}
            onClick={() => setActiveTab("create")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "create"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-primary hover:text-primary/80"
            )}
          >
            Create Account
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "signin"}
            onClick={() => setActiveTab("signin")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "signin"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-primary hover:text-primary/80"
            )}
          >
            Sign In
          </button>
        </div>

        <span className="hidden items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm sm:inline-flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Dhaka Hub Live
        </span>
      </div>

      {/* CREATE ACCOUNT */}
      {activeTab === "create" ? (
        <form
          className="mt-8 flex flex-1 flex-col"
          onSubmit={onsubmit}
        >
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Create your EcoBond profile
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join neighborhood tree plantings, earn impact credits, and lead
            conservation drives across Bangladesh.
          </p>

          {/* Tip box */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-secondary p-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-primary/20">
              <Lightbulb className="size-4 text-primary" />
            </span>
            <p className="text-xs text-primary/80 sm:text-sm">
              <strong className="font-semibold">Tip:</strong> Use your Google or
              personal Gmail to receive verified WhatsApp and SMS reminders for
              local Hatirjheel &amp; Dhanmondi cleanup drives.
            </p>
          </div>

          {/* Full Name */}
          <div className="mt-6">
            <label htmlFor="name">
              <FieldLabel>Full Name</FieldLabel>
            </label>
            <div className="relative">
              <FieldIcon icon={User} />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Tanvir Hasan"
                className={cn(inputClasses, "pl-10")}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-5">
            <label htmlFor="email">
              <FieldLabel>Email address / Gmail</FieldLabel>
            </label>
            <div className="relative">
              <FieldIcon icon={Mail} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.name@gmail.com"
                className={cn(inputClasses, "pl-10")}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Profile image URL (optional) */}
          <div className="mt-5">
            <label htmlFor="imageUrl" className="mb-1.5 block text-sm font-medium text-foreground">
              Profile Image Link / URL (Optional)
            </label>
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <User className="size-5" />
                </span>
                <span className="absolute -right-0.5 -bottom-0.5 flex size-5 items-center justify-center rounded-full bg-[#1f8a4c] ring-2 ring-card">
                  <Link2 className="size-2.5 text-white" />
                </span>
              </div>
              <div className="relative flex-1">
                <FieldIcon icon={Link2} />
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/... or paste image URL"
                  className={cn(inputClasses, "pl-10")}
                />
              </div>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Paste any publicly accessible URL or leave blank to use your
              generated EcoBond avatar.
            </p>
          </div>

          {/* Password */}
          <div className="mt-5">
            <label htmlFor="password">
              <FieldLabel>Password</FieldLabel>
            </label>
            <div className="relative">
              <FieldIcon icon={Lock} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure passphrase"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={cn(inputClasses, "pr-11 pl-10")}
                autoComplete="new-password"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Strength meter */}
            <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    index < strength ? "bg-[#1f8a4c]" : "bg-border"
                  )}
                />
              ))}
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#1f8a4c]">
                Enter 8+ characters with numbers
              </span>
              <span className="text-[11px] font-semibold text-[#1f8a4c]">
                {STRENGTH_LABELS[strength]}
              </span>
            </div>
          </div>

          {/* Guidelines checkbox */}
          <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs text-muted-foreground sm:text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer rounded accent-[#1f8a4c]"
            />
            <span>
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-[#1f8a4c] underline-offset-2 hover:underline"
              >
                EcoBond Community Guidelines
              </a>
              , zero-litter protocol, and the volunteer charter for grassroots
              climate action across Bangladesh.
            </span>
          </label>

          {/* Submit */}
          <Button type="submit" className="mt-6 h-12 w-full rounded-xl text-base">
            <Globe /> Create EcoBond Account
          </Button>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleGoogleAuth}
            type="button"
            className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-input bg-card text-sm font-semibold text-foreground hover:bg-muted"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an EcoBond account?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className="font-semibold text-[#1f8a4c] hover:underline"
            >
              Sign In
            </button>
          </p>

          {/* Footer strip */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-[11px] text-muted-foreground max-sm:flex-col">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#1f8a4c]" />
              Protected by TLS 256-bit Civic Encryption
            </span>
            <span>National Climate Partner • Dhaka City HQ</span>
          </div>
        </form>
      ) : (
        /* SIGN IN */
        <SignInForm onCreateAccount={() => setActiveTab("create")} />
      )}
    </section>
  );
}
