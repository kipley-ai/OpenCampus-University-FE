import {
  useChatHistory,
  useChatSession,
  useChatboxWS,
} from "@/hooks/api/chatbox";
import { useEffect, useState, useRef } from "react";
import { useCreateChatbotContext } from "./create-chatbot-context";
import LastMessage, { CopyButton } from "./last-message";
import { useChatbotDetail, useGetSession } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import Image from "next/image";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import AvatarDummy2 from "public/images/avatar-user-dummy.svg";
import { StaticImageData } from "next/image";
import ChatMessage from "./chat-message";
import FirstAnswer from "./first-message";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useAppProvider } from "@/providers/app-provider";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";
import { chatbotIdFromSlug } from "@/utils/utils";
import ShareModal from "@/components/share-chat-modal";
import TweetAnswer from "./tweet-answer";
import { SidebarRight } from "@/components/ui/sidebar-right";

const MessageList = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [answersStream, setAnswersStream] = useState<string[]>([]);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    "",
  );

  const { data: twitterSession, status: twitterStatus } = useSession();
  const { isConnected } = useAccount();
  const [isConnected_, setIsConnected_] = useState<boolean>(false);
  const [checkFirstQuotation, setCheckFirstQuotation] = useState(false);

  useEffect(() => {
    setIsConnected_(isConnected);
    setProfileImage(twitterSession?.user?.image || "");
  }, [isConnected, twitterStatus]);

  const {
    newQuestion,
    setNewQuestion,
    lastQuestion,

    lastJsonMessage,
    readyState,
    sendValidatedMessage,

    replyStatus,
    setReplyStatus,

    messageHistory,
    setMessageHistory,

    buttonSession,

    chatSession,
    chatHistoryAPI,

    isReferencesOpen,
    setIsReferencesOpen,
    references,
  } = useCreateChatbotContext();

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });

  const creditBalance = useCreditBalance();
  const creditDeduction = useCreditDeduction();

  const { setCreditBalance } = useCreditBalanceContext();
  const { setModalTopUp } = useAppProvider();

  useEffect(() => {
    console.log(chatbotDetailIsSuccess && chatHistoryAPI.isSuccess);
    if (chatbotDetailIsSuccess && chatHistoryAPI.isSuccess) {
      console.log(chatHistoryAPI.data?.data.length);
      if (chatHistoryAPI.data?.data.length) {
        console.log(chatHistoryAPI.data?.data);
        setMessageHistory(chatHistoryAPI.data?.data.reverse());
      }
      setAnswersStream([]);
    }
  }, [
    chatbotDetailIsSuccess,
    chatHistoryAPI.isSuccess,
    chatHistoryAPI.data?.data,
    buttonSession,
  ]);

  useEffect(() => {
    if (replyStatus === "answering") {
      fieldRef.current?.scrollIntoView();
    }
  }, [replyStatus]);

  useEffect(() => {
    fieldRef.current?.scrollIntoView();

    if (lastJsonMessage !== null && lastJsonMessage.type !== "error") {
      console.log("lastJsonMessage :>> ", lastJsonMessage);
      if (lastJsonMessage.type === "end") {
        const fullBotAnswer = answersStream
          .slice(0, -2)
          .map((message: string, idx: number) => {
            if (idx == 0 || message === undefined) return "";
            return message;
          })
          .reduce((a: string, b: string) => a + b, "");

        console.log("fullBotAnswer");
        console.log(fullBotAnswer);

        setMessageHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: fullBotAnswer },
        ]);

        setAnswersStream([]);
        setReplyStatus("idle");

        console.log("Message history");
        console.log(messageHistory);

        creditDeduction.mutate(
          {
            answer: fullBotAnswer,
            question: lastQuestion,
            chatbot_id: id as string,
            session_id: chatSession.data?.data.data?.session_id,
          },
          {
            onSuccess: async () => {
              const { data } = await creditBalance.refetch();
              setCreditBalance(data?.data?.data.credit_balance);
              chatHistoryAPI.refetch();
            },
          },
        );

        return;
      } else if (lastJsonMessage.type === "start") {
        setCheckFirstQuotation(true);
      }

      setAnswersStream((prevAnswersStream) => {
        if (lastJsonMessage.sender == "user") {
          return prevAnswersStream;
        }
        if (
          checkFirstQuotation &&
          lastJsonMessage.message &&
          lastJsonMessage.message.startsWith('"')
        ) {
          setCheckFirstQuotation(false);
          return [
            ...prevAnswersStream,
            lastJsonMessage.message.slice(1, lastJsonMessage.message.length),
          ];
        } else {
          return [...prevAnswersStream, lastJsonMessage.message];
        }
      });
    }

    if (lastJsonMessage !== null && lastJsonMessage.type === "error") {
      if (lastJsonMessage.message === "Credit insufficient") {
        const msgHist = messageHistory.slice(0, -1);
        setMessageHistory(msgHist);
        setReplyStatus("idle");
        setModalTopUp(true);
      } else {
        setMessageHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: "Sorry, something went wrong. Try again." },
        ]);
        setReplyStatus("idle");
      }
    }
  }, [lastJsonMessage]);

  return (
    <>
      <ShareModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messageHistory={messageHistory}
        chatbotData={chatbotData?.data.data}
      />
      <SidebarRight
        isOpen={isReferencesOpen}
        onClose={() => setIsReferencesOpen(false)}
      >
        <div className="flex items-center gap-2 border-b-2 border-border px-6 pb-8">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.96042 6.89779L1.33542 12.5228C1.22987 12.6283 1.08671 12.6876 0.937447 12.6876C0.788179 12.6876 0.645026 12.6283 0.539478 12.5228C0.43393 12.4172 0.374634 12.2741 0.374634 12.1248C0.374634 11.9756 0.43393 11.8324 0.539478 11.7269L5.76721 6.49982L0.539478 1.27279C0.43393 1.16725 0.374634 1.02409 0.374634 0.874824C0.374634 0.725557 0.43393 0.582404 0.539478 0.476856C0.645026 0.371308 0.788179 0.312012 0.937447 0.312012C1.08671 0.312012 1.22987 0.371308 1.33542 0.476856L6.96042 6.10186C7.01271 6.1541 7.0542 6.21613 7.08251 6.28442C7.11082 6.35271 7.12539 6.4259 7.12539 6.49982C7.12539 6.57375 7.11082 6.64694 7.08251 6.71523C7.0542 6.78351 7.01271 6.84555 6.96042 6.89779ZM12.5854 6.10186L6.96042 0.476856C6.85487 0.371308 6.71171 0.312012 6.56245 0.312012C6.41318 0.312012 6.27003 0.371308 6.16448 0.476856C6.05893 0.582404 5.99963 0.725557 5.99963 0.874824C5.99963 1.02409 6.05893 1.16725 6.16448 1.27279L11.3922 6.49982L6.16448 11.7269C6.05893 11.8324 5.99963 11.9756 5.99963 12.1248C5.99963 12.2741 6.05893 12.4172 6.16448 12.5228C6.27003 12.6283 6.41318 12.6876 6.56245 12.6876C6.71171 12.6876 6.85487 12.6283 6.96042 12.5228L12.5854 6.89779C12.6377 6.84555 12.6792 6.78351 12.7075 6.71523C12.7358 6.64694 12.7504 6.57375 12.7504 6.49982C12.7504 6.4259 12.7358 6.35271 12.7075 6.28442C12.6792 6.21613 12.6377 6.1541 12.5854 6.10186Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="font-semibold">References</h2>
        </div>
        <div className="flex flex-col gap-6 px-6 py-8 text-sm ">
          <div className="flex items-start gap-3">
            <h3 className="text-body">[{references?.number}]</h3>
            <p className="italic text-primary underline">
              {references?.source}
            </p>
          </div>
          <hr className="border-t-2 border-border" />
          <p className="">{references?.page_content}</p>
        </div>
      </SidebarRight>
      <div className="flex h-auto grow flex-col gap-4 overflow-y-auto">
        {messageHistory.length > 0 && (
          <button
            className="btn-plain mr-4 self-end"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-2 text-primary">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1624_9009)">
                  <path
                    d="M4 10.6787C5.10457 10.6787 6 9.78328 6 8.67871C6 7.57414 5.10457 6.67871 4 6.67871C2.89543 6.67871 2 7.57414 2 8.67871C2 9.78328 2.89543 10.6787 4 10.6787Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6.67871C13.1046 6.67871 14 5.78328 14 4.67871C14 3.57414 13.1046 2.67871 12 2.67871C10.8954 2.67871 10 3.57414 10 4.67871C10 5.78328 10.8954 6.67871 12 6.67871Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14.6787C13.1046 14.6787 14 13.7833 14 12.6787C14 11.5741 13.1046 10.6787 12 10.6787C10.8954 10.6787 10 11.5741 10 12.6787C10 13.7833 10.8954 14.6787 12 14.6787Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.80005 7.81208L10.2 5.54541"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.80005 9.54541L10.2 11.8121"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1624_9009">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 0.678711)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p>Share</p>
            </div>
          </button>
        )}
        {messageHistory.map((message, index) => {
          return index < messageHistory.length - 1 ||
            message.sender == "user" ? (
            <ChatMessage
              key={index}
              chatbotData={chatbotData}
              message={message}
            />
          ) : (
            <LastMessage
              key={index}
              profileImage={chatbotData?.data.data.profile_image}
              sender={"bot"}
              message={message.message}
              isGenerating={replyStatus == "answering"}
              created={message.created}
              citations={message.citations}
            />
          );
        })}
        {replyStatus == "idle" ? (
          <></>
        ) : (
          <LastMessage
            profileImage={chatbotData?.data.data.profile_image}
            sender={"bot"}
            message={answersStream}
            isGenerating={replyStatus == "answering"}
          />
        )}
        <div ref={fieldRef}></div>
      </div>
    </>
  );
};

export default MessageList;
