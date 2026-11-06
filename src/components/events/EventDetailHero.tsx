"use client";

import Image from "next/image";
import { useState } from "react";
import { Droplets, ShieldCheck } from "lucide-react";

import { FALLBACK_EVENT_IMAGE, getHeroTitle } from "@/lib/event-adapter";
import { cn } from "@/lib/utils";
import type { EventDetail } from "@/types/event";
import { categoryDotStyles, categoryPillStyles } from "./event-styles";

const WATER_CATEGORIES = new Set([
  "River & Lake Restoration",
  "River & Lake",
  "Wetland Guard",
]);

function priorityLabel(category: EventDetail["category"]): string {
  if (WATER_CATEGORIES.has(category)) return "Lake Preservation Priority";
  if (category === "Tree Plantation") return "Urban Canopy Priority";
  if (category === "Recycling Drive") return "Circular Waste Priority";
  if (category === "Community Cleanup" || category === "Community Clean") {
    return "Waterfront Cleanup Priority";
  }
  return "Environmental Priority";
}

export default function EventDetailHero({ event }: { event: EventDetail }) {
  const [imageSrc, setImageSrc] = useState(event.image || FALLBACK_EVENT_IMAGE);
  const heroTitle = getHeroTitle(event.title);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/40 bg-primary shadow-sm">
      <div className="relative h-[330px] sm:h-[400px] lg:h-[440px]">
        <Image
          src={imageSrc}
          alt={event.imageAlt || `${event.title} cover image`}
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
          onError={() => setImageSrc(FALLBACK_EVENT_IMAGE)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"
        />

        <div className="absolute inset-x-4 top-4 flex flex-wrap items-center gap-2 sm:inset-x-6 sm:top-6">
          <span className={cn(categoryPillStyles())}>
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 rounded-full",
                categoryDotStyles[event.category] ?? "bg-eco",
              )}
            />
            {event.category}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-primary-foreground uppercase ring-1 ring-white/20">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Verified EcoBond Action
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-6 sm:bottom-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.16em] text-white/75 uppercase">
              Impact Sprint &bull; {event.area} Chapter
            </p>
            <h1 className="mt-1.5 max-w-3xl font-heading text-3xl leading-[1.08] font-bold text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/25 bg-white/15 p-3.5 backdrop-blur-md lg:max-w-[17rem]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
              <Droplets className="size-4.5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold tracking-[0.1em] text-white uppercase">
                {priorityLabel(event.category)}
              </span>
              <span className="mt-0.5 block truncate text-sm font-medium text-white/90">
                {event.zone}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
