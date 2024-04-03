"use client";

import { useEffect, useState, useRef } from "react";
import { useAppProvider } from "@/providers/app-provider";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";

import DropdownTwitter from "@/components/dropdown-twitter";
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
import ChatIcon from "../icon/chat-list.svg";
import HeaderIcon from "../icon/header-icon.svg";

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
    <header
      className=" z-30 border-b border-gray-700 bg-neutral-800"
      style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
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

            <div className="hidden sm:flex gap-2 items-center">
              {headerTitle === "AI CHAT" ? (
                <Image
                  src={ChatIcon}
                  alt="Chat Icon"
                  width={18}
                  height={18}
                />
              ) : (
                <Image
                  src={HeaderIcon}
                  alt="Header Icon"
                  width={18}
                  height={18}
                />
              )}
              <span className="text-sm font-medium text-white duration-200">
                {headerTitle !== "AI CHAT" && headerTitle}
              </span>
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* Create Chatbot Button */}
            <Link href="/knowledge/create">
              <button className="pr-3">
                <div className="flex items-center rounded-md border border-[#01F7FF] px-1 py-2 pl-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-sm:size-[12px]"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.5 0.5H2.16667H13.8333H15.5V15.5L13.8333 15.5L2.16667 15.5H0.5V0.5ZM13.8333 13.8333V2.16667H2.16667V13.8333H13.8333ZM8.83333 7.16667H12.1667V8.83333H8.83333V12.1667H7.16667V8.83333H3.83333V7.16667H7.16667V3.83333H8.83333V7.16667Z"
                      fill="#F1F5F9"
                    />
                  </svg>

                  <span className="ml-1 sm:ml-2 text-[0.6rem] font-medium text-neutral-300 duration-200 md:text-sm">
                    CREATE KNOWLEDGE ASSET
                  </span>
                </div>
              </button>
            </Link>
            {/* My Bot Button */}
            <Link href="/nft">
              <button className="pr-3">
                <div className="flex items-center rounded-md border border-[#01F7FF] px-2 py-2">
                  <span className="text-[0.6rem] font-medium text-neutral-300 duration-200 md:text-sm">
                    MY ASSETS
                  </span>
                </div>
              </button>
            </Link>
            {/* Connect Wallet Button */}
            {!isConnected_ && (
              <GetInvolvedButton
                buttonStyle="flex items-center border border-gray-700 rounded-full py-3 px-4 text-sm font-medium text-neutral-300 duration-200"
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
            {/* Profile Picture */}
            {isConnected_ && (
              <AvatarWithStatus image={profileImage} status="away" />
            )}
            {/* {showTwitterLogin && (
							<>
								<ModalLoginTwitter
									isOpen={modalLogin}
									setIsOpen={setModalLogin}
								/>
								<button
									onClick={() => setModalLogin(true)}
									className="text-sm font-medium ml-3  text-neutral-300 border border-gray-700 rounded-full py-3 px-4 duration-200"
								>
									Connect Twitter
								</button>
							</>
						)}
						{(showAccountButton && twitterStatus == "authenticated") && (
							<>
								<DropdownTwitter twitterSession={twitterSession} align="right" />
							</>
						)} */}
          </div>
        </div>
      </div>
    </header>
  );
}
