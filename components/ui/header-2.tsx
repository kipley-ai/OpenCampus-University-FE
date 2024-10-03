"use client";

import { useEffect, useState } from "react";
import { useAppProvider } from "@/providers/app-provider";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AvatarWithStatus from "./avatar-with-status";
import { StaticImageData } from "next/image";
import { useUserDetail } from "@/hooks/api/user";
import { useTheme } from "next-themes";
import { CREATOR_ROLES } from "@/utils/constants";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import LoginButton from "@/components/buttons/login-button";
import LanguangeSwitch from "./languange-switch";
import Logo from "./logo";
import { HeaderBottomNav } from "./header-bottom-nav";

export default function HeaderV2() {
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
          <div className="flex h-1/2 w-5/12 items-center gap-4">
            <Link href="/dashboard" className="block">
              <Logo />
            </Link>

            {authState.isAuthenticated && (
              <>
                <select
                  name=""
                  id=""
                  className="h-full rounded-xl border-primary py-0 text-sm text-primary"
                >
                  <option>Explore</option>
                </select>
                <div className="relative flex h-full flex-grow">
                  <input
                    type="text"
                    placeholder="Search Anything"
                    className="h-full flex-grow rounded-full border-primary text-sm text-primary placeholder-primary"
                  />
                  <button className="absolute right-1 top-1 flex aspect-square h-3/4 items-center justify-center rounded-full bg-primary">
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2414 11.2125L9.35583 8.32757C10.1922 7.32349 10.6092 6.03563 10.5202 4.73189C10.4312 3.42816 9.84298 2.20893 8.87793 1.32783C7.91288 0.446741 6.64529 -0.0283786 5.33886 0.00131224C4.03243 0.0310031 2.78773 0.563219 1.86371 1.48724C0.939683 2.41127 0.407468 3.65596 0.377777 4.96239C0.348086 6.26883 0.823206 7.53641 1.7043 8.50146C2.58539 9.46651 3.80462 10.0547 5.10836 10.1437C6.41209 10.2327 7.69995 9.81571 8.70403 8.97936L11.589 11.8649C11.6318 11.9077 11.6827 11.9417 11.7386 11.9649C11.7946 11.9881 11.8546 12 11.9152 12C11.9757 12 12.0357 11.9881 12.0917 11.9649C12.1477 11.9417 12.1985 11.9077 12.2414 11.8649C12.2842 11.8221 12.3182 11.7712 12.3414 11.7152C12.3645 11.6593 12.3765 11.5993 12.3765 11.5387C12.3765 11.4781 12.3645 11.4181 12.3414 11.3622C12.3182 11.3062 12.2842 11.2554 12.2414 11.2125ZM1.31128 5.08416C1.31128 4.2635 1.55464 3.46127 2.01057 2.77891C2.46651 2.09655 3.11455 1.56472 3.87274 1.25067C4.63094 0.936611 5.46523 0.85444 6.27013 1.01454C7.07502 1.17465 7.81436 1.56983 8.39466 2.15013C8.97496 2.73043 9.37014 3.46977 9.53025 4.27467C9.69035 5.07956 9.60818 5.91386 9.29413 6.67205C8.98007 7.43024 8.44824 8.07828 7.76588 8.53422C7.08353 8.99016 6.28129 9.23351 5.46063 9.23351C4.36053 9.23229 3.30583 8.79474 2.52794 8.01685C1.75005 7.23896 1.3125 6.18426 1.31128 5.08416Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
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

          {/* Header: Right side */}
          <div className="flex items-center gap-2 text-[9px] xs:gap-4 xs:text-xs sm:text-[0.8rem] md:gap-6">
            {/* Create Chatbot Button */}
            {CREATOR_ROLES.includes(
              userData?.data?.data?.role?.toUpperCase(),
            ) &&
              authState.isAuthenticated && (
                <>
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

                  <Link href="/nft">
                    <p className="font-medium text-primary hover:underline max-xs:text-center">
                      My Assets
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
              <>
                <LanguangeSwitch />
                <AvatarWithStatus image={profileImage} status="away" />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
        <div className="mt-4">
          {authState.isAuthenticated && <HeaderBottomNav />}
        </div>
      </div>
    </header>
  );
}
