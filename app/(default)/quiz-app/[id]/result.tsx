"use client";

import React, { useEffect, useState } from "react";
import { useQuiz } from "../[id]/quiz-app-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useGetLastGeneratedQuiz } from "@/hooks/api/quiz_app";
import { redirect, useRouter } from "next/navigation";

import Image from "next/image";
import ResultImage from "public/images/quiz-result.svg";

export default function QuizResult() {
  const {
    step,
    setStep,
    total_right,
    setTotalRight,
    question_now,
    setQuestionNow,
    questions,
    setSelectedAnswer,
  } = useQuiz();

  const totalQuestions = questions?.length as number;

  const percentage = Math.round((total_right / totalQuestions) * 100);

  const router = useRouter();

  const returnToDashboard = () => {
    router.push("/dashboard");
  };

  const restartQuiz = () => {
    setSelectedAnswer("");
    setTotalRight(0);
    setQuestionNow(1);
    setStep("question");
  };

  return (
    <div className="w-full">
      <span className="text-lg font-semibold">Quiz App</span>
      <div className="my-4 flex w-full flex-col rounded-xl border border-border bg-white p-8">
        <h2 className="text-lg font-semibold text-primary">Quiz Complete!</h2>
        <div className="mt-2 flex justify-center">
          <div className="flex w-full flex-col items-center rounded-xl bg-[#F9F9FF] p-6">
            <Image src={ResultImage} alt=""></Image>
            <p className="mt-4 text-center text-lg font-semibold">
              Your final score is {total_right} / {totalQuestions} ({percentage}
              %)
            </p>
            <button
              className="btn-secondary mt-4 px-6 py-2"
              onClick={restartQuiz}
            >
              Restart the Quiz
            </button>
          </div>
        </div>
        <div className="mx-auto mt-4 flex w-2/5 flex-col divide-y-2 divide-border">
          <div className="mt-4 flex items-center justify-between pb-8">
            <div className="mr-2 flex flex-col">
              <span className="font-medium text-body">CORRECT ANSWER</span>
              <p className="font-medium">{total_right}</p>
            </div>
            <div className="ml-2 flex flex-col">
              <span className="font-medium text-body">INCORRECT ANSWER</span>
              <p className="font-medium">{totalQuestions - total_right}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-8">
            <button className="flex flex-row py-2 hover:underline">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_687_7249)">
                  <path
                    d="M6 15.9358C7.65685 15.9358 9 14.5926 9 12.9358C9 11.2789 7.65685 9.93579 6 9.93579C4.34315 9.93579 3 11.2789 3 12.9358C3 14.5926 4.34315 15.9358 6 15.9358Z"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 9.93579C19.6569 9.93579 21 8.59265 21 6.93579C21 5.27894 19.6569 3.93579 18 3.93579C16.3431 3.93579 15 5.27894 15 6.93579C15 8.59265 16.3431 9.93579 18 9.93579Z"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 21.9358C19.6569 21.9358 21 20.5926 21 18.9358C21 17.2789 19.6569 15.9358 18 15.9358C16.3431 15.9358 15 17.2789 15 18.9358C15 20.5926 16.3431 21.9358 18 21.9358Z"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.7002 11.6358L15.3002 8.23584"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.7002 14.2358L15.3002 17.6358"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_687_7249">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.935791)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="ml-2 font-medium text-primary">Share</span>
            </button>
            <button
              className="btn-primary w-1/2 px-4 py-2"
              onClick={returnToDashboard}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizComplete() {
  return (
    <div className="mx-auto my-10 w-full rounded-xl bg-white p-8 shadow-lg">
      <h2 className="self-start text-2xl font-bold">Quiz Complete!</h2>
      <div className="mt-2 flex justify-center">
        <div className="flex w-full flex-col items-center rounded-lg bg-[#F9F9FF] p-6 shadow">
          <Image src={ResultImage} alt=""></Image>
          <p className="mt-4 text-center text-lg font-bold">
            Your final score is 7 / 10 (70%)
          </p>
          <button className="mt-4 rounded border border-[#141BEB] px-4 py-2 text-[#141BEB]">
            Restart the Quiz
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-1/4 flex-col self-center">
          <div className="mt-8 flex items-center justify-center text-lg">
            <div className="mr-2 flex flex-col">
              <span className="font-semibold">CORRECT ANSWER</span>
              <p>7</p>
            </div>
            <div className="ml-2 flex flex-col">
              <span className="font-semibold">INCORRECT ANSWER</span>
              <p>3</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-300"></div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button className="flex flex-row px-6 py-2">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_687_7249)">
              <path
                d="M6 15.9358C7.65685 15.9358 9 14.5926 9 12.9358C9 11.2789 7.65685 9.93579 6 9.93579C4.34315 9.93579 3 11.2789 3 12.9358C3 14.5926 4.34315 15.9358 6 15.9358Z"
                stroke="#141BEB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 9.93579C19.6569 9.93579 21 8.59265 21 6.93579C21 5.27894 19.6569 3.93579 18 3.93579C16.3431 3.93579 15 5.27894 15 6.93579C15 8.59265 16.3431 9.93579 18 9.93579Z"
                stroke="#141BEB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 21.9358C19.6569 21.9358 21 20.5926 21 18.9358C21 17.2789 19.6569 15.9358 18 15.9358C16.3431 15.9358 15 17.2789 15 18.9358C15 20.5926 16.3431 21.9358 18 21.9358Z"
                stroke="#141BEB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.7002 11.6358L15.3002 8.23584"
                stroke="#141BEB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.7002 14.2358L15.3002 17.6358"
                stroke="#141BEB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_687_7249">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0 0.935791)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="ml-4 text-[#141BEB]">Share</span>
        </button>
        <button className="ml-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          Done
        </button>
      </div>
    </div>
  );
}
