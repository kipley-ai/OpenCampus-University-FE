import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
// import CrossIcon from "public/images/cross-icon.svg";
import CrossIcon from "public/images/cross-icon-2.png";
import ModalBlank from "@/components/modal-blank-3";
import { useEffect, useState } from "react";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useMintNFTStatus } from "@/hooks/api/kb";
import { useRouter } from "next/navigation";
import { useNftDetail } from "@/hooks/api/nft";
import SFTIcon from "public/images/success-sft.png";

interface ToastProps {
  children: React.ReactNode;
  type?: "warning" | "error" | "success" | "";
  open: boolean;
  setOpen: (open: boolean) => void;
  kbIdCreated: string;
  nftIdCreated: string;
}

export default function SuccessFailModal({
  children,
  type = "",
  open,
  setOpen,
  kbIdCreated,
  nftIdCreated,
}: ToastProps) {
  const [isNftMinted, setIsNftMinted] = useState(false);

  const router = useRouter();

  const {
    data: nftData,
    isPending: nftIsPending,
    refetch,
  } = useNftDetail({
    sft_id: nftIdCreated as string,
  });
  const { data: statusData } = useMintNFTStatus(kbIdCreated, isNftMinted);

  let nftOpenSeaLink: any;
  if (nftData) {
    nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data?.data?.sft_address}`;
  }

  useEffect(() => {
    if (statusData) {
      const { status } = statusData?.data?.data || {};
      if (status === "success") {
        setIsNftMinted(true);
        refetch();
      }
    }
  }, [statusData]);

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border border-[#DDDDEB] bg-sidebar px-7 py-8 font-semibold text-heading`}
      >
        {/* <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-3xl">Success</h2>
          <Image
            className="h-[12px] w-[12px] cursor-pointer"
            src={CrossIcon}
            alt="cross icon"
            onClick={() => router.push("/nft")}
          />
        </div> */}
        <Image src={SFTIcon} alt="SFT success" />
        <div
          className={`my-6 flex flex-row items-center justify-center gap-3 text-sm`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect className="fill-[#00D4AA]" width="30" height="30" rx="15" />
            <path
              className="fill-container"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.7071 10.2929C22.0976 10.6834 22.0976 11.3166 21.7071 11.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071L8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L13 17.5858L20.2929 10.2929C20.6834 9.90237 21.3166 9.90237 21.7071 10.2929Z"
            />
          </svg>
          <span className="text-lg font-semibold">{children}</span>
        </div>
        <div className="flex w-2/6 justify-center">
          {/* <button
            className="button mr-4 w-full"
            disabled={!isNftMinted || nftIsPending}
            onClick={() => {
              window.open(nftOpenSeaLink, "_blank");
            }}
          >
            {isNftMinted && !nftIsPending
              ? "View on OpenSea"
              : "Adding to OpenSea..."}
          </button>
          <button
            onClick={() =>
              router.push("/nft/" + nftIdCreated + "/create-chatbot")
            }
            className="button w-full"
          >
            Create Chatbot
          </button> */}
          <button
            onClick={() => router.push("/nft/" + nftIdCreated + "/create-app")}
            className="button w-full rounded-lg bg-primary px-5 py-2 font-medium text-sidebar"
          >
            Continue
          </button>
        </div>
      </div>
    </ModalBlank>
  );
}
