"use client";
import { Header } from "./header";
import ChatbotInfo from "./chatbot-info";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";
import { useUserDetail } from "@/hooks/api/user";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect, useState } from "react";
import { useNftDetail } from "@/hooks/api/nft";
import { useParams, usePathname } from "next/navigation";
import {
  useChatHistory,
  useChatSession,
  useChatboxWS,
} from "@/hooks/api/chatbox";
import { CreateChatbotProvider } from "./create-chatbot-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import Description from "./description";
import CreditBalance from "./credit-balance";
import { CreditBalanceProvider } from "./credit-balance-context";
import InaccessibleChat from "./inaccessible-shared-chat";
import Image from "next/image";
import Link from "next/link";
import { KF_TITLE, FIRESIDE_CHAT_ID } from "@/utils/constants";

export default function ChatBotPage() {
  const [showShareModal, setShowShareModal] = useState(false);
  const pathname = usePathname();
  const { id } = useParams();

  return (
    <CreditBalanceProvider>
      <CreateChatbotProvider>
        <div className="h-full">
          <title>{KF_TITLE + "Fireside Chat"}</title>
          <h1 className="pb-3 text-lg font-semibold text-heading">
            Fireside Chat
          </h1>
          <div className="flex h-[calc(100vh-7rem)] w-full flex-col rounded-2xl border-2 border-border bg-sidebar p-3 md:h-[calc(100vh-10rem)] md:p-8 xl:h-[calc(100vh-9rem)]">
            <MessageList
              isOpen={showShareModal}
              setIsOpen={setShowShareModal}
            />
            <MessageInput />
          </div>
        </div>
      </CreateChatbotProvider>
    </CreditBalanceProvider>
  );
}
