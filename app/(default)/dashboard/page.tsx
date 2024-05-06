"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { keepPreviousData } from "@tanstack/react-query";
import { useAppProvider } from "@/providers/app-provider";
import { getBreakpoint } from "@/components/utils/utils";
import { KF_TITLE } from "@/utils/constants";
import { chatbotSlug } from "@/utils/utils";
import { useChatbotExplore } from "@/hooks/api/chatbot";
import { ChatbotData } from "@/lib/types";
import { LoadMoreSpinner } from "@/components/load-more";

export default function Dashboard() {
  const { setHeaderTitle } = useAppProvider();
  const title = `${KF_TITLE} Dashboard`;
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  const [pageSize, setPageSize] = useState(20);
  const loadMoreRef = useRef(null);

  const botsQuery = useChatbotExplore(
    {
      page: 1,
      page_size: pageSize,
      explore_name: "Chatbots",
    },
    keepPreviousData,
  );

  const featuredBotsQuery = useChatbotExplore({
    page: 1,
    page_size: 5,
    explore_name: "Featured Chatbots",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !botsQuery.isFetching) {
          const totalBots = botsQuery.data?.data.data.chatbot_count ?? 0;
          if (pageSize < totalBots) {
            setPageSize((prevSize) => prevSize + 5);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", () =>
        setBreakpoint(getBreakpoint()),
      );
      setHeaderTitle("Explore");
      document.title = title;
    };
  }, [breakpoint, pageSize, botsQuery.isFetching]);

  return (
    <div className="rounded-lg px-3 py-8 text-primary md:px-6 xl:px-16">
      <Image
        src="/images/explore-banner.svg"
        alt="Explore Banner"
        className="w-full rounded-xl"
        width={1030}
        height={264}
      />
      <div className="mt-12 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
        <h1 className="text-xl font-semibold md:text-2xl">Featured Creators</h1>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {featuredBotsQuery.data?.data?.data &&
            featuredBotsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItem key={botData.chatbot_id} botData={botData} />
            ))}
        </div>
      </div>
      <div ref={loadMoreRef} className="mb-12">
        {featuredBotsQuery.isFetching && <LoadMoreSpinner />}
      </div>
      <div className="mt-4 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
        <h1 className="text-xl font-semibold md:text-2xl">Popular Creators</h1>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {botsQuery.data?.data.data &&
            botsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItem key={botData.chatbot_id} botData={botData} />
            ))}
        </div>
      </div>
      <div ref={loadMoreRef} className="mb-8">
        {botsQuery.isFetching && <LoadMoreSpinner />}
      </div>
    </div>
  );
}

const BotItem = ({ botData }: { botData: ChatbotData }) => (
  <Link
    href={`/chatbot/${chatbotSlug(botData)}/profile`}
    className="delay-50 group relative flex grow cursor-pointer flex-col transition ease-in-out"
  >
    <Image
      src={botData.profile_image ?? ""}
      height={200}
      width={200}
      className="rounded-xl group-hover:shadow-xl dark:group-hover:shadow-gray-700"
      alt="Avatar"
    />
    <div className="mt-4 flex-grow">
      <div className="break-words font-medium max-md:text-sm">
        {botData.name}
      </div>
    </div>
  </Link>
);
