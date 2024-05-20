import OnboardingProgress from "./onboarding-progress";
import CreateChatbotImg from "@/public/images/create-chatbot.svg";
import CreateQuizImg from "@/public/images/create-quiz.svg";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useState } from "react";
import { FormNav } from "@/components/form-nav";
import { useGetPlugin } from "@/hooks/api/quiz_app";

const apps = [
  {
    name: "Chatbot",
    step: "create_chatbot",
    icon: CreateChatbotImg,
  },
  {
    name: "Quiz",
    step: "create_quiz",
    icon: CreateQuizImg,
  },
  {
    name: "Coming Soon",
    step: "",
    icon: null,
  },
];

const validApps = ["create_chatbot", "create_quiz"];

export function ChooseApp() {
  const [chosenApp, setChosenApp] = useState("create_chatbot");
  const { setStep, setPlugin } = useCreateChatbotContext();
  const { data: pluginList, isLoading } = useGetPlugin();
  if (isLoading) return null;

  const handleCreateApp = () => {
    if (chosenApp === "") return;
    if (validApps.includes(chosenApp)) {
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
    <div className="flex flex-col px-6 pb-20 lg:px-8 xl:px-32">
      <OnboardingProgress step={3} />
      <div className="mt-8 flex flex-col gap-8 rounded-3xl bg-box px-10 py-8">
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
        <FormNav onNext={handleCreateApp} />
      </div>
    </div>
  );
}
