import Image from "next/image";
import { ChatbotData } from "@/lib/types";
import { chatbotSlug } from "@/utils/utils";
import Link from "next/link";

export const BotItem = ({
  botData,
  botNameComp,
}: {
  botData: ChatbotData;
  botNameComp?: JSX.Element;
}) => (
  <Link
    href={`/ai-app/${chatbotSlug(botData)}/profile`}
    className="delay-50 group relative flex grow cursor-pointer flex-col transition ease-in-out"
  >
    <Image
      src={botData.profile_image ?? ""}
      height={260}
      width={260}
      className="w-full rounded-xl group-hover:shadow-xl dark:group-hover:shadow-gray-700"
      alt="Avatar"
    />
    <div className="mt-4 flex-grow">
      {botNameComp ? (
        botNameComp
      ) : (
        <div className="break-words font-medium max-md:text-sm">
          {botData.name}
        </div>
      )}
    </div>
  </Link>
);
