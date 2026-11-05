import { cva } from "class-variance-authority";

import type { EventCategory } from "@/types/event";

/**
 * Shared visual primitives for the events archive.
 *
 * Everything here is expressed with semantic theme tokens so a brand change or
 * a light/dark switch only needs to touch `globals.css`. Components should
 * import these instead of hardcoding colours.
 */

export const eventCardStyles = cva(
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      interactive: {
        true: "hover:-translate-y-0.5 hover:shadow-md",
        false: "",
      },
    },
    defaultVariants: {
      interactive: true,
    },
  },
);

export const categoryPillStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-primary uppercase shadow-sm backdrop-blur-sm",
);

export const categoryDotStyles: Record<EventCategory, string> = {
  "Community Cleanup": "bg-eco",
  "Community Clean": "bg-eco",
  "Tree Plantation": "bg-primary",
  "River & Lake Restoration": "bg-chart-2",
  "River & Lake": "bg-chart-2",
  "Wetland Guard": "bg-chart-5",
  "Recycling Drive": "bg-chart-3",
  "Urban Gardens": "bg-chart-3",
  "Awareness Hub": "bg-chart-4",
  "Eco Lifestyle": "bg-chart-1",
};

export const quickFilterChipStyles = cva(
  "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground",
        false: "bg-secondary/70 text-primary/80 hover:bg-secondary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const filterControlStyles = cva(
  "h-11 w-full rounded-xl border border-border/80 bg-background/70 text-sm text-foreground shadow-sm transition-colors outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/25",
);

export const eventCtaStyles = cva(
  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
);
