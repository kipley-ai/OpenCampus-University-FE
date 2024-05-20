"use client";

import TestImage from "components/quiz-app/product img.png";

import React, { useEffect, useState } from "react";
import { useQuiz } from "../[id]/quiz-app-context";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useGenerateQuizAPI, useGetQuiz } from "@/hooks/api/quiz_app";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/router";
import ModalQuizLoading from "@/components/modal-quiz-loading";
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

  useEffect(() => {
    const f = async () => {
      while (true) {
        const { data: quizData } = await quizRefetch();
        if (quizData?.data.status === "success") {
          setQuestions(quizData?.data!);
          setStep("question");
          break;
        }
        await delay(3000);
      }
    };

    if (isGenerating) {
      f();
    }
  }, [isGenerating]);

  if (chatbotDetail.isLoading) {
    return <div>Loading...</div>;
  }

  let metadata = JSON.parse(chatbotDetail.data?.data?.data.meta_data || "{}");
  let presetTopics = metadata?.preset_topic || [];

  const handleChooseSuggestedTopic = (topic: string) => {
    setIsGenerating(true);
    generateQuiz.mutate({
      chatbot_id: id as string,
      topic,
    });
  };

  return (
    <>
      <ModalQuizLoading setIsOpen={setIsGenerating} isOpen={isGenerating} />
      <div className="w-full">
        <div className="ml-4 mt-2">
          <span className="text-2xl font-bold">Quiz App</span>
        </div>
        <div className="mt-2 space-x-4 rounded-lg p-6 shadow-md">
          <div className="flex flex-col items-center">
            <Image
              src={chatbotDetail.data?.data?.data.profile_image as string}
              alt=""
              width={100}
              height={100}
            />
            <h1 className="text-2xl font-bold text-blue-600">
              {chatbotDetail.data?.data?.data.name}
            </h1>
            <p className="text-sm">
              {chatbotDetail.data?.data?.data.description}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-row items-start justify-between space-x-6 space-y-0 rounded-lg p-6 shadow-md">
          <div className="flex w-2/3 flex-col space-y-4">
            <h2 className="mb-2 text-lg font-semibold text-blue-600">
              Generate your own Topic
            </h2>
            <textarea
              placeholder="Enter your topic here"
              className="h-32 w-full resize-none rounded border border-gray-300 p-4"
              value={form?.topic}
              onChange={(e) => handleFormChange("topic", e.target.value)}
            />
            <button
              className="mt-4 self-end rounded-xl bg-[#141BEB] px-4 py-3 text-white disabled:border-0 disabled:bg-[#B8BABE] disabled:text-[#909295]"
              onClick={handleSubmit}
              disabled={isGenerating}
            >
              Start Quiz
            </button>
          </div>
          <div className="flex w-1/3 flex-col space-y-2">
            <h2 className="mb-4 text-lg font-semibold text-blue-600">
              or Suggest for You
            </h2>
            <ul className="space-y-2">
              {presetTopics.map((topic: string) => (
                <li
                  key={topic}
                  className="flex cursor-pointer items-center justify-between rounded border p-4"
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

// function Header() {
//     return (
//         <div className="mx-4 mt-2 rounded-lg shadow-md p-6 space-x-4">
//             <div className="flex flex-col items-center">
//                 <Image src={TestImage} alt="" />
//                 <h1 className="text-2xl font-bold text-blue-600">Tech Innovations Quiz</h1>
//                 <p className="text-sm">
//                     Any time is a good time for a quiz and even better if
//                 </p>
//                 <p className="text-sm">
//                     that happens to be a tech innovations quiz!
//                 </p>
//             </div>
//         </div>
//     )
// }

// function QuizForm() {
//     const { id } = useParams();
//     const generateQuiz = useGenerateQuizAPI();

//     const [step, setStep] = useState("cover");

//     const [form, setForm] = useState<Form>({
//         topic: "",
//     });

//     const handleFormChange = (name: string, value: string) => {
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (event: any) => {
//         event.preventDefault();
//         generateQuiz.mutate(
//             {
//                 chatbot_id: id as string,
//                 topic: form.topic as string,
//             },
//             {
//                 async onSuccess() {
//                     console.log("Successfully created quiz!");
//                     console.log("Detail of Quiz App:", form);
//                     setStep("question");
//                 }
//             },
//         );
//     };

//     // console.log("Form content:", form); // For debugging purpose

//     return (
//         <div className="mx-4 mt-2 flex flex-row justify-between items-start space-y-0 space-x-6 p-6 rounded-lg shadow-md">
//             <div className="flex flex-col w-2/3 space-y-4">
//                 <h2 className="font-semibold text-lg mb-2 text-blue-600">Generate your own Topic</h2>
//                 <textarea
//                     placeholder="Enter your topic here"
//                     className="border border-gray-300 p-4 rounded w-full h-32 resize-none"
//                     value={form?.topic}
//                     onChange={(e) => handleFormChange("topic", e.target.value)}
//                 />
//                 <button
//                     className="mt-4 bg-[#141BEB] text-white py-3 px-4 rounded-xl self-end"
//                     onClick={handleSubmit}
//                 >
//                     Start Quiz
//                 </button>
//             </div>
//             <div className="flex flex-col w-1/3 space-y-2">
//                 <h2 className="font-semibold text-lg mb-4 text-blue-600">or Suggest for You</h2>
//                 <ul className="space-y-2">
//                     <li className="border rounded p-4 flex justify-between items-center cursor-pointer">
//                         Biology Brain Teasers
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9 18L15 12L9 6" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </li>
//                     <li className="border rounded p-4 flex justify-between items-center cursor-pointer">
//                         Biology Brain Teasers
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9 18L15 12L9 6" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </li>
//                     <li className="border rounded p-4 flex justify-between items-center cursor-pointer">
//                         Biology Brain Teasers
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9 18L15 12L9 6" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }
