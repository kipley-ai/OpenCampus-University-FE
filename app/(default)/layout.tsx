"use client";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import ModalTopUpSuccessful from "@/components/modal-top-up-successful";
import ModalTopUpFailed from "@/components/modal-top-up-failed";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";
import { useCheckToken } from "@/hooks/api/auth";
import { useAppProvider } from "@/providers/app-provider";
import { SUBDOMAINS } from "@/utils/constants";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { CREATOR_PATHS, CREATOR_ROLES } from "@/utils/constants";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAccount();
  const pathname = usePathname();
  const { openConnectModal } = useConnectModal();
  const sign = localStorage.getItem("kip-protocol-signature");
  const { verifStatus, session } = useAppProvider();
  const { data: userDetail } = useUserDetail();

  const subdomain = window.location.origin.split("//")[1].split(".")[0];
  if (SUBDOMAINS.includes(subdomain) && pathname !== "/") {
    redirect(process.env.NEXT_PUBLIC_HOST + pathname);
  }

  const {
    modalTopUpSuccessful,
    setModalTopUpSuccessful,
    modalTopUpFailed,
    setModalTopUpFailed,
    topUpAmount,
  } = useAppProvider();

  if (session?.address && !userDetail?.data?.data?.is_whitelisted) {
    redirect("/onboarding");
  }

  // const token = localStorage.getItem("token");
  // const { data: checkTokenData, error: checkTokenError } = useCheckToken(token);

  // if (!token && pathname !== "/dashboard") {
  //   return redirect("/dashboard");
  // }

  if (
    CREATOR_PATHS.includes(pathname) &&
    !CREATOR_ROLES.includes(userDetail?.data?.data?.role?.toUpperCase())
  ) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex h-dvh divide-x-2 divide-border text-heading">
      {/* Sidebar */}
      {pathname === "/knowledge/create/iframe" ? null : <Sidebar />}

      {/* Content area */}
      <ModalTopUpSuccessful
        amount={topUpAmount}
        isOpen={modalTopUpSuccessful}
        setIsOpen={setModalTopUpSuccessful}
      />
      <ModalTopUpFailed
        isOpen={modalTopUpFailed}
        setIsOpen={setModalTopUpFailed}
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <div className="h-[max(100vh, fit-content)] grow bg-container">
          {/*  Site header */}
          {pathname === "/knowledge/create/iframe" ? null : <Header />}

          <main className="grow p-3 md:p-6 xl:w-5/6 xl:pl-8 xl:pr-0 xl:pt-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
