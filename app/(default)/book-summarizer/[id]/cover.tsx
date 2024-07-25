import React, { useEffect, useState } from "react";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useCreditBalance } from "@/hooks/api/credit";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import ModalQuizLoading from "@/components/modal-quiz-loading";
import Button from "@/components/button";
import OCLogo from "@/components/logo/OC Logo.svg";
import { delay } from "@/utils/utils";
import TestImage from "@/components/quiz-app/product img.png";

export function Cover() {
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
        <button className="btn-primary mt-8 px-4 py-2">
          Start Summarizing
        </button>
        <div className="mt-12 grid grid-cols-4 gap-2">
          <div className="flex cursor-pointer flex-col gap-2 rounded-xl border-2 border-border p-4 hover:bg-secondary">
            <h3 className="text-sm font-medium text-body">
              What were the main causes of this issue...
            </h3>
            <div className="flex items-center justify-start gap-2">
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                  fill="var(--color-primary)"
                />
              </svg>
              <span className="text-sm text-[#A8A5AD]">
                2022-10-22 19:02 UTC
              </span>
            </div>
          </div>
          <div className="flex cursor-pointer flex-col space-y-2 rounded-xl border-2 border-border p-4 hover:bg-secondary">
            <h3 className="text-sm font-medium text-body">
              What were the main causes of this issue...
            </h3>
            <div className="flex items-center justify-start gap-2">
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                  fill="var(--color-primary)"
                />
              </svg>
              <span className="text-sm text-[#A8A5AD]">
                2022-10-22 19:02 UTC
              </span>
            </div>
          </div>
          <div className="flex cursor-pointer flex-col space-y-2 rounded-xl border-2 border-border p-4 hover:bg-secondary">
            <h3 className="text-sm font-medium text-body">
              What were the main causes of this issue...
            </h3>
            <div className="flex items-center justify-start gap-2">
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                  fill="var(--color-primary)"
                />
              </svg>
              <span className="text-sm text-[#A8A5AD]">
                2022-10-22 19:02 UTC
              </span>
            </div>
          </div>
          <div className="flex cursor-pointer flex-col space-y-2 rounded-xl border-2 border-border p-4 hover:bg-secondary">
            <Image src={OCLogo} alt="OCU Logo" width={40} height={40} />
            <span className="text-sm font-medium text-primary">
              View more history
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
