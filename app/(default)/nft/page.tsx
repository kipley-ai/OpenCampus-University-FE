"use client";
import { useAppProvider } from "@/providers/app-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { keepPreviousData } from "@tanstack/react-query";
import { useMyNFTs } from "@/hooks/api/nft";
import { useMyChatbotList } from "@/hooks/api/chatbot";
import { ChatbotData, NftData } from "@/lib/types";
import { LoadMore, LoadMoreSpinner } from "@/components/load-more";
import { PaginationController } from "@/components/pagination-2/controller";
import Money from "public/images/money.svg";

import { useRouter } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";
import { KF_TITLE } from "@/utils/constants";
import { chatbotSlug, handleAppUrl } from "@/utils/utils";

type NoDataProps = {
  item: string;
  url: string;
};

const NoData = ({ item, url }: NoDataProps) => {
  return (
    <div className="mb-16 mt-1 flex flex-col items-center justify-center gap-4">
      <Image src={Money} width={77} height={77} alt={"No Data"} />
      <p className="font-semibold lowercase text-primary">No data yet</p>

      {/* Create new Item */}
      {/* {item == "SFT" ? (
        <Link href={url}>
          <div className="flex items-center gap-2 hover:brightness-75 text-primary">
            <FaPlus />
            <p className="text-sm">Create new {item}</p>
          </div>
        </Link>
      ) : (
        <></>
      )} */}
    </div>
  );
};

type NFTCardProps = {
  nft: NftData;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-box">
      <Image
        src={nft.profile_image || "/images/nft-default-thumb.png"}
        className="w-full rounded-2xl object-cover"
        width={300}
        height={300}
        alt={"NFT Card"}
      />
      <div className="flex flex-col gap-1 px-4 pt-4">
        {/* <Link href={`/nft/${nft.sft_id}`}> */}
        <p className="line-clamp-1 font-semibold text-primary">{nft.name}</p>
        {/* </Link> */}
      </div>

      {/* <p className="line-clamp-1 text-sm text-heading">
          {nft.price_per_query} {nft.token_symbol}
        </p> */}
      {/* <p className="line-clamp-1 text-[12px] text-gray-400">
          {nft.category || "Uncategorised"}
        </p> */}
      <Link href={`/nft/${nft.sft_id}`}>
        <div className="absolute bottom-8 hidden h-12 w-full items-center justify-center rounded-b-2xl bg-primary group-hover:flex hover:bg-primary-dark">
          <p className="text-center text-sm font-semibold text-container">
            View More
          </p>
        </div>
      </Link>
    </div>
  );
};

const NFTList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const { isPending, isError, error, data, isFetching } = useMyNFTs(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created",
    },
    keepPreviousData,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md text-heading">Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { nft_data: nftsData, nft_count: nftCount } = data.data.data;

  if (nftCount > 0) {
    const totalPages = Math.ceil(nftCount / pageSize);

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 md:gap-x-6 md:gap-y-6 lg:gap-y-6">
          {nftsData.map((nft: NftData) => (
            <NFTCard nft={nft} key={nft.sft_id} />
          ))}
        </div>
        <div className="flex flex-col items-center pb-4">
          <div
            className={`${!isFetching && "invisible"} my-2 flex w-full items-center justify-center gap-4`}
          >
            <FaSpinner size={20} className="animate-spin" />
            <p className="text-md text-heading">Loading</p>
          </div>
          <PaginationController
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </>
    );
  }

  return <NoData item="SFT" url="/knowledge/create" />;
};

type BotCardProps = {
  bot: ChatbotData;
};

const BotCard = ({ bot }: BotCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-box">
      <Image
        src={bot.profile_image || "/images/bot-default-thumb.png"}
        className="w-full rounded-2xl object-cover"
        width={300}
        height={300}
        alt={"Bot Card"}
      />
      <div className="flex flex-col gap-1 px-4 pt-4">
        <p className="line-clamp-1 font-semibold text-primary">{bot.name}</p>
        {/* <p className="line-clamp-1 text-xs text-gray-400">
          {bot.category_name || "Uncategorised"}
        </p> */}
      </div>
      <div className="absolute bottom-8 hidden h-12 w-full divide-x-2 divide-primary rounded-b-2xl border border-2 border-primary bg-box text-primary group-hover:flex">
        <Link
          className="flex flex-1 items-center justify-center rounded-bl-xl px-1 hover:bg-primary hover:text-container"
          href={`/app/${bot.chatbot_id}`}
        >
          <p className="text-center text-sm font-semibold">View Details</p>
        </Link>
        <Link
          className="flex flex-1 items-center justify-center rounded-br-xl hover:bg-primary hover:text-container"
          href={handleAppUrl(bot)}
        >
          <p className="text-center text-sm font-semibold">Enter App</p>
        </Link>
      </div>
    </div>
  );
};

const BotList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const { isPending, isError, error, data, isFetching } = useMyChatbotList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md text-heading">Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { chatbot_data: botsData, chatbot_count: botCount } = data.data.data;

  if (botCount > 0) {
    const totalPages = Math.ceil(botCount / pageSize);

    return (
      <>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 md:gap-x-6 md:gap-y-6 lg:gap-y-6">
          {botsData.map((bot: ChatbotData) => (
            <BotCard bot={bot} key={bot.chatbot_id} />
          ))}
        </div>
        <div className="flex flex-col items-center pb-4">
          <div
            className={`${!isFetching && "invisible"} my-4 flex w-full items-center justify-center gap-4`}
          >
            <FaSpinner size={20} className="animate-spin" />
            <p className="text-md text-heading">Loading</p>
          </div>
          <PaginationController
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </>
    );
  }

  return <NoData item="Chatbot" url="/chatbot/create" />;
};

export default function NFT() {
  const title = "My Assets";
  const { setHeaderTitle } = useAppProvider();
  const [tab, setTab] = useState<string>("knowledge-assets"); // knowledge-assets, apps

  const handleLoadMore = () => {
    console.log("Load More");
  };

  useEffect(() => {
    document.title = KF_TITLE + title;
    setHeaderTitle(title);

    return () => setHeaderTitle("Default Title");
  }, []);

  return (
    <div className="mb-6 h-full">
      <h1 className="py-3 text-lg font-semibold text-heading">My Assets</h1>
      <div className="flex flex-col rounded-2xl border border-[#DDDDEB] bg-sidebar px-4 py-7 pb-0 lg:px-6 xl:px-8">
        <div className="mb-8 mt-0 flex items-center space-x-10 border-b-2 text-sm font-semibold text-primary">
          <button
            className={`relative top-[1px] ${tab == "knowledge-assets" ? "border-b-2 border-primary text-primary" : "opacity-50 hover:text-body"}`}
            onClick={() => setTab("knowledge-assets")}
          >
            KnowledgeKeys
          </button>
          <button
            className={`relative top-[1px] ${tab == "apps" ? "border-b-2 border-primary text-primary" : "opacity-50 hover:text-body"}`}
            onClick={() => setTab("apps")}
          >
            Apps
          </button>
        </div>

        {tab == "knowledge-assets" ? (
          <NFTList />
        ) : tab == "apps" ? (
          <BotList />
        ) : null}
      </div>
      {/* <div className="flex flex-col gap-2 lg:gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-heading">My SFTs</h1>
          <hr className="my-4 border border-border" />
        </div>
        <NFTList />
      </div>
      <div className="flex flex-col gap-2 lg:gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-heading">My Chatbots</h1>
          <hr className="my-4 border border-border" />
        </div>
        <BotList />
      </div> */}
    </div>
  );
}
