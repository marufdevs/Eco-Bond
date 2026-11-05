import { SearchX, ShieldCheck } from "lucide-react";

import type { EcoEvent } from "@/types/event";
import EventCard from "./EventCard";

type EventGridProps = {
  events: EcoEvent[];
  totalUpcoming: number;
  onReset: () => void;
};

export default function EventGrid({
  events,
  totalUpcoming,
  onReset,
}: EventGridProps) {
  return (
    <section
      aria-label="Events archive"
      className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="size-1.5 rounded-full bg-eco" aria-hidden="true" />
          Showing <span className="font-bold text-foreground">{events.length}</span>{" "}
          of {totalUpcoming} scheduled environmental events
        </p>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          Verified Climate Impact Metrics
          <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
        </p>
      </div>

      {events.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
            <SearchX className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-heading text-lg font-bold text-foreground">
            No events match your filters
          </h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try a different keyword, pick another area, or clear the quick
            filters to see the full archive.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
