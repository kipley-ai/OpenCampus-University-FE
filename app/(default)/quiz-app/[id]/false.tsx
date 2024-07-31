"use client";

import React, { useEffect, useState } from "react";
import { UploadingModal } from "./uploading-modal";
import { useQuiz } from "../[id]/quiz-app-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";

export default function QuizFalse() {
  const {
    step,
    setStep,
    chatbot_id,
    session_id,
    questions,
    answers,
    answer_state,
    setAnswerState,
    total_right,
    setTotalRight,
    question_now,
    setQuestionNow,
    selected_answer,
    setSelectedAnswer,
  } = useQuiz();

  const [isUploading, setIsUploading] = useState(false);

  const totalQuestions = questions?.length as number;

  const progress = (question_now / totalQuestions) * 100;

  const correctAnswer = questions[question_now - 1]?.answer;
  const correctAnswerStr = questions[question_now - 1][correctAnswer];

  const nextPart = () => {
    if ((question_now as number) === (totalQuestions as number)) {
      setStep("result");
    } else {
      setSelectedAnswer("");
      setQuestionNow(question_now + 1);
      setStep("question");
      console.log("Step: ", step);
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-b-xl bg-[#FDE2E1] px-10 py-6 dark:bg-[#632e2d]">
      <UploadingModal isOpen={isUploading} setIsOpen={setIsUploading} />
      <div className="flex items-center gap-3">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="48"
            height="48"
            rx="24"
            className="fill-white dark:fill-[#EF4444]"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.2929 17.2929C17.6834 16.9024 18.3166 16.9024 18.7071 17.2929L24 22.5858L29.2929 17.2929C29.6834 16.9024 30.3166 16.9024 30.7071 17.2929C31.0976 17.6834 31.0976 18.3166 30.7071 18.7071L25.4142 24L30.7071 29.2929C31.0976 29.6834 31.0976 30.3166 30.7071 30.7071C30.3166 31.0976 29.6834 31.0976 29.2929 30.7071L24 25.4142L18.7071 30.7071C18.3166 31.0976 17.6834 31.0976 17.2929 30.7071C16.9024 30.3166 16.9024 29.6834 17.2929 29.2929L22.5858 24L17.2929 18.7071C16.9024 18.3166 16.9024 17.6834 17.2929 17.2929Z"
            className="fill-[#EF4444] dark:fill-white"
          />
        </svg>
        <div className="flex flex-col">
          <span className="ml-2 mt-1 text-2xl font-bold text-[#EF4444]">
            Incorrect!
          </span>
          <span className="ml-2 text-sm text-[#EF4444]">
            {correctAnswerStr}
          </span>
        </div>
      </div>
      <button
        className="flex items-center gap-2 rounded-lg bg-[#EF4444] px-6 py-2 text-white hover:bg-[#c23636]"
        onClick={nextPart}
      >
        NEXT
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M8.00065 3.33398L6.82565 4.50898L11.4757 9.16732H1.33398V10.834H11.4757L6.82565 15.4923L8.00065 16.6673L14.6673 10.0007L8.00065 3.33398Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
