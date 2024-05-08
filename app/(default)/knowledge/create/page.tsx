"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useRouter } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";
import NFTForm from "./create-nft-form";
import { createKB } from "@/app/api/kb/helper";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Local from "./local";
import Notion from "./notion";
import ModalLoginTwitter from "@/components/modal-login-twitter";
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

export default function DataSource({
  twitterRedirectUrl = "/knowledge/create",
}: any) {
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

  const mintNFTRedirect = sessionStorage.getItem("mintNFTRedirect");

  if (mintNFTRedirect === "true" && twitterStatus == "authenticated") {
    setStep("mint_nft");
    handleChangeKb("type", "twitter");
    sessionStorage.removeItem("mintNFTRedirect");
  }

  return (
    <>
      <ModalLoginTwitter
        isOpen={showTwitterLogin}
        setIsOpen={setShowTwitterLogin}
        redirectUrl={twitterRedirectUrl}
      />
      <div className="h-full flex-col px-4 md:flex-row md:pl-10 justify-start bg-container md:w-5/6">
        <h1 className="text-heading text-lg font-semibold py-3">Create Knowledge Asset</h1>
        {step == "data_source" ? (
          <div className="flex flex-col px-6 py-9 pb-0 lg:px-8 xl:px-14 bg-sidebar border border-[#DDDDEB] rounded-2xl">
              <h1 className="text-lg font-semibold text-primary">
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
                <p>NEXT</p>
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
            {/* <div className="flex justify-end">
              {isComingSoon ? (
                <button
                  className="mt-8 flex flex-row items-center justify-between rounded-3xl bg-primary p-2 px-5"
                  type="submit"
                  onClick={handleContinue}
                >
                  <h5 className="text-sm font-semibold text-black">
                    {isComingSoon ? "Coming Soon" : "Continue"}
                  </h5>
                  {!isComingSoon ? (
                    <svg
                      className="pl-2"
                      width="20"
                      height="10"
                      viewBox="0 0 20 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                        fill="#151515"
                      />
                      <path
                        d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                        fill="#151515"
                      />
                    </svg>
                  ) : null}
                </button>
              ) : (
                <></>
              )}
            </div> */}
          </div>
        ) : step == "upload_files" ? (
          <Local files={localFiles} setFiles={setLocalFiles} />
        ) : step == "mint_nft" ? (
          <NFTForm />
        ) : step == "notion" ? (
          <Notion closeModal={closeModal} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
