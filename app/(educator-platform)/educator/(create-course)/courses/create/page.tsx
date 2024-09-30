"use client";

import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TitleInput } from "./title-input";
import { CategoryInput } from "./category-input";

export default function CreateCoursePage() {
  const [step, setStep] = useState<number>(1);

  const router = useRouter();

  return (
    <div className="relative flex h-dvh flex-1 grow flex-col overflow-y-auto text-heading">
      <title className="sr-only">Create Course</title>
      <Header />
      <main className="flex max-w-[1100px] grow flex-col items-center self-center p-3 md:p-6 xl:w-5/6 xl:pl-8 xl:pr-0 xl:pt-4">
        {(() => {
          switch (step) {
            case 1:
              return <TitleInput />;
            case 2:
              return <CategoryInput />;
            default:
              return null;
          }
        })()}
      </main>
      <footer className="flex items-center justify-between border-t border-border p-3">
        <button
          className="btn-secondary border-heading px-4 py-2 font-bold text-heading enabled:hover:bg-secondary enabled:hover:text-heading"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Back
        </button>
        <button
          className="btn-primary px-4 py-2 font-bold"
          onClick={
            step === 2
              ? () => router.push("/educator/existing")
              : () => setStep(step + 1)
          }
        >
          {step === 2 ? "Create Course" : "Continue"}
        </button>
      </footer>
    </div>
  );
}
