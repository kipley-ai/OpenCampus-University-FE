"use client";

import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { redirect, usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { useUserDetail } from "@/hooks/api/user";
import { useEffect } from "react";
import { SUBDOMAINS } from "@/utils/constants";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAccount();
  const pathname = usePathname();

  const subdomain = window.location.origin.split("//")[1].split(".")[0];
  if (SUBDOMAINS.includes(subdomain) && pathname !== "/") {
    redirect(process.env.NEXT_PUBLIC_HOST + pathname);
  }

  const { data: userDetail, isLoading } = useUserDetail();

  if (isLoading) return null;

  switch (status) {
    case "connected":
      if (
        userDetail?.data?.status !== "error" &&
        !userDetail?.data?.data.onboarding
      ) {
        return redirect("/onboarding");
      }

      return (
        <div className="flex h-[100dvh] overflow-hidden bg-black">
          {/* Sidebar */}
          <Sidebar />

          {/* Content area */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-[#171717] p-0 pl-0 lg:m-6 lg:ml-0 pb-8">
            <div className="rounded-t-lg border-t border-x border-gray-700">
              {/*  Site header */}
              <Header />

              <main className="h-[calc(100dvh-114px)] grow [&>*:first-child]:scroll-mt-16">
                {children}
              </main>
            </div>
          </div>
        </div>
      );
    case "disconnected":
      return redirect(`/?next=${pathname}`);
    default:
      break;
  }
}
