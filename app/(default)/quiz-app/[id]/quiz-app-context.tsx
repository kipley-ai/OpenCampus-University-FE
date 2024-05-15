"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
    step: string;
    topic: string;
    chatbot_id: string;
    setStep: (step: string) => void;
    setTopic: (topic: string) => void;
    setChatbotId: (id: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [step, setStep] = useState('');
    const [topic, setTopic] = useState('');
    const [chatbot_id, setChatbotId] = useState('');

    return (
        <QuizContext.Provider value={{ step, setStep, topic, setTopic, chatbot_id, setChatbotId }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
