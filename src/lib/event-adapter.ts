import type {
  EcoEvent,
  EventCategory,
  EventsMeta,
  QuickFilterId,
} from "@/types/event";

export const FALLBACK_EVENT_IMAGE = "/Images/EventImg1.jpg";

/**
 * Shape returned by `GET /all-events`. Documents are stored as submitted by the
 * create-event form, so most fields are optional from the UI's perspective.
 */
export type ApiEvent = {
  _id: string;
  title?: string;
  summary?: string;
  description?: string;
  category?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  assemblyPoint?: string;
  zone?: string;
  capacity?: number;
  ecoPoints?: number;
  imageUrl?: string;
  status?: string;
  enrolled?: number;
  organizer?: {
    name?: string;
    initials?: string;
  };
};

const CATEGORY_MAP: Record<string, EventCategory> = {
  "Community Cleanup": "Community Cleanup",
  "Community Clean": "Community Clean",
  "Tree Plantation": "Tree Plantation",
  "River & Lake Restoration": "River & Lake Restoration",
  "River & Lake": "River & Lake",
  "Wetland Guard": "Wetland Guard",
  "Recycling Drive": "Recycling Drive",
  "Urban Gardens": "Urban Gardens",
  "Awareness Hub": "Awareness Hub",
  "Eco Lifestyle": "Eco Lifestyle",
};

const WATER_CATEGORIES = new Set<EventCategory>([
  "River & Lake Restoration",
  "River & Lake",
  "Wetland Guard",
]);

const WATER_HINTS =
  /river|lake|water|wetland|ghat|buriganga|hatirjheel|shitalakshya/i;

export function toCategory(value?: string): EventCategory {
  const normalized = value?.trim();
  if (!normalized) return "Community Cleanup";
  return CATEGORY_MAP[normalized] ?? "Community Cleanup";
}

export function toArea(zone?: string): string {
  const value = zone?.trim() ?? "";
  if (!value) return "Bangladesh";
  if (value.includes("Old Dhaka")) return "Old Dhaka";
  if (value.includes("Dhaka")) return "Dhaka";
  if (value.includes("Savar")) return "Savar";
  if (value.includes("Narayanganj")) return "Narayanganj";

  const cleaned = value.replace(/\s*Zone$/i, "").split(" - ")[0]?.trim();
  return cleaned || "Bangladesh";
}

export function formatTime(startTime?: string): string {
  if (!startTime) return "Time TBA";

  const [hourValue, minuteValue] = startTime.split(":").map(Number);
  if (Number.isNaN(hourValue) || Number.isNaN(minuteValue)) {
    return startTime;
  }

  const period = hourValue >= 12 ? "PM" : "AM";
  const hour = hourValue % 12 || 12;
  return `${String(hour).padStart(2, "0")}:${String(minuteValue).padStart(2, "0")} ${period}`;
}

function toDateOnly(value?: string): string {
  const dateOnly = value?.slice(0, 10) ?? "";
  return /^\d{4}-\d{2}-\d{2}$/.test(dateOnly) ? dateOnly : "";
}

function deriveTags(
  doc: ApiEvent,
  area: string,
  category: EventCategory,
): QuickFilterId[] {
  const tags = new Set<QuickFilterId>();
  const hints = `${doc.title ?? ""} ${doc.zone ?? ""} ${doc.assemblyPoint ?? ""}`;

  if (WATER_CATEGORIES.has(category) || WATER_HINTS.test(hints)) {
    tags.add("water");
  }

  if (area === "Dhaka" || area === "Old Dhaka") {
    tags.add("urban");
  }

  if ((doc.ecoPoints ?? 0) >= 140) {
    tags.add("high-points");
  }

  const date = toDateOnly(doc.date);
  if (date) {
    // Friday and Saturday are the weekend in Bangladesh.
    const day = new Date(`${date}T00:00:00`).getDay();
    if (day === 5 || day === 6) {
      tags.add("weekend");
    }
  }

  return [...tags];
}

function initialsFrom(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function normalizeEvent(doc: ApiEvent): EcoEvent {
  const title = doc.title?.trim() || "Untitled event";
  const category = toCategory(doc.category);
  const area = toArea(doc.zone);
  const organizerName = doc.organizer?.name?.trim() || "EcoBond Community";

  return {
    id: doc._id,
    title,
    summary: doc.summary?.trim() || doc.description?.trim() || "",
    category,
    image: doc.imageUrl?.trim() || FALLBACK_EVENT_IMAGE,
    imageAlt: `${title} cover image`,
    date: toDateOnly(doc.date),
    time: formatTime(doc.startTime),
    area,
    location: doc.assemblyPoint?.trim() || doc.zone?.trim() || area,
    ecoPoints: doc.ecoPoints ?? 0,
    enrolled: doc.enrolled ?? 0,
    capacity: doc.capacity ?? 0,
    organizer: {
      name: organizerName,
      initials:
        doc.organizer?.initials?.trim() ||
        initialsFrom(organizerName) ||
        "EC",
    },
    tags: deriveTags(doc, area, category),
  };
}

export function isPublishedEvent(doc: ApiEvent): boolean {
  return (doc.status ?? "published") === "published";
}

export function deriveEventsMeta(events: EcoEvent[]): EventsMeta {
  return {
    totalUpcoming: events.length,
    totalVolunteers: events.reduce(
      (total, event) => total + event.enrolled,
      0,
    ),
  };
}
