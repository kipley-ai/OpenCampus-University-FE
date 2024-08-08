"use client";
import Header from "./header";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";
import { useState } from "react";
import { useParams } from "next/navigation";
import { CreateChatbotProvider } from "./create-chatbot-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import Description from "./description";
import CreditBalance from "./credit-balance";
import { CreditBalanceProvider } from "./credit-balance-context";
import { KF_TITLE } from "@/utils/constants";
import { chatbotIdFromSlug } from "@/utils/utils";

export default function ChatBotPage() {
  const [showShareModal, setShowShareModal] = useState(false);

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  return (
    <div className="h-full">
      <title>{KF_TITLE + chatbotData?.data?.data?.name + " - Study Companion"}</title>
      <h1 className="truncate pb-3 text-lg font-semibold text-heading">
        Study Companion | {chatbotData?.data?.data?.name}
      </h1>
      <CreditBalanceProvider>
        <div className="flex h-[calc(100vh-7rem)] w-full flex-col rounded-2xl border-2 border-border bg-sidebar p-3 md:h-[calc(100vh-10rem)] md:p-8 xl:h-[calc(100vh-9rem)]">
          <CreateChatbotProvider>
            <MessageList
              isOpen={showShareModal}
              setIsOpen={setShowShareModal}
            />
            <MessageInput />
          </CreateChatbotProvider>
        </div>
      </CreditBalanceProvider>
    </div>
  );
}
