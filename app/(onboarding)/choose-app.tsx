import OnboardingProgress from "./onboarding-progress";
import CreateChatbotImg from "@/public/images/create-chatbot.svg";
import CreateQuizImg from "@/public/images/create-quiz.svg";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useState } from "react";

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

const validApps = ["create_chatbot"];

export function ChooseApp() {
  const [chosenApp, setChosenApp] = useState("create_chatbot");
  const { setStep } = useCreateChatbotContext();

  const handleCreateApp = () => {
    if (chosenApp === "") return;
    if (validApps.includes(chosenApp)) {
      setStep(chosenApp);
    }
  };

  return (
    <div className="flex flex-col px-6 pb-20 lg:px-8 xl:px-32">
      <OnboardingProgress step={3} />
      <div className="mt-8 rounded-3xl bg-box px-10 py-8">
        <h1 className="mb-8 text-2xl font-semibold text-primary">Select App</h1>
        <div className="grid grid-cols-6 gap-4">
          {apps.map((app) => (
            <button
              className={`flex flex-col items-center justify-center gap-4 rounded-2xl bg-container py-6 text-primary ${chosenApp === app.step ? "border-2 border-primary" : ""}`}
              onClick={() => setChosenApp(app.step)}
            >
              {app.step !== "" && <Image src={app.icon} alt={app.name} />}
              <h1>{app.name}</h1>
            </button>
          ))}
        </div>
        <div className="my-8 mt-28 flex items-center justify-between border-t-2 pt-4">
          <button className="flex items-center justify-center gap-2">
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 2.29965L6 0.889648L0 6.88965L6 12.8896L7.41 11.4796L2.83 6.88965L7.41 2.29965Z"
                fill="#141BEB"
              />
            </svg>

            <p>Back</p>
          </button>
          <button
            className="flex items-center justify-center gap-2"
            onClick={handleCreateApp}
          >
            <p>Next</p>
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 0.889648L0.589996 2.29965L5.17 6.88965L0.589996 11.4796L2 12.8896L8 6.88965L2 0.889648Z"
                fill="#141BEB"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
