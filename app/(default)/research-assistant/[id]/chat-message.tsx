import Image from "next/image";
import { chatbotSlug } from "@/utils/utils";
import { CopyButton } from "./last-message";
import { useState } from "react";
import { useUserDetail } from "@/hooks/api/user";
import AvatarDummy from "public/images/avatar-default-02.svg";
import TweetAnswer from "./tweet-answer";

const ChatMessage = ({
  chatbotData,
  message,
}: {
  chatbotData: any;
  message: any;
}) => {
  const [showCopy, setShowCopy] = useState(false);

  const { data: userDetail } = useUserDetail();

  const sources: string[] = [];
  if (message.chunks) {
    const chunksObject = JSON.parse(message.chunks);
    chunksObject.chunks.forEach((chunk: any) => {
      sources.push(chunk.metadata.source);
    });
  }

  const trimQuotationMarks = (str: string): string => {
    return str.replace(/"/g, "");
  };

  return (
    <div
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="relative flex items-start space-x-3">
        <Image
          src={
            message.sender == "bot"
              ? chatbotData?.data.data.profile_image
              : userDetail?.data?.data?.profile_image || AvatarDummy
          }
          alt="User avatar"
          className="mt-1 h-8 w-8 rounded-full md:h-10 md:w-10"
          width={50}
          height={50}
        />
        <div className="mt-2 flex flex-col gap-2 md:mt-3">
          <div className="flex items-center gap-2">
            <h6 className="text-sm font-medium">
              {message.sender == "bot" ? chatbotData?.data.data.name : "You"}
            </h6>
            <h6 className="text-xs text-[#94A3B8]">
              {message.created
                ? new Date(message.created).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : new Date(Date.now()).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                  })}
            </h6>
          </div>
          {/* <h6 className="mb-1 mt-1 font-black text-lg"> */}
          <p className="whitespace-break-spaces text-sm">
            {trimQuotationMarks(message.message)}
          </p>
          {/* {message.sender === "bot" && sources.length > 0 && (
            <TweetAnswer chunks={sources} />
          )} */}
          {sources.map((source: string, index: number) => (
            <p key={index}>
              <a
                href={source}
                className="text-xs hover:underline sm:text-sm"
                target="_blank"
                rel="noreferrer"
              >
                {source}
              </a>
            </p>
          ))}
          {message?.chatbot_recommendation?.length > 0 && (
            <div className="flex flex-col gap-4 rounded-xl border-2 border-border bg-container p-4">
              <h3 className="text-sm font-medium">
                These educators may be able to answer your question:
              </h3>
              <div className="flex flex-wrap items-start gap-4">
                {message?.chatbot_recommendation.map(
                  (chatbot: any, index: number) => (
                    <a
                      key={index}
                      href={`/chatbot/${chatbotSlug(chatbot)}`}
                      className="group flex w-20 flex-col items-center gap-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src={chatbot.profile_image}
                        alt="User avatar"
                        className="w-full rounded-lg"
                        width={150}
                        height={150}
                      />
                      <p className="w-full overflow-hidden text-ellipsis text-sm font-semibold text-primary group-hover:underline">
                        {chatbot.name}
                      </p>
                    </a>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
        {showCopy && <CopyButton message={message.message} />}
      </div>
    </div>
  );
};

export default ChatMessage;
