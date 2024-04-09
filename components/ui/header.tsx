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
import UserAvatar from "@/public/images/user-avatar-32.png";
import dynamic from "next/dynamic";
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

// const GetInvolvedButton = dynamic(
// 	() => import("../GetInvolvedButton/get-involved-button"),
// 	{
// 		ssr: false,
// 	}
// );

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  // const [showTwitterLogin, setShowTwitterLogin] = useState<boolean>(false);
  // const [showAccountButton, setShowAccountButton] = useState<boolean>(false);
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
    <header className=" z-30 rounded-t-md border-b-2 border-border font-mikado">
      <div className="px-2 md:px-6">
        <div className="-mb-px flex h-16 items-center justify-between">
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

            <div className="hidden items-center gap-2 sm:flex">
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
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Create Chatbot Button */}
            <Link href="/knowledge/create">
              <div className="button flex items-center">
                <FaCirclePlus />
                <span className="ml-1 sm:ml-2 md:text-sm">
                  Create Knowledge Asset
                </span>
              </div>
            </Link>
            {/* My Bot Button */}
            <Link href="/nft">
              <div className="button">
                <span className="md:text-sm">
                  My Assets
                </span>
              </div>
            </Link>
            {/* Connect Wallet Button */}
            {!isConnected_ && (
              <GetInvolvedButton
                buttonStyle="flex items-center border border-border rounded-full py-3 px-4 text-sm font-medium text-neutral-300 duration-200"
                wrapStyle="flex items-center text-sm font-medium ml-3 text-neutral-300 duration-200"
                chainStyle="flex items-center text-sm font-medium ml-3 text-neutral-300 duration-200"
                content={
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-0.000976562 14.2241C0.333594 12.758 1.14413 11.444 2.30378 10.4875C3.15538 9.66561 3.96528 8.80065 4.83078 7.92185L6.54913 9.72624L8.48479 7.68661L9.68383 8.91589L7.77469 10.7657L9.21001 12.1314L11.0295 10.256L12.2702 11.5204L10.3119 13.3844L12.1527 15.1243C11.8836 15.3557 11.6752 15.5164 11.4895 15.6997C10.7516 16.4268 10.0036 17.1463 9.29222 17.8986C8.36961 18.9927 7.09825 19.7348 5.6925 20H4.80796C4.0883 19.766 3.39032 19.4699 2.72191 19.115C2.02335 18.6865 1.42152 18.1173 0.954517 17.4436C0.487513 16.7699 0.165573 16.0064 0.00920303 15.2015L-0.000976562 14.2241ZM4.94954 10.4952C4.11058 11.2729 3.20841 11.9871 2.45662 12.8355C1.96917 13.3084 1.68754 13.9545 1.67264 14.6338C1.65774 15.313 1.91079 15.9709 2.37704 16.4647C2.75949 16.9525 3.20807 17.3844 3.70995 17.748C4.14545 18.1181 4.69732 18.3231 5.26866 18.3268C5.84 18.3305 6.39436 18.1328 6.83462 17.7684C7.83531 16.9793 8.7172 16.0424 9.63324 15.1863L4.94954 10.4952Z"
                        fill="white"
                      />
                      <path
                        d="M19.9964 5.77497C19.6682 7.22751 18.8684 8.53024 17.722 9.47976C16.8552 10.3067 16.034 11.1818 15.2317 11.9948L8.01465 4.78742C8.26735 4.53452 8.59075 4.23345 8.89904 3.92365C9.68579 3.14053 10.4709 2.35525 11.2542 1.56791C12.0623 0.756151 13.0979 0.209354 14.2236 -1.52588e-05H15.2015C15.9081 0.227784 16.5933 0.517295 17.2494 0.864982C17.9553 1.29505 18.5645 1.86687 19.038 2.54466C19.5114 3.22244 19.8389 3.99144 20.0001 4.80254L19.9964 5.77497ZM15.079 9.49489C15.8914 8.73621 16.7719 8.02306 17.5224 7.18977C18.0115 6.71859 18.297 6.07461 18.318 5.39557C18.339 4.71653 18.094 4.05624 17.635 3.55567C17.2661 3.07516 16.8309 2.64943 16.3425 2.29121C15.878 1.88388 15.2792 1.66262 14.6616 1.67009C14.0441 1.67756 13.451 1.91321 12.9965 2.33165C12.0615 3.09033 11.2278 3.98427 10.3813 4.79606L15.079 9.49489Z"
                        fill="white"
                      />
                    </svg>
                    <span className="ml-3 text-sm font-medium text-neutral-300 duration-200">
                      Connect Wallet
                    </span>
                  </>
                }
              />
            )}
            {theme == "dark" ? (
              <Image 
                src={LightThemeIcon}
                width={29}
                height={29}
                alt="Switch to Light Theme"
                className="cursor-pointer text-heading hover:fill-primary"
                onClick={() => setTheme("light")}
              />
            ) : (
              <Image
                src={DarkThemeIcon}
                width={29}
                height={29}
                alt="Switch to Dark Theme"
                className="cursor-pointer text-heading hover:fill-primary"
                onClick={() => setTheme("dark")}
              />
            )}
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
