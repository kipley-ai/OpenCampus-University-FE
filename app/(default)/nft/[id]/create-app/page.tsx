"use client";

import { useParams, redirect } from "next/navigation";
import ChooseApp from "./choose-app";
import { CHATBOT_APP, QUIZ_APP } from "@/utils/constants";
import { compareStringsIgnoreCase } from "@/utils/utils";
import { useNftDetail } from "@/hooks/api/nft";
import { useAppProvider } from "@/providers/app-provider";
import { CreateChatbotForm } from "../create-chatbot/create-chatbot-form";
import { CreateQuizForm } from "../create-quiz/create-quiz-form";
import { CreateAppProvider, useCreateAppContext } from "./create-app-context";

function CreateApp() {
  const { step } = useCreateAppContext();
  return (
    <div className="h-full">
      <h1 className="text-lg font-semibold">Create App</h1>
      <div className="mt-2 rounded-3xl border border-border bg-box px-5 py-8 md:px-10">
        {(() => {
          switch (step) {
            case CHATBOT_APP:
              return <CreateChatbotForm />;
            case QUIZ_APP:
              return <CreateQuizForm />;
            case "":
              return <ChooseApp />;
          }
        })()}
      </div>
    </div>
  );
}

export default function CreateAppPage() {
  const { id } = useParams();
  const { session } = useAppProvider();

  const nftDetail = useNftDetail({
    sft_id: id as string,
  });

  if (
    nftDetail.data?.data.data.wallet_addr &&
    !compareStringsIgnoreCase(
      session?.address as string,
      nftDetail.data?.data.data.wallet_addr as string,
    )
  ) {
    redirect("/nft/" + id);
  }

  return (
    <CreateAppProvider>
      <CreateApp />
    </CreateAppProvider>
  );
}
