"use client";

import {
  CreateQuizProvider,
  useCreateQuizContext,
} from "./create-quiz-context";
import { ChooseApp } from "./choose-app";
import { QuizForm } from "./create-quiz-form";

const CreateChatbotContent = () => {
  const { step } = useCreateQuizContext();

  return (
    <div className="px-3 py-3 md:px-6 xl:px-16">
      <h1 className="text-lg font-semibold">Create App</h1>
      <div className="mt-2 rounded-3xl border border-border bg-box px-5 py-8 md:px-10">
        {(() => {
          switch (step) {
            case "choose_app":
              return <ChooseApp />;
            case "create_chatbot":
              return null;
            case "create_quiz":
              return <QuizForm />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default function CreateQuiz() {
  return (
    <CreateQuizProvider>
      <CreateChatbotContent />
    </CreateQuizProvider>
  );
}
