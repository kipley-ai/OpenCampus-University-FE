"use client";

import Header from "@/components/ui/header";
import { useState, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useUserDetail } from "@/hooks/api/user";
import { useAppProvider } from "@/providers/app-provider";
import { SUBDOMAINS, CREATOR_ROLES } from "@/utils/constants";

interface EducatorLayoutProps {
  children: React.ReactNode;
}

export default function EducatorLayout({ children }: EducatorLayoutProps) {
  const pathname = usePathname();
  const { data: userDetail, isPending } = useUserDetail();

  const subdomain = window.location.origin.split("//")[1].split(".")[0];
  if (SUBDOMAINS.includes(subdomain) && pathname !== "/") {
    redirect(process.env.NEXT_PUBLIC_HOST + pathname);
  }

  const {
    session,
    setSession,
    setModalUnauthenticated,
    modalTopUpSuccessful,
    setModalTopUpSuccessful,
    modalTopUpFailed,
    setModalTopUpFailed,
    topUpAmount,
  } = useAppProvider();

  const { authState, ocAuth } = useOCAuth();

  useEffect(() => {
    if (
      pathname !== "/" &&
      (!session?.address || session?.exp * 1000 < Date.now())
    ) {
      redirect("/dashboard?isUnauthenticated=true");
    }
  }, [pathname, session?.address, session?.exp]);

  // if (
  //   !isPending &&
  //   !CREATOR_ROLES.includes(userDetail?.data?.data?.role?.toUpperCase())
  // ) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="h-[max(100vh, fit-content)] relative flex flex-1 grow flex-col overflow-y-auto bg-container text-heading">
      <Header />
      <main className="max-w-[1100px] grow self-center p-3 md:p-6 xl:w-5/6 xl:pl-8 xl:pr-0 xl:pt-4">
        {children}
      </main>
    </div>
  );
}
