import { cache } from "react";

import type { EventDetail } from "@/types/event";
import { normalizeEventDetail, type ApiEvent } from "./event-adapter";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Loads a single published event by id.
 *
 * Returns `null` for ids the API does not recognise (404) or malformed ids
 * (400) so the page can render a not-found state; network and server failures
 * are thrown so they can be presented as a retryable error.
 */
export const getEventById = cache(
  async (id: string): Promise<EventDetail | null> => {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const res = await fetch(`${API_URL}/event/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });

    if (res.status === 404 || res.status === 400) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to load event (${res.status})`);
    }

    const doc = (await res.json()) as ApiEvent;
    if (!doc?._id) return null;

    return normalizeEventDetail(doc);
  },
);
