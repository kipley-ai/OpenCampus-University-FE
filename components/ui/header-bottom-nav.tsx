"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderBottomNav = () => {
  const pathname = usePathname();

  const active = (url: string) => {
    if (pathname.startsWith(url)) return "border-b-2 border-b-primary";
    return "opacity-50";
  };

  return (
    <div className="flex gap-8">
      <Link
        href="/dashboard"
        className={`p-1 font-semibold text-primary ${active("/dashboard")}`}
      >
        Home
      </Link>
      <div className={`p-1 font-semibold text-primary ${active("/nft")}`}>
        Courses
      </div>
      <div className={`p-1 font-semibold text-primary ${active("/knowledge")}`}>
        My Learning
      </div>
      <div
        className={`p-1 font-semibold text-primary ${active("/manage-account")}`}
      >
        Resources
      </div>
    </div>
  );
};
