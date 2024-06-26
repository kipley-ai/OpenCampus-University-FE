"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { keepPreviousData } from "@tanstack/react-query";
import { useAppProvider } from "@/providers/app-provider";
import { getBreakpoint } from "@/components/utils/utils";
import { KF_TITLE } from "@/utils/constants";
import { chatbotSlug } from "@/utils/utils";
import { useChatbotExplore, useGetCategory } from "@/hooks/api/chatbot";
import { ChatbotData } from "@/lib/types";
import { LoadMoreSpinner } from "@/components/load-more";
import { useUserDetail } from "@/hooks/api/user";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

import TrendingImage from "components/homepage/trending-projects-image.svg";
import OC100Image1st from "components/homepage/oc-100-image.svg";
import OC100Image2nd from "components/homepage/oc-100-image-2nd.svg";
import OC100Image3rd from "components/homepage/oc-100-image-3rd.svg";
import OC100Image4th from "components/homepage/oc-100-image-4th.svg";
import OC100Image5th from "components/homepage/oc-100-image-5th.svg";
import FiresideImage from "components/homepage/fireside-frame-no-text.svg";

export default function Dashboard() {
  const { setHeaderTitle } = useAppProvider();
  const title = `${KF_TITLE} Dashboard`;
  // const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  // const [pageSize, setPageSize] = useState(20);
  const loadMoreRef = useRef(null);
  const { data: botCategories } = useGetCategory();
  const [filteredBots, setFilteredBots] = useState<ChatbotData[] | undefined>();
  const [tab, setTab] = useState({ title: "all", category_id: "" });

  const [featuredBotsPage, setFeaturedBotsPage] = useState<number>(1);
  const [trendingBotsPage, setTrendingBotsPage] = useState<number>(1);
  const [OC100BotsPage, setOC100BotsPage] = useState<number>(1);
  const [firesideBotsPage, setFiresideBotsPage] = useState<number>(1);
  const [popularCreatorsPage, setPopularCreatorsPage] = useState<number>(1);

  const FEATURED_BOTS_PAGE_SIZE = 5;
  const FIRESIDE_BOTS_PAGE_SIZE = 5;
  const POPULAR_CREATORS_PAGE_SIZE = 10;

  const featuredBotsQuery = useChatbotExplore({
    page: 1,
    page_size: FEATURED_BOTS_PAGE_SIZE,
    explore_name: "Featured Educators",
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
    page_size: FIRESIDE_BOTS_PAGE_SIZE,
    explore_name: "Fireside Chat Featured Educators",
  });

  const { data: popularCreatorsQuery, refetch: refetchPopularCreators } =
    useChatbotExplore({
      page: popularCreatorsPage,
      page_size: POPULAR_CREATORS_PAGE_SIZE,
      explore_name: "Popular Educators",
      category_id: tab.category_id,
    });

  const handleChangeCategoryTab = (cat: any) => {
    setTab(cat);
    setPopularCreatorsPage(1);
    refetchPopularCreators();
  };

  const images = [
    OC100Image1st,
    OC100Image2nd,
    OC100Image3rd,
    OC100Image4th,
    OC100Image5th,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && !botsQuery.isFetching) {
  //         const totalBots = botsQuery.data?.data.data.chatbot_count ?? 0;
  //         if (pageSize < totalBots) {
  //           setPageSize((prevSize) => prevSize + 5);
  //         }
  //       }
  //     },
  //     {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 1.0,
  //     },
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     observer.disconnect();
  //     window.removeEventListener("resize", () =>
  //       setBreakpoint(getBreakpoint()),
  //     );
  //     setHeaderTitle("Explore");
  //     document.title = title;
  //   };
  // }, [breakpoint, pageSize, botsQuery.isFetching]);

  useEffect(() => {
    setHeaderTitle("Explore");
    document.title = title;
  }, []);

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
    <div className="text-primary mt-2 xl:mt-4">
      {/* Explore Banner Section */}
      <Image
        src="/images/dashboard-banner.svg"
        alt="Explore Banner"
        className="w-full rounded-xl"
        width={1030}
        height={264}
      />

      {/* Featured Creators Section */}
      <div className="mt-6 rounded-xl border-2 border-border bg-sidebar p-3 md:mt-12 lg:px-10 lg:py-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold md:text-xl">
            Featured Educators
          </h1>
          <div className="mt-4 flex justify-end">
            <button
              className="mr-2"
              onClick={() => setFeaturedBotsPage((prev) => prev - 1)}
              disabled={featuredBotsPage === 1}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#F9F9FF] transition duration-200 ease-in-out hover:fill-[#E4E5FB]"
              >
                <rect width="30" height="30" rx="15" />
                <path
                  d="M20.625 14.498H8.375M8.375 14.498L14.5 20.623M8.375 14.498L14.5 8.37305"
                  stroke={featuredBotsPage === 1 ? "#B0B0B0" : "#141BEB"}
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              className="ml-2"
              onClick={() => setFeaturedBotsPage((prev) => prev + 1)}
              disabled={
                (featuredBotsQuery?.data?.data?.data.chatbot_count ?? 0) -
                  featuredBotsPage * FEATURED_BOTS_PAGE_SIZE <=
                0
              }
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#F9F9FF] transition duration-200 ease-in-out hover:fill-[#E4E5FB]"
              >
                <rect width="30" height="30" rx="15" />
                <path
                  d="M8.375 14.5H20.625M20.625 14.5L14.5 20.625M20.625 14.5L14.5 8.375"
                  stroke={
                    (featuredBotsQuery?.data?.data?.data.chatbot_count ?? 0) -
                      popularCreatorsPage * FEATURED_BOTS_PAGE_SIZE <=
                    0
                      ? "#B0B0B0"
                      : "#141BEB"
                  }
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-8 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
      <div className="flex w-full gap-10">
        <div className="rounded-xl border-2 border-border bg-sidebar p-3 lg:px-10 lg:py-8 xl:grow">
          <h1 className="text-lg font-semibold md:text-xl">
            Trending Projects
          </h1>
          <div className="mt-4 grid grid-cols-2 items-start gap-x-8 gap-y-4 xs:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {trendingBotsQuery.data?.data?.data &&
              trendingBotsQuery.data?.data.data.chatbot_data.map((botData) => (
                <BotItemTrending key={botData.chatbot_id} botData={botData} />
              ))}
          </div>
        </div>
        <Image
          src={TrendingImage}
          className="hidden rounded-xl object-cover md:flex xl:grow"
          alt="Trending Projects"
          width={330}
          height={747}
        />
      </div>

      {/* ОC 100 Sections */}
      {/* <div className="mt-12 rounded-xl border-2 border-border bg-sidebar p-3 lg:px-10 lg:py-8">
        <h1 className="text-lg font-semibold md:text-xl">OC 100</h1>
        <div className="relative mb-4 mt-4 h-[264px] w-full overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt="OC 100 Image"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
            width={1030}
            height={264}
          />
        </div>
        <div className="mt-8 grid grid-cols-2 justify-around gap-x-6 gap-y-8 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {OC100BotsQuery.data?.data?.data &&
            OC100BotsQuery.data?.data.data.chatbot_data.map((botData) => (
              <BotItemOC100 key={botData.chatbot_id} botData={botData} />
            ))}
        </div>
      </div> */}
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
          className="z-10 w-full rounded-xl"
          width={1030}
        />
        <div className="absolute right-2 top-4 w-1/2 overflow-y-auto max-xs:h-1/5 sm:top-8 lg:right-16 xl:top-12 2xl:top-16">
          <Link href={"/chatroom/883f98d5-7b3b-4f09-8518-69c954e4cd10"}>
            <h1 className="font-semibold text-white xs:text-lg md:text-3xl">
              Fireside Chat
            </h1>
            <div className="my-1 flex flex-col md:my-3">
              <span className="text-xs text-white md:text-sm">
                Fireside Chat, hosted by OCU, features some
                of the most influential OC 100 educators from a diverse range of
                the Web3 space.
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white md:text-sm">
                Engage in topic-specific discussions, ask questions, and gain
                well-rounded insights from specialists across various fields
                within the Web3 space.
              </span>
              <span className="text-xs text-white md:text-sm"></span>
              <span className="text-xs text-white md:text-sm"></span>
            </div>
            <div className="mt-3 flex flex-row">
              <span className="text-xs text-white md:text-sm">
                <b>Topic of Fireside Chat:</b> Digital Property Rights
              </span>
            </div>
          </Link>
        </div>
        <div className="rounded-l-xl border-y-2 border-l-2 border-border bg-sidebar p-3 max-sm:mt-4 sm:absolute sm:bottom-4 sm:left-8 lg:px-10 lg:py-8 lg:pr-4 xl:bottom-12 2xl:right-0">
          <div className="flex flex-row justify-between">
            <h1 className="text-lg font-semibold md:text-xl">
              Featured Educators
            </h1>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2"
                onClick={() => setFiresideBotsPage((prev) => prev - 1)}
                disabled={firesideBotsPage === 1}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#F9F9FF] transition duration-200 ease-in-out hover:fill-[#E4E5FB]"
                >
                  <rect width="30" height="30" rx="15" />
                  <path
                    d="M20.625 14.498H8.375M8.375 14.498L14.5 20.623M8.375 14.498L14.5 8.37305"
                    stroke={firesideBotsPage === 1 ? "#B0B0B0" : "#141BEB"}
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                className="ml-2"
                onClick={() => setFiresideBotsPage((prev) => prev + 1)}
                disabled={
                  (firesideBotsQuery?.data?.data?.data?.chatbot_count ?? 0) -
                    firesideBotsPage * FIRESIDE_BOTS_PAGE_SIZE <=
                  0
                }
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#F9F9FF] transition duration-200 ease-in-out hover:fill-[#E4E5FB]"
                >
                  <rect width="30" height="30" rx="15" />
                  <path
                    d="M8.375 14.5H20.625M20.625 14.5L14.5 20.625M20.625 14.5L14.5 8.375"
                    stroke={
                      (firesideBotsQuery?.data?.data?.data.chatbot_count ?? 0) -
                        firesideBotsPage * FIRESIDE_BOTS_PAGE_SIZE <=
                      0
                        ? "#B0B0B0"
                        : "#141BEB"
                    }
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-8 xs:grid-cols-3 sm:grid-cols-5 xl:grid-cols-5">
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
      <div className="mt-4 rounded-xl border-2 border-border bg-sidebar p-3 lg:px-10 lg:py-8">
        <div className="flex justify-between gap-4 max-xs:flex-col xs:items-center">
          <h1 className="text-lg font-semibold md:text-xl">
            Popular Educators
          </h1>
          <select
            name="categories"
            id="categories"
            onChange={(e) =>
              handleChangeCategoryTab(JSON.parse(e.target.value))
            }
            className="block w-full rounded-lg border border-border px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 xs:w-1/2 md:w-2/5 xl:w-[35%]"
          >
            <option
              value={JSON.stringify({ title: "all", category_id: "" })}
              disabled
              selected
            >
              Select Category
            </option>
            <option
              className="text-heading"
              value={JSON.stringify({ title: "all", category_id: "" })}
            >
              All
            </option>
            {botCategories?.data?.data?.map((cat: any) => (
              <option
                className="text-heading"
                key={cat.category_id}
                value={JSON.stringify(cat)}
              >
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2"
            onClick={() => setPopularCreatorsPage((prev) => prev - 1)}
            disabled={popularCreatorsPage === 1}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[#F9F9FF] transition duration-200 ease-in-out hover:fill-[#E4E5FB]"
            >
              <rect width="30" height="30" rx="15" />
              <path
                d="M20.625 14.498H8.375M8.375 14.498L14.5 20.623M8.375 14.498L14.5 8.37305"
                stroke={popularCreatorsPage === 1 ? "#B0B0B0" : "#141BEB"}
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="ml-2"
            onClick={() => setPopularCreatorsPage((prev) => prev + 1)}
            disabled={
              (popularCreatorsQuery?.data?.data?.chatbot_count ?? 0) -
                popularCreatorsPage * POPULAR_CREATORS_PAGE_SIZE <=
              0
            }
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[#F9F9FF] transition duration-200 ease-in-out hover:fill-[#E4E5FB]"
            >
              <rect width="30" height="30" rx="15" />
              <path
                d="M8.375 14.5H20.625M20.625 14.5L14.5 20.625M20.625 14.5L14.5 8.375"
                stroke={
                  (popularCreatorsQuery?.data?.data?.chatbot_count ?? 0) -
                    popularCreatorsPage * POPULAR_CREATORS_PAGE_SIZE <=
                  0
                    ? "#B0B0B0"
                    : "#141BEB"
                }
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 grid grow grid-cols-2 gap-x-8 gap-y-8 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {popularCreatorsQuery?.data?.data.chatbot_data?.map((botData) => (
            <BotItem key={botData.chatbot_id} botData={botData} />
          ))}
        </div>
      </div>
      {/* <div ref={loadMoreRef} className="mb-8">
        {popularCreatorsQuery.isFetching && <LoadMoreSpinner />}
      </div> */}
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
      className="w-full rounded-xl group-hover:shadow-xl dark:group-hover:shadow-gray-700"
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
      className="w-full rounded-xl group-hover:shadow-xl dark:group-hover:shadow-gray-700"
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
    className="delay-50 group relative flex cursor-pointer flex-col transition ease-in-out"
  >
    <Image
      src={botData.profile_image ?? ""}
      height={160}
      width={160}
      className="w-full rounded-xl group-hover:shadow-xl dark:group-hover:shadow-gray-700"
      alt="Avatar"
    />
    <div className="mt-4">
      <div className="break-words font-medium max-md:text-sm">
        {botData.name}
      </div>
    </div>
  </Link>
);
