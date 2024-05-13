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
      <div className="h-full flex-col px-4 md:flex-row md:pl-10 justify-start bg-sidebar">
        <h1 className="text-heading text-lg font-semibold py-3">Chatbot</h1>
        <CreditBalanceProvider>
          <div className="flex h-[calc(100vh-70px)] w-full flex-col py-4 px-10 md:w-5/6 lg:h-[calc(100vh-120px)] bg-white rounded-lg">
            <CreateChatbotProvider>
              {/* <Header /> */}
              {/* <ChatbotInfo setIsOpen={setShowShareModal} /> */}
              <MessageList isOpen={showShareModal} setIsOpen={setShowShareModal} />
              <MessageInput />
              {/* <InaccessibleChat /> */}
            </CreateChatbotProvider>
          </div>
          {/* <div className="hidden w-1/4 flex-col md:flex">
            <div className="sticky top-0 flex h-fit w-full flex-col items-start divide-y-2 divide-[#393E44] lg:-top-8">
              <Description />
              <CreditBalance />
            </div>
            <div></div>
          </div> */}
        </CreditBalanceProvider>
    </div>
  );
}
