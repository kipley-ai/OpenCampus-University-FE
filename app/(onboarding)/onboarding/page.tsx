"use client";

import { useAccount } from "wagmi";
import { useCreateChatbotContext } from "../create-knowledge-context";
import OnboardingHeader from "./header";
import LandingPage from "./landing";
import InviteCode from "./invite-code";
import SelectDataElements from "../select-data-elements";
import MintNFT from "../mint-nft";
import CreateChatbot from "../create-chatbot";
import CreateQuiz from "../create-quiz";
import OnboardingSuccess from "../onboarding-success";
import { useAppProvider } from "@/providers/app-provider";
import { useUserDetail } from "@/hooks/api/user";
import { redirect, usePathname } from "next/navigation";
import KipProtocolVideo from "../kip-protocol-video";
import FreeKFI from "../free-kfi-token";
import { useEffect } from "react";
import { SUBDOMAINS } from "@/utils/constants";
import { ChooseApp } from "../choose-app";
import { CHATBOT_APP, QUIZ_APP } from "@/utils/constants";

export default function Onboarding() {
  const sign = localStorage.getItem("kip-protocol-signature");
  const {
    session: { address },
  } = useAppProvider();
  const { status } = useAccount();
  const { verifStatus } = useAppProvider();
  const pathname = usePathname();

  const subdomain = window.location.origin.split("//")[1].split(".")[0];
  if (SUBDOMAINS.includes(subdomain) && pathname !== "/") {
    redirect(process.env.NEXT_PUBLIC_HOST + pathname);
  }

  const { step, welcomePage } = useCreateChatbotContext();

  const { data: userDetail, isPending } = useUserDetail();

  if (isPending) return null;

  if (
    userDetail?.data?.msg === "user not found" ||
    userDetail?.data?.data?.onboarding
  ) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8">
      <OnboardingHeader profileImage={userDetail?.data?.data?.profile_image || ""} />
      {step == "data_source" || step == "upload_files" || step == "notion" ? (
        <SelectDataElements />
      ) : step == "mint_nft" ? (
        <MintNFT />
      ) : step == "choose_app" ? (
        <ChooseApp />
      ) : step == CHATBOT_APP ? (
        <CreateChatbot />
      ) : step == QUIZ_APP ? (
        <CreateQuiz />
      ) : step == "onboarding_success" ? (
        <OnboardingSuccess />
      ) : (
        <InviteCode address={address} />
      )}
    </div>
  );
}
