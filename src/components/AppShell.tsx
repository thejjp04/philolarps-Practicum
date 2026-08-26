"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { IconClose } from "@/components/icons";
import type { NavData } from "@/components/nav-data";

/**
 * Three-region shell: fixed sidebar, top bar over the main region only, and
 * the content column. Below 1024px the sidebar becomes a drawer.
 */
export function AppShell({
  nav,
  children,
}: {
  nav: NavData;
  children: React.ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawer(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-card)] focus:bg-[var(--accent)] focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-medium focus:text-[var(--on-accent)]"
      >
        Skip to content
      </a>

      {/* Persistent sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] lg:block">
        <Sidebar nav={nav} />
      </aside>

      {/* Drawer */}
      {drawer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--text-primary)_50%,transparent)]"
          />
          <div
            className="absolute inset-y-0 left-0 w-[280px]"
            style={{ boxShadow: "var(--shadow-panel)" }}
          >
            <Sidebar nav={nav} onNavigate={() => setDrawer(false)} />
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-4 rounded-[var(--radius-card)] p-2 text-[var(--sidebar-text)] transition-colors hover:bg-[var(--sidebar-wash)]"
            >
              <IconClose className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      )}

      {/* Main region */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-[240px]">
        <TopBar nav={nav} onOpenMenu={() => setDrawer(true)} />
        <main id="content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
