"use client";

import { useAppProvider } from "@/providers/app-provider";
import Link from "next/link";
import Logo from "./logo";

export default function GrantsHeader() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  return (
    <header className="z-30 rounded-t-md border-b-2 border-border bg-sidebar">
      <div className="px-2 md:px-6">
        <div className="-mb-px flex h-12 items-center justify-between md:h-16">
          {/* Header: Left side */}
          <div className="flex h-1/2 w-5/12 items-center gap-4">
            <Link href="#" className="block">
              <Logo />
            </Link>
          </div>

          <div className="flex gap-4">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
