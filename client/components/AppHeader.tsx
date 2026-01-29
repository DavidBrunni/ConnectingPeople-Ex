"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const appNav = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Forums", href: "/forums" },
  { label: "Events", href: "/events" },
  { label: "Profile", href: "/profile" },
] as const;

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  function handleSignOut() {
    signOut();
    setOpen(false);
    router.push("/");
  }

  return (
    <header className="bg-[#0a1628] text-white sticky top-0 z-40 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <Plane className="w-8 h-8" aria-hidden />
            <span className="text-xl font-semibold">Connecting People</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {appNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  pathname === href ? "text-cyan-400" : "hover:text-cyan-400"
                }`}
              >
                {label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors border-2 border-white text-white hover:bg-white/10 h-10 px-4"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors border-2 border-white text-white hover:bg-white/10 h-10 px-4"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md border-2 border-white text-white hover:bg-white/10 h-9 px-3 text-sm"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border-2 border-white text-white hover:bg-white/10 h-9 px-3 text-sm"
              >
                Sign In
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-lg hover:bg-white/10"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            open ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
          role="region"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2 pb-2">
            {appNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  pathname === href ? "bg-cyan-500/20 text-cyan-400" : "hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
