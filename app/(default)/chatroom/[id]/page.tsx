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
import { FIRESIDE_CHAT_ID } from "@/utils/constants";

export default function ChatBotPage() {
  const [showShareModal, setShowShareModal] = useState(false);
  const { setHeaderTitle } = useAppProvider();
  const pathname = usePathname();

  const { id } = useParams();

  useEffect(() => {
    return () => setHeaderTitle("Default Title");
  }, []);

  return (
    <CreditBalanceProvider>
      <CreateChatbotProvider>
        <div className="h-full">
          <h1 className="py-3 text-lg font-semibold text-heading">
            {id === FIRESIDE_CHAT_ID ? "Fireside Chat" : "Chatbot"}
          </h1>
          <div className="flex h-[calc(100vh-70px)] w-full flex-col rounded-xl border border-border bg-sidebar px-8 py-4 lg:h-[calc(100vh-140px)]">
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
