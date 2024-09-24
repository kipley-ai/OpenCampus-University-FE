"use client";
import nft1 from "@/public/images/nft-1.png";
import Image from "next/image";
import user_avatar from "@/public/images/user-28-01.jpg";
import keyboard from "@/public/images/applications-image-23.jpg";
import { useAppProvider } from "@/providers/app-provider";
import { use, useEffect } from "react";
import link_nft_chatbot from "@/public/images/link-nft-chatbot.png";
import { useCallback, useState } from "react";
import { useNFTList, useNftDetail } from "@/hooks/api/nft";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useUserDetail } from "@/hooks/api/user";
import { useSuperAdmin } from "@/hooks/api/access";
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
import { useGetPlugin } from "@/hooks/api/quiz_app";
import Money from "public/images/money.svg";
import {
  handleAppUrlWithoutSlug,
} from "@/utils/utils";
import {
  KF_TITLE,
  CHATBOT_APP,
  QUIZ_APP,
  BOOK_SUMMARIZER_APP,
  DIGITAL_TWIN_APP,
  RESEARCH_ASSISTANT_APP,
  TEACHING_ASSISTANT_APP,
  VALID_APPS,
} from "@/utils/constants";

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

const ChatbotSection = ({
  chatbotDetail,
  kbDetail,
  hasAccess,
}: {
  chatbotDetail: any;
  kbDetail: any;
  hasAccess: boolean;
}) => {
  const { data: pluginData } = useGetPlugin();

  const plugin = pluginData?.find(
    (plugin) => plugin.plugin_id === chatbotDetail.plugin_id,
  );
  // console.log("Plugin detail: ", plugin); // For debugging purpose
  const { session } = useAppProvider();
  const [appType, setAppType] = useState("");

  useEffect(() => {
    if (plugin?.title === "Semantic Quiz Generation") {
      setAppType("Quiz");
    } else {
      setAppType("Chatbot");
    }
  }, [appType, plugin?.title]);

  return (
    <div className="grid grid-cols-1 gap-4 text-heading md:grid-cols-3">
      <div className="mx-auto w-1/2 md:w-full">
        <Image
          className="rounded-2xl max-md:mx-auto"
          src={chatbotDetail.profile_image}
          alt="nft image"
          width={325}
          height={325}
        />
      </div>
      <div className="p-3 sm:pb-3 sm:pl-7 md:col-span-2 md:pt-0">
        <h1 className="text-center text-2xl font-semibold md:text-left md:text-4xl">
          {chatbotDetail.name}
        </h1>
        <div className="my-4 mb-5 border-t-2 border-border"></div>
        <div className="flex flex-row">
          <p className="text-left text-sm font-medium text-heading">
            {chatbotDetail.description}
          </p>
        </div>
        <div className="mt-3 flex flex-row">
          <p className="mr-2 text-sm font-medium text-[#94A3B8]">
            Owner
          </p>
          <p className="text-sm font-medium text-heading">
            {chatbotDetail.wallet_addr!.substring(0, 6) +
              "..." +
              chatbotDetail.wallet_addr!.substring(
                chatbotDetail.wallet_addr!.length - 6,
              )}
          </p>
        </div>
        <div className="mt-3 flex flex-row gap-2">
          <span className="block text-sm font-medium text-[#94A3B8]">
            Last Updated
          </span>
          <span className="block text-sm font-medium text-heading">
            {formatTimestamp(chatbotDetail.last_updated)}
          </span>
        </div>
        <div className="mt-3 flex flex-row">
          <p className="mr-2 text-sm font-medium text-[#94A3B8]">Created</p>
          <p className="text-sm font-medium text-heading">
            {formatTimestamp(chatbotDetail.created_at)}
          </p>
        </div>
        {hasAccess && (
          <Link href={handleAppUrlWithoutSlug(chatbotDetail) + "/edit"}>
            <button className="button group mt-4 inline-flex items-center gap-2 rounded-md">
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
        )}
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

type NFTCardProps = {
  nft: NftData;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl bg-sidebar">
      <Image
        src={nft.profile_image || "/images/nft-default-thumb.png"}
        className="mx-auto h-full rounded-2xl object-cover"
        width={300}
        height={300}
        alt={"NFT Card"}
      />
      <div className="flex flex-col gap-1 pt-6">
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

const NFTList = ({ id }: { id: any }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);

  // console.log(id)

  const { isPending, isError, error, data, isFetching, isSuccess } = useNFTList(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created",
      sft_id: id,
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

const BotDetail = ({ params }: { params: any }) => {
  const { session } = useAppProvider();
  const { id } = params;
  const [sftId, setSftId] = useState("");
  const router = useRouter();

  // const nftQuery = useChatbotDetail({ chatbot_id: id });

  const chatbotQuery = useChatbotDetail({
    chatbot_id: id,
  });
  const userDetail = useUserDetail();
  const superAdmin = useSuperAdmin(userDetail.data?.data.data.wallet_addr);

  const { data: kbDetail } = useKBDetail({
    kb_id: chatbotQuery.data?.data?.data.kb_id as string,
  });

  const { data: pluginData } = useGetPlugin();

  const plugin = pluginData?.find(
    (plugin) => plugin.plugin_id === chatbotQuery.data?.data?.data.plugin_id,
  );
  // console.log("Plugin detail: ", plugin); // For debugging purpose

  useEffect(() => {
    if (chatbotQuery.isSuccess) {
      setSftId(chatbotQuery.data?.data?.data.sft_id);
    }
  }, [chatbotQuery.isSuccess]);

  if (chatbotQuery.isPending || userDetail.isPending || superAdmin.isPending) {
    return null;
  }

  let hasAccess =
    chatbotQuery.data?.data.data.wallet_addr.toLowerCase() ===
      userDetail.data?.data.data.wallet_addr.toLowerCase() ||
    superAdmin.data?.data.status === "success";

  let appType: string | undefined = "";
  console.log("Plugin: ", plugin);
  
  switch (plugin?.title) {
    case QUIZ_APP:
      appType = "Quiz";
      break;
    case DIGITAL_TWIN_APP:
      appType = "Digital Twin";
      break;
    case BOOK_SUMMARIZER_APP:
      appType = "Book Summarizer";
      break;
    case CHATBOT_APP:
      appType = "Study Companion";
      break;
    default:
      appType = plugin?.title;
  }

  return (
    <div className="bg-container">
      <title>{KF_TITLE + chatbotQuery.data?.data?.data.name + " - " + appType + " Details"}</title>
      <h1 className="mb-4 text-lg font-semibold text-heading">
        {appType} Details
      </h1>
      <div className="flex flex-col rounded-2xl border border-border bg-sidebar px-3 py-3 pb-0 sm:py-8 lg:px-8 xl:px-10">
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
              hasAccess={hasAccess}
            />
          ) : // <NoChatbot />
          null}
        </div>

        <hr className="my-6 border-t-2 border-border" />

        {chatbotQuery.isSuccess && sftId ? (
          <>
            <div className="flex items-start justify-between gap-2 max-xs:flex-col xs:items-center">
              <span className="text-lg font-semibold text-primary">
                KnowledgeKeys
              </span>
              {hasAccess && (
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
                  <span className="text-sm font-medium">New KnowledgeKey</span>
                </button>
              )}
            </div>
            <div className="pt-3">
              <NFTList id={sftId} />
            </div>
          </>
        ) : null}
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

            <p className="ml-2 text-sm font-medium">Back</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default BotDetail;
