"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldIcon, FieldLabel, GoogleIcon, inputClasses } from "./AuthCard";

export default function SignInForm({
  onCreateAccount,
}: {
  onCreateAccount: () => void;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: String(values.email),
      password: String(values.password),
      rememberMe,
    });

    if (data) {
      router.refresh();
      router.push("/");
    } else {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      router.refresh();
      router.push("/");
    }
    console.log(error);
  };

  return (
    <form className="mt-8 flex flex-1 flex-col" onSubmit={onSubmit}>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Sign in to EcoBond
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your credentials or Gmail to access your organizer dashboard, team
        tasks, and volunteer certification.
      </p>

      {/* Email */}
      <div className="mt-6">
        <label htmlFor="signin-email">
          <FieldLabel>Email Address / Gmail</FieldLabel>
        </label>
        <div className="relative">
          <FieldIcon icon={Mail} />
          <input
            id="signin-email"
            name="email"
            type="email"
            required
            placeholder="your.name@gmail.com"
            className={cn(inputClasses, "pl-10")}
            autoComplete="email"
          />
        </div>
      </div>

      {/* Password */}
      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="signin-password" className="text-sm font-medium text-foreground">
            Password <span className="text-red-500">*</span>
          </label>
          <a
            href="#"
            className="text-xs font-semibold text-[#1f8a4c] underline-offset-2 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div className="relative">
          <FieldIcon icon={Lock} />
          <input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter your password"
            className={cn(inputClasses, "pr-11 pl-10")}
            autoComplete="current-password"
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
      </div>

      {/* Remember me */}
      <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-xs text-muted-foreground sm:text-sm">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="size-4 shrink-0 cursor-pointer rounded accent-[#1f8a4c]"
        />
        <span>Remember me on this device for 30 days</span>
      </label>

      {/* Submit */}
      <Button type="submit" className="mt-6 h-12 w-full rounded-xl text-base">
        Sign in to Account
        <ArrowRight data-icon="inline-end" />
      </Button>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Or continue with
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-primary/10 bg-secondary text-sm font-semibold text-foreground hover:bg-muted"
      >
        <GoogleIcon /> Continue with Google
      </button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don&apos;t have an EcoBond account yet?{" "}
        <button
          type="button"
          onClick={onCreateAccount}
          className="font-semibold text-[#1f8a4c] underline-offset-2 hover:underline"
        >
          Create Account
        </button>
      </p>

      {/* Footer strip */}
      <div className="mt-8 flex items-center justify-center gap-2.5 rounded-xl bg-secondary px-4 py-3">
        <ShieldCheck className="size-4 shrink-0 text-[#1f8a4c]" />
        <span className="text-[10px] font-semibold tracking-wider text-primary/80 uppercase">
          Protected by TLS 256-bit civic encryption • National climate partner •
          Dhaka City HQ
        </span>
      </div>
    </form>
  );
}
