"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "../Button";

export function DashboardNavbar() {
  const pathname = usePathname();

  // Derive page title from the current route
  const getPageTitle = () => {
    if (!pathname || pathname === "/") return "Home";
    // Get the last segment of the path
    const segments = pathname.split("/").filter(Boolean);
    const route = segments[segments.length - 1] || "Home";
    return route.charAt(0).toUpperCase() + route.slice(1);
  };

  return (
    <nav className="flex h-[72px] w-full shrink-0 items-center justify-between border-b border-white/5 bg-[#18191D] pr-5 pl-16 lg:px-8">
      {/* ── LEFT: Dynamic page title ── */}
      <h1 className="font-utsaha text-2xl tracking-wide text-white">
        {getPageTitle()}
      </h1>

      {/* ── RIGHT: Bell icon + Create Identity button ── */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification bell */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* ── "Create Identity" button (Using Button component) ── */}
        <Button className="flex items-center gap-2.5 rounded-full border-none bg-brand-green px-4 py-2.5 font-utsaha text-base text-[#18191D] shadow-none transition-transform duration-200 ease-out hover:scale-[1.02] hover:bg-brand-green/90 active:scale-[0.98] md:px-5 md:text-xl">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="shrink-0"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create Identity</span>
        </Button>
      </div>
    </nav>
  );
}
