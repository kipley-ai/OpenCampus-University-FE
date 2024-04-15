import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import { PiArrowBendUpLeftBold, PiShareFatLight } from "react-icons/pi";

import "./chat-messages.css";
import { chatbotIdFromSlug } from "@/utils/utils";

const ChatbotInfo = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void; }) => {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());
  const router = useRouter();

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const { data: nftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });

  const nftOpenSeaLink = `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${nftData?.data.data.sft_address}`;

  return (
    <div className="flex w-full items-start gap-4">
      <button
        onClick={() => router.back()}
        className="text-2xl text-primary focus:outline-none"
      >
        <PiArrowBendUpLeftBold />
      </button>
      <div className="mb-2 flex w-full flex-col divide-y-2 divide-primary border-2 border-primary">
        <div className="flex flex-row justify-between px-6 py-2">
          <h1
            className="font-mikado font-semibold text-primary text-xl md:text-2xl"
          >
            @{chatbotData?.data.data.name}
          </h1>
          <button
            className="font-mikado flex flex-row items-center space-x-1 bg-transparent px-4 rounded-full text-[#6C7275] text-sm border-2 border-[#3A3A3A] hover:brightness-150"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <PiShareFatLight />
            <p>Share</p>
          </button>
        </div>
        <div className="relative flex flex-col gap-2 px-6 py-4">
          <div className="relative z-10 flex items-center gap-8">
            <Image
              src={chatbotData?.data.data.profile_image as string}
              alt="Profile"
              className="rounded-full border-2 border-primary w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]"
              style={{ boxShadow: "0 0 10px #00EDBE" }}
              width={100}
              height={100}
            />
            <p className="font-mono line-clamp-5 md:line-clamp-4 text-heading text-xs md:text-base">
              {chatbotData?.data.data.description}
            </p>
          </div>
          <div className="relative z-10 flex justify-end">
            <div className="relative">
              <a href={nftOpenSeaLink} target="_blank">
                <Image
                  src={nftData?.data.data.profile_image as string}
                  alt="Profile"
                  className=" border-2 border-primary w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]"
                  style={{ boxShadow: "0 0 10px #00EDBE" }}
                  width={100}
                  height={100}
                />
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-300 hover:bg-gray-900/75 hover:opacity-100">
                  <p className="text-center text-sm font-bold text-heading lg:text-md">
                    View SFT on OpenSea
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="box absolute bottom-0 left-16 lg:left-[74px] top-0 m-auto h-3/6 w-7/12 bg-transparent sm:w-9/12 xl:w-10/12"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInfo;
