"use client";
import nft1 from "@/public/images/nft-1.png";
import Image from "next/image";
import user_avatar from "@/public/images/user-28-01.jpg";
import keyboard from "@/public/images/applications-image-23.jpg";
import { KF_TITLE } from "@/utils/constants";
import { useAppProvider } from "@/providers/app-provider";
import link_nft_chatbot from "@/public/images/link-nft-chatbot.png";
import { useCallback, useState, useEffect } from "react";
import { useNftDetail } from "@/hooks/api/nft";
import { useUserDetail } from "@/hooks/api/user";
import { useSuperAdmin } from "@/hooks/api/access";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useKBDetail } from "@/hooks/api/kb";
import { useCreditBalance } from "@/hooks/api/credit";
import defaultAvatar from "@/public/images/avatar-default-02.svg";
import { FaSpinner } from "react-icons/fa6";
import { ChatbotData, NftData } from "@/lib/types";
import { chatbotSlug, handleAppUrl } from "@/utils/utils";
import { useChatbotList } from "@/hooks/api/chatbot";
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

interface NFTSectionProps {
  nftDetail: any;
  hasAccess: boolean;
}

const NFTSection = ({ nftDetail, hasAccess }: NFTSectionProps) => {
  const { session } = useAppProvider();

  const nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftDetail.sft_address}/${nftDetail.token_id}`;

  return (
    <div className="grid grid-cols-1 gap-4 text-heading md:grid-cols-3 md:pb-12">
      <div className="mx-auto w-1/2 md:w-full">
        <Image
          className="rounded-2xl"
          src={nftDetail.profile_image}
          alt="nft image"
          width={325}
          height={325}
        />
      </div>
      <div className="p-3 sm:pb-3 sm:pl-7 md:col-span-2">
        <h1 className="text-center text-2xl font-semibold md:text-left md:text-4xl">
          {nftDetail.name}
        </h1>
        <div className="my-4 mb-5 border-t-2 border-border"></div>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-medium text-[#94A3B8]">
            Owner
          </p>
          <p className="text-sm font-medium text-heading">
            {nftDetail.wallet_addr!.substring(0, 6) +
              "..." +
              nftDetail.wallet_addr!.substring(
                nftDetail.wallet_addr!.length - 6,
              )}
          </p>
        </div>
        <div className="mt-3 flex flex-row gap-2">
          <span className="block text-sm font-medium text-[#94A3B8]">
            Last Updated
          </span>
          <span className="block text-sm font-medium text-heading">
            {formatTimestamp(nftDetail.created)}
          </span>
        </div>
        <div className="mt-3 flex flex-row">
          <p className="mr-2 text-center text-sm font-medium text-[#94A3B8] md:text-left">
            Created
          </p>
          <p className="text-center text-sm font-medium text-heading md:text-left">
            {formatTimestamp(nftDetail.created)}
          </p>
        </div>
        <div className="mt-3">
          <a
            href={nftOpenSeaLink}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-row items-center hover:brightness-50"
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
            <p className="ml-2 text-center text-sm font-medium text-primary group-hover:underline md:text-left">
              View on OpenSea
            </p>
          </a>
        </div>
        {/* <div className="my-4 border-t-2 border-border"></div> */}
        {hasAccess && (
          <div className="mt-4 flex flex-grow items-center justify-between sm:mb-2 sm:mt-11">
            <Link href={"/nft/" + nftDetail.sft_id + "/edit"}>
              <button className="button group inline-flex items-center gap-2 rounded-md">
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
        )}
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
    <div className="grid grid-cols-1 gap-x-12 gap-y-8 pt-4 text-heading md:grid-cols-2 md:gap-y-4 md:pt-10 xl:gap-x-20">
      <div className="flex items-center justify-between gap-4 md:col-span-2">
        <div className="flex items-center">
          <Image
            className="mr-4 rounded-lg object-cover"
            width={85}
            height={85}
            src={chatbotDetail.profile_image}
            alt="chatbot image"
          />
          <h1 className="text-6xl font-semibold md:text-4xl">
            {chatbotDetail.name}
            {/* {console.log(chatbotDetail)} */}
          </h1>
        </div>
        <div>
          <Link href={"/chatbot/" + chatbotDetail.chatbot_id + "/edit"}>
            <button className="button group inline-flex gap-2">
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
              <span>Manage Chatbot</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="col-span-1 font-poppins text-sm text-body">
        <p className="mb-4">{chatbotDetail.description}</p>
      </div>
      <div className="text-sm font-semibold">
        <div className="mt-2 rounded bg-box px-4 py-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm font-bold text-[#7C878E]">
              Chatbot Owner
            </span>
            <span className="block text-sm text-heading">
              {chatbotDetail.wallet_addr!.substring(0, 6) +
                "..." +
                chatbotDetail.wallet_addr!.substring(
                  chatbotDetail.wallet_addr!.length - 6,
                )}
            </span>
          </div>
        </div>
        <div className="mt-2 rounded bg-box px-4 py-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm font-bold text-[#7C878E]">
              Created At
            </span>
            <span className="block text-sm text-heading">
              {formatTimestamp(chatbotDetail.created_at)}
            </span>
          </div>
        </div>
        <div className="mt-2 rounded bg-box px-4 py-2">
          <div className="flex flex-grow justify-between">
            <span className="block text-sm font-bold text-[#7C878E]">
              Last Updated At
            </span>
            <span className="block text-sm">
              {formatTimestamp(chatbotDetail.last_updated)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

type BotCardProps = {
  bot: ChatbotData;
};

const BotCard = ({ bot }: BotCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-sidebar">
      <Image
        src={bot.profile_image || "/images/bot-default-thumb.png"}
        className="mx-auto h-full rounded-2xl object-cover"
        width={300}
        height={300}
        alt={"Bot Card"}
      />
      <div className="flex flex-col gap-1 pt-6">
        <p className="line-clamp-1 text-ellipsis font-semibold text-primary">
          {bot.name}
        </p>
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
          className="flex flex-1 items-center justify-center rounded-br-xl px-1 hover:bg-primary hover:text-container"
          href={handleAppUrl(bot)}
        >
          <p className="text-center text-sm font-semibold">Enter App</p>
        </Link>
      </div>
    </div>
  );
};

const BotList = ({ id }: { id: any }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);

  const { isPending, isError, error, data, isFetching } = useChatbotList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created_at",
      sft_id: id!,
      explore_name: "",
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

    //console.log(botsData); // For debugging purpose

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

  return <NoData />;
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
            Mint your KnowledgeKey
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
              Link Your KnowledgeKey to Chatbot
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

const NoData = () => {
  return (
    <div className="my-6 flex flex-col items-center justify-center gap-4">
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

const NFTDetail = ({ params }: { params: any }) => {
  const { session } = useAppProvider();
  const { id } = params;
  const router = useRouter();

  const nftQuery = useNftDetail({ sft_id: id });
  const userDetail = useUserDetail();
  const superAdmin = useSuperAdmin(userDetail.data?.data.data.wallet_addr);

  if (nftQuery.isPending || userDetail.isPending || superAdmin.isPending) {
    return null;
  }

  let hasAccess =
    nftQuery.data?.data.data.wallet_addr.toLowerCase() ===
      userDetail.data?.data.data.wallet_addr.toLowerCase() ||
    superAdmin.data?.data.status === "success";

  return (
    <div className="bg-container">
      <title>{KF_TITLE + nftQuery.data?.data?.data.name + " - KnowledgeKey Details"}</title>
      <h1 className="mb-4 text-lg font-semibold text-heading">
        KnowledgeKey Details
      </h1>
      <div className="flex flex-col rounded-2xl border-2 border-border bg-sidebar px-3 py-3 pb-0 sm:py-8 lg:px-8 xl:px-10">
        <NFTSection
          nftDetail={nftQuery.data?.data?.data}
          hasAccess={hasAccess}
        />
        <hr className="my-6 border-t-2 border-border" />
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary md:pt-3">
            Apps
          </span>
          {hasAccess && (
            <Link href={"/nft/" + id + "/create-app"}>
              <button className="button group inline-flex items-center gap-2 rounded-md">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary group-hover:fill-container"
                >
                  <g clip-path="url(#clip0_700_11496)">
                    <path d="M13.125 6.99971C13.125 7.39135 12.8099 7.70644 12.4183 7.70644H7.70673V12.418C7.70673 12.8081 7.39018 13.125 7 13.125C6.60983 13.125 6.29327 12.8096 6.29327 12.418V7.70644H1.58173C1.19156 7.70644 0.875002 7.39017 0.875002 7C0.875002 6.611 1.19156 6.29297 1.58173 6.29297H6.29327V1.58144C6.29327 1.19126 6.60983 0.875 7 0.875C7.39018 0.875 7.70673 1.19126 7.70673 1.58144V6.29297H12.4183C12.8099 6.29297 13.125 6.611 13.125 6.99971Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_700_11496">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-sm font-medium">New App</span>
              </button>
            </Link>
          )}
        </div>
        <div className="pt-3">
          <BotList id={id} />
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

            <p className="ml-2 text-sm font-medium uppercase">Back</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default NFTDetail;
