"use client";

import { useEffect, useSyncExternalStore } from "react";
import { IconMoon, IconSun } from "@/components/icons";

export const THEME_STORAGE_KEY = "philolarps-theme";

export const themeScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",s==="dark"||s==="light"?s:(d?"dark":"light"));}catch(e){}})();`;

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const current = useSyncExternalStore<Theme | null>(
    subscribeTheme,
    readTheme,
    () => null,
  );
  const ready = current !== null;
  const theme: Theme = current ?? "light";

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      const next: Theme = media.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="group flex w-full items-center gap-2.5 rounded-[var(--radius-card)] px-3 py-2.5 text-left transition-colors hover:bg-[var(--sidebar-wash)]"
    >
      {isDark ? (
        <IconMoon className="h-[18px] w-[18px] shrink-0 opacity-80" />
      ) : (
        <IconSun className="h-[18px] w-[18px] shrink-0 opacity-80" />
      )}

      <span className="flex-1 text-[13px] font-medium">
        {ready ? (isDark ? "Dark" : "Light") : "Theme"}
      </span>
      <span
        aria-hidden="true"
        className="relative h-[20px] w-[36px] shrink-0 rounded-[var(--radius-pill)] border border-[color-mix(in_srgb,currentColor_35%,transparent)] bg-[color-mix(in_srgb,currentColor_16%,transparent)]"
      >
        <span
          className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-current transition-[left] duration-200"
          style={{ left: isDark ? "18px" : "3px" }}
        />
      </span>
    </button>
  );
}
