"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
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
                <MessageText size="17" variant="Outline" />
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
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

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
            </section>

            <section>
              <h2 className="text-xs text-secondary-text">CHATS</h2>
              <ul className="pb-4">
                <ul className="max-h-[15vh] overflow-y-auto lg:max-h-36">
                  <ChatHistoryList />
                </ul>
              </ul>
            </section>

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
