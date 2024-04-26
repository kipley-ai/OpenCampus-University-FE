"use client";

import { useGetSharedChat } from "@/hooks/api/chatbot";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-default-02.svg";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useRouter } from "next/navigation";

type Message = {
  message: string;
  sender: string;
  create: string;
  chunks: string;
};

const MessageHistory = ({
  messageHistory,
  botImage,
  botName,
}: {
  messageHistory?: Message[];
  botImage?: string;
  botName?: string;
}) => {
  return (
    <div className="w-full space-y-4 overflow-x-auto pb-8">
      {messageHistory?.map((message, index) => {
        const sources: string[] = [];
        if (message.chunks) {
          const chunksObject = JSON.parse(message.chunks);
          chunksObject.chunks.forEach((chunk: any) => {
            sources.push(chunk.metadata.source);
          });
        }

        return (
          <section className="flex flex-row space-x-4 lg:px-4" key={index}>
            <Image
              src={message.sender === "user" ? AvatarDummy : botImage}
              className="h-8 w-8 rounded"
              alt="Profile"
              width={50}
              height={50}
            />
            <div className="flex w-full flex-col gap-4 pt-2 text-sm">
              <h3 className="font-black">
                {message.sender === "user" ? "Anonymous" : botName}
              </h3>
              <p className="whitespace-break-spaces text-body">
                {message.message}
              </p>
              {sources.map((source: string, index: number) => (
                <a
                  href={source}
                  className="text-sm text-body hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {source}
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

const SharedChat = () => {
  const id = useParams();
  const sharedChat = useGetSharedChat({ share_id: id.id });
  const chatbotDetail = useChatbotDetail({
    chatbot_id: sharedChat.data?.data.chatbot_id,
  });
  const sharedDate = new Date(
    sharedChat.data?.data.last_shared_time,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const router = useRouter();

  return (
    <div className="bg-container text-heading">
      <div className="md:px-auto flex size-full flex-col items-center gap-6 px-4 pt-8 lg:mx-auto lg:w-1/2">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex w-full flex-col space-y-2 overflow-x-auto border-b-2 border-border pb-4">
          <h1 className="text-3xl">{chatbotDetail.data?.data.data.name}</h1>
          <h2 className="text-sm text-body">
            {sharedChat.isFetching ? "" : sharedDate}
          </h2>
        </div>
        <MessageHistory
          messageHistory={sharedChat.data?.data.chat_history}
          botImage={chatbotDetail.data?.data.data.profile_image}
          botName={chatbotDetail.data?.data.data.name}
        />
        <button
          type="button"
          className="button mx-auto mb-20 px-5 py-2"
          onClick={() => router.push("/onboarding")}
        >
          Start to Explore Open Campus
        </button>
      </div>
    </div>
  );
};

export default SharedChat;
