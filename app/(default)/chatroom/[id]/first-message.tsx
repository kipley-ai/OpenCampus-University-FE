import { useChatbotDetail } from "@/hooks/api/chatbot";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import { CopyButton } from "./last-message";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ChatbotDetailResponse } from "@/lib/types";
import { FIRESIDE_CHAT_ID } from "@/utils/constants";

const FirstAnswer = ({
  chatbots,
}: {
  chatbots: UseQueryResult<AxiosResponse<ChatbotDetailResponse, any>, Error>[];
}) => {
  const { id } = useParams();
  
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 border-b-2 py-5">
        <div className="flex items-center gap-20">
          {chatbots.map((chatbot, idx) => (
            <div className="flex flex-col items-center gap-2" key={idx}>
              <Image
                src={chatbot.data?.data?.data?.profile_image!}
                alt="Profile"
                className="h-24 w-24 rounded-full md:h-24 md:w-24"
                width={100}
                height={100}
              />
              <span className="text-lg text-sm font-medium">
                {chatbot.data?.data?.data?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-heading">
        {id === FIRESIDE_CHAT_ID && (
          <p className="mb-4 text-2xl font-medium">
            Topic: Digital Property Rights
          </p>
        )}
        <p className="mt-2 text-2xl font-medium">
          What would you like to know today?
        </p>
      </div>
    </>
  );
};

export default FirstAnswer;
