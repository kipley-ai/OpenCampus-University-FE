"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { KF_TITLE } from "@/utils/constants";
import { useParams } from "next/navigation";
import { useBookContext } from "./context";
import { History } from "./history";

export function Cover() {
  const { step, setStep, app, setApp } = useBookContext();

  const { id } = useParams();
  const chatbotDetail = useChatbotDetail({ chatbot_id: id as string });

  useEffect(() => {
    if (chatbotDetail.data) {
      setApp(chatbotDetail.data.data.data);
    }
  }, [chatbotDetail.data, setApp]);

  if (chatbotDetail.isPending) {
    return <div>Loading...</div>;
  }

  if (chatbotDetail.isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <title>
        {KF_TITLE + chatbotDetail.data?.data?.data?.name + " - Book Summarizer"}
      </title>
      <span className="text-lg font-semibold">
        Book Summarizer | {chatbotDetail.data?.data?.data?.name}
      </span>
      <div className="mt-4 flex flex-col items-center rounded-lg rounded-xl border-2 border-border bg-box px-3 py-16 md:px-10">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={chatbotDetail.data?.data?.data?.profile_image}
            alt="Book Summarizer Cover Image"
            className="rounded-lg"
            width={100}
            height={100}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "/images/no-cover.svg";
            }}
          />
          <h1 className="text-lg font-semibold text-primary">
            {chatbotDetail.data?.data?.data?.name}
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
