import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUpdateSharedChat, useGetSharedChatId } from "@/hooks/api/chatbot";
import {
  useGetSharedQuizId,
  useShareQuiz,
  useUpdateSharedQuiz,
} from "@/hooks/api/quiz_app";
import AvatarDummy from "public/images/avatar-default-02.svg";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatbotData?: any;
};

export const ShareModal = ({ isOpen, setIsOpen, chatbotData }: ModalProps) => {
  const [isFirstShare, setIsFirstShare] = useState(true);
  const [sharedChatId, setSharedChatId] = useState("");
  const [copyClipboard, setCopyClipboard] = useState(false);
  const [lastSharedDate, setLastSharedDate] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  );
  const sharedIdAPI = useGetSharedQuizId({
    chatbot_id: chatbotData?.chatbot_id,
  });
  const updateSharedAPI = useUpdateSharedQuiz();
  const BASE_URL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");

  // console.log(sharedChatId)

  useEffect(() => {
    if (sharedChatId) {
      setIsFirstShare(false);
    }
  }, [sharedChatId]);

  useEffect(() => {
    if (sharedIdAPI.isSuccess && sharedIdAPI.data.data.data) {
      setSharedChatId(sharedIdAPI.data.data.data.share_id);
      const formattedDate = new Date(
        sharedIdAPI.data.data.data.last_shared_time,
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setLastSharedDate(formattedDate);

      if (!sharedIdAPI.isRefetching && copyClipboard) {
        // console.log(`${BASE_URL}/chat/${sharedIdAPI.data.data.data.share_id}`)
        navigator.clipboard.writeText(
          `${BASE_URL}/share/${sharedIdAPI.data.data.data.share_id}`,
        );
        setTimeout(() => {
          setCopyClipboard(false);
        }, 3000);
      }
    }
  }, [sharedIdAPI.isSuccess, sharedIdAPI.isRefetching]);

  const handleUpdateSharedChat = () => {
    setCopyClipboard(true);
    updateSharedAPI.mutate(
      { chatbot_id: chatbotData?.chatbot_id },
      {
        onSuccess(data, variables, context) {
          sharedIdAPI.refetch();
        },
      },
    );
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4 p-8 md:w-[650px]">
        <h1 className="text-xl font-semibold leading-none text-primary">
          Share Your Chat
        </h1>
        {isFirstShare ? (
          <p className="text-sm font-medium text-body">
            Anyone with the URL will be able to view the shared quiz. Questions
            you answer after creating your link won't be shared.
          </p>
        ) : (
          <p className="text-sm font-medium text-body">
            You have shared this <span className="underline">quiz</span> before.
            If you want to update the shared quiz content, please update and get
            a new shared link.
          </p>
        )}
        <div className="flex h-[336px] flex-col rounded-md border-2 border-border">
          <div className="flex h-[48px] flex-row items-center justify-between divide-x-2 divide-border rounded rounded-b-none border-b-2 border-border bg-container px-4 py-2">
            <p className="text-sm font-medium">{chatbotData?.chatbot_name}</p>
            <p className="pl-6 text-sm">{lastSharedDate}</p>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <button
            className="btn-underlined text-sm"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn-primary px-4 py-2 text-base font-normal"
            type="button"
            onClick={handleUpdateSharedChat}
          >
            <div className="flex items-center gap-2">
              <p className="">
                {copyClipboard
                  ? updateSharedAPI.isSuccess
                    ? "Copied!"
                    : "Copying..."
                  : isFirstShare
                    ? "Copy link"
                    : "Update and copy link"}
              </p>
              {!copyClipboard && (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 2 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.375 14.5H20.625M20.625 14.5L14.5 20.625M20.625 14.5L14.5 8.375"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </ModalBlank>
  );
};
