"use client";

import OnboardingProgress from "./onboarding-progress";
import { QuizForm } from "./create-quiz-form";

export default function CreateQuiz() {
  return (
    <div className="flex flex-col px-6 pb-20 pt-6 lg:px-8 xl:px-32">
      <OnboardingProgress step={3} />
      <div className="mt-8 rounded-3xl bg-white px-10 pt-8">
        <QuizForm />
      </div>
    </div>
  );
}
