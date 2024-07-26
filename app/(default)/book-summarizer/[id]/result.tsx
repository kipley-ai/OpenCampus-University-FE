import Image from "next/image";
import Loading from "public/images/loading.svg";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useCreditBalance } from "@/hooks/api/credit";
import { FormNav } from "@/components/form-nav";
import { ModalGenerating } from "./modal-generating";
import { useBookContext } from "./context";
import { History } from "./history";

export function Result() {
  const { step, setStep, scope, setScope, topic, setTopic } = useBookContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <ModalGenerating isOpen={isGenerating} setIsOpen={setIsGenerating} />
      <h1 className="text-lg font-semibold">
        Book Summarizer | Book Summarizer: The Saying of Confucius
      </h1>
      <div className="mt-4 flex flex-col rounded-lg rounded-xl border-2 border-border bg-box px-10 py-8">
        <h2 className="mb-8 text-lg font-semibold text-primary">
          Summarize the whole book of Book Summarizer: The Saying of Confucius
        </h2>
        <div className="flex items-center justify-start gap-2">
          <Image
            width={35}
            height={35}
            src={Loading}
            alt="Loading Icon"
            className="animate-spin"
          />
          <span className="text-sm text-body">
            Generating summary for you...
          </span>
        </div>
        <div className="my-4 flex items-center justify-between border-t-2 pt-4">
          <button
            className="btn-plain mr-4 self-end"
            onClick={() => setIsShareOpen(true)}
          >
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2226_23427)">
                  <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.69995 10.6998L15.3 7.2998"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.69995 13.2998L15.3 16.6998"
                    stroke="#141BEB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2226_23427">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-heading">Share</p>
            </div>
          </button>
          <button
            className="aligns-end flex items-center justify-center gap-2 text-sm font-medium hover:underline"
            onClick={() => setStep(step - 1)}
          >
            <p className="">Re-summarize</p>
            <svg
              width="8"
              height="13"
              viewBox="0 1 8 13"
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
        <History />
        <div className="my-4"></div>
      </div>
    </>
  );
}
