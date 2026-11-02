import Image from "next/image";
import { Fragment } from "react";
import { CirclePlus, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { emoji: "🌱", value: "14,280", label: "Saplings Planted this Monsoon" },
  { emoji: "⛔", value: "8.4 Tons", label: "Plastic Diverted from Hatirjheel" },
  { emoji: "💛", value: "180+", label: "Active Grassroots Guilds" },
];

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <Image
        src="/Images/HeroSection.jpg.jpg"
        alt="Volunteers planting trees together in Bangladesh"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#122e1d]/80 via-[#102a1a]/70 to-[#0c2114]/85" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:py-28">
        {/* Badge */}
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/90 ring-1 ring-white/20 sm:text-xs">
          <span className="size-2 rounded-full bg-green-400" />
          EcoBond Bangladesh • Small actions, greener communities.
        </p>

        {/* Heading */}
        <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Together, We Can Make Our Planet Greener.
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
          Discover local environmental events, connect with passionate people,
          and turn small actions into meaningful change across Dhaka,
          Chittagong, and beyond.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button className="h-12 w-full max-w-xs rounded-xl bg-[#1f8a4c] px-6 text-base text-white hover:bg-[#1b7a43] sm:w-auto sm:max-w-none">
            <Compass /> Explore Events
          </Button>
          <Button className="h-12 w-full max-w-xs rounded-xl bg-white/10 px-6 text-base text-white ring-1 ring-white/25 ring-inset hover:bg-white/20 sm:w-auto sm:max-w-none">
            <CirclePlus /> Start a Campaign
          </Button>
        </div>

        {/* Stats bar */}
        <div className="mt-12 w-full max-w-4xl rounded-2xl bg-white p-5 shadow-xl sm:mt-16 sm:p-6">
          <ul className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
            {STATS.map((stat, index) => (
              <Fragment key={stat.value}>
                <li className="flex items-center gap-3 sm:justify-center sm:px-10">
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {stat.emoji}
                  </span>
                  <span className="text-left text-sm font-semibold text-[#2b3a2f] sm:max-w-[13rem]">
                    {stat.value} {stat.label}
                  </span>
                </li>
                {index < STATS.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="hidden shrink-0 sm:block"
                  >
                    <span className="block size-1.5 rounded-full bg-foreground/20" />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
