"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/providers/app-provider";
import {
  redirect,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { Transition } from "@headlessui/react";
import { getBreakpoint } from "../utils/utils";
import SidebarLinkGroup from "./sidebar-link-group";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";
import Image from "next/image";
import home_logo from "@/public/images/logo-home.png";
import ModalLoginTwitter from "../modal-login-twitter";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ChatText from "public/images/chat-text.png";
import HomeIcon from "public/images/home-icon.svg";
import { useChatbotChatList } from "@/hooks/api/chatbot";
import { PaginationController } from "../pagination/controller";
import CreditBalance from "../../app/(default)/chatbot/[id]/credit-balance";
import { CreditBalanceProvider } from "../../app/(default)/chatbot/[id]/credit-balance-context";
import { chatbotSlug } from "@/utils/utils";
import TaskCenterSideBar from "./task-center-sidebar";
import ExploreIcon from "../icon/explore.svg";
import ChatListIcon from "../icon/chat-list.svg";

const GetInvolvedButton = dynamic(
  () => import("../GetInvolvedButton/get-involved-button"),
  {
    ssr: false,
  },
);

const ChatHistoryList = () => {
  const searchParams = useSearchParams();
  const segments = useSelectedLayoutSegments();
  const chatbotListQuery = useChatbotChatList();
  const pathname = usePathname();

  if (chatbotListQuery.data) {
    const chatbotListData = chatbotListQuery.data?.data.data;
    if (chatbotListData !== undefined && chatbotListData.length > 0) {
      return (
        <>
          {chatbotListData.map((chatbot: any, index: number) => (
            <li
              key={chatbot.chatbot_id}
              className={`mx-3 py-1 last:mb-0 hover:rounded-md hover:bg-secondary ${
                (segments.includes("home") || segments.includes("dashboard")) &&
                "bg-transparent"
              } ${pathname === `/chatbot/${chatbotSlug(chatbot)}` ? "" : ""}`}
            >
              <SidebarLink href={`/chatbot/${chatbotSlug(chatbot)}`}>
                <div className="flex items-center">
                  <span
                    className={`text-[14px] text-sm duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 ${pathname === `/chatbot/${chatbotSlug(chatbot)}` ? "text-primary" : "text-heading"}`}
                  >
                    {pathname === `/chatbot/${chatbotSlug(chatbot)}`
                      ? "> "
                      : ""}
                    {chatbot.name}
                  </span>
                </div>
              </SidebarLink>
            </li>
          ))}
        </>
      );
    }
    return;
  }

  if (chatbotListQuery.isError) {
    return <div>Error: {chatbotListQuery.error.message}</div>;
  }

  return <div className="text-center">Loading Chat History...</div>;
};

export default function Sidebar() {
  const router = useRouter();
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint(),
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  // Wallet logic and modal
  const [isConnected_, setIsConnected_] = useState<boolean>(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setIsConnected_(isConnected);
  }, [isConnected]);

  // Twitter logic and modal
  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const handleWalletReadyClick = (e: React.MouseEvent) => {
    if (twitterStatus == "authenticated") {
      router.push("/create-chatbot");
    } else {
      setShowTwitterLogin(true);
    }
  };

  const handleChatbotClick = (e: React.MouseEvent) => {
    if (!(twitterStatus == "authenticated" && isConnected_)) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  return (
    <>
      <CreditBalanceProvider>
        <div
          className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""} font-mikado`}
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          {/* Sidebar backdrop (mobile only) */}
          <Transition
            className="fixed inset-0 z-40 bg-sidebar bg-opacity-30 lg:z-auto lg:hidden"
            show={sidebarOpen}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />

          {/* Sidebar */}
          <Transition
            show={sidebarOpen}
            unmount={false}
            as="div"
            id="sidebar"
            ref={sidebar}
            className="no-scrollbar absolute left-0 top-0 z-40 flex h-[100dvh] w-64 shrink-0 flex-col overflow-y-scroll bg-sidebar py-4 pt-6 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:!flex lg:w-12 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* Sidebar header */}
            <div className="mb-5 flex justify-between px-3">
              {/* Logo */}
              <Link href="/dashboard">
                <div className="pl-3 flex flex-col items-end">
                  <span className="text-xs font-black text-primary lg:hidden lg:text-sm lg:sidebar-expanded:block 2xl:block tracking-wider">
                    University
                  </span>
                  <span className="text-2xl font-black leading-3 text-heading lg:hidden lg:text-[28px] lg:sidebar-expanded:block 2xl:block tracking-wider">
                    Open Campus
                  </span>
                </div>
              </Link>
              {/* Close button */}
              <button
                className="text-slate-500 hover:text-slate-400 lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="space-y-8">
              {/* Pages group */}
              <div>
                <ul className="border-b-2 border-border pb-4">
                  {/* Explore */}
                  <li
                    className={`mx-3 mb-2 px-3 last:mb-0 hover:rounded-md hover:bg-secondary hover:text-primary ${
                      (segments.length === 0 ||
                        segments.includes("dashboard")) &&
                      ""
                    }`}
                  >
                    {/* style={{ border: '2px solid #00EDBE', borderRadius: '24px', padding: '6px 10px' }}> */}
                    <SidebarLink href="/dashboard">
                      <div className="flex items-center py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="none"
                          className="fill-primary"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 20a3 3 0 0 1-3-3V9.336a3 3 0 0 1 .993-2.23l7-6.3a3 3 0 0 1 4.014 0l7 6.3A3 3 0 0 1 20 9.336V17a3 3 0 0 1-3 3H3ZM18 9.336V17a1 1 0 0 1-1 1h-3v-5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v5H3a1 1 0 0 1-1-1V9.336a1 1 0 0 1 .331-.743l7-6.3a1 1 0 0 1 1.338 0l7 6.3a1 1 0 0 1 .331.743ZM8 18v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5H8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 text-[14px] font-semibold  text-heading duration-200 text-lg lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                          Explore
                        </span>
                      </div>
                    </SidebarLink>
                  </li>
                  {/* Task Center */}
                  {/* <li
                    className={`mx-3 mb-2 px-3 last:mb-0 hover:rounded-md hover:bg-stone-600 hover:text-primary ${(segments.length === 0 ||
                      segments.includes("dashboard")) &&
                      ""
                      }`}
                  >
                    <SidebarLink href="/task-center">
                      <div className="flex items-center py-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11V5H4H6H8L8 11H6H4H2ZM6 9V7H4V9H6ZM22 5H10V7H22V5ZM22 9H10V11H22V9ZM10 13H22V15H10V13ZM22 17H10V19H22V17ZM2 13V19H4H6H8L8 13H6H4H2ZM6 15V17H4V15H6Z" fill="#00EDBE" />
                        </svg>
                        <span className="ml-3 text-[14px] text-xs font-semibold text-heading duration-200 lg:text-lg lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                          Task Center
                        </span>
                      </div>
                    </SidebarLink>
                  </li> */}
                  {/* Login */}
                  <li
                    className={`mb-1 border-t-2 border-border px-2 pt-3 last:mb-0 ${
                      (segments.includes("home") ||
                        segments.includes("dashboard")) &&
                      "bg-transparent"
                    } `}
                  >
                    <div className="mb-2 flex items-center px-3">
                      <svg className="stroke-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0473 1.66682C7.12235 1.655 4.4046 3.17261 2.88371 5.66704C1.36282 8.16146 1.26073 11.2687 2.6146 13.8573L2.78154 14.1827C2.91837 14.4387 2.94699 14.7388 2.86103 15.016C2.62281 15.6487 2.4237 16.2954 2.26482 16.9525C2.26482 17.2858 2.36022 17.4763 2.71794 17.4684C3.35154 17.3285 3.97552 17.1482 4.58606 16.9287C4.84901 16.8563 5.1286 16.873 5.381 16.9763C5.61153 17.0874 6.08055 17.3731 6.09645 17.3731C9.15957 18.9838 12.9006 18.5394 15.4998 16.2563C18.0989 13.9731 19.0165 10.3251 17.8063 7.08678C16.5961 3.84849 13.5092 1.69219 10.0473 1.66682V1.66682Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <ellipse cx="6.07264" cy="10.0001" rx="0.397471" ry="0.396825" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <ellipse cx="10.0473" cy="10.0001" rx="0.397471" ry="0.396825" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <ellipse cx="14.022" cy="10.0001" rx="0.397471" ry="0.396825" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span className="ml-3 font-semibold tracking-tight text-heading duration-200 text-lg lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                        Chat List
                      </span>
                    </div>
                    <ul className="max-h-[15vh] overflow-y-auto 2xl:max-h-[30vh]">
                      <ChatHistoryList />
                    </ul>
                  </li>
                </ul>
                <CreditBalance />
                <TaskCenterSideBar />
              </div>
            </div>
          </Transition>
        </div>
      </CreditBalanceProvider>
    </>
  );
}
