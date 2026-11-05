"use client";

import { useState } from "react";
import { Bell, Menu, Plus, Sprout, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import UserMenu from "@/components/UserMenu";

const NAV_LINKS = [
  { label: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();


  return (
    <header className="sticky top-0 z-50 bg-secondary">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="EcoBond home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <span className="font-heading text-lg font-bold text-primary">EcoBond</span>
          <span className="hidden rounded-full border border-primary/15 bg-card px-2.5 py-0.5 text-[10px] font-bold tracking-[0.15em] text-primary/70 md:inline-block">
            BANGLADESH
          </span>
        </Link>

        {/* Desktop / tablet nav */}
        <nav className="hidden items-center rounded-full bg-card p-1 shadow-sm md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium text-primary/60 transition-colors hover:text-primary",
                  active && "bg-white text-primary shadow-sm"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <>
          {
            session?.user ? (<div className="flex items-center gap-1 sm:gap-1.5">
              {/* Visual-only theme button */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Theme"
                className="rounded-full text-primary/70"
              >
                <Sun className="size-5" />
              </Button>

              <span className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                  className="rounded-full text-primary/70"
                >
                  <Bell className="size-5" />
                </Button>
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-500" />
              </span>

              <Link href={"/create-event"}>
                <Button className="hidden h-9 rounded-lg px-3.5 md:inline-flex">
                  <Plus /> Create Event
                </Button>
              </Link>

              {/* User chip (desktop only) */}
              <UserMenu />

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-primary md:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>) : (<div>
              <Link href='/signup'>
                <Button className="hidden h-9 rounded-lg px-3.5 md:inline-flex">
                  <Plus /> Login Now
                </Button>
              </Link>
            </div>)
          }
        </>

      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="border-t border-border/60 bg-secondary px-4 pb-4 pt-2 md:hidden" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium text-primary/70 hover:bg-muted",
                      active && "bg-card text-primary shadow-sm"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={"/create-event"}>
            <Button className="mt-3 h-10 w-full rounded-lg">
              <Plus /> Create Event
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
