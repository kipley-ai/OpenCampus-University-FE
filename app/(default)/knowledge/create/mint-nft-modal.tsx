import Image from "next/image";
import CheckIcon from "public/images/check-icon-3.svg";
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

  // const {
  //   data: nftData,
  //   isPending: nftIsPending,
  //   refetch,
  // } = useNftDetail({
  //   sft_id: nftIdCreated as string,
  // });
  // const { data: statusData } = useMintNFTStatus(kbIdCreated, isNftMinted);

  // let nftOpenSeaLink: any;
  // if (nftData) {
  //   nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data?.data?.sft_address}`;
  // }

  // useEffect(() => {
  //   if (statusData) {
  //     const { status } = statusData?.data?.data || {};
  //     if (status === "success") {
  //       setIsNftMinted(true);
  //       refetch();
  //     }
  //   }
  // }, [statusData]);

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#DDDDEB] bg-sidebar px-6 py-8 font-semibold text-heading sm:px-16">
        <Image
          src="/images/create-asset-success.svg"
          width={130}
          height={130}
          alt="KnowledgeKey is created!"
        />
        <div className="my-6 flex flex-row items-center justify-center gap-3 text-sm">
          <Image src={CheckIcon} width={30} height={30} alt="Check Icon" />
          <span className="text-base font-semibold sm:text-lg">{children}</span>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/nft/" + nftIdCreated)}
            className="btn-primary px-5 py-2 text-base font-normal tracking-wide"
          >
            View Details
          </button>
        </div>
      </div>
    </ModalBlank>
  );
}
