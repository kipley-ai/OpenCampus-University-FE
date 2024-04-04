// import ChatbotProfile from "./bot-profile"
// import SFTDetail from "./sft-detail"
"use client";

import Image from "next/image";
import Link from "next/link";
import ProfileImage from "components/images/michael-dziedzic-D6FMtY6XCyM-unsplash 1.png";
import SFTImage from "components/images/michael-dziedzic-D6FMtY6XCyM-unsplash 2.png";
import { useParams, useRouter } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import { chatbotIdFromSlug } from "@/utils/utils";

export default function Profile() {
  return (
    <div>
      <ChatbotProfile />
      <div className="my-4" />
      <SFTDetail />
    </div>
  );
}

function ChatbotProfile() {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  // console.log(chatbotData?.data.data); //For debugging purpose

  return (
    <div>
      <div className="mx-6 my-3">
        <h2 className="text-2xl text-white">{chatbotData?.data.data.name}</h2>
      </div>
      <div className="mx-6 rounded-xl bg-[#27282D] p-6 text-white">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/5">
            <div className="mb-4">
              <Image
                src={chatbotData?.data.data.profile_image as string}
                alt="Yat Siu"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between text-[#BBBBBB] md:w-4/5 md:pl-6">
            <div className="items-start">
              <p className="mb-4 text-base">
                {chatbotData?.data.data.description}
              </p>
            </div>
            <div className="items-end">
              <Link href={`/chatbot/${slug}`}>
                <button className="my-5 rounded-full border border-[#00EDBE] bg-transparent px-4 py-2 font-bold text-white hover:bg-aqua-700 hover:text-black">
                  Chat with {chatbotData?.data.data.name}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SFTDetail() {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());
  const router = useRouter();

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const { data: sftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });

  return (
    <div>
      <div className="mx-6 rounded-xl bg-[#27282D] p-6 text-white">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="text-sm text-[#BBBBBB] md:w-4/5 md:pl-6">
            <div className="md:w-3/4">
              <h1 className="text-4xl text-white">{sftData?.data.data.name}</h1>
              <p className="mb-4 text-base">{sftData?.data.data.description}</p>
            </div>
          </div>
          <div className="md:w-1/5">
            <div className="mb-4">
              <Image
                src={sftData?.data.data.profile_image as string}
                alt="Yat Siu"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
