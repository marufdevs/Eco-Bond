export type EventCategory =
  | "Community Cleanup"
  | "Community Clean"
  | "Tree Plantation"
  | "River & Lake Restoration"
  | "River & Lake"
  | "Wetland Guard"
  | "Recycling Drive"
  | "Urban Gardens"
  | "Awareness Hub"
  | "Eco Lifestyle";

export type QuickFilterId = "weekend" | "water" | "urban" | "high-points";

export type EventSort = "soonest" | "popular" | "points";

export type EventOrganizer = {
  name: string;
  initials: string;
};

export type EcoEvent = {
  id: string;
  title: string;
  summary: string;
  category: EventCategory;
  image: string;
  imageAlt: string;
  /** ISO date, e.g. "2026-11-18" */
  date: string;
  /** Display time, e.g. "08:00 AM" */
  time: string;
  /** Broad area used by the location filter */
  area: string;
  /** Full venue line shown on the card */
  location: string;
  ecoPoints: number;
  enrolled: number;
  capacity: number;
  organizer: EventOrganizer;
  tags: QuickFilterId[];
};

/** Full event record used by the single event page. */
export type EventDetail = EcoEvent & {
  /** Long-form campaign briefing. */
  description: string;
  /** Display time, e.g. "12:30 PM" */
  endTime: string;
  /** Raw metropolitan zone/Thana, e.g. "Dhaka North - Tejgaon / Hatirjheel Zone" */
  zone: string;
  ageRange: string;
  equipment: string[];
  bringOnSite: string;
  targetAmount: number;
  targetUnit: string;
};

export type EventsMeta = {
  /** Total scheduled events represented by the archive (used in the count line). */
  totalUpcoming: number;
  totalVolunteers: number;
};
