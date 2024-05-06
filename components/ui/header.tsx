"use client";

import { useEffect, useState, useRef } from "react";
import { useAppProvider } from "@/providers/app-provider";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";

import Button from "../button";
import SearchForm from "../search-form";
import GetInvolvedButton from "../GetInvolvedButton/get-involved-button";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import { useSession } from "next-auth/react";
import { dataLength } from "ethers";
import AvatarWithStatus from "./avatar-with-status";
import defaultAvatar from "public/images/user-32-03.jpg";
import { StaticImageData } from "next/image";
import { useUserDetail } from "@/hooks/api/user";
import { FaCirclePlus } from "react-icons/fa6";
import { useTheme } from "next-themes";
import DarkThemeIcon from "../icon/dark-theme.svg";
import LightThemeIcon from "../icon/light-theme.svg";
import ThemeSwitcher from "../theme-switcher";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const { data: twitterSession, status: twitterStatus } = useSession();
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    "",
  );

  const { modalLogin, setModalLogin } = useAppProvider();
  const { isConnected } = useAccount();
  const [isConnected_, setIsConnected_] = useState<boolean>(false);
  const { refetch: refetchUserDetail } = useUserDetail();

  const { headerTitle } = useAppProvider();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let sub = true;
    setIsConnected_(isConnected);

    const handleUserDetail = async () => {
      const { data } = await refetchUserDetail();
      if (data?.data) {
        setProfileImage(data.data.data.profile_image || "");
        if (
          twitterStatus == "authenticated" &&
          data.data.data.profile_image == ""
        ) {
          setProfileImage(twitterSession?.user?.image || "");
        }
      }
    };

    if (isConnected && sub) {
      handleUserDetail();
    }

    return () => {
      sub = false;
    };
  }, [isConnected, twitterStatus]);

  return (
    <header className="z-30 bg-sidebar rounded-t-md border-b-2 border-border">
      <div className="px-2 md:px-6">
        <div className="-mb-px flex h-12 md:h-16 items-center justify-between">
          {/* Header: Left side */}
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

            {/* <div className="hidden items-center gap-2 sm:flex">
              {headerTitle === "AI CHAT" ? (
                <svg className="stroke-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0473 1.66682C7.12235 1.655 4.4046 3.17261 2.88371 5.66704C1.36282 8.16146 1.26073 11.2687 2.6146 13.8573L2.78154 14.1827C2.91837 14.4387 2.94699 14.7388 2.86103 15.016C2.62281 15.6487 2.4237 16.2954 2.26482 16.9525C2.26482 17.2858 2.36022 17.4763 2.71794 17.4684C3.35154 17.3285 3.97552 17.1482 4.58606 16.9287C4.84901 16.8563 5.1286 16.873 5.381 16.9763C5.61153 17.0874 6.08055 17.3731 6.09645 17.3731C9.15957 18.9838 12.9006 18.5394 15.4998 16.2563C18.0989 13.9731 19.0165 10.3251 17.8063 7.08678C16.5961 3.84849 13.5092 1.69219 10.0473 1.66682V1.66682Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <ellipse cx="6.07264" cy="10.0001" rx="0.397471" ry="0.396825" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <ellipse cx="10.0473" cy="10.0001" rx="0.397471" ry="0.396825" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <ellipse cx="14.022" cy="10.0001" rx="0.397471" ry="0.396825" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>            
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  className="fill-primary"
                >
                  <path d="m9.518 9.875-2.013 2.004a.875.875 0 0 0 0 1.242.875.875 0 0 0 1.243 0l3.501-3.5a.877.877 0 0 0 .184-.288.875.875 0 0 0 0-.665.877.877 0 0 0-.184-.29l-3.5-3.5a.879.879 0 0 0-1.244 1.243l2.013 2.004H1.125a.875.875 0 1 0 0 1.75h8.393ZM9.002.25a8.754 8.754 0 0 0-7.877 4.856.88.88 0 1 0 1.576.788 7 7 0 0 1 12.216-.597A6.998 6.998 0 0 1 9.002 16a6.941 6.941 0 0 1-6.266-3.894.88.88 0 0 0-1.576.788A8.751 8.751 0 1 0 13.436 1.459 8.754 8.754 0 0 0 9.002.25Z" />
                </svg>
              )}
              <span className="text-sm font-medium duration-200">
                {headerTitle !== "AI CHAT" && headerTitle}
              </span>
            </div> */}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Create Chatbot Button */}
            <Link href="/knowledge/create">
              <div className="group flex gap-1 xs:gap-2 items-center text-primary">
                <FaCirclePlus />
                <p className="group-hover:underline text-sm font-medium max-xs:text-[10px]">
                  Create Knowledge Asset
                </p>
              </div>
            </Link>
            {/* My Bot Button */}
            <Link href="/nft">
              <p className="hover:underline text-sm font-medium text-primary max-xs:text-[10px]">
                My Assets
              </p>
            </Link>
            {/* <ThemeSwitcher /> */}
            {/* Profile Picture */}
            {isConnected_ && (
              <AvatarWithStatus image={profileImage} status="away" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
