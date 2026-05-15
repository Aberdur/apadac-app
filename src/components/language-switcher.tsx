"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { localeLabels, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  compact?: boolean;
  locale: Locale;
};

export const LanguageSwitcher = ({ compact = false, locale }: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const redirect = `${pathname}${query ? `?${query}` : ""}`;

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 p-1 shadow-[0_10px_30px_rgba(111,83,100,0.10)] backdrop-blur ${
        compact ? "" : ""
      }`}
    >
      {locales.map((item) => (
        <a
          key={item}
          className={`button-soft rounded-full font-semibold uppercase tracking-[0.12em] ${
            compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1 text-[11px]"
          } ${
            item === locale
              ? "bg-[var(--olive-deep)] text-white"
              : "text-[var(--muted)] hover:bg-white"
          }`}
          href={`/api/locale?locale=${item}&redirect=${encodeURIComponent(redirect)}`}
        >
          {localeLabels[item]}
        </a>
      ))}
    </div>
  );
};
