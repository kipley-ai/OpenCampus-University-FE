import CreateChatbotImg from "@/public/images/create-chatbot.svg";
import CreateQuizImg from "@/public/images/create-quiz.svg";
import Image from "next/image";
import { useCreateQuizContext } from "./create-quiz-context";
import { useState } from "react";
import { FormNav } from "./form-nav";

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

const validApps = ["create_quiz"];

export function ChooseApp() {
  const [chosenApp, setChosenApp] = useState("create_quiz");
  const { setStep } = useCreateQuizContext();

  const handleCreateApp = () => {
    if (chosenApp === "") return;
    if (validApps.includes(chosenApp)) {
      setStep(chosenApp);
    }
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
              onClick={() => setChosenApp(app.step)}
            >
              {app.step !== "" && <Image src={app.icon} alt={app.name} />}
              <h1>{app.name}</h1>
            </button>
          ))}
        </div>
      </div>
      <FormNav onNext={handleCreateApp} />
    </>
  );
}
