"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "About", href: "#about", anchor: true },
  { label: "Inventory", href: "/inventory" },
  { label: "Borrow", href: "/borrow" },
  { label: "Bulk Add", href: "/books/bulk" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = "transition hover:text-amber-200";

  function renderLink(l, extraClass = "") {
    const cls = `${linkClass} ${extraClass}`;
    return l.anchor ? (
      <a key={l.label} href={l.href} onClick={() => setOpen(false)} className={cls}>
        {l.label}
      </a>
    ) : (
      <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className={cls}>
        {l.label}
      </Link>
    );
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-700/50 bg-stone-900/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-wide text-amber-100 sm:text-2xl">
          📚 Bookshelf
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-8 text-lg text-stone-200 md:flex">
          {LINKS.map((l) => renderLink(l))}
        </div>

        {/* Hamburger button (sirf mobile) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md text-stone-200 hover:bg-stone-800 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t border-stone-700/50 bg-stone-900 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-2 text-lg text-stone-200">
            {LINKS.map((l) => renderLink(l, "border-b border-stone-800 py-3 last:border-b-0"))}
          </div>
        </div>
      )}
    </nav>
  );
}