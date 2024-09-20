"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useAppProvider } from "@/providers/app-provider";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { getBreakpoint } from "../utils/utils";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";
import { useChatbotChatList } from "@/hooks/api/chatbot";
import { CreditBalanceProvider } from "../../app/(default)/chatbot/[id]/credit-balance-context";
import CreditBalance from "../../app/(default)/chatbot/[id]/credit-balance";
import { chatbotSlug, handleAppUrl } from "@/utils/utils";
import { Home2, Flash, MessageText } from "iconsax-react";
import { ChatbotData } from "@/lib/types";

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
          {chatbotListData.map((chatbot: ChatbotData, index: number) => (
            <li
              key={chatbot.chatbot_id}
              className={`mr-2 last:mb-0 ${
                (segments.includes("home") || segments.includes("dashboard")) &&
                "bg-transparent"
              } ${pathname === handleAppUrl(chatbot) ? "" : ""}`}
            >
              <SidebarLink href={handleAppUrl(chatbot)}>
                <div className="w-[17px]">
                  <MessageText size="17" variant="Outline" />
                </div>
                <h3>{chatbot.name}</h3>
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
  const { sidebarOpen, setSidebarOpen, session } = useAppProvider();

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint(),
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

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

  const { authState, ocAuth } = useOCAuth();

  return (
    <>
      <CreditBalanceProvider>
        <nav
          className={`min-w-fit bg-sidebar ${sidebarExpanded ? "sidebar-expanded" : ""}`}
        >
          {/* Sidebar backdrop (mobile only) */}
          <Transition
            className="fixed inset-0 z-40 bg-opacity-30 lg:z-auto lg:hidden"
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
            className="no-scrollbar absolute left-0 top-0 z-40 flex h-[100dvh] w-52 shrink-0 flex-col gap-3 overflow-y-scroll bg-sidebar px-6 py-4 pt-6 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:!flex lg:w-12 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-56 xl:sidebar-expanded:!w-60"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* Sidebar header */}
            <header className="mb-5 flex items-center justify-between">
              {/* Logo */}
              <Link href="/dashboard" className="block">
                <Logo />
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
            </header>

            <section
              className={`mb-2 last:mb-0 ${
                (segments.length === 0 || segments.includes("dashboard")) && ""
              }`}
            >
              <h2 className="text-xs text-secondary-text">MENU</h2>
              <SidebarLink href="/dashboard">
                <Home2 size="17" variant="Outline" />
                <h3>Explore</h3>
              </SidebarLink>
              <SidebarLink href="/task-center">
                <Flash size="17" variant="Outline" />
                <h3>Task Center</h3>
              </SidebarLink>
              <SidebarLink href="/courses">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.56C8.775 16.56 8.55 16.5075 8.3625 16.4025C6.96 15.6375 4.4925 14.8275 2.9475 14.625L2.73 14.595C1.7475 14.475 0.9375 13.5525 0.9375 12.555V3.49501C0.9375 2.90251 1.17 2.36251 1.5975 1.97251C2.025 1.58251 2.58 1.39501 3.165 1.44751C4.815 1.57501 7.305 2.40001 8.715 3.28501L8.895 3.39001C8.9475 3.42001 9.06 3.42001 9.105 3.39751L9.225 3.32251C10.635 2.43751 13.125 1.59751 14.7825 1.45501C14.7975 1.45501 14.8575 1.45501 14.8725 1.45501C15.42 1.40251 15.9825 1.59751 16.4025 1.98751C16.83 2.37751 17.0625 2.91751 17.0625 3.51001V12.5625C17.0625 13.5675 16.2525 14.4825 15.2625 14.6025L15.015 14.6325C13.47 14.835 10.995 15.6525 9.6225 16.41C9.4425 16.515 9.225 16.56 9 16.56ZM2.985 2.56501C2.745 2.56501 2.5275 2.64751 2.355 2.80501C2.1675 2.97751 2.0625 3.22501 2.0625 3.49501V12.555C2.0625 12.9975 2.445 13.425 2.8725 13.485L3.0975 13.515C4.785 13.74 7.3725 14.5875 8.8725 15.405C8.94 15.435 9.0375 15.4425 9.075 15.4275C10.575 14.595 13.1775 13.74 14.8725 13.515L15.1275 13.485C15.555 13.4325 15.9375 12.9975 15.9375 12.555V3.50251C15.9375 3.22501 15.8325 2.98501 15.645 2.80501C15.45 2.63251 15.2025 2.55001 14.925 2.56501C14.91 2.56501 14.85 2.56501 14.835 2.56501C13.4025 2.69251 11.0925 3.46501 9.8325 4.25251L9.7125 4.33501C9.3 4.59001 8.715 4.59001 8.3175 4.34251L8.1375 4.23751C6.855 3.45001 4.545 2.68501 3.075 2.56501C3.045 2.56501 3.015 2.56501 2.985 2.56501Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 15.93C8.6925 15.93 8.4375 15.675 8.4375 15.3675V4.11749C8.4375 3.80999 8.6925 3.55499 9 3.55499C9.3075 3.55499 9.5625 3.80999 9.5625 4.11749V15.3675C9.5625 15.6825 9.3075 15.93 9 15.93Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.8125 6.92999H4.125C3.8175 6.92999 3.5625 6.67499 3.5625 6.36749C3.5625 6.05999 3.8175 5.80499 4.125 5.80499H5.8125C6.12 5.80499 6.375 6.05999 6.375 6.36749C6.375 6.67499 6.12 6.92999 5.8125 6.92999Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.375 9.17999H4.125C3.8175 9.17999 3.5625 8.92499 3.5625 8.61749C3.5625 8.30999 3.8175 8.05499 4.125 8.05499H6.375C6.6825 8.05499 6.9375 8.30999 6.9375 8.61749C6.9375 8.92499 6.6825 9.17999 6.375 9.17999Z"
                    fill="currentColor"
                  />
                </svg>
                <h3>Courses</h3>
              </SidebarLink>
            </section>

            {authState.isAuthenticated && (
              <section>
                <h2 className="text-xs text-secondary-text">CHATS</h2>
                <ul className="pb-4">
                  <ul className="max-h-[15vh] overflow-y-auto lg:max-h-36">
                    <ChatHistoryList />
                  </ul>
                </ul>
              </section>
            )}

            <section>
              <CreditBalance />
            </section>

            <footer className="mt-auto text-xs text-secondary-text">
              POWERED BY KIP PROTOCOL&#39;S KNOWLEDGEFI FRAMEWORK
            </footer>
          </Transition>
        </nav>
      </CreditBalanceProvider>
    </>
  );
}
