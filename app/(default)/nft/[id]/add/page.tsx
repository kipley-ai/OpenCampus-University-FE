"use client";
import React, { useState, useEffect } from "react";
import Step1 from "./step-1";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Local from "./local";
import Notion from "./notion";
import { KF_TITLE, TWITTER_ITEM_TYPE } from "@/utils/constants";
import URLInput from "./url-input";
import { PossibleOption } from "@/app/(default)/knowledge/create/page";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useNftDetail } from "@/hooks/api/nft";
import { useKBItem } from "@/hooks/api/kb";
import { keepPreviousData } from "@tanstack/react-query";
import ModalLoginTwitter from "@/components/modal-login-twitter";
import CreateChatbotModal from "@/components/toast-4";

export interface UIFile {
  filename: string;
  size: number;
  status: "uploading" | "failed" | "success";
  bucketPath: string;
  link: string;
  aborter: AbortController | null;
}

export default function DataSource() {
  const router = useRouter();
  const pathname = usePathname();
  const { setHeaderTitle } = useAppProvider();
  const {
    step,
    setStep,
    handleChangeKb,
    setTwitterExist,
    setKbDetail,
    addTwitterItem,
    kbDetail,
    successModal,
    setSuccessModal,
  } = useCreateChatbotContext();

  const { id } = useParams();

  const { data: nftDetail } = useNftDetail({
    sft_id: id as string,
  });

  useEffect(() => {
    if (nftDetail) {
      setKbDetail({ kb_id: nftDetail?.data?.data?.kb_id as string });
    }
  }, [nftDetail]);

  const { data: items } = useKBItem(
    {
      kb_id: nftDetail?.data?.data?.kb_id as string,
      page: 1,
      page_size: 9999999999999,
    },
    keepPreviousData,
  );

  useEffect(() => {
    const title = KF_TITLE + "Add Knowledge Assets";
    document.title = title;
    return () => setHeaderTitle("");
  }, []);

  const [selectedButton, setSelectedButton] = useState<PossibleOption>("");
  const [localFiles, setLocalFiles] = useState<UIFile[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // For future, can remove if unneeded
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const { status: twitterStatus, data: twitterSession } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const comingSoon: PossibleOption[] = ["notion"];

  // const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (localFiles) {
  //     const stillHasLoading =
  //       localFiles.filter((localFile) => {
  //         // Keep the still loading files
  //         return localFile.status === "uploading";
  //       }).length !== 0;

  //     setShowLoadingModal(stillHasLoading);
  //     if (stillHasLoading) {
  //       e.preventDefault();
  //       return;
  //     }
  //   }

  //   // TODO: Do something with localFiles
  //   if (localFiles) {
  //     const createKbParams = localFiles.map((file: UIFile) => {
  //       return {
  //         name: file.filename,
  //         type: "file",
  //         file: file.bucketPath,
  //       };
  //     });
  //     const response = await createKB(
  //       "files",
  //       createKbParams,
  //       walletAddress || "",
  //     );
  //     if (response.status === "success") {
  //       setToast(true);
  //     }
  //   }
  // };

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (comingSoon.includes(selectedButton)) return;

    if (selectedButton == "twitter") {
      if (twitterStatus != "authenticated") {
        setShowTwitterLogin(true);
        sessionStorage.setItem("mintNFTRedirect", "true");
        sessionStorage.setItem("kbIdStorage", kbDetail?.kb_id!);
      } else {
        addTwitterItem(kbDetail?.kb_id!, twitterSession.user?.username!);
      }
    } else if (selectedButton == "files") {
      setStep("upload_files");
    } else if (
      selectedButton == "youtube" ||
      selectedButton == "medium" ||
      selectedButton == "notion"
    ) {
      setIsModalOpen(true);
    }
  };

  const mintNFTRedirect = sessionStorage.getItem("mintNFTRedirect");
  const kbIdStorage = sessionStorage.getItem("kbIdStorage");

  if (mintNFTRedirect === "true" && twitterStatus == "authenticated") {
    addTwitterItem(kbIdStorage!, twitterSession.user?.username!);
    sessionStorage.removeItem("mintNFTRedirect");
    sessionStorage.removeItem("kbIdStorage");
  }

  useEffect(() => {
    const kbItems = items?.data?.data.kb_item_data;
    const tw = kbItems?.find((x) => x.item_type === TWITTER_ITEM_TYPE);
    if (tw) {
      setTwitterExist(true);
    }
  }, [items]);

  return (
    <>
      <ModalLoginTwitter
        isOpen={showTwitterLogin}
        setIsOpen={setShowTwitterLogin}
        redirectUrl={pathname}
      />
      <URLInput
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        type={selectedButton}
      />
      <CreateChatbotModal
        children={"Your data source has been updated successfully!"}
        open={successModal}
        setOpen={setSuccessModal}
      />
      <div className="h-full flex-col justify-start bg-container px-4 md:w-5/6 md:flex-row md:pl-10">
        <h1 className="py-3 text-lg font-semibold text-heading">
          Add Knowledge Asset
        </h1>
        {step == "data_source" ? (
          <div className="flex flex-col rounded-2xl border border-[#DDDDEB] bg-sidebar px-6 py-9 pb-0 lg:px-8 xl:px-14">
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
            <div className="my-8 mt-28 flex items-center justify-between border-t-2 pt-4">
              <button
                className="flex items-center justify-center gap-2 hover:underline"
                onClick={() => router.back()}
              >
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
