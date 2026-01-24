"use client";

import Link from "next/link";
import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";

const landingNav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Destinations", href: "#destinations" },
  { label: "Community", href: "#community" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative container mx-auto px-4 md:px-6 py-6">
      <nav className="flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <Plane className="w-8 h-8" aria-hidden />
          <span className="text-xl font-semibold text-white">Connecting People</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {landingNav.map(({ label, href }) => (
            <a key={href} href={href} className="text-white/90 hover:text-cyan-400 transition-colors">
              {label}
            </a>
          ))}
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors border-2 border-white text-white hover:bg-white/10 h-10 px-4"
          >
            Sign In
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md border-2 border-white text-white hover:bg-white/10 h-9 px-3 text-sm"
          >
            Sign In
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-lg text-white hover:bg-white/10"
            aria-expanded={open}
            aria-controls="landing-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        id="landing-mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-200 ${open ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        role="region"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-2 pb-2">
          {landingNav.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 px-3 rounded-lg text-white/90 hover:bg-white/10 hover:text-cyan-400 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
