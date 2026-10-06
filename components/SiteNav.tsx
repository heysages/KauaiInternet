"use client";

import { useEffect, useState } from "react";
import HashLink from "@/components/HashLink";
import KauaiInternetLogo from "@/components/KauaiInternetLogo";
import { ReadingToggle } from "@/components/ReadingMode";

const technicalLinks = [
  { href: "/#lowell", label: "Lowell" },
  { href: "/#what-we-are-building", label: "Build" },
  { href: "/#when-everything-is-down", label: "Outages" },
  { href: "/#cost", label: "Cost" },
  { href: "/#coverage", label: "Map" },
  { href: "/#technology", label: "Technology" },
  { href: "/#host-node", label: "Host a Node" },
];

const neighborLinks = [
  { href: "/#service", label: "Service" },
  { href: "/#lost", label: "Lost connections" },
  { href: "/#where", label: "Where" },
  { href: "/#cost", label: "Cost" },
];

function NavLinks({
  links,
  stacked = false,
  onNavigate,
}: {
  links: { href: string; label: string }[];
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {links.map((link) => (
        <HashLink
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={
            stacked
              ? "block px-4 py-3 text-sm text-mist hover:text-white hover:bg-white/8 rounded-xl transition-colors"
              : "px-4 py-2 text-sm text-mist hover:text-white rounded-lg hover:bg-white/8 transition-colors"
          }
        >
          {link.label}
        </HashLink>
      ))}
      <HashLink
        href="/#support"
        onClick={onNavigate}
        className={
          stacked
            ? "block mt-2 px-4 py-3 text-sm font-semibold text-center bg-amber-emergency text-ocean-deep rounded-xl"
            : "ml-2 px-4 py-2 text-sm font-semibold bg-amber-emergency hover:bg-amber-glow text-ocean-deep rounded-lg transition-colors"
        }
      >
        Get Involved
      </HashLink>
    </>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ocean-deep/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-ocean-deep/20"
          : "bg-ocean-deep/80 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <HashLink href="/" className="group">
          <KauaiInternetLogo variant="light" compact />
        </HashLink>

        <div className="flex items-center gap-2">
          <ReadingToggle />
          <div className="reading-slot-technical hidden lg:flex items-center gap-1">
            <NavLinks links={technicalLinks} />
          </div>
          <div className="reading-slot-plain hidden lg:flex items-center gap-1">
            <NavLinks links={neighborLinks} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-ocean-deep/98 backdrop-blur-md px-5 py-4 space-y-1">
          <div className="reading-slot-technical">
            <NavLinks links={technicalLinks} onNavigate={() => setMenuOpen(false)} stacked />
          </div>
          <div className="reading-slot-plain">
            <NavLinks links={neighborLinks} onNavigate={() => setMenuOpen(false)} stacked />
          </div>
        </div>
      )}
    </header>
  );
}
