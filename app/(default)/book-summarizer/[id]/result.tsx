import Image from "next/image";
import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import { useGetSummary } from "@/hooks/api/book-summarizer";
import { FormNav } from "@/components/form-nav";
import { useAppProvider } from "@/providers/app-provider";
import { useBookContext } from "./context";
import { History } from "./history";
import { useCreditBalance, useCreditDeduction } from "@/hooks/api/credit";
import { v4 as uuidv4 } from "uuid";
import { useCreditBalanceContext } from "./credit-balance-context";

const ShareIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2226_23427)">
        <path
          d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.69995 10.6998L15.3 7.2998"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.69995 13.2998L15.3 16.6998"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2226_23427">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export function Result() {
  const { step, setStep, app, scope, topic, resultId, lastJsonMessage } =
    useBookContext();
  const { session } = useAppProvider();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [summaryStream, setSummaryStream] = useState<string[]>([]);
  const [replyStatus, setReplyStatus] = useState<
    "idle" | "generating" | "error"
  >("idle");

  const creditBalance = useCreditBalance();
  const { setCreditBalance } = useCreditBalanceContext();
  const creditDeduction = useCreditDeduction();

  useEffect(() => {
    if (lastJsonMessage !== null) {
      switch (lastJsonMessage.type) {
        case "start":
          setSummaryStream([]);
          setReplyStatus("generating");
          break;
        case "stream":
          setSummaryStream((prev) => [...prev, lastJsonMessage.message]);
          break;
        case "end":
          if (replyStatus==="generating") {
            setReplyStatus("idle");

            const fullBotAnswer = JSON.parse(lastJsonMessage.message).answer;

            console.log("fullBotAnswer");
            console.log(fullBotAnswer);

            let question = ""

            if (scope=="whole-book") {
              question = `Summarized Results for the book of ${app.name}`;
            } else if (scope=="topic") {
              question = `Summarized Results of ${topic} topic in ${app.name}`;
            }

            creditDeduction.mutate(
              {
                answer: fullBotAnswer,
                question: question,
                chatbot_id: app.chatbot_id as string,
                session_id: uuidv4(),
              },
              {
                onSuccess: async () => {
                  const { data } = await creditBalance.refetch();
                  setCreditBalance(data?.data?.data.credit_balance);
                },
              },
            );
          }

          break;
        case "error":
          setReplyStatus("error");
          break;
        default:
          break;
      }
    }
  }, [lastJsonMessage]);

  return (
    <>
      <h1 className="text-lg font-semibold">Book Summarizer | {app.name}</h1>
      <div className="mt-4 flex flex-col rounded-lg rounded-xl border-2 border-border bg-box px-3 py-8 md:px-10">
        <h2 className="mb-8 text-lg font-semibold text-primary">
          {(() => {
            switch (scope) {
              case "whole-book":
                return `Summarized Results for the book of ${app.name}`;
              case "topic":
                return `Summarized Results of ${topic} topic in ${app.name}`;
              default:
                return null;
            }
          })()}
        </h2>
        {replyStatus === "generating" && (
          <div className="flex items-center justify-start gap-2">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.4879 6.98434C17.4879 6.44072 17.0488 6 16.5022 6C15.9556 6 15.5143 6.44295 15.5166 6.98658V10.0134C15.5166 10.5571 15.9556 10.9978 16.5022 10.9978C17.0466 10.9978 17.4879 10.5593 17.4879 10.0134V6.98434ZM22.0597 8.83446C22.3307 8.36466 22.1672 7.76063 21.6968 7.48994C21.2263 7.21701 20.6237 7.38032 20.3482 7.85235L18.8316 10.4743C18.5606 10.9441 18.7241 11.5481 19.1945 11.8188C19.665 12.0917 20.2698 11.9284 20.5409 11.4586L22.0597 8.83446ZM24.9837 11.0962C25.2547 11.566 25.0957 12.17 24.6208 12.4407L21.9953 13.9553C21.5249 14.226 20.9201 14.0671 20.649 13.5929C20.378 13.1231 20.537 12.519 21.0119 12.2483L23.6374 10.7338C24.1055 10.4631 24.7081 10.6264 24.9837 11.0962ZM25.5144 16.792C26.0587 16.792 26.5001 16.3536 26.5001 15.8077C26.5001 15.2641 26.061 14.8234 25.5144 14.8234H22.4813C21.9369 14.8234 21.4956 15.2618 21.4956 15.8077C21.4956 16.3513 21.9347 16.792 22.4813 16.792H25.5144ZM24.9837 20.9038C24.7126 21.3736 24.1078 21.5369 23.6374 21.2662L21.0119 19.7517C20.5415 19.481 20.378 18.877 20.649 18.4072C20.9201 17.9374 21.5249 17.7741 21.9953 18.0448L24.6208 19.5593C25.0912 19.83 25.2547 20.434 24.9837 20.9038ZM20.3506 24.5325C20.6217 25.0068 21.2265 25.1656 21.697 24.8949C22.1696 24.622 22.3309 24.0202 22.0599 23.5504L20.5433 20.9285C20.2722 20.4542 19.6674 20.2954 19.197 20.5661C18.7221 20.8368 18.563 21.4408 18.8341 21.9106L20.3506 24.5325ZM16.5023 26C15.9557 26 15.5166 25.5593 15.5166 25.0156V21.9865C15.5166 21.4407 15.9579 21.0022 16.5023 21.0022C17.0489 21.0022 17.4879 21.4429 17.4879 21.9865V25.0156C17.4879 25.557 17.0444 26 16.5023 26ZM10.94 23.5504C10.669 24.0202 10.8325 24.6242 11.3029 24.8949C11.7756 25.1678 12.3782 25.0045 12.647 24.5325L14.1636 21.9105C14.4369 21.4407 14.2734 20.8367 13.8029 20.566C13.3325 20.2953 12.7277 20.4586 12.4566 20.9284L10.94 23.5504ZM7.62461 20.9039C7.35356 20.4341 7.51261 19.8301 7.98751 19.5594L10.6129 18.0448C11.0834 17.7741 11.6882 17.933 11.9593 18.4072C12.2303 18.877 12.0713 19.4811 11.5964 19.7518L8.97093 21.2663C8.5005 21.537 7.89791 21.3737 7.62461 20.9039ZM7.48566 14.8234C6.94131 14.8234 6.5 15.2618 6.5 15.8077C6.5 16.3513 6.94355 16.792 7.48566 16.792H10.5188C11.0631 16.792 11.5044 16.3536 11.5044 15.8077C11.5044 15.2641 11.0654 14.8234 10.5188 14.8234H7.48566ZM7.62461 11.0962C7.89567 10.6264 8.5005 10.4631 8.97093 10.736L11.5964 12.2506C12.0668 12.5213 12.2303 13.1253 11.9593 13.5951C11.6882 14.0649 11.0834 14.2282 10.6129 13.9575L7.98751 12.443C7.51261 12.17 7.35356 11.5682 7.62461 11.0962ZM12.6496 7.85234C12.3785 7.37807 11.7737 7.21923 11.3032 7.48992C10.8328 7.76285 10.6693 8.36465 10.9426 8.83444L12.4591 11.4564C12.7302 11.9306 13.335 12.0895 13.8055 11.8188C14.2781 11.5481 14.4372 10.9441 14.1661 10.4743L12.6496 7.85234Z"
                fill="currentColor"
              />
              <defs>
                <radialGradient
                  id="paint0_angular_1104_8847"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(16.5 16) rotate(-101.793) scale(11.0704 11.0691)"
                >
                  <stop stopOpacity="0.8" />
                  <stop offset="1" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            <span className="text-sm text-body">
              Generating summary for you...
            </span>
          </div>
        )}
        {replyStatus === "error" && (
          <div className="flex items-center justify-start gap-2">
            <span className="text-sm text-red-500">
              Sorry, an error occurred. Please try again.
            </span>
          </div>
        )}
        <Markdown className="whitespace-pre-wrap">
          {summaryStream.join("")}
        </Markdown>
        <div className="my-4 flex items-center justify-between border-t-2 border-border pt-4">
          <button
            className="btn-plain mr-4 self-end text-heading"
            onClick={() => setIsShareOpen(true)}
          >
            <div className="flex items-center gap-2">
              <ShareIcon />
              <p>Share</p>
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
                fill="var(--color-primary)"
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
