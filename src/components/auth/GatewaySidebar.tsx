import Image from "next/image";
import { Mountain, Quote, ShieldCheck, Sprout, Users } from "lucide-react";

const SIDEBAR_STATS = [
  { icon: Users, value: "19,450+", label: "Registered Volunteers" },
  { icon: Mountain, value: "482+", label: "Verified Drives" },
];

export default function GatewaySidebar() {
  return (
    <aside className="relative isolate flex flex-col overflow-hidden bg-primary p-6 text-primary-foreground sm:p-8 lg:p-10">
      {/* Faded photo at the bottom (hidden on mobile to keep the strip compact) */}
      <div className="absolute inset-x-0 bottom-0 top-1/3 -z-10 hidden md:block">
        <Image
          src="/Images/HeroSection.jpg.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 0px"
          className="object-cover object-bottom opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/40 to-primary/90" />
      </div>

      {/* Badge */}
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80">
        <Sprout className="size-3" />
        EcoBond Bangladesh
      </span>

      {/* Heading */}
      <h1 className="mt-5 max-w-sm text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]">
        Join the Grassroots Climate Movement
      </h1>
      <p className="mt-4 max-w-sm text-sm text-white/70 sm:text-[0.95rem]">
        Small individual contributions in our urban neighborhoods spark
        monumental green transformation across the Bengal delta.
      </p>

      {/* Testimonial + stats pinned towards the bottom */}
      <div className="mt-auto flex flex-col gap-6 pt-10">
        {/* Testimonial (tablet and up) */}
        <figure className="hidden rounded-2xl border border-white/10 bg-white/5 p-4 md:block lg:p-5">
          <Quote className="size-5 fill-green-400 text-green-400" />
          <blockquote className="mt-2 text-sm text-white/90 italic">
            &ldquo;Being part of the Mirpur canal revival opened my eyes. Within
            two weekends, we reforested 400 meters of degraded riverbank.&rdquo;
          </blockquote>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-white/70">— Rafid Mahmud, Dhanmondi Chapter</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1f8a4c] px-2.5 py-0.5 text-[10px] font-semibold text-white">
              <ShieldCheck className="size-3" /> Verified Citizen
            </span>
          </figcaption>
        </figure>

        {/* Stats */}
        <div className="flex items-stretch gap-5 sm:gap-6">
          {SIDEBAR_STATS.map((stat, index) => (
            <div key={stat.label} className="flex flex-1 items-center gap-3">
              {index > 0 && <span className="h-12 w-px bg-white/15" aria-hidden="true" />}
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <stat.icon className="size-5 text-white/80" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-bold sm:text-xl">{stat.value}</span>
                <span className="text-[9px] font-semibold tracking-widest text-white/55 uppercase sm:text-[10px]">
                  {stat.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
