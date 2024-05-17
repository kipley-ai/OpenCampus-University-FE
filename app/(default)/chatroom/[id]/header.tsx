import { ChatbotDetailResponse } from "@/lib/types";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = ({
  chatbots,
}: {
  chatbots: UseQueryResult<AxiosResponse<ChatbotDetailResponse, any>, Error>[];
}) => {
  const router = useRouter();

  return (
    <header className="flex items-center gap-8 border-b border-border py-3">
      <svg
        width="24"
        height="28"
        viewBox="0 0 20 24"
        className="cursor-pointer fill-primary hover:fill-[#1016BC]"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => router.back()}
      >
        <path d="M7.99935 3.33398L9.17435 4.50898L4.52435 9.16732H14.666V10.834H4.52435L9.17435 15.4923L7.99935 16.6673L1.33268 10.0007L7.99935 3.33398Z" />
      </svg>
      {chatbots.map((chatbot, idx) => (
        <Link
          className="group"
          href={`/chatbot/${chatbot.data?.data?.data?.chatbot_id}/profile`}
          key={idx}
        >
          <div className="flex flex-col items-center gap-2">
            <Image
              src={chatbot.data?.data?.data?.profile_image!}
              width={40}
              height={40}
              alt="Chatbot Icon"
            />
            <span className="text-sm font-medium group-hover:text-primary">
              {chatbot.data?.data?.data?.name}
            </span>
          </div>
        </Link>
      ))}
    </header>
  );
};
