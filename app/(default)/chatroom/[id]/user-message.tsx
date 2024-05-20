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
    <div className="rounded-lg bg-container px-6 py-3 self-end">
      <p className="whitespace-break-spaces text-sm">
        {trimQuotationMarks(message.message)}
      </p>
    </div>
  );
};
