"use client";

import { useState } from "react";
import {
  CreateChatbotProvider,
  useCreateChatbotContext,
} from "./create-chatbot-context";
import { ChooseApp } from "./choose-app";
import { FormNav } from "./form-nav";
import { ChatBotForm } from "./create-chatbot-form";

const CreateChatbotContent = () => {
  const { step } = useCreateChatbotContext();

  return (
    <div className="px-3 py-3 md:px-6 xl:px-16">
      <h1 className="text-lg font-semibold">Create App</h1>
      <div className="mt-2 rounded-3xl border border-border bg-box px-10 py-8">
        {(() => {
          switch (step) {
            case "choose_app":
              return <ChooseApp />;
            case "create_chatbot":
              return <ChatBotForm />;
            case "create_quiz":
              return null;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default function CreateChatbot() {
  return (
    <CreateChatbotProvider>
      <CreateChatbotContent />
    </CreateChatbotProvider>
  );
}
