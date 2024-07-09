import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuiz } from "./quiz-app-context";
import {
  useGetSharedQuizId,
  useShareQuiz,
  useUpdateSharedQuiz,
  useAnswerQuiz,
} from "@/hooks/api/quiz_app";
import AvatarDummy from "public/images/avatar-default-02.svg";
import { OptionCheckMark } from "@/components/quiz-app/option-check-mark";
import { OptionCross } from "@/components/quiz-app/option-cross";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatbotData?: any;
};

export const ShareModal = ({ isOpen, setIsOpen, chatbotData }: ModalProps) => {
  const [isFirstShare, setIsFirstShare] = useState(true);
  const [sharedChatId, setSharedChatId] = useState("");
  const [copyClipboard, setCopyClipboard] = useState(false);
  const sharedIdAPI = useGetSharedQuizId({
    chatbot_id: chatbotData?.chatbot_id,
  });
  const answerQuiz = useAnswerQuiz();
  const updateSharedAPI = useUpdateSharedQuiz();
  const BASE_URL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");

  const { questions, answers, session_id } = useQuiz();

  // console.log(sharedChatId)

  useEffect(() => {
    if (sharedChatId) {
      setIsFirstShare(false);
    }
  }, [sharedChatId]);

  useEffect(() => {
    if (sharedIdAPI.isSuccess && sharedIdAPI.data.data.data) {
      setSharedChatId(sharedIdAPI.data.data.data.share_id);

      if (!sharedIdAPI.isRefetching && copyClipboard) {
        // console.log(`${BASE_URL}/chat/${sharedIdAPI.data.data.data.share_id}`)
        navigator.clipboard.writeText(
          `${BASE_URL}/share/quiz-app/${sharedIdAPI.data.data.data.share_id}`,
        );
        setTimeout(() => {
          setCopyClipboard(false);
        }, 3000);
      }
    }
  }, [sharedIdAPI.isSuccess, sharedIdAPI.isRefetching]);

  const handleUpdateSharedChat = () => {
    setCopyClipboard(true);
    answerQuiz.mutate(
      {
        chatbot_id: chatbotData?.chatbot_id,
        session_id,
        answer: answers,
      },
      {
        onSuccess: () => {
          updateSharedAPI.mutate(
            { chatbot_id: chatbotData?.chatbot_id },
            {
              onSuccess(data, variables, context) {
                sharedIdAPI.refetch();
              },
            },
          );
        },
      },
    );
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4 p-8 md:w-[650px]">
        <h1 className="text-xl font-semibold leading-none text-primary">
          Share your quiz
        </h1>
        <p className="text-sm font-medium text-body">
          Anyone with the URL will be able to view the shared quiz.
        </p>
        <div className="flex flex-col rounded-md border-2 border-border bg-container">
          <div className="flex h-[48px] flex-row items-center justify-between divide-x-2 divide-border rounded rounded-b-none border-b-2 border-border px-4 py-2">
            <p className="text-sm font-medium">{chatbotData?.chatbot_name}</p>
            <p className="pl-6 text-sm">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex h-72 flex-col gap-8 overflow-y-auto p-4">
            {questions.map((question: any, qIndex: number) => (
              <div key={qIndex} className="flex items-start gap-4">
                <div className="flex size-8 items-center justify-center rounded-full border border-gray-300 bg-box">
                  <p className="font-semibold text-primary">{qIndex + 1}</p>
                </div>
                <div className="mt-1 flex w-full flex-col gap-4">
                  <h2 className="text-lg font-medium">{question.question}</h2>
                  {["a", "b", "c", "d"].map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className={`relative flex w-full gap-4 rounded-lg px-4 py-3 text-left 
                      ${option === answers[qIndex] ? (question.answer === option ? "bg-[#ECECFF] font-medium" : "bg-[#FDE2E1] font-medium") : "border border-gray-300"}
                      `}
                    >
                      <input
                        type="radio"
                        name="quiz"
                        value={option}
                        className="absolute w-full opacity-0"
                        checked={question.answer === option}
                        disabled
                      />
                      {option === answers[qIndex] ? (
                        question.answer === option ? (
                          <OptionCheckMark />
                        ) : (
                          <OptionCross />
                        )
                      ) : null}
                      {question[option]}
                    </label>
                  ))}
                  {question.answer === answers[qIndex] ? null : (
                    <p className="text-sm text-primary">
                      Correct Answer: {question[question.answer]}
                    </p>
                  )}
                </div>
              </div>
            ))}
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
