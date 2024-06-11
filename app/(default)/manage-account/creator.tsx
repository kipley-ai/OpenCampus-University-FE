import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import { useCreatorOverview } from "@/hooks/api/user";
import { useEffect, useState } from "react";
import CrossIcon from "public/images/cross-icon.svg";
import { keepPreviousData } from "@tanstack/react-query";
import { useMyNFTs } from "@/hooks/api/nft";
import { PaginationController } from "@/components/pagination-2/controller";
import { FaPlus, FaSpinner } from "react-icons/fa6";
import { ChatbotData, NftData } from "@/lib/types";
import { IconContext } from "react-icons";
import ArrowIcon from "public/images/arrow.svg";
import Link from "next/link";
import RangeInputMulti from "@/components/range-input";
import Button from "@/components/button";
import { set } from "zod";
import { withdrawEarnings } from "@/smart-contract/kip-protocol-contract";

type NoDataProps = {
  item: string;
  url: string;
};

const NoData = ({ item, url }: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/images/no-data.png"
        width={167}
        height={115}
        alt={"No Data"}
      />
      <p className="text-lg font-semibold text-heading">No data yet</p>
      <Link href={url}>
        <div className="flex items-center gap-2 hover:brightness-75">
          <IconContext.Provider value={{ color: "#00EDBE" }}>
            <div>
              <FaPlus />
            </div>
          </IconContext.Provider>
          <p className="text-sm text-primary">Create new {item}</p>
        </div>
      </Link>
    </div>
  );
};

const WithdrawConfirm = ({
  nftData,
  setIsOpen,
  setStep,
}: {
  nftData: NftData | undefined;
  setIsOpen: any;
  setStep: any;
}) => {
  const [withdrawValue, setWithdrawValue] = useState<string>("0");
  const [values, setValues] = useState<number[]>([0, 500]);

  useEffect(() => {
    setWithdrawValue(values[1].toString());
  }, [values[1]]);

  const handleWithdraw = async () => {
    try {
      const res = await withdrawEarnings(
        nftData?.sft_address!,
        1,
        Number(withdrawValue),
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setIsOpen(false);
    setStep(1);
  };

  return (
    <>
      <div className="flex flex-row space-x-4">
        <Image
          src={nftData?.profile_image || "/images/nft-default-thumb.png"}
          className="rounded-xl"
          width={130}
          height={130}
          alt={"NFT Card"}
        />
        <h6 className="text-base font-semibold text-heading">
          {nftData?.name}
        </h6>
      </div>
      <div className="mb-5 mt-16 flex flex-row items-center justify-between text-xs text-gray-50 lg:text-sm">
        <span>0</span>
        <div className="w-4/6">
          <RangeInputMulti
            rtl={false}
            min={0}
            max={1000}
            step={1}
            values={values}
            setValues={setValues}
          />
        </div>
        <span>1000 OCU Credits</span>
      </div>
      <div className="flex flex-row justify-between">
        <button
          className="rounded bg-box px-4 py-2 text-sm font-semibold text-primary ring-1 ring-gray-700"
          onClick={() => {
            setValues([0, 0]);
            setWithdrawValue("0");
          }}
        >
          Clear
        </button>
        <input
          type="text"
          className="rounded border-0 bg-box text-center ring-1 ring-gray-700"
          value={withdrawValue}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value)) value = 0;
            value = Math.max(0, Math.min(1000, value));
            setValues([0, value]);
            setWithdrawValue(value.toString());
          }}
        />
        <button
          className="rounded bg-box px-4 py-2 text-sm font-semibold text-primary ring-1 ring-gray-700"
          onClick={() => {
            setValues([0, 1000]);
            setWithdrawValue("1000");
          }}
        >
          Max
        </button>
      </div>
      <Button onClick={handleWithdraw} className="mt-8 w-full">
        <p>Continue</p>
      </Button>
    </>
  );
};

const NFTCard = ({
  nft,
  setNftData,
  setStep,
}: {
  nft: NftData;
  setNftData: any;
  setStep: any;
}) => {
  return (
    <div
      className="group relative flex cursor-pointer flex-col rounded-3xl bg-box"
      onClick={() => {
        setStep(2);
        setNftData(nft);
      }}
    >
      <Image
        src={nft.profile_image || "/images/nft-default-thumb.png"}
        className="mx-auto h-full rounded-t-3xl object-cover p-1 pb-0"
        width={300}
        height={300}
        alt={"NFT Card"}
      />
      <div className="flex flex-col gap-1 px-4 py-4">
        <p className="line-clamp-1 text-sm text-heading">{nft.name}</p>
        <p className="line-clamp-1 text-sm text-heading">
          {nft.price_per_query} {nft.token_symbol}
        </p>
        {/* <p className="line-clamp-1 text-[12px] text-gray-400">
          {nft.category || "Uncategorised"}
        </p> */}
      </div>
      <div className="absolute bottom-0 hidden h-12 w-full items-center justify-center space-x-2 rounded-b-2xl bg-primary group-hover:flex">
        <p className="text-center text-sm font-semibold text-container">
          Withdraw
        </p>
      </div>
    </div>
  );
};

const NFTList = ({
  setNftData,
  setStep,
}: {
  setNftData: any;
  setStep: any;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
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
        <p className="text-md">Loading</p>
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6 md:gap-y-8 lg:gap-y-12">
          {nftsData.map((nft: NftData) => (
            <NFTCard
              nft={nft}
              key={nft.sft_id}
              setNftData={setNftData}
              setStep={setStep}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`${!isFetching && "invisible"} flex w-full items-center justify-center gap-4`}
          >
            <FaSpinner size={20} className="animate-spin" />
            <p className="text-md">Loading</p>
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

  return <NoData item="SFT" url="/nft/create" />;
};

const WithdrawModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [nftData, setNftData] = useState<NftData>();
  const [step, setStep] = useState<number>(1);
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`flex ${step === 1 ? "w-[859px]" : "w-[448px]"} flex-col rounded-lg px-8 py-6 shadow-md`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          {step === 1 ? (
            <h1 className="text-3xl font-bold leading-10 text-heading">
              My KnowledgeKeys
            </h1>
          ) : step === 2 ? (
            <h1 className="text-3xl font-bold leading-10 text-heading">
              Withdraw KnowledgeKey
            </h1>
          ) : (
            <></>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setTimeout(() => {
                setStep(1);
              }, 500);
            }}
          >
            <div className="sr-only">Close</div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="#353945"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="var(--color-heading)"
              />
            </svg>
          </button>
        </div>
        <div className="mt-10">
          {step === 1 ? (
            <NFTList setNftData={setNftData} setStep={setStep} />
          ) : step === 2 ? (
            <WithdrawConfirm
              nftData={nftData}
              setStep={setStep}
              setIsOpen={setIsOpen}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </ModalBlank>
  );
};

export default function CreatorOverview() {
  const [showModal, setShowModal] = useState(false);
  const { data: overviewData } = useCreatorOverview();
  return (
    <>
      <WithdrawModal isOpen={showModal} setIsOpen={setShowModal} />
      <div className="flex w-5/6 flex-col px-10 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>
        <div className="my-8 flex flex-col gap-4 rounded-xl p-6 ">
          <div className="mb-8 flex items-center justify-between">
            {/* <div className="content-none rounded-xl bg-[#B1E5FC]">a</div> */}
            <div className="flex">
              <svg
                width="16"
                height="33"
                viewBox="0 0 16 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.5"
                  width="16"
                  height="32"
                  rx="4"
                  fill="var(--color-primary)"
                />
              </svg>
              <h4 className="ml-4 text-2xl font-semibold ">Creator Overview</h4>
            </div>
            <Button onClick={() => setShowModal(true)} className="">
              Withdraw your earnings
            </Button>
          </div>
          <div className="flex">
            <div className="mr-3 w-1/2 rounded-xl border p-8">
              <div className="mb-4 w-fit rounded-full bg-white p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H4V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM18 4H6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V4Z"
                    fill="#181B1F"
                  />
                  <path
                    d="M12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7071 7.29289Z"
                    fill="#181B1F"
                  />
                </svg>
              </div>
              <div className="flex items-center">
                <h4 className="mr-1 text-[16px] font-semibold ">Earnings</h4>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z"
                    fill="#EFEFEF"
                  />
                </svg>
              </div>
              <h4 className="text-4xl font-semibold ">
                {overviewData?.data.data.earnings}
              </h4>
            </div>
            <div className="mr-3 w-1/2 rounded-xl border p-8">
              <div className="mb-4 w-fit rounded-full bg-white p-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM5 6H19C19.5523 6 20 6.44771 20 7V8H4V7C4 6.44772 4.44772 6 5 6ZM4 10V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V10H4Z"
                    fill="#1A1D1F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 15C6 14.4477 6.44772 14 7 14H13C13.5523 14 14 14.4477 14 15C14 15.5523 13.5523 16 13 16H7C6.44772 16 6 15.5523 6 15Z"
                    fill="#1A1D1F"
                  />
                </svg>
              </div>
              <div className="flex items-center">
                <h4 className="mr-1 text-[16px] font-semibold ">Users</h4>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z"
                    fill="#EFEFEF"
                  />
                </svg>
              </div>
              <h4 className="text-4xl font-semibold ">
                {overviewData?.data.data.users}
              </h4>
            </div>
            <div className="w-1/2 rounded-xl border p-8">
              <div className="mb-4 w-fit rounded-full bg-white p-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.4889 3.05441C7.37598 2.52744 6.62402 2.52743 6.5111 3.05442L5.31658 8.62885C5.02017 10.0121 3.79778 11.0003 2.38317 11.0003H1C0.447715 11.0003 0 10.5526 0 10.0003C0 9.44798 0.447715 9.00027 1 9.00027H2.38317C2.85471 9.00027 3.26217 8.67087 3.36097 8.2098L4.55549 2.63536C5.12011 0.000466108 8.87988 0.00044179 9.44451 2.63535L12.5111 16.9461C12.624 17.4731 13.376 17.4731 13.4889 16.9461L14.6834 11.3717C14.9798 9.98847 16.2022 9.00027 17.6168 9.00027H19C19.5523 9.00027 20 9.44798 20 10.0003C20 10.5526 19.5523 11.0003 19 11.0003H17.6168C17.1453 11.0003 16.7378 11.3297 16.639 11.7907L15.4445 17.3652C14.8799 20.0001 11.1201 20.0001 10.5555 17.3652L7.4889 3.05441Z"
                    fill="#1A1D1F"
                  />
                </svg>
              </div>
              <div className="flex items-center">
                <h4 className="mr-1 text-[16px] font-semibold ">
                  Conversations
                </h4>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z"
                    fill="#EFEFEF"
                  />
                </svg>
              </div>
              <h4 className="text-4xl font-semibold ">
                {overviewData?.data.data.conversations}
              </h4>
            </div>
          </div>
          {/* <StatsCard
            title="Conversations"
            number="3.8M"
            icon={ConvoCheckMarkIcon}
        />
        <StatsCard title="Users" number="18,000" icon={PersonIcon} /> */}
        </div>

        {/* <div className="py-3">
        <ContentListComponent chats={chatData} />
    </div> */}
        {/* <div className="dark rounded-xl py-3">
        <DashboardCard05 />
      </div> */}
      </div>
    </>
  );
}
