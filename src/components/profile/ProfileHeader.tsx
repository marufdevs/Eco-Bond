"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  BadgeCheck,
  Building2,
  Calendar,
  ChevronRight,
  Download,
  MapPin,
  Share2,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BREADCRUMB_LINKS = ["Home", "Profile"];
const PROFILE_BADGE = ["Delta Guardian", "Active Field Lead"];

const PROFILE_META = [
  { icon: MapPin, label: "Dhanmondi, Dhaka, Bangladesh" },
  { icon: Calendar, label: "Steward since March 2024" },
  { icon: Building2, label: "Dhaka Central Climate Hub" },
];

export default function ProfileHeader() {
  const { data: session } = authClient.useSession();
  return (
    <header>
      {/* Breadcrumb strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 text-xs" aria-label="Breadcrumb">
          {BREADCRUMB_LINKS.map((link) => (
            <span key={link} className="flex items-center gap-1.5">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                {link}
              </a>
              <ChevronRight className="size-3 text-muted-foreground/60" aria-hidden="true" />
            </span>
          ))}
          <span className="font-semibold text-foreground" aria-current="page">
            {session?.user.name}
          </span>
        </nav>
      </div>

      {/* Profile card */}
      <div className="mt-4 flex flex-col gap-6 rounded-2xl border border-border/50 bg-card p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Photo */}
          <div className="relative size-24 shrink-0 self-start sm:self-center lg:self-start xl:self-center">
            {/* <Image
                  src={session?.user.image}
                  alt={session?.user.name ?? "Profile photo"}
                  fill
                  sizes="96px"
                  className="rounded-2xl object-cover ring-1 ring-border/60"
                /> */}
            {session?.user?.image ? (
              <div className="relative h-24 w-24">
                <Image
                  src={session?.user.image}
                  alt={session?.user.name ?? "Profile photo"}
                  fill
                  sizes="96px"
                  className="rounded-2xl object-cover ring-1 ring-border/60"
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-muted text-2xl font-semibold">
                {session?.user?.name?.[0] ?? "U"}
              </div>
            )}
            <span
              className="absolute -right-1.5 -bottom-1.5 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground ring-3 ring-background"
              title="Verified EcoBond steward"
              aria-label="Verified EcoBond steward"
            >
              <BadgeCheck className="size-4" />
            </span>
          </div>

          {/* Identity */}
          <div>
            <h2 className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-2xl">
              {session?.user.name}
              <Link
                href={`mailto:${session?.user?.email}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {session?.user?.email}
              </Link>
            </h2>

            <p className="mt-1 text-sm font-semibold text-[#1f8a4c] sm:text-[0.95rem]">
              Youth Climate Steward &amp; Lead Field Organizer
            </p>

            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-[13px]">
              {PROFILE_META.map((meta) => (
                <li key={meta.label} className="flex items-center gap-1.5">
                  <meta.icon className="size-3.5 shrink-0 text-primary/60" aria-hidden="true" />
                  {meta.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:grid sm:grid-cols-2 sm:justify-items-end max-lg:w-fit">
          <Button className="h-9 gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-[#0f2e1f]" size="lg">
            <SquarePen data-icon="inline-start" className="size-4" />
            Edit Profile
          </Button>

          <Button variant="secondary" className="h-9 gap-1.5 rounded-lg bg-secondary px-4 text-sm font-semibold text-primary shadow-none ring-1 ring-primary/15 hover:bg-secondary/70" size="lg">
            <Share2 data-icon="inline-start" className="size-4" />
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
