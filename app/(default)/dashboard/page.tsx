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
import OC100Image from "components/homepage/oc-100-image.svg"
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
    explore_name: "Featured Chatbots",
  });

  const [tab, setTab] = useState<string>("knowledge-assets");

  const [overlayImage, setOverlayImage] = useState(""); // Holds the image to show on hover
  const [isHovered, setIsHovered] = useState(false); // Manages whether the overlay is visible

  const handleMouseEnter = (imageSrc: any) => {
    setOverlayImage(imageSrc); // Set the image to show
    setIsHovered(true); // Display the overlay
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Hide the overlay
  };


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
      <div ref={loadMoreRef} className="mb-12">
        {featuredBotsQuery.isFetching && <LoadMoreSpinner />}
      </div>

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
          <div ref={loadMoreRef} className="mb-12">
            {trendingBotsQuery.isFetching && <LoadMoreSpinner />}
          </div>
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
            src={OC100Image}
            alt="Previous OC 100 Image"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1500 ease-linear ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            width={1030}
            height={264}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <Image
                src={overlayImage}
                alt="Hovered Profile Image"
                width={260}
                height={260}
                className="rounded-xl" // Apply any additional styles as needed
              />
            </div>
          )}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-around">
          {featuredBotsQuery.data?.data?.data &&
            featuredBotsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItemOC100
                key={botData.chatbot_id}
                botData={botData}
                onMouseEnter={() => handleMouseEnter(botData.profile_image ?? OC100Image)}
                onMouseLeave={handleMouseLeave} />
            ))}
        </div>
      </div>
      <div ref={loadMoreRef} className="mb-12">
        {featuredBotsQuery.isFetching && <LoadMoreSpinner />}
      </div>

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
            href={"/chatroom/acc24254-b9b9-436a-aed2-8882388cc4d7"}
          >
            <h1 className="text-xl font-semibold md:text-2xl text-white">Fireside Chat</h1>
          </Link>
          <div className="flex flex-col my-2">
            <span className="text-sm text-white">$EDU is the native gas token for EDU Chain and the governance token</span>
            <span className="text-sm text-white">for the Open Campus DAO.</span>
          </div>
          <div className="flex flex-col mb-3">
            <span className="text-sm text-white">It powers the entire Open Campus ecosystem.</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white">$EDU token genesis occurred on BNB Chain as a BEP-20 token on 28</span>
            <span className="text-sm text-white">April 2023. It also exists on the Ethereum L1 Blockchain and will be</span>
            <span className="text-sm text-white">bridged to the EDU Chain when the Mainnet goes live.</span>
          </div>
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
            {featuredBotsQuery.data?.data?.data &&
              featuredBotsQuery.data?.data.data.chatbot_data.map((botData) => (
                <BotItemFireside key={botData.chatbot_id} botData={botData} />
              ))}
          </div>
        </div>
        <div ref={loadMoreRef} className="mb-12">
          {featuredBotsQuery.isFetching && <LoadMoreSpinner />}
        </div>
      </div>

      {/* Popular Creators Section */}
      <div className="mt-4 rounded-xl border-2 border-border bg-sidebar p-3 lg:p-8">
        <h1 className="text-xl font-semibold md:text-2xl">Popular Creators</h1>
        <div className="flex flex-row overflow-x-auto no-scrollbar my-8 flex items-center space-x-10 border-b-2 text-sm font-semibold text-primary">
          <button
            className={`${tab == "gaming" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("gaming")}
          >
            Gaming
          </button>
          <button
            className={`${tab == "content-creation-storytelling" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("content-creation-storytelling")}
          >
            Content Creation & Storytelling
          </button>
          <button
            className={`${tab == "technical-educators-developers" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("technical-educators-developers")}
          >
            Technical Educators & Developers
          </button>
          <button
            className={`${tab == "community-builders-leaders" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("community-builders-leaders")}
          >
            Community Builders & Leaders
          </button>
          <button
            className={`${tab == "enterpreneurship-innovation" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("enterpreneurship-innovation")}
          >
            Enterpreneurships & Innovations
          </button>
          <button
            className={`${tab == "investments-financial-insight" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("investments-financial-insight")}
          >
            Investments & Financial Insights
          </button>
          <button
            className={`${tab == "cultural-artistic-impact" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("cultural-artistic-impact")}
          >
            Cultural & Artistic Impact
          </button>
          <button
            className={`${tab == "social-impacts-ethics" ? "underline underline-offset-8" : "opacity-50"}`}
            onClick={() => setTab("social-impacts-ethics")}
          >
            Social Impacts & Ethics
          </button>
        </div>
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

const BotItemOC100 = ({ botData, onMouseEnter, onMouseLeave }: { botData: ChatbotData, onMouseEnter: () => void, onMouseLeave: () => void }) => (
  <Link
    href={`/chatbot/${chatbotSlug(botData)}/profile`}
    className="delay-50 group relative flex grow cursor-pointer flex-col transition ease-in-out"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
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
