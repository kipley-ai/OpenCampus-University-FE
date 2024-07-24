"use client";

import { useParams, redirect } from "next/navigation";
import ChooseApp from "./choose-app";
import { CHATBOT_APP, QUIZ_APP } from "@/utils/constants";
import { useNftDetail } from "@/hooks/api/nft";
import { useUserDetail } from "@/hooks/api/user";
import { useSuperAdmin } from "@/hooks/api/access";
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
  const userDetail = useUserDetail();
  const superAdmin = useSuperAdmin(userDetail.data?.data.data.wallet_addr);

  if (nftDetail.isPending || userDetail.isPending || superAdmin.isPending) {
    return null;
  }

  if (
    nftDetail.data?.data.data.wallet_addr !==
    userDetail.data?.data.data.wallet_addr
  ) {
    if (superAdmin.data?.data.status !== "success") {
      redirect("/nft/" + id);
    }
  }

  return (
    <CreateAppProvider>
      <CreateApp />
    </CreateAppProvider>
  );
}
