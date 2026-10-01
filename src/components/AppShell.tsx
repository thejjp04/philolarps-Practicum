"use client";

import { useCallback, useEffect, useState } from "react";

import { PlayerBar } from "@/components/PlayerBar";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { IconClose } from "@/components/icons";
import type { NavData } from "@/components/nav-data";
import { MusicProvider } from "@/components/player";
import { Tour } from "@/components/tour";

export function AppShell({
  nav,
  children,
}: {
  nav: NavData;
  children: React.ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);

  const openMenu = useCallback(() => setDrawer(true), []);
  const closeMenu = useCallback(() => setDrawer(false), []);

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
    <MusicProvider>
      <Tour nav={nav} openMenu={openMenu} closeMenu={closeMenu}>
        <div className="flex min-h-screen">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-card)] focus:bg-[var(--accent)] focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-medium focus:text-[var(--on-accent)]"
          >
            Skip to content
          </a>
          <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] lg:block">
            <Sidebar nav={nav} />
          </aside>

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
                onClick={closeMenu}
                className="absolute inset-0 bg-[var(--scrim)]"
              />
              <div
                className="absolute inset-y-0 left-0 w-[280px]"
                style={{ boxShadow: "var(--shadow-panel)" }}
              >
                <Sidebar nav={nav} onNavigate={closeMenu} />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="absolute right-3 top-4 rounded-[var(--radius-card)] p-2 text-[var(--sidebar-text)] transition-colors hover:bg-[var(--sidebar-wash)]"
                >
                  <IconClose className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col lg:ml-[240px]">
            <TopBar nav={nav} onOpenMenu={openMenu} />
            <main
              id="content"
              className="min-w-0 flex-1"
              style={{ paddingBottom: "var(--player-height, 0px)" }}
            >
              {children}
            </main>
          </div>
          <PlayerBar />
        </div>
      </Tour>
    </MusicProvider>
  );
}
