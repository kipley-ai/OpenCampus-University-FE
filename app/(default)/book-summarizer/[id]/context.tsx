"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookContextType {
  step: number;
  setStep: (step: number) => void;
  scope: string;
  setScope: (scope: string) => void;
  topic: string;
  setTopic: (topic: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [scope, setScope] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  return (
    <BookContext.Provider
      value={{
        step,
        setStep,
        scope,
        setScope,
        topic,
        setTopic,
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
