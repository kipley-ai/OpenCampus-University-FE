import { useChatbotDetail } from "@/hooks/api/chatbot";
import { chatbotIdFromSlug, chatbotSlug } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import TweetAnswer from "./tweet-answer";
import Copy from "@/components/icon/copy.svg";
import Markdown from "react-markdown";

export const CopyButton = ({ message }: { message: string }) => {
  return (
    <button
      className="absolute right-0 top-0 z-20 text-gray-400 hover:brightness-50"
      onClick={() => {
        navigator.clipboard.writeText(message);
      }}
    >
      <Image
        src={Copy}
        alt="Copy icon"
        className="mr-4"
        width={35}
        height={35}
      />
    </button>
  );
};

const LastAnswer = ({
  profileImage,
  sender,
  message,
  isGenerating,
  chunks = "",
  recommendation = [],
  created = "",
}: {
  profileImage: any;
  sender: string;
  message: string[] | string;
  isGenerating: boolean;
  chunks?: string;
  recommendation?: any[];
  created?: string;
}) => {
  const isStream = Array.isArray(message);
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });
  const [showCopy, setShowCopy] = useState(false);

  const sources: string[] = [];
  if (chunks) {
    const chunksObject = JSON.parse(chunks);
    chunksObject.chunks.forEach((chunk: any) => {
      sources.push(chunk.metadata.source);
    });
  }

  const trimQuotationMarks = (str: string): string => {
    return str.replace(/"/g, "");
  };

  return (
    <>
      <div
        className="flex flex-col space-y-2"
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
      >
        {/* Loading icon and generating text */}
        {isGenerating && (
          <div className="mb-2 flex items-center gap-5 text-sm text-gray-400 md:gap-6">
            <Image
              src={LoadingIcon}
              alt="Profile"
              className="ml-1 h-5 w-5 animate-spin md:ml-2"
              width={50}
              height={50}
            />
            Generating answers for you...
          </div>
        )}
        {/* Message bubble */}
        <div className="flex flex-col space-y-2">
          {/* Message bubble */}
          <div className="relative flex items-start space-x-3">
            <Image
              src={profileImage}
              alt="Profile"
              className="mt-1 h-8 w-8 rounded-full md:h-10 md:w-10"
              width={50}
              height={50}
            />
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h6 className="text-sm font-medium">
                  {chatbotData?.data.data.name}
                </h6>
                <h6 className="text-xs text-[#94A3B8]">
                  {created
                    ? new Date(created).toLocaleTimeString("en-US", {
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
              <div className="flex flex-col items-start gap-2">
                <p className="whitespace-break-spaces break-words text-sm">
                  <Markdown>
                    {isStream
                      ? message.slice(0, -2).join("")
                      : trimQuotationMarks(message)}
                  </Markdown>
                </p>
              </div>
            </div>
            {showCopy && !isStream && <CopyButton message={message} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastAnswer;
