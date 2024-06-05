"use client";

import React, { useState, useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import QuizSetting from "./quiz-setting";

import { useRouter } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";
import { KF_TITLE } from "@/utils/constants";

const EditQuiz = () => {
  const { setHeaderTitle } = useAppProvider();
  const title = "Edit Quiz";

  useEffect(() => {
    setHeaderTitle(title);
    document.title = KF_TITLE + title;
    return () => setHeaderTitle("Default Title");
  }, [setHeaderTitle, title]);

  return (
    <div className="h-full flex-col px-4 md:flex-row md:pl-10 justify-start bg-container md:w-5/6">
      <h1 className="text-heading text-lg font-semibold py-3">Quiz Details</h1>
      <div className="flex flex-col px-6 py-9 pb-0 lg:px-8 xl:px-14 bg-sidebar border border-[#DDDDEB] rounded-2xl">
        <QuizSetting />
      </div>
    </div>
  )
}

export default EditQuiz;