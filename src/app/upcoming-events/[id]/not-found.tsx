import Link from "next/link";
import { ArrowLeft, CalendarX2 } from "lucide-react";

export default function EventNotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary/30 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
          <CalendarX2 className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
          Event not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This campaign may have been unpublished, cancelled, or the link is
          incorrect.
        </p>
        <Link
          href="/upcoming-events"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Browse upcoming events
        </Link>
      </div>
    </div>
  );
}
