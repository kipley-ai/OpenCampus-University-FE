"use client";

import CreateChatbotImg from "@/public/images/create-chatbot.svg";
import CreateQuizImg from "@/public/images/create-quiz.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormNav } from "./form-nav";
import { CHATBOT_APP, QUIZ_APP, VALID_APPS } from "@/utils/constants";
import { useCreateAppContext } from "./create-app-context";
import { useGetPlugin } from "@/hooks/api/quiz";

const apps = [
  {
    name: "Chatbot",
    step: CHATBOT_APP,
    icon: CreateChatbotImg,
  },
  {
    name: "Quiz",
    step: QUIZ_APP,
    icon: CreateQuizImg,
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
    const { plugin_data } = pluginList?.data?.data;
    const pl = plugin_data.filter((plg: any) => plg.title === app);
    setPlugin(pl[0]);
    setChosenApp(app);
  };

  return (
    <>
      <div className="mb-16 flex flex-col gap-8 md:mb-24">
        <h1 className="text-lg font-semibold text-primary">Select App</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {apps.map((app) => (
            <button
              key={app.name}
              className={`flex h-36 flex-col items-center justify-center gap-6 rounded-2xl border-2 bg-container px-4 py-6 text-xl font-medium ${app.step === "" ? "disabled text-secondary-text" : "text-primary"} enabled:hover:bg-secondary ${chosenApp === app.step ? "border-primary" : "border-border"}`}
              onClick={() => handleChosenApp(app.step)}
            >
              {app.step !== "" && <Image src={app.icon} alt={app.name} />}
              <h1>{app.name}</h1>
            </button>
          ))}
        </div>
      </div>
      <FormNav onBack={() => router.back()} onNext={handleCreateApp} />
    </>
  );
}
