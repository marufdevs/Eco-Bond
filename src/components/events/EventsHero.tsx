import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { EventsMeta } from "@/types/event";
import EventsStats from "./EventsStats";

export default function EventsHero({ meta }: { meta: EventsMeta }) {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pt-5 pb-7 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
      >
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <Link
          href="/upcoming-events"
          className="transition-colors hover:text-primary"
        >
          Events
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-foreground">Discover</span>
      </nav>

      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-primary/75 uppercase ring-1 ring-border/70">
        <span className="size-1.5 rounded-full bg-eco" aria-hidden="true" />
        Grassroots climate action hub &bull; Dhaka chapter &amp; beyond
      </p>

      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Discover Environmental Events
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Find local environmental activities across Bangladesh, connect with
            passionate organizers, and become part of something meaningful.
          </p>
        </div>

        <EventsStats meta={meta} />
      </div>
    </section>
  );
}
