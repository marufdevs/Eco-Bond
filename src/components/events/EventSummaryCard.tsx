import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  MapPin,
  MessageSquare,
  Shirt,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  formatLongDate,
  formatTimeRange,
  getCheckInTime,
} from "@/lib/event-adapter";
import type { EventDetail } from "@/types/event";

function mapsHref(event: EventDetail): string {
  const query = [event.location, event.zone, "Bangladesh"]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function InfoTile({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
            {label}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function EventSummaryCard({ event }: { event: EventDetail }) {
  const checkIn = getCheckInTime(event.time);
  const organizer = event.organizer ?? {
    name: "EcoBond Community",
    initials: "EC",
  };
  const timeRange = formatTimeRange(event.time, event.endTime);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
        <h2 className="font-heading text-2xl leading-tight font-bold text-foreground sm:text-[28px]">
          {event.title}
        </h2>

        {event.summary ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {event.summary}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col gap-4 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-primary">
              {organizer.initials}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-base font-bold text-foreground">
                <span className="truncate">{organizer.name}</span>
                <BadgeCheck
                  className="size-4.5 shrink-0 text-eco"
                  aria-label="Verified organizer"
                />
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Lead Coordinator &bull; Verified event host
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold tracking-[0.04em] text-primary uppercase">
                  Verified EcoBond Partner
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                  <Users className="size-3.5" aria-hidden="true" />
                  {event.enrolled > 0
                    ? `${event.enrolled} volunteers joining`
                    : "New on EcoBond"}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/signup"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/25 px-4 text-xs font-semibold text-primary transition-colors hover:bg-secondary/70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <MessageSquare className="size-4" aria-hidden="true" />
            Message Host
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoTile icon={CalendarDays} label="Time & Schedule">
          <p className="mt-1 font-heading text-[15px] font-bold text-foreground">
            {formatLongDate(event.date)}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {timeRange} BST (Dhaka Time)
          </p>
          {checkIn ? (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-eco" aria-hidden="true" />
              Check-in opens at {checkIn}
            </p>
          ) : null}
        </InfoTile>

        <InfoTile icon={MapPin} label="Meeting Grounds">
          <p className="mt-1 font-heading text-[15px] font-bold text-foreground">
            {event.location || "Meeting point TBA"}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{event.zone}</p>
          <Link
            href={mapsHref(event)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            View meeting point
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </InfoTile>
      </div>

      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
        <h2 className="font-heading text-lg font-bold text-foreground">
          About this drive
        </h2>
        <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
          {event.description ||
            "The full campaign briefing will be shared by the host before check-in. Expect a short safety walkthrough and a site orientation on arrival."}
        </p>

        {event.equipment.length > 0 ? (
          <div className="mt-5">
            <h3 className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
              Equipment provided on site
            </h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {event.equipment.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-xl bg-secondary/50 px-3 py-2 text-[12.5px] font-medium text-foreground"
                >
                  <Check
                    className="size-3.5 shrink-0 text-eco"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Shirt className="size-4" aria-hidden="true" />
            </span>
            <div>
              <dt className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
                What to bring
              </dt>
              <dd className="mt-0.5 text-[12.5px] text-foreground">
                {event.bringOnSite ||
                  "Refillable water bottle, cap and closed-toe footwear."}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Users className="size-4" aria-hidden="true" />
            </span>
            <div>
              <dt className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
                Volunteer criteria
              </dt>
              <dd className="mt-0.5 text-[12.5px] text-foreground">
                {event.ageRange}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </div>
  );
}
