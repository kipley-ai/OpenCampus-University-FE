import React, { useEffect, useState } from "react";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useCreditBalance } from "@/hooks/api/credit";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import ModalQuizLoading from "@/components/modal-quiz-loading";
import Button from "@/components/button";
import { delay } from "@/utils/utils";
import TestImage from "@/components/quiz-app/product img.png";
import { useBookContext } from "./context";
import { History } from "./history";

export function Cover() {
  const { step, setStep } = useBookContext();

  return (
    <>
      <span className="text-lg font-semibold">
        Book Summarizer | Book Summarizer: The Saying of Confucius
      </span>
      <div className="mt-4 flex flex-col items-center rounded-lg rounded-xl border-2 border-border bg-box px-10 py-16">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={TestImage}
            alt="Book Summarizer Cover Image"
            className="rounded-lg"
            width={100}
            height={100}
          />
          <h1 className="text-lg font-semibold text-primary">
            Book Summarizer: The Saying of Confucius
          </h1>
          <p className="text-sm font-medium text-body">
            Get Key Insights and Study Efficiently!
          </p>
        </div>
        <button
          className="btn-primary my-8 px-4 py-2"
          onClick={() => setStep(step + 1)}
        >
          Start Summarizing
        </button>
        <History />
      </div>
    </>
  );
}
