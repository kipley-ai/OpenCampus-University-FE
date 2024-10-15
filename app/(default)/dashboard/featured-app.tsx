"use client";

import { useChatbotExplore } from "@/hooks/api/chatbot";
import { BotItem } from "./item";
import { ChatbotData } from "@/lib/types";

function Grid({ title, apps }: { title: string; apps?: ChatbotData[] }) {
  const BotNameComp = ({ name }: { name: string }) => {
    return <div className="break-words text-xs font-medium">{name}</div>;
  };

  return (
    <div className="rounded-3xl border-2 border-primary bg-white px-10 py-6">
      <h1 className="h-16 font-bold uppercase">{title}</h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {apps?.map((app) => (
          <BotItem
            key={app.chatbot_id}
            botData={app}
            botNameComp={<BotNameComp name={app.name} />}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedApp() {
  const featuredBotsQuery = useChatbotExplore({
    page: 1,
    page_size: 4,
    explore_id: "28707dbb-1578-421f-8756-0cf5d33053ec",
  });

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold">Harness your learning using AI</h1>
      <div className="mt-6 flex w-1/2 flex-col gap-4">
        <p className="text-black">
          Fireside Chat, hosted by OCU, features some of the most influential OC
          100 educators from a diverse range of the Web3 space.
        </p>
        <p className="text-black">
          Engage in topic-specific discussions, ask questions, and gain
          well-rounded insights from specialists across various fields within
          the Web3 space.
        </p>
        <p className="text-black">
          <strong>Topic of Fireside Chat: </strong>Digital Property Rights
        </p>
      </div>
      <div className="z-1 mt-14 flex gap-7">
        <Grid
          title={"Featured Quiz App"}
          apps={featuredBotsQuery.data?.data?.data?.chatbot_data}
        />
        <Grid
          title={"Featured Study Companion App"}
          apps={featuredBotsQuery.data?.data?.data?.chatbot_data}
        />
        <Grid
          title={"Featured Book Summarizer App"}
          apps={featuredBotsQuery.data?.data?.data?.chatbot_data}
        />
      </div>
    </div>
  );
}

export default FeaturedApp;
