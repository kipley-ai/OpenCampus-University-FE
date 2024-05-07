"use client";
import { useAccount } from "wagmi";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useRouter, useSearchParams } from "next/navigation";
// import NFTForm from "./create-nft-form";
import { createKB } from "@/app/api/kb/helper";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Local from "./local";
import Notion from "./notion";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import OnboardingProgress from "./onboarding-progress";
import { KF_TITLE } from "@/utils/constants";

export type PossibleOption =
  | "files"
  | "twitter"
  | "notion"
  | "substack"
  | "medium"
  | "mirror"
  | "api"
  | "";

export interface UIFile {
  filename: string;
  size: number;
  status: "uploading" | "failed" | "success";
  bucketPath: string;
  link: string;
  aborter: AbortController | null;
}

export default function SelectDataElements() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextStep = searchParams.get("nextStep");
  const nextType = searchParams.get("nextType");

  const title = KF_TITLE + "Create Knowledge Assets";
  const { setHeaderTitle } = useAppProvider();

  useEffect(() => {
    document.title = title;
    setHeaderTitle("");

    return () => setHeaderTitle("Default Title");
  }, []);

  const [selectedButton, setSelectedButton] = useState<PossibleOption>("");
  const [localFiles, setLocalFiles] = useState<UIFile[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const { isComingSoon, step, setStep, handleChangeKb } =
    useCreateChatbotContext();

  const comingSoon: PossibleOption[] = ["notion"];

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (comingSoon.includes(selectedButton)) return;

    if (selectedButton == "twitter") {
      if (twitterStatus != "authenticated") {
        setShowTwitterLogin(true);
        sessionStorage.setItem("mintNFTRedirect", "true");
      } else {
        setStep("mint_nft");
      }
    } else if (selectedButton == "notion") {
      setStep("notion");
    } else if (selectedButton == "files") {
      setStep("upload_files");
    }
  };

  // const mintNFTRedirect = sessionStorage.getItem("mintNFTRedirect");

  // if (mintNFTRedirect === "true" && twitterStatus == "authenticated") {
  // setStep("mint_nft"); // sessionStorage.removeItem("mintNFTRedirect");
  // }
  if (nextStep && nextStep !== "" && nextType && nextType !== "") {
    handleChangeKb("type", nextType);
    setStep(nextStep);
    router.push("/onboarding");
  }

  return (
    <>
      <ModalLoginTwitter
        isOpen={showTwitterLogin}
        setIsOpen={setShowTwitterLogin}
        redirectUrl="/onboarding?nextStep=mint_nft&nextType=twitter"
      />
      <div className="flex flex-col px-6 pb-20 lg:px-8 xl:px-32">
        <OnboardingProgress step={1} />
        {step == "data_source" ? (
          <div className="mt-8 rounded-3xl bg-white px-10 pt-8">
            <h1 className="mb-8 text-2xl font-semibold text-primary">
              Add Data Elements to your SFT
            </h1>
            <Step1
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
            <div className="my-8 mt-28 flex items-center justify-between border-t-2 pt-4">
              <button className="flex items-center justify-center gap-2 hover:underline">
                <svg
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.41 2.29965L6 0.889648L0 6.88965L6 12.8896L7.41 11.4796L2.83 6.88965L7.41 2.29965Z"
                    fill="#141BEB"
                  />
                </svg>

                <p>Back</p>
              </button>
              <button
                className="flex items-center justify-center gap-2 hover:underline"
                onClick={handleContinue}
              >
                <p>Next</p>
                <svg
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 0.889648L0.589996 2.29965L5.17 6.88965L0.589996 11.4796L2 12.8896L8 6.88965L2 0.889648Z"
                    fill="#141BEB"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : step == "upload_files" ? (
          <>
            <Local files={localFiles} setFiles={setLocalFiles} />
          </>
        ) : step == "notion" ? (
          <>
            <Notion closeModal={closeModal} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
