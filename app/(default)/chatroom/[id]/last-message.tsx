import { useChatbotDetail } from "@/hooks/api/chatbot";
import { chatbotIdFromSlug } from "@/utils/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import TweetAnswer from "./tweet-answer";
import Copy from "@/components/icon/copy.svg";

export const CopyButton = ({ message }: { message: string }) => {
  return (
    <button
      className="absolute right-0 top-0 z-20 text-gray-400 hover:brightness-150"
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
  messageObj,
  isGenerating,
  chunks = "",
  created = "",
}: {
  profileImage: any;
  sender: string;
  messageObj: any;
  message: string[] | string;
  isGenerating: boolean;
  chunks?: string;
  created?: string;
}) => {
  const isStream = Array.isArray(message);
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: messageObj.chatbot_id as string,
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
        {isGenerating && sender === "bot" && (
          <div
            className={`mb-2 flex items-center gap-6 space-x-3 text-sm text-gray-400 ${(chatbotData?.data.data.profile_image as string) ? "" : "self-end"} mr-2`}
          >
            <Image
              src={LoadingIcon}
              alt="Profile"
              className="h-5 w-5 animate-spin text-heading"
              width={50}
              height={50}
            />
            Generating answers for you...
          </div>
        )}
        {/* Message bubble */}
        <div
          className={`flex flex-col space-y-2 ${(chatbotData?.data.data.profile_image as string) ? "" : "self-end"}`}
        >
          {/* Message bubble */}
          <div
            className={`relative flex ${(chatbotData?.data.data.profile_image as string) ? "" : "flex-row-reverse"} space-x-4`}
          >
            {sender === "bot" && (
              <Image
                src={chatbotData?.data.data.profile_image as string}
                alt="Profile"
                className="h-7 w-7 rounded-full md:h-10 md:w-10"
                width={50}
                height={50}
              />
            )}
            <div className="mt-2 text-heading">
              <div
                className={`flex items-center gap-2 ${(chatbotData?.data.data.profile_image as string) ? "" : "mr-2 flex-row-reverse"}`}
              >
                {/* <h6 className="mb-1 mt-1 font-black text-lg"> */}
                <h6 className="mb-1 text-sm font-medium">
                  {chatbotData?.data?.data.name}
                </h6>
                {sender === "bot" && (
                  <h6 className="mx-1 mb-1 text-xs text-[#94A3B8]">
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
                )}
              </div>
              {sender === "bot" ? (
                <p
                  className={`whitespace-break-spaces break-words text-sm ${(chatbotData?.data.data.profile_image as string) ? "" : "mr-2 text-right"}`}
                >
                  {isStream
                    ? message.slice(0, -2).join("")
                    : trimQuotationMarks(message)}
                  {/* {sender === "bot" && sources.length > 0 && (
                              <TweetAnswer chunks={sources} />
                            )} */}
                  {sources.map((source: string, index: number) => (
                    <p key={index}>
                      <a
                        href={source}
                        className="mt-3 text-xs hover:underline sm:text-sm"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source}
                      </a>
                    </p>
                  ))}
                </p>
              ) : (
                <div className="self-end rounded-lg bg-container px-6 py-3">
                  <p className="whitespace-break-spaces text-sm">
                    {isStream
                      ? message.slice(0, -2).join("")
                      : trimQuotationMarks(message)}
                  </p>
                </div>
              )}
            </div>
            {showCopy && !isStream && <CopyButton message={message} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastAnswer;
