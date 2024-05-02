import Image from "next/image";
import { CopyButton } from "./last-message";
import { useState } from "react";
import AvatarDummy from "public/images/avatar-default-02.svg";
import TweetAnswer from "./tweet-answer";
import { useTheme } from "next-themes";

interface SpoilersVisibility {
  [key: string]: boolean;
}

const ChatMessage = ({
  chatbotData,
  message,
}: {
  chatbotData: any;
  message: any;
}) => {
  const [showCopy, setShowCopy] = useState(false);
  const [spoilerVisibility, setSpoilerVisibility] = useState<SpoilersVisibility>({});

  const { theme } = useTheme();
  console.log(theme); // For debugging purpose

  const toggleSpoiler = (id: string) => {
    setSpoilerVisibility(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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

  const renderMessageWithSpoiler = (msg: string) => {
    return msg.split('\n\n').map((line: string, index: number) => {
      const isSpoiler = message.sender === "bot" && (line.startsWith('**') || line.endsWith('**') || line.startsWith('correct_answer') || line.startsWith('explanation') || line.startsWith('Correct Answer') || line.startsWith('Explanation') || line.startsWith(''));
      const id = `spoiler-${index}`;
      console.log(line, isSpoiler) // For debugging purpose
      if (theme === "light") {
        return isSpoiler ? (
          <span
            key={id}
            className={`text-black ${spoilerVisibility[id] ? "" : "bg-black hover:bg-transparent"}`}
            onClick={() => toggleSpoiler(id)}
          >
            {line + "\n\n"}
          </span>
        ) : (
          <span key={id}>{line + "\n\n"}</span>
        );
      };
      if (theme === 'dark') {
        return isSpoiler ? (
          <span
            key={id}
            className={`text-white ${spoilerVisibility[id] ? "" : "bg-white hover:bg-transparent"}`}
            onClick={() => toggleSpoiler(id)}
          >
            {line + "\n\n"}
          </span>
        ) : (
          <span key={id}>{line + "\n\n"}</span>
        );
      }
    });
  };

  // console.log("Message: ", message); // For debugging purpose

  return (
    <div
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="relative flex items-start space-x-4">
        <Image
          src={message.sender == "bot" ? chatbotData?.data.data.profile_image : AvatarDummy}
          alt="User avatar"
          className="h-7 w-7 md:h-8 md:w-8 rounded-full"
          width={50}
          height={50}
        />
        <div className="text-heading">
          <h6 className="mb-1 mt-1 font-black text-lg">
            {message.sender == "bot" ? chatbotData?.data.data.name : "You"}
          </h6>
          <div className="text-sm">
            {renderMessageWithSpoiler(trimQuotationMarks(message.message))}
          </div>
        </div>
        {showCopy && <CopyButton message={message.message} />}
      </div>
    </div>
  );
};

export default ChatMessage;
