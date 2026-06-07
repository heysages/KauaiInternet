"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#why", label: "Why" },
  { href: "#explore", label: "Your Community" },
  { href: "#map", label: "Map" },
  { href: "#planning", label: "Planning" },
  { href: "#support", label: "Get Involved" },
];

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
        <Link href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-amber-emergency/20 border border-amber-glow/40 flex items-center justify-center group-hover:border-amber-glow/60 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-glow" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>
          <div className="hidden xs:block sm:block">
            <p className="font-semibold text-sm tracking-wide text-white">Kauai Resilience Network</p>
            <p className="text-[10px] text-mist/70 hidden sm:block">Community resilience movement</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-mist hover:text-white rounded-lg hover:bg-white/8 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#support"
            className="ml-2 px-4 py-2 text-sm font-semibold bg-amber-emergency hover:bg-amber-glow text-ocean-deep rounded-lg transition-colors"
          >
            Get Involved
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
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
        <div className="md:hidden border-t border-white/10 bg-ocean-deep/98 backdrop-blur-md px-5 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-mist hover:text-white hover:bg-white/8 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#support"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-3 text-sm font-semibold text-center bg-amber-emergency text-ocean-deep rounded-xl"
          >
            Get Involved
          </a>
        </div>
      )}
    </header>
  );
}
