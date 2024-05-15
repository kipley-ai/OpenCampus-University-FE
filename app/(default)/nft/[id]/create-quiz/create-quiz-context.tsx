"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";

interface CreateQuizContextProps {
  createQuiz: any;
  handleChangeQuiz: any;
}

const CreateQuizContext = createContext<CreateQuizContextProps | undefined>(
  undefined,
);

export const CreateQuizProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [createQuiz, setCreateQuiz] = useState({
    type: "",
    kb_data: [],
    username: "",
  });

  const handleChangeQuiz = (name: string, value: any) => {
    setCreateQuiz((prevData: any) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <CreateQuizContext.Provider
      value={{
        createQuiz,
        handleChangeQuiz,
      }}
    >
      {children}
    </CreateQuizContext.Provider>
  );
};

export const useCreateQuizContext = () => {
  const context = useContext(CreateQuizContext);
  if (!context) {
    throw new Error(
      "useCreateQuizContext must be used within a CreateQuizProvider",
    );
  }
  return context;
};
