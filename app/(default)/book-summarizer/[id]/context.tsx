"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
