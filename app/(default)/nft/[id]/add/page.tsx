"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useRouter } from "next/navigation";
import { createKB } from "@/app/api/kb/helper";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Local from "./local";
import Notion from "./notion";
import { KF_TITLE } from "@/utils/constants";

type PossibleOptions = "files" | "twitter" | "notion" | "";

export interface UIFile {
  filename: string;
  size: number;
  status: "uploading" | "failed" | "success";
  bucketPath: string;
  link: string;
  aborter: AbortController | null;
}

// export function Main() {
// 	return (
// 		<div className="flex flex-col sm:px-6 lg:px-8 py-8 bg-[#292D32]">

// 		</div>
// 	)
// }

export default function DataSource() {
  const { setHeaderTitle, toast, setToast } = useAppProvider();

  const [kbId, setKbId] = useState("");

  const { address: walletAddress } = useAccount();

  useEffect(() => {
    const title = KF_TITLE + "Add Knowledge Assets";
    document.title = title;
    return () => setHeaderTitle("");
  }, []);

  const [selectedButton, setSelectedButton] = useState<PossibleOptions>("");
  const [localFiles, setLocalFiles] = useState<UIFile[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // For future, can remove if unneeded
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const { step, setStep } = useCreateChatbotContext();

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (localFiles) {
      const stillHasLoading =
        localFiles.filter((localFile) => {
          // Keep the still loading files
          return localFile.status === "uploading";
        }).length !== 0;

      setShowLoadingModal(stillHasLoading);
      if (stillHasLoading) {
        e.preventDefault();
        return;
      }
    }

    // TODO: Do something with localFiles
    if (localFiles) {
      const createKbParams = localFiles.map((file: UIFile) => {
        return {
          name: file.filename,
          type: "file",
          file: file.bucketPath,
        };
      });
      const response = await createKB(
        "files",
        createKbParams,
        walletAddress || "",
      );
      if (response.status === "success") {
        setToast(true);
      }
    }
  };

  return (
    <>
      <div className="h-full flex-col px-4 md:flex-row md:pl-10 justify-start bg-container md:w-5/6">
        <h1 className="text-heading text-lg font-semibold py-3">Add Knowledge Asset</h1>
        {step == "data_source" ? (
          <div className="flex flex-col px-6 py-9 pb-0 lg:px-8 xl:px-14 bg-sidebar border border-[#DDDDEB] rounded-2xl">
          {/* <div className="flex flex-col bg-container py-8 sm:px-6 lg:px-8">
            <div className="mx-56">
              <h1 className="text-2xl font-semibold text-heading">
                Add Knowledge Assets
              </h1>
              <hr className="my-4 border border-border" />
            </div> */}
            <Step1
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
            {/* {step === 1? (
            <Step1
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
          ) : step === 2 ? (
            <Step2
              files={localFiles}
              setFiles={setLocalFiles}
              selectedButton={selectedButton}
            />
          ) : (
            <NFTForm/>
          )} */}
            <div className="flex justify-end mb-10">
              {/* 					
            <button
              className="flex flex-row items-center justify-between  rounded-3xl p-2 px-5 mt-8 border-2 border-[#50575F]"
              type="submit"
              onClick={() => {
                if (step > 0) setStep(step - 1);
              }}
            >
              <h5 className="text-sm text-heading font-semibold">Back</h5>
            </button> */}
              <button
                className="mt-8 button"
                type="submit"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (selectedButton == "twitter") {
                    if (twitterStatus != "authenticated") {
                      setShowTwitterLogin(true);
                    } else {
                      setStep("mint_nft");
                    }
                  } else if (selectedButton == "notion") {
                    setStep("notion");
                  } else if (selectedButton == "files") {
                    setStep("upload_files");
                  }
                }}
              >
                <h5 className="text-sm">Continue</h5>
              </button>
            </div>
          </div>
        ) : step == "upload_files" ? (
          <Local files={localFiles} setFiles={setLocalFiles} />
        ) : // : step == "mint_nft"?
        // 	<NFTForm/>
        step == "notion" ? (
          <Notion closeModal={closeModal} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
