import type { Metadata } from "next";
// import { io } from "next/cache";
import { Suspense } from "react";

import { EventsArchive } from "@/components/events";
import {
  deriveEventsMeta,
  isPublishedEvent,
  normalizeEvent,
  type ApiEvent,
} from "@/lib/event-adapter";
import type { EcoEvent } from "@/types/event";

export const metadata: Metadata = {
  title: "Discover Environmental Events",
  description:
    "Find local environmental activities across Bangladesh, connect with passionate organizers, and become part of something meaningful.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL 


async function loadEvents(): Promise<EcoEvent[] | null> {
  // await io();

  try {
    const res = await fetch(`${API_URL}/all-events`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to load events (${res.status})`);
    }

    const documents = (await res.json()) as ApiEvent[];
    return documents
      .filter(isPublishedEvent)
      .map(normalizeEvent)
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Could not load events:", error);
    return null;
  }
}

async function EventsData() {
  const events = await loadEvents();
  if (!events) {
    return (
      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Events are temporarily unavailable
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          We couldn&apos;t reach the events service. Please try again in a
          moment.
        </p>
      </section>
    );
  }
  return <EventsArchive events={events} meta={deriveEventsMeta(events)} />;
}

export default function UpcomingEventsPage() {
  return (
    <Suspense
      fallback={<p className="p-8 text-muted-foreground">Loading events...</p>}
    >
      <EventsData />
    </Suspense>
  );
}
