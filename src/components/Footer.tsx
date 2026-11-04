import { Camera, Globe, Network, Play, Sprout } from "lucide-react";

const QUICK_NAVIGATION = [
  "Explore Events",
  "Hatirjheel & Mirpur Campaigns",
  "Volunteer Guides",
  "Impact Reports",
];

const CATEGORIES = [
  "Tree Plantation",
  "Community Cleanup",
  "River Restoration",
  "Urban Gardening",
  "Recycling",
];

const SOCIAL_LINKS = [
  { label: "Website", icon: Globe },
  { label: "Photos & Stories", icon: Camera },
  { label: "Community Network", icon: Network },
  { label: "Video Channel", icon: Play },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service"];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2" aria-label="EcoBond home">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sprout className="size-5" />
              </span>
              <span className="font-heading text-lg font-bold text-primary">
                EcoBond
              </span>
            </a>
            <p className="mt-4 text-[11px] font-bold tracking-wider text-[#1f8a4c] uppercase">
              Small actions. Greener communities.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Empowering grassroots climate stewardship across Bangladesh. We
              coordinate tree plantings, urban cleanup drives, and
              community-financed river revival campaigns.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg bg-muted text-primary transition-colors hover:bg-secondary"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkColumn title="Quick Navigation" links={QUICK_NAVIGATION} />
          <FooterLinkColumn title="Categories" links={CATEGORIES} />

          {/* Dhaka chapter */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-foreground uppercase">
              Dhaka Chapter
            </h3>
            <div className="mt-4 flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
              <p>
                House 42, Road 11, Banani
                <br />
                Dhaka 1213, Bangladesh
              </p>
              <p>HQ: Dhanmondi Climate Hub</p>
              <a
                href="mailto:support@ecobond.org.bd"
                className="mt-1.5 w-fit font-semibold text-[#1f8a4c] hover:underline"
              >
                support@ecobond.org.bd
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5 max-sm:justify-center">
          <p className="text-sm text-muted-foreground">
            © 2025 EcoBond Foundation Bangladesh. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-6" aria-label="Legal links">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
