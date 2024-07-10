"use client";

import ModalBlank from "@/components/modal-blank-4";
import Image from "next/image";
import Loading from "public/images/loading.svg";
import { useEffect, useRef, useState } from "react";

export default function ModalQuizLoading({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const [message, setMessage] = useState("Analysing your chosen topics");
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (isOpen) {
      const sequence = [
        { text: "Analysing your chosen topics", delay: 3000 },
        { text: "Retrieving Data from KnowledgeKey", delay: 3000 },
        { text: "Generating questions for you", delay: 3000 },
      ];

      let currentStep = 0;
      const messageIntervalId = setInterval(() => {
        if (currentStep < sequence.length - 1) {
          setMessage(sequence[currentStep + 1].text);
          currentStep += 1;
        } else {
          clearInterval(messageIntervalId);
        }
      }, sequence[currentStep].delay);

      let dotCount = 0;
      const dotsIntervalId = setInterval(() => {
        setDots(".".repeat(dotCount % 4));
        dotCount += 1;
      }, 400);
    }
  }, [isOpen]);

  const textPositions: { [key: string]: string } = {
    "Analysing your chosen topics": "sm:left-12",
    "Retrieving Data from KnowledgeKey": "sm:left-5",
    "Generating questions for you": "sm:left-12",
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative flex w-fit flex-col items-center justify-center rounded-2xl border border-[#DDDDEB] pb-16 shadow-md sm:w-[27rem]">
        <video
          src="/videos/quiz-loading.mp4"
          width="320"
          height="320"
          autoPlay
          loop
          muted
        ></video>
        <div
          className={`absolute bottom-12 left-4 flex items-center justify-center gap-0 ${textPositions[message]} sm:gap-1`}
        >
          <Image
            width={40}
            height={40}
            src={Loading}
            alt="Loading Icon"
            className="animate-spin"
          />
          <span className="text-sm font-semibold sm:text-lg">
            {message}
            <span className="animate-fade inline-block w-4">{dots}</span>
          </span>
        </div>
      </div>
    </ModalBlank>
  );
}
