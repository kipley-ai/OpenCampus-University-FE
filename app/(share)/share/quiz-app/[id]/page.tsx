"use client";

import { useShareQuiz } from "@/hooks/api/quiz_app";
import Image from "next/image";
import Link from "next/link";
import { LoadingSpinner } from "@/components/loading-spinner";
import { OptionCheckMark } from "@/components/quiz-app/option-check-mark";
import { OptionCross } from "@/components/quiz-app/option-cross";

interface SharedQuizProps {
  params: { id: string };
}

interface QuizQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
  explanation: string;
}

export default function SharedQuiz({ params }: SharedQuizProps) {
  const sharedChat = useShareQuiz({ share_id: params?.id });

  // console.log("Shared Chat Data:", sharedChat.data);

  if (sharedChat.isPending) {
    return <LoadingSpinner />;
  }

  if (sharedChat.isError) {
    return <div>Sorry, an error occurred.</div>;
  }

  const sharedDate = new Date(
    sharedChat.data?.data.data?.last_shared_time,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  //For debugging purposes
  // console.log("Shared Chat:", sharedChat.data?.data.data);

  let questions = [];
  if (Array.isArray(sharedChat.data?.data.data?.quiz.questions)) {
    questions = sharedChat.data?.data.data.quiz.questions;
  } else {
    questions = sharedChat.data?.data.data?.quiz.questions.questions;
  }

  const answers = sharedChat.data?.data.data?.answer;

  //For debugging purposes
  // console.log("Questions:", questions);
  // console.log("Answers:", answers);


  return (
    <div className="bg-container text-heading lg:py-16">
      <div className="md:px-auto flex size-full max-w-[1440px] flex-col items-center gap-6 rounded-2xl border border border-2 bg-sidebar lg:mx-auto lg:w-8/12">
        <Link href="/dashboard">
          <Image
            src="/images/dashboard-banner.svg"
            alt="Main Banner"
            className="w-full rounded-t-lg border-b-2 border-border lg:rounded-t-2xl"
            width={1030}
            height={264}
          />
        </Link>
        <div className="flex w-full flex-col gap-8 px-3 pb-16 md:px-10">
          <h1 className="text-center text-2xl font-semibold text-primary">
            {sharedChat.data?.data.data?.chatbot_name}
          </h1>
          <div>
            <h2 className="text-sm font-semibold text-primary">{sharedDate}</h2>
            <hr className="w-full border-t-2 border-border" />
          </div>
          <div className="flex flex-col gap-8 pb-12">
            {questions && answers ? (
              questions.map((question: QuizQuestion, qIndex: number) => (
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
                        ${option === answers[qIndex] ? (question.answer === option ? "bg-[#ECECFF] dark:bg-transparent dark:border font-medium" : "bg-[#FDE2E1] dark:bg-transparent dark:border font-medium") : "border border-gray-300"}
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
                        {question[option as keyof QuizQuestion]}
                      </label>
                    ))}
                    {question.answer === answers[qIndex] ? null : (
                      <p className="text-sm text-primary">
                        Correct Answer: {question[question.answer as keyof QuizQuestion]}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-medium">
                <p>This share link is invalid or the quiz data is missing.</p>
                <p>Please update the link and try again.</p>
              </div>
            )}
          </div>
          <Link href="/dashboard" className="self-center">
            <button type="button" className="btn-primary px-5 py-2 text-lg">
              Start to explore Open Campus U!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
