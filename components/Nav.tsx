"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Coaching", href: "/coaching" },
  { label: "Tracker", href: "/tracker" },
  { label: "Community", href: "/community" },
  { label: "Memberships", href: "/memberships" },
];

const couplesLinks = [
  { label: "Budy Date", href: "/start" },
  { label: "Couples Therapy", href: "/couples/therapy" },
];

export default function Nav() {
  const pathname = usePathname();
  const [couplesOpen, setCouplesOpen] = useState(false);

  return (
    <header className="w-full border-b border-border">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl tracking-wide text-accent"
          style={{ fontFamily: "var(--font-chewy), cursive" }}
        >
          budy system
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                pathname === link.href
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setCouplesOpen((o) => !o)}
              onBlur={() => setTimeout(() => setCouplesOpen(false), 150)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors ${
                pathname.startsWith("/couples") || pathname === "/start"
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Couples
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform ${couplesOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {couplesOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-border bg-surface p-1 shadow-lg">
                {couplesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
                    onClick={() => setCouplesOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
