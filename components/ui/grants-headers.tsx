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
          <div className="flex h-1/2 items-center gap-4">
            <Link href="#" className="block">
              <Logo />
            </Link>
          </div>

          <div className="flex gap-4"></div>
        </div>
      </div>
    </header>
  );
}
