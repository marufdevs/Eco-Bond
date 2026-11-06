"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, MapPin } from "lucide-react";

import { FALLBACK_EVENT_IMAGE } from "@/lib/event-adapter";
import { cn } from "@/lib/utils";
import type { EcoEvent } from "@/types/event";
import {
  categoryDotStyles,
  categoryPillStyles,
  eventCardStyles,
  eventCtaStyles,
} from "./event-styles";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatEventDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return "Date TBA";
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export default function EventCard({ event }: { event: EcoEvent }) {
  const [imageSrc, setImageSrc] = useState(event.image || FALLBACK_EVENT_IMAGE);

  const organizer = event.organizer ?? {
    name: "EcoBond Community",
    initials: "EC",
  };
  const enrolled = event.enrolled ?? 0;
  const capacity = event.capacity ?? 0;
  const progressMax = capacity > 0 ? capacity : 1;
  const fillPercent =
    capacity > 0 ? Math.min(100, Math.round((enrolled / capacity) * 100)) : 0;

  return (
    <Link
      href={`/upcoming-events/${event.id}`}
      aria-label={`View ${event.title}`}
      className={cn(
        eventCardStyles(),
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageSrc}
          alt={event.imageAlt || `${event.title} cover image`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setImageSrc(FALLBACK_EVENT_IMAGE)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
        />

        <span className={cn(categoryPillStyles(), "absolute top-3 left-3")}>
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              categoryDotStyles[event.category] ?? "bg-eco",
            )}
          />
          {event.category}
        </span>

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white drop-shadow-sm">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatEventDate(event.date)} &bull; {event.time || "Time TBA"}
          </p>
          <span className="rounded-full bg-eco px-2.5 py-1 text-[11px] font-bold text-eco-foreground shadow-sm">
            +{event.ecoPoints} PTS
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {event.location || event.area || "Location TBA"}
          </span>
        </p>

        <h3 className="mt-2 line-clamp-2 font-heading text-[17px] leading-snug font-bold text-foreground">
          {event.title}
        </h3>

        {event.summary ? (
          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
            {event.summary}
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="font-medium text-muted-foreground">
              Volunteers Enrolled
            </span>
            <span className="font-semibold text-foreground">
              {enrolled} / {capacity} spots
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={`${enrolled} of ${capacity} volunteer spots filled`}
            aria-valuemin={0}
            aria-valuemax={progressMax}
            aria-valuenow={enrolled}
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-eco transition-[width] duration-300"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">
              {organizer.initials}
            </span>
            <span className="truncate text-[11px] font-semibold text-foreground/80">
              {organizer.name}
            </span>
          </div>

          <span className={cn(eventCtaStyles())}>
            View Event
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
