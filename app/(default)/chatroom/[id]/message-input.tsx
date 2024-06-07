import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCreateChatbotContext } from "./create-chatbot-context";
import { uuid } from "uuidv4";
import { useAccount } from "wagmi";
import {
  useChatbotDetail,
  useGetSession,
  useNewSession,
} from "@/hooks/api/chatbot";
import { useChatHistory } from "@/hooks/api/chatbox";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Avatar from "public/images/avatar-gradient-icon.svg";
import EnterIcon from "public/images/arrow-right.svg";
import { HiOutlineArrowRight } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { useDefaultValue } from "@/hooks/api/default_value";
import { chatbotIdFromSlug } from "@/utils/utils";
import Button from "@/components/button";
import { useGetChatRoomDetail } from "@/hooks/api/chatroom";
import { FIRESIDE_CHAT_ID } from "@/utils/constants";

const MessageInput = () => {
  const { id } = useParams();

  const {
    // Newly entered question
    newQuestion,
    setNewQuestion,
    setLastQuestion,

    // WS
    sendValidatedMessage,
    messageHistory,
    setMessageHistory,

    // Loading
    replyStatus,
    setReplyStatus,

    setButtonSession,
  } = useCreateChatbotContext();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputRows, setInputRows] = useState(1);
  const address = localStorage.getItem("address");
  const chatSession = useGetSession({ chatbot_id: id as string });
  const newSession = useNewSession();

  const { data: chatRoomDetail } = useGetChatRoomDetail({
    room_id: id as string,
  });

  // const { data: chatbotData, isSuccess } = useChatbotDetail({
  //   chatbot_id: id as string,
  // });
  // const pluginConfig = useDefaultValue({
  //   key: chatbotData?.data.data.personality as string,
  // });
  // const chatHistoryAPI = useChatHistory({
  //   session_id: chatSession.data?.data.data?.session_id,
  //   app_id: id as string,
  //   page_num: 1,
  //   page_size: 10,
  // });

  // const [model, setModel] = useState("gpt-3.5-turbo");
  // const [promptTemplate2, setPromptTemplate2] = useState(
  //   "\n\nAct as the person described above, and utilize the available information below to answer the question.\nRemember, the user is looking for assistance, so keep your responses natural, concise, accurate, and informative. If you are uncertain about a query or if the user asked something which is unidentified by you, prompt the user to rephrase it.\nHere is the available information: \n{context}\n\nHere is user's question:\n{question}",
  // );
  // const [temperature, setTemperature] = useState(0);
  // const [topP, setTopP] = useState(1);
  // const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  // const [presencePenalty, setPresencePenalty] = useState(0);
  // const [topDocs, setTopDocs] = useState(10);
  // const [maxTokens, setMaxTokens] = useState(250);
  let suggestionChat: string[] = [];

  if (id === FIRESIDE_CHAT_ID) {
    suggestionChat = [
      "How can web3 help creators protect their digital ownership?",
      "Why do we need digital property rights?",
    ];
  } else {
    suggestionChat = chatRoomDetail?.data?.data.suggestion_chat
      ? JSON.parse(chatRoomDetail?.data?.data.suggestion_chat)
      : [];
  }
  // const suggestionChat = ["Why do we need digital property rights ?"];

  useEffect(() => {
    console.log(!chatSession.data?.data.data?.session_id);
  }, [chatSession.isSuccess]);

  // useEffect(() => {
  //   console.log(pluginConfig.data?.data);
  //   if (pluginConfig.isSuccess) {
  //     // console.log(pluginConfig.data?.data)
  //     const plugin_config = JSON.parse(pluginConfig.data?.data.data.value);
  //     console.log(plugin_config);
  //     setModel(plugin_config.model);
  //     setPromptTemplate2(plugin_config.prompt_template);
  //     setTemperature(plugin_config.model_temperature);
  //     setTopP(plugin_config.top_p);
  //     setFrequencyPenalty(plugin_config.frequency_penalty);
  //     setPresencePenalty(plugin_config.presence_penalty);
  //     setTopDocs(plugin_config.top_k_docs);
  //     setMaxTokens(plugin_config.max_tokens);
  //   }
  // }, [pluginConfig.isSuccess]);

  useEffect(() => {
    if (replyStatus === "idle") {
      inputRef.current?.focus();
    }
  }, [replyStatus]);

  const handleSendMessage = async (e: any, question: string = "") => {
    e.preventDefault();

    let newQ = question || newQuestion;

    if (!newQ || newQ === "" || newQ.trim() === "") return;

    if (!chatSession.data?.data.data?.session_id) {
      newSession.mutate(
        { chatbot_id: id as string },
        {
          onSuccess(data, variables, context) {
            console.log(data);
            chatSession.refetch();
            sendValidatedMessage({
              question: newQ,
              room_id: id as string,
              session_id: data?.data.session_id as string,
              // type: "twitter",
              user_id: address as string,
            });
            setMessageHistory((prevHistory) => [
              ...prevHistory,
              { sender: "user", message: newQ },
            ]);
            setNewQuestion("");
            setReplyStatus("answering");
            setLastQuestion(newQ);
            setInputRows(1);
          },
        },
      );
    } else {
      sendValidatedMessage({
        question: newQ,
        room_id: id as string,
        session_id: chatSession.data?.data.data.session_id as string,
        // type: "twitter",
        user_id: address as string,
      });
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", message: newQ },
      ]);
      setNewQuestion("");
      setReplyStatus("answering");
      setLastQuestion(newQ);
      setInputRows(1);
    }
  };

  const handleClearChat = () => {
    newSession.mutate(
      { chatbot_id: id as string },
      {
        onSuccess(data, variables, context) {
          chatSession.refetch();
          setMessageHistory([]);
        },
      },
    );
  };

  return (
    <>
      <div className=" mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {messageHistory.length <= 0 ? (
          suggestionChat.length > 0 ? (
            suggestionChat.map((suggestion: string, index: number) => (
              <button
                key={index}
                className="mt-2 rounded-lg border border-2 border-[#D1D5DB] bg-sidebar px-8 py-2.5 text-start text-sm font-medium text-heading hover:bg-secondary"
                onClick={(e: any) => {
                  handleSendMessage(e, suggestion);
                }}
              >
                {suggestion}
              </button>
            ))
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <div className="sticky inset-x-0 bottom-4 mt-6 flex items-center gap-4">
        <button
          className="h-full w-28 px-2 text-sm font-medium text-primary underline underline-offset-2 hover:text-[#1016BC] hover:underline-offset-4"
          onClick={handleClearChat}
        >
          Clear Chat
        </button>
        <form
          onSubmit={handleSendMessage}
          className="flex grow items-center justify-between rounded-lg border-2 border-[#3A3A3A] border-primary bg-container py-1 pl-1 focus-within:border-primary lg:bottom-0 lg:w-full"
        >
          {/* Profile picture placeholder */}
          {/* <Image src={Avatar} alt="Profile" className="w-8 h-8 rounded-full mr-4" /> */}
          {/* Input Field */}
          <textarea
            ref={inputRef}
            placeholder="Ask me anything"
            className="grow resize-none rounded-lg border-0 bg-container text-heading placeholder-[#94A3B8] caret-primary outline-none focus:ring-0"
            value={newQuestion}
            onChange={(e) => {
              let lengthOfText = e.target.value.match(/\n/g)?.length;
              if (!lengthOfText) {
                setInputRows(1);
              }
              if (lengthOfText && lengthOfText < 2) {
                setInputRows(lengthOfText + 1);
              }
              setNewQuestion(e.target.value);
            }}
            disabled={replyStatus === "answering"}
            rows={inputRows}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.code === "Enter" && !e.shiftKey) {
                handleSendMessage(e);
              }
            }}
          />
          {/* Icons or buttons */}
          <div className="mx-4">
            <button
              className="text-light-blue text-primary"
              disabled={replyStatus === "answering"}
            >
              {/* <HiOutlineArrowRight className="size-[21px]" /> */}
              <HiChevronRight className="inline size-[24px]" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
