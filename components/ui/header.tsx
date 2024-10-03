"use client";

import { useEffect, useState, useRef } from "react";
import { useAppProvider } from "@/providers/app-provider";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import Button from "../button";
import SearchForm from "../search-form";
import GetInvolvedButton from "../GetInvolvedButton/get-involved-button";
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
import { CREATOR_ROLES } from "@/utils/constants";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import LoginButton from "@/components/buttons/login-button";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  const { data: twitterSession, status: twitterStatus } = useSession();
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    "",
  );

  const { isConnected } = useAccount();

  const { data: userData, refetch: refetchUserDetail } = useUserDetail();

  const { theme, setTheme } = useTheme();

  const { authState, ocAuth } = useOCAuth();

  const [isEducatorPlatform, setIsEducatorPlatform] = useState(false);

  useEffect(() => {
    setIsEducatorPlatform(
      window!.location.origin === process.env.NEXT_PUBLIC_EDUCATOR_PLATFORM_URL,
    );
  }, []);

  useEffect(() => {
    let sub = true;

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

  useEffect(() => {
    if (userData) {
      setProfileImage(userData.data.data.profile_image || "");
    }
  }, [userData]);

  return (
    <header className="z-30 rounded-t-md border-b-2 border-border bg-sidebar">
      <div className="px-2 md:px-6">
        <div className="-mb-px flex h-12 items-center justify-between md:h-16">
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
          </div>

          {/* Header: Right side */}
          <div className="flex items-center gap-2 text-[9px] xs:gap-4 xs:text-xs sm:text-[0.8rem] md:gap-6">
            {/* Create Chatbot Button */}
            {CREATOR_ROLES.includes(
              userData?.data?.data?.role?.toUpperCase(),
            ) &&
              authState.isAuthenticated && (
                <>
                  <Link href="/knowledge/create">
                    <div className="group flex items-center gap-1 text-primary">
                      <svg
                        className="size-3 fill-primary xs:size-4 sm:size-5"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m17 13h-4v4h-2v-4h-4v-2h4v-4h2v4h4m-5-9a10 10 0 0 0 -10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0 -10-10z" />
                      </svg>
                      <p className="font-medium group-hover:underline max-xs:w-20">
                        Create KnowledgeKey
                      </p>
                    </div>
                  </Link>
                  {/* My Bot Button */}
                  <Link href="/nft">
                    <p className="font-medium text-primary hover:underline max-xs:text-center">
                      My Assets
                    </p>
                  </Link>
                  <Link
                    href={
                      isEducatorPlatform
                        ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
                        : "/educator"
                    }
                  >
                    <p className="font-medium text-primary hover:underline max-xs:text-center">
                      {isEducatorPlatform
                        ? "Student Platform"
                        : "Educator Platform"}
                    </p>
                  </Link>
                </>
              )}
            {/* <ThemeSwitcher /> */}
            {/* Profile Picture */}

            {/* {localStorage.getItem("id_token") ? (
              <AvatarWithStatus image={profileImage} status="away" />
            ) : (
              <button className="btn-secondary" onClick={handleLogin}>
                Login
              </button>
            )} */}

            {authState.isLoading ? (
              <div>Loading...</div>
            ) : authState.error ? (
              <div>Error: {authState.error.message}</div>
            ) : authState.isAuthenticated ? (
              <AvatarWithStatus image={profileImage} status="away" />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
