"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MobileMenuProps = {
  adminLabel: string;
  announcementsLabel: string;
  adoptLabel: string;
  adoptionItems: Array<{
    href: string;
    label: string;
  }>;
  brandTagline: string;
  casesOfSuccessLabel: string;
  contactLabel: string;
  helpLabel: string;
  helpItems: Array<{
    href: string;
    label: string;
  }>;
  menuLabel: string;
};

export const MobileMenu = ({
  adminLabel,
  announcementsLabel,
  adoptLabel,
  adoptionItems = [],
  brandTagline,
  casesOfSuccessLabel,
  contactLabel,
  helpLabel,
  helpItems = [],
  menuLabel,
}: MobileMenuProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeMenu = () => {
      if (!detailsRef.current) {
        return;
      }

      detailsRef.current.open = false;
      setIsOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(event.currentTarget.open);
  };

  const handleNavigate = () => {
    if (!detailsRef.current) {
      return;
    }

    detailsRef.current.open = false;
    setIsOpen(false);
  };

  return (
    <header className="sticky top-3 z-30 mb-8 md:hidden">
      <details
        ref={detailsRef}
        className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur"
        onToggle={handleToggle}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={handleNavigate}>
            <Image
              alt="Logo de APADAC"
              className="h-12 w-12 rounded-2xl object-contain"
              height={48}
              src="/logo-apadac-mark.png"
              width={48}
            />
            <div className="min-w-0">
              <p className="display-font text-lg leading-none">APADAC</p>
              <p className="truncate text-xs text-[var(--muted)]">{brandTagline}</p>
            </div>
          </Link>
          <span className="button-soft inline-flex shrink-0 rounded-full border border-[var(--line-strong)] px-4 py-2 text-xs font-semibold text-[var(--muted)]">
            {menuLabel}
          </span>
        </summary>

        <div className="max-h-[calc(100svh-7rem)] overflow-y-auto overscroll-contain border-t border-[var(--line)] px-4 pb-4">
          <nav className="mt-4 flex flex-col gap-2 text-sm font-medium text-[var(--muted)]">
            <Link
              className="rounded-2xl px-4 py-3 hover:bg-white/70"
              href="/apadac"
              onClick={handleNavigate}
            >
              APADAC
            </Link>
            <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/55 p-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                {adoptLabel}
              </p>
              <div className="flex flex-col gap-1">
                {adoptionItems.map((item) => (
                  <Link
                    className="rounded-2xl px-3 py-2.5 hover:bg-white/80"
                    href={item.href}
                    key={item.href}
                    onClick={handleNavigate}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className="rounded-2xl px-4 py-3 hover:bg-white/70"
              href="/casos-de-exito"
              onClick={handleNavigate}
            >
              {casesOfSuccessLabel}
            </Link>
            <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/55 p-2">
              <Link
                className="block rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)] hover:bg-white/80"
                href="/como-ayudar"
                onClick={handleNavigate}
              >
                {helpLabel}
              </Link>
              <div className="flex flex-col gap-1">
                {helpItems.map((item) => (
                  <Link
                    className="rounded-2xl px-3 py-2.5 hover:bg-white/80"
                    href={item.href}
                    key={item.href}
                    onClick={handleNavigate}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link className="rounded-2xl px-4 py-3 hover:bg-white/70" href="/anuncios" onClick={handleNavigate}>
              {announcementsLabel}
            </Link>
            <Link
              className="rounded-2xl px-4 py-3 hover:bg-white/70"
              href="/como-ayudar#contacto"
              onClick={handleNavigate}
            >
              {contactLabel}
            </Link>
          </nav>
          {/* Use a hard navigation to keep the public app from preloading the Payload admin bundle. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            className="button-soft mt-4 inline-flex w-full justify-center rounded-full bg-[var(--coral)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            href="/admin"
            onClick={handleNavigate}
          >
            {adminLabel}
          </a>
        </div>
      </details>
    </header>
  );
};
