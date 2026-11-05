import { CalendarCheck, Users, type LucideIcon } from "lucide-react";

import type { EventsMeta } from "@/types/event";

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
};

function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex min-w-[9.5rem] items-center gap-2.5 rounded-xl border border-border/70 bg-card px-3.5 py-2.5 shadow-sm">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icon className="size-4.5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-lg font-bold text-foreground">
          {value}
        </span>
        <span className="text-[9px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
          {label}
        </span>
      </span>
    </div>
  );
}

export default function EventsStats({ meta }: { meta: EventsMeta }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <StatCard
        icon={CalendarCheck}
        value={meta.totalUpcoming.toLocaleString("en-US")}
        label="Upcoming"
      />
      <StatCard
        icon={Users}
        value={meta.totalVolunteers.toLocaleString("en-US")}
        label="Volunteers"
      />
    </div>
  );
}
