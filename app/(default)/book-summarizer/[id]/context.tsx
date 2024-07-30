"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useChatboxWS } from "@/hooks/api/book-summarizer";

interface BookContextType {
  step: number;
  setStep: (step: number) => void;
  app: any;
  setApp: (app: any) => void;
  scope: string;
  setScope: (scope: string) => void;
  topic: string;
  setTopic: (topic: string) => void;
  resultId: string;
  setResultId: (resultId: string) => void;

  lastJsonMessage: any;
  readyState: any;
  sendValidatedMessage: (message: any) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [app, setApp] = useState<any>(null);
  const [scope, setScope] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [resultId, setResultId] = useState<string>("");

  const { lastJsonMessage, readyState, sendValidatedMessage } = useChatboxWS(
    `${process.env.NEXT_PUBLIC_APPS_WS}/book-summarizer/websocket`,
  );

  return (
    <BookContext.Provider
      value={{
        step,
        setStep,
        app,
        setApp,
        scope,
        setScope,
        topic,
        setTopic,
        resultId,
        setResultId,

        lastJsonMessage,
        readyState,
        sendValidatedMessage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a BookProvider");
  }
  return context;
};
