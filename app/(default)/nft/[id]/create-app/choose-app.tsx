"use client";

import CreateChatbotImg from "@/public/images/apps/create-chatbot.svg";
import CreateQuizImg from "@/public/images/apps/create-quiz.svg";
import BookSummarizerImg from "@/public/images/apps/book-summarizer.svg";
import DigitalTwinImg from "@/public/images/apps/digital-twin.svg";
import ResearchAssistantImg from "@/public/images/apps/research-assistant.svg";
import TeachingAssistantImg from "@/public/images/apps/teaching-assistant.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormNav } from "@/components/form-nav";
import {
  CHATBOT_APP,
  QUIZ_APP,
  BOOK_SUMMARIZER_APP,
  DIGITAL_TWIN_APP,
  RESEARCH_ASSISTANT_APP,
  TEACHING_ASSISTANT_APP,
  VALID_APPS,
} from "@/utils/constants";
import { useCreateAppContext } from "./create-app-context";
import { useGetPlugin } from "@/hooks/api/quiz_app";

const apps = [
  {
    name: "Study Companion",
    step: CHATBOT_APP,
    icon: CreateChatbotImg,
  },
  {
    name: "Quiz Generator",
    step: QUIZ_APP,
    icon: CreateQuizImg,
  },
  {
    name: "Book Summarizer",
    step: BOOK_SUMMARIZER_APP,
    icon: BookSummarizerImg,
  },
  {
    name: "Digital Twin",
    step: DIGITAL_TWIN_APP,
    icon: DigitalTwinImg,
  },
  {
    name: "Research Assistant",
    step: RESEARCH_ASSISTANT_APP,
    icon: ResearchAssistantImg,
  },
  {
    name: "Teaching Assistant",
    step: TEACHING_ASSISTANT_APP,
    icon: TeachingAssistantImg,
  },
  {
    name: "Coming Soon",
    step: "",
    icon: null,
  },
];

export default function ChooseApp() {
  const [chosenApp, setChosenApp] = useState(CHATBOT_APP);

  const router = useRouter();

  const { setStep, setPlugin } = useCreateAppContext();
  const { data: pluginList, isLoading } = useGetPlugin();
  if (isLoading) return null;

  const handleCreateApp = () => {
    if (chosenApp === "") return;
    if (VALID_APPS.includes(chosenApp)) {
      setStep(chosenApp);
    }
  };

  const handleChosenApp = (app: string) => {
    if (pluginList) {
      const pl = pluginList.filter((plg: any) => plg.title === app);
      //@ts-ignore
      setPlugin(pl[0]);
      setChosenApp(app);
    }
  };

  return (
    <>
      <div className="mb-16 flex flex-col gap-8 md:mb-24">
        <h1 className="text-lg font-semibold text-primary">Select App</h1>
        <div className="grid w-10/12 grid-cols-2 justify-start gap-6 md:grid-cols-3 xl:grid-cols-4">
          {apps.map((app) => (
            <button
              key={app.name}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-container px-8 py-6 text-lg font-medium xs:text-xl ${app.step === "" ? "disabled text-secondary-text" : "text-primary"} enabled:hover:bg-secondary ${chosenApp === app.step ? "border-primary" : "border-border"}`}
              onClick={() => handleChosenApp(app.step)}
            >
              {app.step !== "" && (
                <Image src={app.icon} alt={app.name} className="dark:invert" />
              )}
              <h1>{app.name}</h1>
            </button>
          ))}
        </div>
      </div>
      <FormNav onBack={() => router.back()} onNext={handleCreateApp} />
    </>
  );
}
