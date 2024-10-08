import { useEffect, useState, useRef } from "react";
import { useCreateChatbotContext } from "./create-chatbot-context";
import LastMessage, { CopyButton } from "./last-message";
import { useGetSession } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { StaticImageData } from "next/image";
import ChatMessage from "./chat-message";
import { UserMessage } from "./user-message";
import FirstAnswer from "./first-message";
import { Header } from "./header";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useAppProvider } from "@/providers/app-provider";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";
import { chatbotIdFromSlug } from "@/utils/utils";
import {
  useChatRoomChatHistory,
  useGetChatRoomDetail,
} from "@/hooks/api/chatroom";
import {
  useChatRoomChatSession,
  useChatRoomChatbotId,
  useChatbotDetailQueries,
} from "@/hooks/api/chatroom";
import { ShareChatroomModal } from "@/components/share-chatroom-modal";

const MessageList = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [answersStream, setAnswersStream] = useState<
    { chatbot_id: string; answerStream: string[] }[]
  >([]);
  const [chunks, setChunks] = useState<
    { chatbot_id: string; chunks: string }[]
  >([]);
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
  } = useCreateChatbotContext();

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useGetChatRoomDetail({
      room_id: id as string,
    });

  const { data: chatroomResultSession } = useChatRoomChatSession({
    room_id: id as string,
  });
  const chatSession = useGetSession({ chatbot_id: id as string });

  const chatHistoryAPI = useChatRoomChatHistory({
    session_id: chatroomResultSession?.data.data.session_id as string,
    page_num: 1,
    page_size: 10,
    // request_url:
    //   appDetail?.data?.data.data.app_info.plugin_meta_data.chat_history_api
    //     .request_url,
  });

  const creditBalance = useCreditBalance();
  const creditDeduction = useCreditDeduction();

  const { setCreditBalance } = useCreditBalanceContext();
  const { setModalTopUp } = useAppProvider();
  const [chatbotIds, setChatbotIds] = useState([]);
  const [ends, setEnds] = useState<{ chatbot_id: string; end: boolean }[]>([]);

  const { data: chatroomResult, isSuccess: chatroomIsSuccess } =
    useChatRoomChatbotId({ room_id: id });
  const getChatbotDetails = useChatbotDetailQueries(
    chatbotIds ? chatbotIds : [],
  );

  useEffect(() => {
    setChatbotIds(chatroomResult?.data.chatbot_ids);
  }, [chatroomIsSuccess]);

  useEffect(() => {
    console.log(chatbotDetailIsSuccess && chatHistoryAPI.isSuccess);
    if (chatbotDetailIsSuccess && chatHistoryAPI.isSuccess) {
      console.log(chatHistoryAPI.data?.data.length);
      if (chatHistoryAPI.data?.data.length) {
        console.log(chatHistoryAPI.data?.data);
        setMessageHistory(chatHistoryAPI.data?.data.reverse());
      }
      if (replyStatus == "idle") setAnswersStream([]);
    }
  }, [
    chatbotDetailIsSuccess,
    chatHistoryAPI.isSuccess,
    chatHistoryAPI.data?.data,
    buttonSession,
  ]);

  // useEffect(() => {
  //   const end_value = false;
  //   if (chatbotIds.length > 0 && ends.length > 0) {
  //     const isEndAllChatbotIds = chatbotIds
  //       .map((chatbotId) => {
  //         return (
  //           ends.filter((end) => {
  //             if (chatbotId == end.chatbot_id && end.end) return true;
  //             else return false;
  //           }).length > 0
  //         );
  //       })
  //       .reduce((a, b) => a && b, true);
  //     if (isEndAllChatbotIds) {
  //       console.log("end:>>", chatbotIds, ends);
  //       setAnswersStream([]);
  //       setReplyStatus("idle");
  //       setChunks([]);
  //       setEnds([]);
  //     }
  //   }
  // }, [ends]);

  useEffect(() => {
    console.log("answersStream:>>", answersStream.length, answersStream);
  }, [answersStream]);

  useEffect(() => {
    fieldRef.current?.scrollIntoView();

    // console.log("Answer Stream");
    // console.log(answersStream.slice(0, -2));
    // console.log("lastJsonMessage :>> ", lastJsonMessage);

    if (lastJsonMessage !== null && lastJsonMessage.type !== "error") {
      if (lastJsonMessage.type == "end_universal") {
        setAnswersStream([]);
        setReplyStatus("idle");
        setChunks([]);
        setEnds([]);
      }
      if (lastJsonMessage.type === "end") {
        // console.log("chunks :>> ", chunks);

        const whichAnswerStream = answersStream.filter((answerStream) => {
          if (answerStream.chatbot_id == lastJsonMessage.chatbot_id) {
            return true;
          }
          return false;
        })[0];
        console.log(
          whichAnswerStream,
          answersStream.filter((answerStream) => {
            if (answerStream.chatbot_id == lastJsonMessage.chatbot_id) {
              return true;
            }
            return false;
          }),
        );

        const fullBotAnswer = whichAnswerStream.answerStream
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
          {
            sender: "bot",
            message: fullBotAnswer,
            chunks: chunks.filter(
              (chunk) => chunk.chatbot_id == lastJsonMessage.chatbot_id,
            )[0].chunks,
            chatbot_id: lastJsonMessage.chatbot_id,
          },
        ]);

        setAnswersStream((prevAnswersStream) => {
          return prevAnswersStream.filter((answerStream) => {
            return answerStream.chatbot_id !== lastJsonMessage.chatbot_id;
          });
        });
        // setReplyStatus("idle");
        setChunks((prevChunk) => {
          return prevChunk.filter((chunk) => {
            return chunk.chatbot_id !== lastJsonMessage.chatbot_id;
          });
        });

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
      } else if ("chunks" in lastJsonMessage) {
        const chunksObject = { chunks: lastJsonMessage.chunks };
        const chunksString = JSON.stringify(chunksObject);
        setChunks((prevChunk) => {
          return prevChunk.map((chunk) => {
            if (chunk.chatbot_id == lastJsonMessage.chatbot_id) {
              return { chatbot_id: chunk.chatbot_id, chunks: chunksString };
            }
            return chunk;
          });
        });
      } else if (lastJsonMessage.type === "start") {
        setCheckFirstQuotation(true);
        setAnswersStream((prevAnswersStream) => {
          return [
            ...prevAnswersStream,
            { chatbot_id: lastJsonMessage.chatbot_id, answerStream: [] },
          ];
        });
        setChunks((prevChunk) => {
          return [
            ...prevChunk,
            { chatbot_id: lastJsonMessage.chatbot_id, chunks: "" },
          ];
        });
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
          return prevAnswersStream.map((answerStream) => {
            if (answerStream.chatbot_id == lastJsonMessage.chatbot_id) {
              // console.log("checkquotation answerStream:>> ",answerStream)
              return {
                chatbot_id: answerStream.chatbot_id,
                answerStream: [
                  ...answerStream.answerStream,
                  lastJsonMessage.message.slice(
                    1,
                    lastJsonMessage.message.length,
                  ),
                ],
              };
            } else return answerStream;
          });
        } else {
          return prevAnswersStream.map((answerStream) => {
            if (answerStream.chatbot_id == lastJsonMessage.chatbot_id) {
              // console.log("else answerStream:>> ",answerStream, lastJsonMessage.message,prevAnswersStream)
              return {
                chatbot_id: answerStream.chatbot_id,
                answerStream: [
                  ...answerStream.answerStream,
                  lastJsonMessage.message,
                ],
              };
            } else return answerStream;
          });
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
      <ShareChatroomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messageHistory={messageHistory}
        chatbotData={chatbotData?.data.data}
      />
      <div className="flex h-auto grow flex-col gap-4 overflow-y-auto">
        {messageHistory.length <= 0 ? (
          <FirstAnswer chatbots={getChatbotDetails} />
        ) : (
          <>
            <Header chatbots={getChatbotDetails} />
            <button
              className="btn-plain mr-4 self-end"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex items-center gap-2">
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
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6.67871C13.1046 6.67871 14 5.78328 14 4.67871C14 3.57414 13.1046 2.67871 12 2.67871C10.8954 2.67871 10 3.57414 10 4.67871C10 5.78328 10.8954 6.67871 12 6.67871Z"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14.6787C13.1046 14.6787 14 13.7833 14 12.6787C14 11.5741 13.1046 10.6787 12 10.6787C10.8954 10.6787 10 11.5741 10 12.6787C10 13.7833 10.8954 14.6787 12 14.6787Z"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.80005 7.81208L10.2 5.54541"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.80005 9.54541L10.2 11.8121"
                      stroke="var(--color-primary)"
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
          </>
        )}
        {messageHistory.map((message, index) => {
          return index < messageHistory.length - 1 ? (
            message.sender == "user" ? (
              <UserMessage key={index} message={message} />
            ) : (
              <ChatMessage key={index} message={message} />
            )
          ) : message.sender == "user" ? (
            <LastMessage
              key={index}
              profileImage={""}
              sender={message.sender}
              messageObj={message}
              message={message.message}
              chunks={message.chunks}
              isGenerating={false}
              created={message.created}
            />
          ) : (
            <ChatMessage key={index} message={message} />
          );
        })}
        {replyStatus == "idle" ? (
          <></>
        ) : (
          <>
            {answersStream.map((answerStream) => {
              // console.log(chunks.filter((chunk)=> chunk.chatbot_id == answerStream.chatbot_id)[0].chunks)
              return (
                <LastMessage
                  profileImage={""}
                  sender={"bot"}
                  messageObj={answerStream}
                  message={answerStream.answerStream}
                  chunks={
                    chunks.filter(
                      (chunk) => chunk.chatbot_id == answerStream.chatbot_id,
                    )[0].chunks
                  }
                  isGenerating={replyStatus == "answering"}
                />
              );
            })}
          </>
        )}
        <div ref={fieldRef}></div>
      </div>
    </>
  );
};

export default MessageList;
