"use client";
import nft1 from "@/public/images/nft-1.png";
import Image from "next/image";
import user_avatar from "@/public/images/user-28-01.jpg";
import keyboard from "@/public/images/applications-image-23.jpg";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect } from "react";
import link_nft_chatbot from "@/public/images/link-nft-chatbot.png";
import { useCallback, useState } from "react";
import { useNFTList, useNftDetail } from "@/hooks/api/nft";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useKBDetail } from "@/hooks/api/kb";
import { useCreditBalance } from "@/hooks/api/credit";
import defaultAvatar from "@/public/images/avatar-default-02.svg";
import { FaSpinner } from "react-icons/fa6";
import { id } from "ethers";
import { ChatbotData, NftData } from "@/lib/types";
import { keepPreviousData } from "@tanstack/react-query";
import { PaginationController } from "@/components/pagination-2/controller";
import Money from "public/images/money.svg";

const formatTimestamp = (timestamp: string): string => {
  const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
  const formatMonth = (date: Date): string =>
    date.toLocaleString("default", { month: "short" });

  const date = new Date(timestamp);
  const day = date.getDate();
  const month = formatMonth(date);
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = padZero(date.getMinutes());

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

const NFTSection = ({ nftDetail }: { nftDetail: any }) => {
  const nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftDetail.sft_address}`;

  return (
    <div className="grid grid-cols-1 gap-4 pb-4 text-heading md:grid-cols-3 md:pb-12">
      <div className="w-2/5 md:w-full">
        <Image
          className="rounded-2xl"
          src={nftDetail.profile_image}
          alt="nft image"
          width={325}
          height={325}
        />
      </div>
      <div className="md:col-span-2 pl-7 pb-10">
        <h1 className="text-center text-3xl font-semibold md:text-left md:text-4xl">
          {nftDetail.name}
        </h1>
        <div className="my-4 border-t-2 border-border mb-5"></div>
        <div className="flex flex-row">
          <p className="mr-2 text-center text-sm text-[#94A3B8] md:text-left font-medium">
            SFT Owner
          </p>
          <p className="text-center text-sm text-heading md:text-left font-medium">
            {nftDetail.wallet_addr!.substring(0, 6) +
              "..." +
              nftDetail.wallet_addr!.substring(
                nftDetail.wallet_addr!.length - 6,
              )}
          </p>
        </div>
        <div className="flex flex-row mt-3">
          <p className="mr-2 text-center text-sm text-[#94A3B8] md:text-left font-medium">
            Created Time
          </p>
          <p className="text-center text-sm text-heading md:text-left font-medium">
            {formatTimestamp(nftDetail.created)}
          </p>
        </div>
        <div className="mt-3">
          <a
            href={nftOpenSeaLink}
            target="_blank"
            rel="noreferrer"
            className="flex flex-row hover:brightness-150"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 25 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.5 11V5V3H19.5H13.5V5H17.5V7H15.5V9H13.5V11H11.5V13H9.5V15H11.5V13H13.5V11H15.5V9H17.5V7H19.5V11H21.5ZM11.5 5H5.5H3.5V7V19V21H5.5H17.5H19.5V19V13H17.5V19H5.5V7H11.5V5Z"
                fill="#7C878E"
              />
            </svg>
            <p className="ml-2 text-center text-sm text-primary md:text-left font-medium">
              View on OpenSea
            </p>
          </a>
        </div>
        {/* <div className="my-4 border-t-2 border-border"></div> */}
        <div className="mb-2 flex flex-grow justify-between items-center mt-11">
          <h3 className="text-center text-sm font-semibold md:text-left uppercase">
            More Info
          </h3>
          {/* <Link href={"/chatbot/" + nftDetail.chatbot_id + "/edit"}> */}
          {/* <Link href={"/nft/" + nftDetail.chatbot_id + "/edit"}> */}
          <Link href={"/nft/" + nftDetail.sft_id + "/edit"}>
            <button className="group button inline-flex items-center gap-2 rounded-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="fill-primary group-hover:fill-container"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8 2H13.2L13.2 3.6H11.6V5.2H10V6.8H8.4V8.4H6.8V10H5.2V11.6H3.6V13.2L2 13.2V16.4V18H3.6H6.8V16.4L8.4 16.4V14.8H10V13.2L11.6 13.2V11.6H13.2V10H14.8V8.4H16.4V6.8H18V5.2H16.4L16.4 3.6H14.8V2ZM14.8 8.4H13.2L13.2 10H11.6V11.6H10V13.2H8.4V14.8H6.8V13.2L5.2 13.2V11.6H6.8V10H8.4V8.4H10V6.8H11.6V5.2H13.2L13.2 6.8H14.8V8.4ZM5.2 13.2H3.6V16.4H6.8V14.8H5.2V13.2Z"
                />
              </svg>
              <span className="text-sm font-medium">Manage</span>
            </button>
          </Link>
        </div>
        <div className="mt-2 rounded rounded-md bg-box px-5 py-2 border border-[#DDDDEB]">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm text-[#94A3B8] font-medium">
              Data Types
            </span>
            <span className="block text-sm capitalize text-heading font-medium">
              {nftDetail.type}
            </span>
          </div>
        </div>
        <div className="mt-2 rounded rounded-md bg-box px-5 py-2 border border-[#DDDDEB]">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm text-[#94A3B8] font-medium">
              Last Updated at
            </span>
            <span className="block text-sm text-heading font-medium">
              {formatTimestamp(nftDetail.created)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatbotSection = ({
  chatbotDetail,
  kbDetail,
}: {
  chatbotDetail: any;
  kbDetail: any;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 text-heading md:grid-cols-3">
      <div className="w-2/5 md:w-full">
        <Image
          className="rounded-2xl"
          src={chatbotDetail.profile_image}
          alt="nft image"
          width={325}
          height={325}
        />
      </div>
      <div className="md:col-span-2 pl-7 pb-3">
        <h1 className="text-center text-3xl font-semibold md:text-left md:text-4xl">
          {chatbotDetail.name}
        </h1>
        <div className="my-4 border-t-2 border-border mb-5"></div>
        <div className="flex flex-row">
          <p className="text-center text-sm text-heading md:text-left font-medium">
            {chatbotDetail.description}
          </p>
        </div>
        <div className="flex flex-row mt-3">
          <p className="mr-2 text-center text-sm text-[#94A3B8] md:text-left font-medium">
            Chatbot Owner
          </p>
          <p className="text-center text-sm text-heading md:text-left font-medium">
            {chatbotDetail.wallet_addr!.substring(0, 6) +
              "..." +
              chatbotDetail.wallet_addr!.substring(
                chatbotDetail.wallet_addr!.length - 6,
              )}
          </p>
        </div>
        <div className="flex flex-row mt-3">
          <p className="mr-2 text-center text-sm text-[#94A3B8] md:text-left font-medium">
            Created Time
          </p>
          <p className="text-center text-sm text-heading md:text-left font-medium">
            {formatTimestamp(chatbotDetail.created_at)}
          </p>
        </div>
        {/* <div className="my-4 border-t-2 border-border"></div> */}
        <div className="mb-2 flex flex-grow justify-between items-center mt-11">
          <h3 className="text-center text-sm font-semibold md:text-left uppercase">
            More Info
          </h3>
          <Link href={"/chatbot/" + chatbotDetail.chatbot_id + "/edit"}>
            <button className="group button inline-flex items-center gap-2 rounded-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="fill-primary group-hover:fill-container"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8 2H13.2L13.2 3.6H11.6V5.2H10V6.8H8.4V8.4H6.8V10H5.2V11.6H3.6V13.2L2 13.2V16.4V18H3.6H6.8V16.4L8.4 16.4V14.8H10V13.2L11.6 13.2V11.6H13.2V10H14.8V8.4H16.4V6.8H18V5.2H16.4L16.4 3.6H14.8V2ZM14.8 8.4H13.2L13.2 10H11.6V11.6H10V13.2H8.4V14.8H6.8V13.2L5.2 13.2V11.6H6.8V10H8.4V8.4H10V6.8H11.6V5.2H13.2L13.2 6.8H14.8V8.4ZM5.2 13.2H3.6V16.4H6.8V14.8H5.2V13.2Z"
                />
              </svg>
              <span className="text-sm font-medium">Manage Chatbot</span>
            </button>
          </Link>
        </div>
        {/* <div className="mt-2 rounded rounded-md bg-box px-5 py-2 border border-[#DDDDEB]">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm text-[#94A3B8] font-medium">
              Data Types
            </span>
            <span className="block text-sm capitalize text-heading font-medium">
              {kbDetail?.type!}
            </span>
          </div>
        </div> */}
        <div className="mt-2 rounded rounded-md bg-box px-5 py-2 border border-[#DDDDEB]">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm text-[#94A3B8] font-medium">
              Last Updated at
            </span>
            <span className="block text-sm capitalize text-heading font-medium">
              {formatTimestamp(chatbotDetail.last_updated)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoNFT = () => {
  return (
    <div className="h-full pb-4 md:pb-10">
      <div className="relative  w-full rounded-3xl bg-container">
        <Image
          className=" w-full rounded-3xl"
          src={link_nft_chatbot}
          alt={"background"}
        />
        <div
          className="flex w-4/5 flex-col items-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 className="mb-[2px] text-center text-xl font-semibold text-heading md:text-4xl xl:text-[48px]">
            Unlock the power of Web3
          </h1>
          <h1 className="font-regular text-center text-sm text-heading md:mb-[30px] md:text-[18px]">
            Meet our AI chat app revolutionizing conversations
          </h1>
          <h1 className="w-fit rounded-full bg-primary px-8 py-1 text-xs font-semibold text-[#292D32] md:py-3 md:text-base">
            Mint your SFT
          </h1>
        </div>
      </div>
    </div>
  );
};

const NoChatbot = () => {
  // const [imageRef, { width:imageWidth, height:imageHeight }] = useElementSize()
  // const [containerRef, { width:containerWidth, height:containerHeight }] = useElementSize()
  const { id } = useParams();
  return (
    <div className="h-full pt-4 md:pt-10">
      <div className="relative w-full rounded-xl bg-[#2e2d2d] bg-opacity-40">
        <Image
          className="w-full rounded-lg"
          src={link_nft_chatbot}
          alt={"background"}
        />
        <div
          className="flex w-full flex-col items-center gap-4"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* <h1 className="text-center text-xl font-extrabold text-heading md:text-4xl xl:mb-[30px] xl:text-[48px]">
            Connect with AI Chat Bot
          </h1> */}
          <Link href={"/nft/" + id + "/create-chatbot"}>
            {/* <h1 className="w-fit rounded-full bg-primary px-8 py-1 text-xs font-semibold text-[#292D32] md:py-3 md:text-base"> */}
            <h1 className="w-fit rounded-md bg-primary px-8 py-1 text-xs font-semibold text-container md:py-3 md:text-2xl">
              Link Your SFT to Chatbot
            </h1>
          </Link>
        </div>
      </div>
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
        className="mx-auto h-full rounded-2xl object-cover p-1 pb-0"
        width={300}
        height={300}
        alt={"NFT Card"}
      />
      <div className="flex flex-col gap-1 px-4 pt-4">
        {/* <Link href={`/nft/${nft.sft_id}`}> */}
          <p className="line-clamp-1 text-primary font-semibold">{nft.name}</p>
        {/* </Link> */}
      </div>
        
        {/* <p className="line-clamp-1 text-sm text-heading">
          {nft.price_per_query} {nft.token_symbol}
        </p> */}
        {/* <p className="line-clamp-1 text-[12px] text-gray-400">
          {nft.category || "Uncategorised"}
        </p> */}
      <Link href={`/nft/${nft.sft_id}`}>
        <div className="absolute bottom-0 hidden h-12 w-full items-center justify-center rounded-b-2xl bg-primary group-hover:flex">
          <p className="text-center text-sm font-semibold text-container">
            View More
          </p>
        </div>
      </Link>
    </div>
  );
};

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-6">
      <Image
        src={Money}
        width={77}
        height={77}
        alt={"No Data"}
      />
      <p className="text-primary font-semibold lowercase">No data yet</p>

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

const NFTList = ({ id }: { id: any }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  
  const { isPending, isError, error, data, isFetching } = useNFTList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created",
      chatbot_id: id!,
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
            className={`${!isFetching && "invisible"} flex w-full items-center justify-center gap-4`}
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

  return <NoData />;
};

const BotDetail = ({ params }: { params: any }) => {
  const { setHeaderTitle } = useAppProvider();
  useEffect(() => {
    setHeaderTitle("My SFT");
  }, []);
  const { id } = params;
  const router = useRouter();

  // const nftQuery = useChatbotDetail({ chatbot_id: id });
  
  const chatbotQuery = useChatbotDetail({
    chatbot_id: id
  });

  const { data: kbDetail } = useKBDetail({
    kb_id: chatbotQuery.data?.data.data.kb_id as string,
  });

  return (
    <div className="h-full flex-col px-4 md:flex-row md:pl-10 justify-start bg-container md:w-5/6">
      <h1 className="text-heading text-lg font-semibold py-3">Chatbot Details</h1>
      <div className="flex flex-col px-6 py-9 pb-0 lg:px-8 xl:px-10 bg-sidebar border border-[#DDDDEB] rounded-2xl">
        <div>
          {chatbotQuery.isLoading ? (
            <div className="flex h-[50vh] w-full items-center justify-center gap-4">
              <FaSpinner size={20} className="animate-spin" />
              <p className="text-md text-heading">Loading</p>
            </div>
          ) : chatbotQuery.isError ? (
            <div>Error: {chatbotQuery.error.message}</div>
          ) : chatbotQuery.data?.data?.data ? (
            <ChatbotSection
              chatbotDetail={chatbotQuery.data?.data.data}
              kbDetail={kbDetail?.data.data}
            />
          ) : (
            // <NoChatbot />
            null
          )}
        </div>
        <span className="text-lg text-primary font-semibold md:pt-3">Knowledge Assets</span>
        <div className="pt-3">
          <NFTList id={id} />
        </div>
        <div className="my-8 mt-4 flex items-center justify-between">
          <button 
            className="flex items-center justify-center gap-2 hover:underline"
            type="submit"
            onClick={() => {
              router.push(`/nft`);
            }}
          >
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 2.29965L6 0.889648L0 6.88965L6 12.8896L7.41 11.4796L2.83 6.88965L7.41 2.29965Z"
                fill="#141BEB"
              />
            </svg>

            <p className="font-medium text-sm ml-2">Back</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default BotDetail;