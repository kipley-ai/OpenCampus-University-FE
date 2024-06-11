"use client";
import Header from "./header";
import ChatbotInfo from "./chatbot-info";
import MessageList from "./chat-messages";
import MessageInput from "./message-input";
import { useRouter } from "next/navigation";
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

export default function ChatBotPage() {
  // const router = useRouter();

  // const { data: userDetail } = useUserDetail();

  // const onboarding = userDetail?.data.data.onboarding;
  // if (!onboarding) {
  // 	router.push("/onboarding");
  // }

  const [showShareModal, setShowShareModal] = useState(false);
  const { setHeaderTitle } = useAppProvider();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTitle("AI CHAT"); // Set the title when the component is mounted
    console.log(pathname.split("/").pop());

    // Optional: Reset the title when the component is unmounted
    return () => setHeaderTitle("Default Title");
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="h-full">
      <h1 className="pb-3 text-lg font-semibold text-heading">Chatbot</h1>
      <CreditBalanceProvider>
        <div className="flex h-[calc(100vh-7rem)] w-full flex-col rounded-2xl border-2 border-border bg-sidebar p-3 md:h-[calc(100vh-10rem)] xl:h-[calc(100vh-9rem)] md:p-8">
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
