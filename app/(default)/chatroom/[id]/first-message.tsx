import { useChatbotDetail } from "@/hooks/api/chatbot";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import { CopyButton } from "./last-message";
import { chatbotIdFromSlug } from "@/utils/utils";

const FirstAnswer = ({
  chatbotName,
  profileImage,
  sender,
  message,
  isGenerating,
}: {
  chatbotName: any;
  profileImage: any;
  sender: string;
  message: string[] | string;
  isGenerating: boolean;
}) => {
  const isStream = Array.isArray(message);
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const [showCopy, setShowCopy] = useState(false);
  return (
    <>
      <div
        className="flex flex-col gap-8 items-center justify-center pt-5"
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
      >
        <div className="flex items-center gap-20">
          {[...Array(3)].map((_, index) => (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={profileImage}
                alt="Profile"
                className="h-24 w-24 rounded-full md:h-24 md:w-24"
                width={100}
                height={100}
              />
              <span className="text-lg text-sm font-medium">{chatbotName}</span>
            </div>
          ))}
        </div>
        <div className="text-heading">
          <p className="mt-4 text-2xl font-medium">
            {isStream ? message.slice(0, -2).join("") : message}
          </p>
        </div>
      </div>
    </>
  );
};

export default FirstAnswer;
