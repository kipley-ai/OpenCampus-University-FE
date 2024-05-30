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
import { useUserDetail } from "@/hooks/api/user";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

import TrendingImage from "components/homepage/trending-projects-image.svg"
import OC100Image1st from "components/homepage/oc-100-image.svg"
import OC100Image2nd from "components/homepage/oc-100-image-2nd.svg"
import OC100Image3rd from "components/homepage/oc-100-image-3rd.svg"
import OC100Image4th from "components/homepage/oc-100-image-4th.svg"
import OC100Image5th from "components/homepage/oc-100-image-5th.svg"
import FiresideImage from "components/homepage/fireside-frame-no-text.svg"

export default function Dashboard() {
  const { setHeaderTitle } = useAppProvider();
  const title = `${KF_TITLE} Dashboard`;
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  const [pageSize, setPageSize] = useState(20);
  const loadMoreRef = useRef(null);
  const sign = localStorage.getItem("kip-protocol-signature");
  const { data: userDetail, isLoading } = useUserDetail();
  const { address, status } = useAccount();
  const { verifStatus } = useAppProvider();

  // if (status === "connected" && (sign || verifStatus === "authenticated")) {
  //   if (
  //     userDetail?.data?.status !== "error" &&
  //     !userDetail?.data?.data.onboarding
  //   ) {
  //     return redirect("/onboarding");
  //   }
  // }

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

  const trendingBotsQuery = useChatbotExplore({
    page: 1,
    page_size: 6,
    explore_name: "Trending Projects",
  });

  const OC100BotsQuery = useChatbotExplore({
    page: 1,
    page_size: 6,
    explore_name: "OC 100",
  });

  const firesideBotsQuery = useChatbotExplore({
    page: 1,
    page_size: 6,
    explore_name: "Fireside Chat Featured Creators",
  });

  const popularCreatorsQuery = useChatbotExplore({
    page: 1,
    page_size: 6,
    explore_name: "Popular Creators",
  });

  const [tab, setTab] = useState<string>("all");

  const images = [OC100Image1st, OC100Image2nd, OC100Image3rd, OC100Image4th, OC100Image5th];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start with fading out
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % images.length); // Cycle through images
        setFade(true); // Fade in the new image
      }, 500); // Half second for fade out, change based on your Tailwind config
    }, 300000); // Change image every 5 minutes, change based on your needs

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="px-3 py-8 text-primary md:px-6 xl:px-16">
      {/* Explore Banner Section */}
      <Image
        src="/images/explore-banner.svg"
        alt="Explore Banner"
        className="w-full rounded-xl"
        width={1030}
        height={264}
      />

      {/* Featured Creators Section */}
      <div className="mt-12 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">Featured Creators</h1>
          <div className="flex flex-row">
            <button className="mr-2">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="15" fill="#F9F9FF" />
                <path d="M20.625 14.498H8.375M8.375 14.498L14.5 20.623M8.375 14.498L14.5 8.37305" stroke="#141BEB" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button className="ml-2">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="15" fill="#E4E5FB" />
                <path d="M8.375 14.5H20.625M20.625 14.5L14.5 20.625M20.625 14.5L14.5 8.375" stroke="#141BEB" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {featuredBotsQuery.data?.data?.data &&
            featuredBotsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItem key={botData.chatbot_id} botData={botData} />
            ))}
        </div>
      </div>
      {/* Load More Spinner */}
      {/* <div ref={loadMoreRef} className="mb-12">
        {featuredBotsQuery.isFetching && <LoadMoreSpinner />}
      </div> */}
      <div className="mb-12"></div>

      {/* Trending Projects Section */}
      <div className="flex flex-row w-full">
        <div className="self-start flex-grow mr-3">
          <div className="rounded-xl border-2 border-border bg-sidebar p-8">
            <h1 className="text-xl font-semibold md:text-2xl">Trending Projects</h1>
            <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-8">
              {trendingBotsQuery.data?.data?.data &&
                trendingBotsQuery.data?.data.data.chatbot_data.map((botData) => (
                  <BotItemTrending key={botData.chatbot_id} botData={botData} />
                ))}
            </div>
          </div>
          {/* <div ref={loadMoreRef} className="mb-12">
            {trendingBotsQuery.isFetching && <LoadMoreSpinner />}
          </div> */}
          <div className="mb-12"></div>
        </div>
        <div className="ml-3">
          <Image
            src={TrendingImage}
            alt="Trending Projects"
            width={330}
            height={747}
          />
        </div>
      </div>

      {/* ОC 100 Sections */}
      <div className="mt-12 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
        <h1 className="text-xl font-semibold md:text-2xl">OC 100</h1>
        <div className="relative w-full h-[264px] overflow-hidden mt-4 mb-4">
          <Image
            src={images[currentIndex]}
            alt="OC 100 Image"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
            width={1030}
            height={264}
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-around">
          {OC100BotsQuery.data?.data?.data &&
            OC100BotsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItemOC100
                key={botData.chatbot_id}
                botData={botData}
              />
            ))}
        </div>
      </div>
      {/* Load More Spinner */}
      {/* <div ref={loadMoreRef} className="mb-12">
        {OC100BotsQuery.isFetching && <LoadMoreSpinner />}
      </div> */}
      <div className="mb-12"></div>

      {/* Fireside Chat Sections */}
      <div className="relative w-full">
        <Image
          src={FiresideImage}
          alt="Fireside Chat"
          className="w-full rounded-xl z-10"
          width={1030}
        />
        <div className="absolute top-10 right-4">
          <Link
            href={"/chatroom/883f98d5-7b3b-4f09-8518-69c954e4cd10"}
          >
            <h1 className="text-xl font-semibold md:text-2xl text-white">Fireside Chat</h1>
            <div className="flex flex-col my-3">
              <span className="text-sm text-white">Fireside Chat, hosted by Open Campus University, features some of</span>
              <span className="text-sm text-white">the most influential OC 100 educators and creators from a diverse</span>
              <span className="text-sm text-white">range of the Web3 space.</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white">Engage in topic-specific discussions, ask questions, and gain</span>
              <span className="text-sm text-white">well-rounded insights from specialists across various fields</span>
              <span className="text-sm text-white">within the Web3 space.</span>
            </div>
            <div className="flex flex-row mt-3">
              <span className="text-sm text-white"><b>Topic of Fireside Chat:</b> Digital Property Rights</span>
            </div>
          </Link>
        </div>
        <div className="absolute bottom-12 right-0 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold md:text-2xl">Featured Creators</h1>
            <div className="flex flex-row">
              <button className="mr-2">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="30" rx="15" fill="#F9F9FF" />
                  <path d="M20.625 14.498H8.375M8.375 14.498L14.5 20.623M8.375 14.498L14.5 8.37305" stroke="#141BEB" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <button className="ml-2">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="30" rx="15" fill="#E4E5FB" />
                  <path d="M8.375 14.5H20.625M20.625 14.5L14.5 20.625M20.625 14.5L14.5 8.375" stroke="#141BEB" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {firesideBotsQuery.data?.data?.data &&
              firesideBotsQuery.data?.data.data.chatbot_data.map((botData) => (
                <BotItemFireside key={botData.chatbot_id} botData={botData} />
              ))}
          </div>
        </div>
        {/* Load More Spinner */}
        {/* <div ref={loadMoreRef} className="mb-12">
          {firesideBotsQuery.isFetching && <LoadMoreSpinner />}
        </div> */}
        <div className="mb-12"></div>
      </div>

      {/* Popular Creators Section */}
      <div className="mt-4 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
        <h1 className="text-xl font-semibold md:text-2xl">Popular Creators</h1>
        <div className="flex flex-wrap justify-start items-center gap-2 my-8 border-b-2 text-sm font-semibold text-primary">
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "all" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "gaming" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("gaming")}
          >
            Gaming
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "content-creation-storytelling" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("content-creation-storytelling")}
          >
            Content Creation & Storytelling
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "technical-educators-developers" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("technical-educators-developers")}
          >
            Technical Educators & Developers
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "community-builders-leaders" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("community-builders-leaders")}
          >
            Community Builders & Leaders
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "enterpreneurship-innovation" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("enterpreneurship-innovation")}
          >
            Enterpreneurships & Innovations
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "investments-financial-insight" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("investments-financial-insight")}
          >
            Investments & Financial Insights
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "cultural-artistic-impact" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("cultural-artistic-impact")}
          >
            Cultural & Artistic Impact
          </button>
          <button
            className={`px-4 py-1 rounded-full shadow ${tab === "social-impacts-ethics" ? "bg-white text-primary" : "bg-gray-200 text-black opacity-50"}`}
            onClick={() => setTab("social-impacts-ethics")}
          >
            Social Impacts & Ethics
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {popularCreatorsQuery.data?.data.data &&
            popularCreatorsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItem key={botData.chatbot_id} botData={botData} />
            ))}
        </div>
      </div>
      <div ref={loadMoreRef} className="mb-8">
        {popularCreatorsQuery.isFetching && <LoadMoreSpinner />}
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
      height={260}
      width={260}
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

const BotItemOC100 = ({ botData }: { botData: ChatbotData }) => (
  <Link
    href={`/chatbot/${chatbotSlug(botData)}/profile`}
    className="delay-50 group relative flex grow cursor-pointer flex-col transition ease-in-out"
  >
    <Image
      src={botData.profile_image ?? ""}
      height={260}
      width={260}
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

const BotItemFireside = ({ botData }: { botData: ChatbotData }) => (
  <Link
    href={`/chatbot/${chatbotSlug(botData)}/`}
    className="delay-50 group relative flex grow cursor-pointer flex-col transition ease-in-out"
  >
    <Image
      src={botData.profile_image ?? ""}
      height={260}
      width={260}
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

const BotItemTrending = ({ botData }: { botData: ChatbotData }) => (
  <Link
    href={`/chatbot/${chatbotSlug(botData)}/profile`}
    className="delay-50 group relative flex grow cursor-pointer flex-col transition ease-in-out"
  >
    <Image
      src={botData.profile_image ?? ""}
      height={160}
      width={160}
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
