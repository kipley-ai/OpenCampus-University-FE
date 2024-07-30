import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useSummarize } from "@/hooks/api/book-summarizer";
import { useCreditDeduction } from "@/hooks/api/credit";
import { useCreditBalance } from "@/hooks/api/credit";
import { FormNav } from "@/components/form-nav";
import { useAppProvider } from "@/providers/app-provider";
import { ModalGenerating } from "./modal-generating";
import { useBookContext } from "./context";

export function Settings() {
  const {
    step,
    setStep,
    app,
    setApp,
    scope,
    setScope,
    topic,
    setTopic,
    setResultId,
    sendValidatedMessage,
  } = useBookContext();
  const { session } = useAppProvider();

  const [isGenerating, setIsGenerating] = useState(false);

  const summarize = useSummarize();

  const summarizeWholeBook = () => {
    setScope("whole-book");
    setStep(step + 1);
    sendValidatedMessage({
      chatbot_id: app.chatbot_id,
      kb_id: app.kb_id,
      user_id: session.address,
      type_summarize: "whole-book",
    });
    // setIsGenerating(true);
    // summarize.mutate(
    //   {
    //     chatbot_id: app.chatbot_id,
    //     kb_id: app.kb_id,
    //     type_summarize: "whole-book",
    //   },
    //   {
    //     onSuccess: (data) => {
    //       setTimeout(() => {
    //         setIsGenerating(false);
    //         setResultId(data.data.dialog_id);
    //         setStep(step + 1);
    //       }, 5000);
    //     },
    //   },
    // );
  };

  const summarizeTopic = () => {
    setScope("topic");
    setStep(step + 1);
    sendValidatedMessage({
      chatbot_id: app.chatbot_id,
      kb_id: app.kb_id,
      user_id: session.address,
      type_summarize: "topic",
      topic,
    });
    // setIsGenerating(true);
    // summarize.mutate(
    //   {
    //     chatbot_id: app.chatbot_id,
    //     kb_id: app.kb_id,
    //     type_summarize: "topic",
    //     topic,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       setTimeout(() => {
    //         setIsGenerating(false);
    //         setResultId(data.data.dialog_id);
    //         setStep(step + 1);
    //       }, 5000);
    //     },
    //   },
    // );
  };

  return (
    <>
      <ModalGenerating isOpen={isGenerating} setIsOpen={setIsGenerating} />
      <h1 className="text-lg font-semibold">Book Summarizer | {app.name}</h1>
      <div className="mt-4 flex flex-col rounded-lg rounded-xl border-2 border-border bg-box px-10 py-8">
        <h2 className="mb-8 text-lg font-semibold text-primary">
          Choose what you want to summarize
        </h2>
        <div className="flex items-center justify-between border-b-2 border-border py-4">
          <h3 className="font-medium">Summarize the whole book</h3>
          <button
            className="btn-primary px-4 py-2"
            onClick={() => summarizeWholeBook()}
          >
            Summarize
          </button>
        </div>
        <div className="mb-12 flex items-end justify-between py-4">
          <div className="flex w-3/5 flex-col items-start gap-2">
            <h3 className="font-medium">Summarize your preferred topics</h3>
            <textarea
              placeholder="Enter your topic here"
              className="h-32 w-full resize-none rounded-md border border-gray-300 bg-container p-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button
            className="btn-primary px-4 py-2"
            onClick={() => summarizeTopic()}
            disabled={!topic}
          >
            Summarize
          </button>
        </div>
        <FormNav
          onBack={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          backText="Cancel"
          hideNext
        />
      </div>
    </>
  );
}
