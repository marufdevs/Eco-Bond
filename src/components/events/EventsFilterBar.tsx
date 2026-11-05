"use client";

import type { ReactNode } from "react";
import {
  ArrowUpDown,
  Building2,
  CalendarDays,
  ChevronDown,
  LayoutGrid,
  MapPin,
  RotateCcw,
  Search,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { EventCategory, EventSort, QuickFilterId } from "@/types/event";
import { filterControlStyles, quickFilterChipStyles } from "./event-styles";

const QUICK_FILTERS: {
  id: QuickFilterId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "weekend", label: "This Weekend", icon: CalendarDays },
  { id: "water", label: "Water Bodies", icon: Waves },
  { id: "urban", label: "Urban Dhaka", icon: Building2 },
  { id: "high-points", label: "High Eco-Points", icon: Sparkles },
];

type FilterSelectProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

function FilterSelect({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  children,
}: FilterSelectProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Icon
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/70"
        aria-hidden="true"
      />
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          filterControlStyles(),
          "cursor-pointer appearance-none pr-9 pl-9",
        )}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}

export type EventsFilterBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  area: string;
  onAreaChange: (value: string) => void;
  categories: EventCategory[];
  areas: string[];
  sort: EventSort;
  onSortChange: (value: EventSort) => void;
  activeQuickFilters: QuickFilterId[];
  onToggleQuickFilter: (id: QuickFilterId) => void;
  onReset: () => void;
};

export default function EventsFilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  area,
  onAreaChange,
  categories,
  areas,
  sort,
  onSortChange,
  activeQuickFilters,
  onToggleQuickFilter,
  onReset,
}: EventsFilterBarProps) {
  return (
    <section
      aria-label="Filter events"
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <label htmlFor="event-search" className="sr-only">
              Search events
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="event-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search by keyword, neighborhood, or organizer (e.g. Hatirjheel)"
              className={cn(filterControlStyles(), "pr-4 pl-10 text-[13px]")}
            />
          </div>

          <FilterSelect
            id="event-category"
            label="Filter by category"
            icon={LayoutGrid}
            value={category}
            onChange={onCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id="event-area"
            label="Filter by location"
            icon={MapPin}
            value={area}
            onChange={onAreaChange}
          >
            <option value="all">All Locations</option>
            {areas.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id="event-sort"
            label="Sort events"
            icon={ArrowUpDown}
            value={sort}
            onChange={(value) => onSortChange(value as EventSort)}
          >
            <option value="soonest">Upcoming Soonest</option>
            <option value="popular">Most Popular</option>
            <option value="points">Highest Eco-Points</option>
          </FilterSelect>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
              Quick filters:
            </span>
            {QUICK_FILTERS.map((filter) => {
              const active = activeQuickFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleQuickFilter(filter.id)}
                  className={cn(quickFilterChipStyles({ active }))}
                >
                  <filter.icon className="size-3.5" aria-hidden="true" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-secondary/60 px-3 text-xs font-semibold text-primary/80 transition-colors hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
