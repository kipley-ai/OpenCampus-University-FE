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

const MessageInput = () => {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());
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
  const { address } = useAccount();
  const chatSession = useGetSession({ chatbot_id: id as string });
  const newSession = useNewSession();

  const { data: chatbotData, isSuccess } = useChatbotDetail({
    chatbot_id: id as string,
  });
  // const pluginConfig = useDefaultValue({
  //   key: chatbotData?.data.data.personality as string,
  // });
  const chatHistoryAPI = useChatHistory({
    session_id: chatSession.data?.data.data?.session_id,
    app_id: id as string,
    page_num: 1,
    page_size: 10,
  });

  const [model, setModel] = useState("gpt-3.5-turbo");
  const [promptTemplate2, setPromptTemplate2] = useState(
    "\n\nAct as the person described above, and utilize the available information below to answer the question.\nRemember, the user is looking for assistance, so keep your responses natural, concise, accurate, and informative. If you are uncertain about a query or if the user asked something which is unidentified by you, prompt the user to rephrase it.\nHere is the available information: \n{context}\n\nHere is user's question:\n{question}",
  );
  const [temprature, setTemprature] = useState(0);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [topDocs, setTopDocs] = useState(10);
  const [maxTokens, setMaxTokens] = useState(250);
  // const suggestionChat = chatbotData?.data.data.suggestion_chat ? JSON.parse(chatbotData?.data.data.suggestion_chat) : [];
  const suggestionChat = ["Why do we need digital property rights ?"]

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
  //     setTemprature(plugin_config.model_temprature);
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

    if ((!newQ || newQ === "" || newQ.trim() === "")) return;

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
              user_id: address as string
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
        user_id: address as string
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
          chatHistoryAPI.refetch();
          setButtonSession((prev: boolean) => !prev);
        },
      },
    );
  };

  return (
    <>
      <div className=" mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
        { messageHistory.length <= 0 ? 
          suggestionChat.length > 0 ?
          suggestionChat.map((suggestion: string, index: number) => (
            <button
              key={index}
              className="mt-2 rounded-lg bg-sidebar text-heading border border-[#D1D5DB] border-2 py-2.5 px-8 text-start font-medium text-sm hover:bg-secondary"
              onClick={(e: any) => {
                handleSendMessage(e, suggestion)
              }}
            >
              {suggestion}
            </button>
          )) 
        : <></> : <></>}
      </div>
      <div className="sticky inset-x-0 bottom-4 mt-6 flex items-center gap-4">
        <button
          className="px-2 text-sm text-primary hover:brightness-150 w-28 h-full underline underline-offset-1"
          onClick={handleClearChat}
        >
          Clear Chat
        </button>
        <form
          onSubmit={handleSendMessage}
          className="flex grow items-center justify-between rounded-lg border-2 border-[#3A3A3A] bg-container py-1 pl-1 border-primary focus-within:border-primary lg:bottom-0 lg:w-full"
        >
          {/* Profile picture placeholder */}
          {/* <Image src={Avatar} alt="Profile" className="w-8 h-8 rounded-full mr-4" /> */}
          {/* Input Field */}
          <textarea
            ref={inputRef}
            placeholder="Ask me anything"
            className="grow resize-none border-0 bg-container rounded-lg text-heading placeholder-[#94A3B8] caret-primary outline-none focus:ring-0"
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
              <HiChevronRight className="size-[24px] inline" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;