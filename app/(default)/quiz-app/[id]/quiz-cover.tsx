"use client";

import TestImage from "components/quiz-app/product img.png";

import React, { useEffect, useState } from "react";
import { useQuiz } from "../[id]/quiz-app-context";
import { KF_TITLE } from "@/utils/constants";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import {
  useGenerateQuizAPI,
  useGetQuiz,
  useGetSuggestedTopics,
} from "@/hooks/api/quiz_app";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useCreditBalance } from "@/hooks/api/credit";
import { useCreditBalanceContext } from "../../chatbot/[id]/credit-balance-context";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import ModalQuizLoading from "@/components/modal-quiz-loading";
import Button from "@/components/button";
import { delay } from "@/utils/utils";

interface Form {
  topic: string;
}

export default function QuizCover() {
  const {
    step,
    setStep,
    topic,
    setTopic,
    chatbot_id,
    setChatbotId,
    setChatbotName,
    questions,
    setQuestions,
    session_id,
    setSessionId,
  } = useQuiz();
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);

  //console.log("Chatbot ID:", id); //For debugging purpose

  const chatbotDetail = useChatbotDetail({
    chatbot_id: id as string,
  });
  //console.log("Chatbot Detail:", chatbotDetail.data?.data?.data); //For debugging purpose

  const generateQuiz = useGenerateQuizAPI();

  const [form, setForm] = useState<Form>({
    topic: "",
  });

  const handleFormChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsGenerating(true);
    generateQuiz.mutate({
      chatbot_id: id as string,
      topic: form.topic as string,
    });
  };

  useEffect(() => {
    setChatbotId(id as string);
    if (generateQuiz.isSuccess && generateQuiz.data) {
      console.log("Successfully created quiz!", generateQuiz.data);
      setSessionId(generateQuiz.data?.data.session_id as string);
      setChatbotName(chatbotDetail.data?.data?.data.name as string);

      // console.log("Current step:", step); // For debugging purpose
      // console.log("Chatbot id:", chatbot_id); // For debugging purpose
      // console.log("Questions: ", questions); // For debugging purpose
    }
  }, [
    chatbot_id,
    setChatbotId,
    generateQuiz.isSuccess,
    generateQuiz.data,
    setStep,
  ]);

  const { refetch: quizRefetch } = useGetQuiz({
    chatbot_id: chatbot_id as string,
    session_id: session_id as string,
  });

  const creditDeduction = useCreditDeduction();
  const creditBalance = useCreditBalance();
  const { setCreditBalance } = useCreditBalanceContext();

  useEffect(() => {
    const f = async () => {
      while (true) {
        const { data: quizData } = await quizRefetch();
        if (quizData?.data.status === "success") {
          if (Array.isArray(quizData?.data?.data?.questions)) {
            setQuestions(quizData?.data?.data?.questions);
          } else {
            setQuestions(quizData?.data?.data?.questions?.questions);
          }
          creditDeduction.mutate(
            {
              answer: JSON.stringify(quizData?.data?.data?.questions),
              question: topic,
              chatbot_id,
              session_id: quizData.data?.data.session_id,
            },
            {
              onSuccess: async () => {
                const { data } = await creditBalance.refetch();
                setCreditBalance(data?.data?.data.credit_balance);
                setStep("question");
              },
            },
          );
          break;
        }
        await delay(3000);
      }
    };

    if (isGenerating) {
      f();
    }
  }, [isGenerating]);

  const [isSuggestionOn, setIsSuggestionOn] = useState(false);
  const [presetTopics, setPresetTopics] = useState<string[]>([]);

  useEffect(() => {
    if (chatbotDetail.isSuccess) {
      const metadata = JSON.parse(
        chatbotDetail.data?.data?.data.meta_data || "{}",
      );
      const suggestedTopics = metadata?.preset_topic;
      if (suggestedTopics && suggestedTopics.length > 0) {
        setPresetTopics(suggestedTopics);
      } else {
        setIsSuggestionOn(true);
      }
    }
  }, [chatbotDetail.isSuccess, chatbotDetail.data]);

  const suggestedTopicsQuery = useGetSuggestedTopics(
    {
      chatbot_id: id as string,
    },
    isSuggestionOn,
  );

  const handleChooseSuggestedTopic = (topic: string) => {
    setIsGenerating(true);
    setTopic(topic);
    generateQuiz.mutate({
      chatbot_id: id as string,
      topic,
    });
  };

  return (
    <>
      <title>{KF_TITLE + chatbotDetail.data?.data?.data.name + " - Quiz Generator"}</title>
      <ModalQuizLoading setIsOpen={setIsGenerating} isOpen={isGenerating} />
      <div className="">
        <span className="text-lg font-semibold">
          {chatbotDetail.data?.data?.data.name}
        </span>
        <div className="mt-4 space-x-4 rounded-lg rounded-xl border-2 border-border bg-box p-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={chatbotDetail.data?.data?.data.profile_image as string}
              alt=""
              className="rounded-lg"
              width={100}
              height={100}
            />
            <h1 className="text-xl font-semibold text-primary">
              {chatbotDetail.data?.data?.data.name}
            </h1>
            <p className="text-sm text-body">
              {chatbotDetail.data?.data?.data.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-start justify-between gap-6 space-y-0 rounded-lg rounded-xl border-2 border-border bg-box p-6 max-md:flex-col">
          <div className="flex w-full flex-col space-y-4 md:w-1/2">
            <h2 className="mb-2 text-lg font-semibold text-primary">
              Generate your own Topic
            </h2>
            <textarea
              placeholder="Enter your topic here"
              className="h-32 w-full resize-none rounded-md border border-border bg-transparent p-4"
              value={form?.topic}
              onChange={(e) => handleFormChange("topic", e.target.value)}
            />
            <Button
              className="self-end px-6 py-3"
              onClick={handleSubmit}
              disabled={isGenerating}
            >
              Start Quiz
            </Button>
          </div>
          <div className="flex w-full flex-col space-y-2 md:w-1/2">
            <h2 className="mb-4 text-lg font-semibold text-primary">
              or Suggested for You
            </h2>
            <ul className="space-y-2">
              {isSuggestionOn
                ? suggestedTopicsQuery?.data?.data?.suggested_topics &&
                suggestedTopicsQuery?.data?.data?.suggested_topics.map(
                  (topic: string) => (
                    <li
                      key={topic}
                      className="flex cursor-pointer items-center justify-between rounded border border-border p-4 font-medium text-body hover:bg-secondary"
                      onClick={() => handleChooseSuggestedTopic(topic)}
                    >
                      {topic}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="var(--color-primary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                  ),
                )
                : presetTopics.map((topic: string) => (
                  <li
                    key={topic}
                    className="flex cursor-pointer items-center justify-between rounded border p-4 font-medium text-body hover:bg-secondary"
                    onClick={() => handleChooseSuggestedTopic(topic)}
                  >
                    {topic}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="#141BEB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
