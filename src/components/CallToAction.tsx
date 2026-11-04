"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function CallToAction() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#113322] to-[#2d6a4a] p-7 sm:p-10 lg:p-14">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-emerald-300/25 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#8fd4a8] uppercase">
            Weekly Eco Dispatch
          </span>

          {/* Heading */}
          <h2 className="mt-4 max-w-2xl font-heading text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
            Stay Connected With Our Green Community
          </h2>

          {/* Subtext */}
          <p className="mt-4 max-w-xl text-sm text-white/75 sm:text-base">
            Get weekly bulletins on upcoming planting drives, cleanup gear
            lists, and policy updates across Bangladesh delivered straight to
            your inbox.
          </p>

          {/* Newsletter form */}
          <form
            onSubmit={onSubmit}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-12 w-full rounded-lg bg-white px-4 text-sm text-foreground outline-none ring-emerald-500/40 placeholder:text-muted-foreground focus-visible:ring-3 sm:w-72"
            />
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2.5 rounded-lg bg-[#4d5f7c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3f5170]"
            >
              Subscribe to EcoBond <Send className="size-4" />
            </button>
          </form>

          {/* Fine print */}
          <p className="mt-3.5 text-xs text-white/60">
            {subscribed
              ? "You're in! Check your inbox to confirm your subscription."
              : "Zero spam. Unsubscribe at any time with a single click."}
          </p>
        </div>
      </div>
    </section>
  );
}
