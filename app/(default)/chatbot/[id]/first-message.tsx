import { useChatbotDetail } from "@/hooks/api/chatbot";
import Image from "next/image";
import { useParams } from "next/navigation";
import AvatarDummy from "public/images/avatar-bot-dummy.svg";
import LoadingIcon from "public/images/loading-icon.svg";
import { useState } from "react";
import { CopyButton } from "./last-message";
import { chatbotIdFromSlug } from "@/utils/utils";

const FirstAnswer = ({
  profileImage,
  sender,
  message,
  isGenerating,
}: {
  profileImage: any;
  sender: string;
  message: string[] | string;
  isGenerating: boolean;
}) => {
  const isStream = Array.isArray(message);
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    useChatbotDetail({
      chatbot_id: id as string,
    });
  const [showCopy, setShowCopy] = useState(false);
  return (
    <>
      <div
        className="flex flex-col space-y-2 pt-5"
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
      >
        {/* Loading icon and generating text */}
        {/* {isGenerating && (
					<div className="flex items-center text-gray-400 text-sm mb-2 space-x-3">
						<Image src={LoadingIcon} alt="Profile" className="animate-spin mr-10 h-5 w-5 ml-1 text-heading" />
						Generating answers for you...
					</div>
				)} */}
        {/* Message bubble */}
          {/* Message bubble */}
          {/* <div className="relative flex items-start space-x-4"> */}
          <div className="flex flex-col justify-center items-center">
            <div className="">
              <Image
                src={profileImage}
                alt="Profile"
                className="h-24 w-24 md:h-24 md:w-24 rounded-full"
                width={100}
                height={100}
              />
            </div>
            {/* <div className="w-full text-heading"> */}
            <div className="text-heading">
              {/* <h6 className="mb-1 mt-1 font-black text-lg"> */}
              <div className="w-full flex justify-center">
                <h6 className="mb-1 mt-2 font-medium">
                  {chatbotData?.data.data.name}
                </h6>
              </div>
              {/* <p className="text-sm mt-3">{isStream ? message.slice(0, -2).join("") : message}</p> */}
              <p className="text-2xl mt-4 font-medium">{isStream ? message.slice(0, -2).join("") : message}</p>
            </div>
            {showCopy && !isStream ? <CopyButton message={message} /> : <></>}
          </div>
          {/* <div className="relative flex items-start space-x-4">
            <Image
              src={profileImage}
              alt="Profile"
              className="h-7 w-7 md:h-8 md:w-8 rounded-full mt-1"
              width={50}
              height={50}
            />
            <div className="w-full text-heading">
              <div className="w-full text-heading flex">
                <h6 className="mb-1 text-sm">
                  {chatbotData?.data.data.name}
                </h6>
              </div>
              <p className="text-sm mt-3">{isStream ? message.slice(0, -2).join("") : message}</p>
            </div>
            {showCopy && !isStream ? <CopyButton message={message} /> : <></>}
          </div> */}
      </div>
    </>
  );
};

export default FirstAnswer;
