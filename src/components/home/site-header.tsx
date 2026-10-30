"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { APP_URL, CALCULATOR_URL } from "@/lib/links";
import { BASE_PATH } from "@/lib/base-path";
import { Menu, X } from "lucide-react";

const navigationLinks = [
  { label: "Tentang REMAX", href: APP_URL },
  { label: "Fitur", href: APP_URL },
  { label: "Pilihan KPR", href: APP_URL },
  { label: "FAQ", href: APP_URL },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      className="relative z-30 flex h-[72px] items-center justify-between gap-4 bg-paper px-6 sm:h-[104px] sm:px-10 lg:px-16"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}
    >
      <a
        href={APP_URL}
        aria-label="MAXLOAN, kembali ke beranda"
        className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        onClick={() => setMenuOpen(false)}
      >
        <Image
          src={`${BASE_PATH}/max-loan-logo.svg`}
          alt="MAXLOAN"
          width={194}
          height={30}
          loading="eager"
        />
      </a>
      <button
        ref={menuButton}
        type="button"
        aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex size-11 items-center justify-center rounded-full border border-line text-ink hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:hidden"
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <nav
        id="main-navigation"
        aria-label="Navigasi utama"
        className={`${menuOpen ? "block" : "hidden"} absolute inset-x-0 top-full border-b border-line bg-paper px-6 pt-2 pb-6 text-sm font-medium sm:px-10 lg:static lg:block lg:border-0 lg:p-0`}
      >
        <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">
          {navigationLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-sm py-3 text-slate transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-3 lg:mt-0">
            <a
              href={CALCULATOR_URL}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-3 text-ink transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Kalkulator KPR
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
