"use client";

import {
  useGetSharedChatRoom,
  useGetChatRoomDetail,
} from "@/hooks/api/chatroom";
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
  chatbot_id: string;
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

        const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
          useChatbotDetail({
            chatbot_id: message.chatbot_id as string,
          });

        return (
          <section className="flex flex-row gap-4" key={index}>
            <Image
              src={
                message.sender === "user"
                  ? AvatarDummy
                  : chatbotData?.data.data.profile_image
              }
              className="h-8 w-8 rounded-full"
              alt="Profile"
              width={50}
              height={50}
            />
            <div className="flex w-full flex-col gap-2 pt-2 text-sm">
              <h3 className="font-medium">
                {message.sender === "user"
                  ? "Anonymous"
                  : chatbotData?.data.data.name}
              </h3>
              <p className="whitespace-break-spaces">{message.message}</p>
              {sources.map((source: string, index: number) => (
                <a
                  href={source}
                  className="text-sm hover:underline"
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
  const sharedChat = useGetSharedChatRoom({ share_id: id.id });
  const chatbotDetail = useGetChatRoomDetail({
    room_id: sharedChat.data?.data.chatbot_id,
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
    <div className="bg-container text-heading lg:py-16">
      <div className="md:px-auto flex size-full max-w-[1440px] flex-col items-center gap-6 rounded-2xl border border border-2 bg-sidebar lg:mx-auto lg:w-8/12">
        <Link href="/dashboard">
          <Image
            src="/images/dashboard-banner.svg"
            alt="Main Banner"
            className="w-full rounded-t-lg border-b-2 border-border lg:rounded-t-2xl"
            width={1030}
            height={264}
          />
        </Link>
        <div className="flex w-full flex-col gap-8 overflow-x-auto px-3 pb-16 pt-4 md:px-10">
          <h1 className="text-center text-2xl font-semibold text-primary">
            {chatbotDetail.data?.data.data.name}
          </h1>
          <div>
            <h2 className="text-sm font-semibold text-primary">
              {sharedChat.isFetching ? "" : sharedDate}
            </h2>
            <hr className="w-full border-t-2 border-border" />
          </div>
          <MessageHistory messageHistory={sharedChat.data?.data.chat_history} />
          <button
            type="button"
            className="btn-primary self-center px-5 py-2 text-lg"
            onClick={() => router.push("/dashboard")}
          >
            Start to explore Open Campus U!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedChat;
