"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuizContextType {
  step: string;
  topic: string;
  chatbot_id: string;
  chatbot_name: string;
  session_id: string;
  questions: any;
  answer_state: any;
  selected_answer: any;
  total_right: number;
  question_now: number;

  setStep: (step: string) => void;
  setTopic: (topic: string) => void;
  setChatbotId: (id: string) => void;
  setChatbotName: (name: string) => void;
  setSessionId: (id: string) => void;
  setQuestions: (questions: any) => void;
  setAnswerState: (answer: any) => void;
  setSelectedAnswer: (selected: any) => void;
  setTotalRight: (total: any) => void;
  setQuestionNow: (now: number) => void;
  cancel: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState("");
  const [topic, setTopic] = useState("");
  const [chatbot_id, setChatbotId] = useState("");
  const [chatbot_name, setChatbotName] = useState("");
  const [session_id, setSessionId] = useState("");
  const [questions, setQuestions] = useState("");
  const [answer_state, setAnswerState] = useState("");
  const [selected_answer, setSelectedAnswer] = useState("");
  const [total_right, setTotalRight] = useState(0);
  const [question_now, setQuestionNow] = useState(1);

  const cancel = () => {
    setStep("");
    setTopic("");
    setAnswerState("");
    setSelectedAnswer("");
    setTotalRight(0);
    setQuestionNow(1);
  };

  return (
    <QuizContext.Provider
      value={{
        cancel,
        step,
        setStep,
        topic,
        setTopic,
        chatbot_id,
        setChatbotId,
        chatbot_name,
        setChatbotName,
        session_id,
        setSessionId,
        questions,
        setQuestions,
        answer_state,
        setAnswerState,
        total_right,
        setTotalRight,
        question_now,
        setQuestionNow,
        selected_answer,
        setSelectedAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
