import Image from "next/image";
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
    return str.replace(/"/g, '');
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
          className="h-8 w-8 md:h-10 md:w-10 rounded-full mt-1"
          width={50}
          height={50}
        />
        <div className="mt-2 md:mt-3 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h6 className="text-sm font-medium">
              {message.sender == "bot" ? chatbotData?.data.data.name : "You"}
            </h6>
            <h6 className="text-xs text-[#94A3B8]">
              {message.created ? new Date(message.created).toLocaleTimeString("en-US", {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }) : 
                new Date(Date.now()).toLocaleTimeString("en-US", {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: "UTC"
                })}
            </h6>
          </div>
          {/* <h6 className="mb-1 mt-1 font-black text-lg"> */}
          <p className="whitespace-break-spaces text-sm">{trimQuotationMarks(message.message)}</p>
          {/* {message.sender === "bot" && sources.length > 0 && (
            <TweetAnswer chunks={sources} />
          )} */}
          {sources.map((source: string, index: number) => (
            <p key={index}>
              <a href={source} className="text-xs sm:text-sm hover:underline" target="_blank" rel="noreferrer">{source}</a>
            </p>
          ))}
        </div>
        {showCopy && <CopyButton message={message.message} />}
      </div>
    </div>
  );
};

export default ChatMessage;
