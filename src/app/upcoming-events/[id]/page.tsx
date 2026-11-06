import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";

import {
  EventDetailHero,
  EventDetailSkeleton,
  EventRegistrationCard,
  EventSummaryCard,
} from "@/components/events";
import { getEventById } from "@/lib/event-api";
import type { EventDetail } from "@/types/event";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

// The root layout's Navbar reads `usePathname()` outside a Suspense boundary,
// so this route opts out of instant-navigation validation and keeps blocking.
export const instant = false;

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const event = await getEventById(id);
    if (!event) return { title: "Event not found" };

    return {
      title: event.title,
      description:
        event.summary ||
        `Join ${event.title} with EcoBond in ${event.area} and earn ${event.ecoPoints} eco points.`,
      openGraph: {
        title: event.title,
        description: event.summary,
        images: event.image ? [{ url: event.image }] : undefined,
      },
    };
  } catch {
    return { title: "Event details" };
  }
}

function EventBreadcrumb({ title }: { title?: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
    >
      <Link href="/" className="shrink-0 transition-colors hover:text-primary">
        Home
      </Link>
      <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
      <Link
        href="/upcoming-events"
        className="shrink-0 transition-colors hover:text-primary"
      >
        Upcoming Events
      </Link>
      <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
      <span className="truncate text-foreground">
        {title ?? "Event details"}
      </span>
    </nav>
  );
}

function EventUnavailable() {
  return (
    <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/70 px-6 py-20 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Event details are temporarily unavailable
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We couldn&apos;t reach the events service. Please try again in a moment,
        or head back to the archive to keep browsing.
      </p>
      <Link
        href="/upcoming-events"
        className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to upcoming events
      </Link>
    </section>
  );
}

async function EventDetailContent({ params }: EventPageProps) {
  const { id } = await params;

  let event: EventDetail | null;
  try {
    event = await getEventById(id);
  } catch (error) {
    console.error("Could not load event:", error);
    return (
      <>
        <EventBreadcrumb />
        <div className="mt-5">
          <EventUnavailable />
        </div>
      </>
    );
  }

  if (!event) notFound();

  return (
    <>
      <EventBreadcrumb title={event.title} />

      <div className="mt-4">
        <EventDetailHero event={event} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <EventSummaryCard event={event} />
        <EventRegistrationCard event={event} />
      </div>
    </>
  );
}

export default function EventDetailPage({ params }: EventPageProps) {
  return (
    <div className="min-h-dvh bg-secondary/30 pb-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-5 sm:px-6 lg:px-8">
        <Suspense fallback={<EventDetailSkeleton />}>
          <EventDetailContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
