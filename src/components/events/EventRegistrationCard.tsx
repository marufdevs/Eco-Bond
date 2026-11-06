import Link from "next/link";
import { Award, Gift, Target, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { EventCategory, EventDetail } from "@/types/event";

const BADGE_BY_CATEGORY: Record<EventCategory, string> = {
  "Community Cleanup": "Cleanup Hero",
  "Community Clean": "Cleanup Hero",
  "Tree Plantation": "Green Guardian",
  "River & Lake Restoration": "Water Warrior",
  "River & Lake": "Water Warrior",
  "Wetland Guard": "Wetland Protector",
  "Recycling Drive": "Circular Champion",
  "Urban Gardens": "Urban Grower",
  "Awareness Hub": "Eco Advocate",
  "Eco Lifestyle": "Green Citizen",
};

function tierFor(points: number): string {
  if (points >= 200) return "Tier III Unlock";
  if (points >= 100) return "Tier II Unlock";
  return "Tier I Unlock";
}

export default function EventRegistrationCard({
  event,
}: {
  event: EventDetail;
}) {
  const capacity = event.capacity ?? 0;
  const enrolled = event.enrolled ?? 0;
  const remaining = Math.max(0, capacity - enrolled);
  const fillPercent =
    capacity > 0 ? Math.min(100, Math.round((enrolled / capacity) * 100)) : 0;
  const badgeName = BADGE_BY_CATEGORY[event.category] ?? "Eco Volunteer";
  const targetLabel =
    event.targetAmount > 0
      ? `${event.targetAmount} ${event.targetUnit} recovered & recycled`
      : "Impact target confirmed by the host";

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
            Registration status
          </p>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.04em] uppercase",
              remaining > 0
                ? "bg-secondary text-primary"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {capacity <= 0
              ? "Registration closed"
              : remaining > 0
                ? `${remaining} ${remaining === 1 ? "Spot" : "Spots"} Left`
                : "Fully Booked"}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-heading text-2xl font-bold text-foreground">
            {enrolled}
          </span>
          <span className="text-sm text-muted-foreground">
            / {capacity} Registered
          </span>
          <span className="ml-auto text-[11px] font-semibold text-primary">
            {fillPercent}% Capacity
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={`${enrolled} of ${capacity} volunteer spots filled`}
          aria-valuemin={0}
          aria-valuemax={capacity > 0 ? capacity : 1}
          aria-valuenow={enrolled}
          className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-eco transition-[width] duration-300"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
              <Gift className="size-3.5 text-eco" aria-hidden="true" />
              Rewards
            </p>
            <p className="mt-1 font-heading text-lg font-bold text-foreground">
              +{event.ecoPoints}
            </p>
            <p className="text-[11px] text-muted-foreground">Eco Points Credit</p>
          </div>

          <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
              <Award className="size-3.5 text-eco" aria-hidden="true" />
              Badge
            </p>
            <p className="mt-1 font-heading text-[15px] leading-tight font-bold text-foreground">
              {badgeName}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {tierFor(event.ecoPoints)}
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex items-start gap-2.5 rounded-xl border border-border/60 bg-secondary/40 p-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card text-eco">
            <Target className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
              Target impact goal
            </p>
            <p className="mt-0.5 text-[12.5px] font-semibold text-foreground">
              {targetLabel}
            </p>
          </div>
        </div>

        <Link
          href="/signup"
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <UserPlus className="size-4.5" aria-hidden="true" />
          Register For Drive
        </Link>

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Free to join &bull; EcoBond verified event
        </p>
      </div>
    </aside>
  );
}
