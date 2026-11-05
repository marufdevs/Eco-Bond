"use client";

import { useState } from "react";

import type {
  EcoEvent,
  EventCategory,
  EventSort,
  EventsMeta,
  QuickFilterId,
} from "@/types/event";
import EventGrid from "./EventGrid";
import EventsFilterBar from "./EventsFilterBar";
import EventsHero from "./EventsHero";

const DEFAULT_SORT: EventSort = "soonest";

type EventsArchiveProps = {
  events: EcoEvent[];
  meta: EventsMeta;
};

export default function EventsArchive({ events, meta }: EventsArchiveProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("all");
  const [sort, setSort] = useState<EventSort>(DEFAULT_SORT);
  const [quickFilters, setQuickFilters] = useState<QuickFilterId[]>([]);

  const categories: EventCategory[] = [
    ...new Set(events.map((event) => event.category)),
  ].sort();
  const areas = [...new Set(events.map((event) => event.area))].sort();

  // React Compiler memoizes this derivation automatically.

  const visibleEvents = events.filter((event) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      const haystack =
        `${event.title} ${event.location} ${event.organizer?.name ?? ""} ${event.summary}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) return false;
    }

    if (category !== "all" && event.category !== category) return false;
    if (area !== "all" && event.area !== area) return false;
    if (
      quickFilters.length > 0 &&
      !quickFilters.every((tag) => (event.tags ?? []).includes(tag))
    ) {
      return false;
    }

    return true;
  });

  const fillRate = (event: EcoEvent) =>
    event.capacity > 0 ? event.enrolled / event.capacity : 0;

  const sortedEvents = [...visibleEvents].sort((a, b) => {
    if (sort === "popular") {
      return fillRate(b) - fillRate(a);
    }
    if (sort === "points") {
      return b.ecoPoints - a.ecoPoints;
    }
    return a.date.localeCompare(b.date);
  });

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setArea("all");
    setSort(DEFAULT_SORT);
    setQuickFilters([]);
  }

  function toggleQuickFilter(id: QuickFilterId) {
    setQuickFilters((current) =>
      current.includes(id)
        ? current.filter((filter) => filter !== id)
        : [...current, id],
    );
  }

  return (
    <div>
      <div className="border-b border-border/50 bg-secondary/40 pb-7">
        <EventsHero meta={meta} />
        <EventsFilterBar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          area={area}
          onAreaChange={setArea}
          categories={categories}
          areas={areas}
          sort={sort}
          onSortChange={setSort}
          activeQuickFilters={quickFilters}
          onToggleQuickFilter={toggleQuickFilter}
          onReset={resetFilters}
        />
      </div>

      <EventGrid
        events={sortedEvents}
        totalUpcoming={meta.totalUpcoming}
        onReset={resetFilters}
      />
    </div>
  );
}
