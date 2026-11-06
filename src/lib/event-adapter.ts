import type {
  EcoEvent,
  EventCategory,
  EventDetail,
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
  ageRange?: string;
  equipment?: string[];
  bringOnSite?: string;
  targetAmount?: number;
  targetUnit?: string;
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

function formatClock(value: string): string | null {
  const [hourValue, minuteValue] = value.split(":").map(Number);
  if (Number.isNaN(hourValue) || Number.isNaN(minuteValue)) {
    return null;
  }

  const period = hourValue >= 12 ? "PM" : "AM";
  const hour = hourValue % 12 || 12;
  return `${String(hour).padStart(2, "0")}:${String(minuteValue).padStart(2, "0")} ${period}`;
}

export function formatTime(startTime?: string): string {
  if (!startTime) return "Time TBA";
  return formatClock(startTime) ?? startTime;
}

/** Formats a `HH:MM` value, returning an empty string when it is missing. */
export function formatClockTime(value?: string): string {
  if (!value) return "";
  return formatClock(value) ?? value;
}

export function formatTimeRange(
  startTime?: string,
  endTime?: string,
): string {
  const start = formatClockTime(startTime);
  const end = formatClockTime(endTime);
  if (!start) return "Time TBA";
  return end ? `${start} \u2013 ${end}` : start;
}

/** Check-in opens 20 minutes before the campaign start time. */
export function getCheckInTime(startTime?: string): string | null {
  if (!startTime) return null;

  const match = startTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return null;

  const period = match[3]?.toUpperCase();
  let hour = Number(match[1]);
  const minute = Number(match[2]);

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const total = Math.max(0, hour * 60 + minute - 20);
  const checkInHour = Math.floor(total / 60);
  const checkInMinute = total % 60;
  return formatClock(
    `${String(checkInHour).padStart(2, "0")}:${String(checkInMinute).padStart(2, "0")}`,
  );
}

/** Short campaign name used for the hero; full title is kept for the body. */
export function getHeroTitle(title: string): string {
  const [short] = title.split(":");
  return short?.trim() || title;
}

const LONG_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Formats an ISO date as "Wednesday, November 18, 2026" without timezone drift. */
export function formatLongDate(isoDate?: string): string {
  const dateOnly = toDateOnly(isoDate);
  if (!dateOnly) return "Date TBA";

  const [year, month, day] = dateOnly.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(date.getTime())) return "Date TBA";

  return `${WEEKDAYS[date.getUTCDay()]}, ${LONG_MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
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

export function normalizeEventDetail(doc: ApiEvent): EventDetail {
  const event = normalizeEvent(doc);
  const zone = doc.zone?.trim() || event.area;

  return {
    ...event,
    description: doc.description?.trim() || "",
    endTime: formatClockTime(doc.endTime),
    zone,
    ageRange: doc.ageRange?.trim() || "All community members",
    equipment: (doc.equipment ?? []).map((item) => item.trim()).filter(Boolean),
    bringOnSite: doc.bringOnSite?.trim() || "",
    targetAmount: Number(doc.targetAmount) || 0,
    targetUnit: doc.targetUnit?.trim() || "kg",
    location: doc.assemblyPoint?.trim() || zone,
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
