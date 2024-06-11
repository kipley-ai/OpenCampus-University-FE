import Image from "next/image";
import { CopyButton } from "./last-message";
import { useState } from "react";
import AvatarDummy from "public/images/avatar-default-02.svg";
import TweetAnswer from "./tweet-answer";
import { useChatbotDetail } from "@/hooks/api/chatbot";

export const UserMessage = ({ message }: { message: any }) => {
  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: message.chatbot_id as string,
    });

  const trimQuotationMarks = (str: string): string => {
    return str.replace(/"/g, "");
  };

  return (
    <div className="max-w-[75%] self-end rounded-lg bg-container px-3 py-3 xs:px-6">
      <p className="whitespace-break-spaces text-sm">
        {trimQuotationMarks(message.message)}
      </p>
    </div>
  );
};
