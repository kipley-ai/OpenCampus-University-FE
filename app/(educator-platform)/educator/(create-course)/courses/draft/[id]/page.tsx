"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KF_TITLE } from "@/utils/constants";
import { IntendedLearners } from "./intended-learners";

export default function CourseDraft() {
  const [step, setStep] = useState("INTENDED_LEARNERS");
  const router = useRouter();

  return (
    <>
      <title>{KF_TITLE + "Course Draft - " + "Learn Java from Scratch"}</title>
      <div className="flex h-12 w-full items-center justify-between bg-primary px-8 text-sidebar shadow-lg">
        <div className="flex items-center gap-12">
          <button
            className="flex items-center gap-3 text-sidebar hover:text-secondary"
            onClick={() => router.push("/educator/existing")}
          >
            <svg
              width="8"
              height="13"
              viewBox="0 1 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 2.29965L6 0.889648L0 6.88965L6 12.8896L7.41 11.4796L2.83 6.88965L7.41 2.29965Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <div className="flex items-center items-center gap-4">
            <h1 className="font-bold">Learn Java from Scratch</h1>
            <span className="bg-[#6B7280] px-2 py-1 text-xs font-semibold uppercase text-white">
              Draft
            </span>
          </div>
        </div>
        <button className="rounded-lg bg-sidebar px-6 py-1 text-primary hover:bg-secondary">
          <span className="text-sm font-bold">Save</span>
        </button>
      </div>
      <div className="flex max-w-[1300px] items-start gap-16 bg-container px-8 py-8">
        <div className="mt-8 flex w-fit items-center gap-4">
          <div className="flex flex-col items-center justify-start gap-4 rounded-full bg-primary-light p-1 text-white">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary text-sidebar">
              1
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              fill="none"
              viewBox="-2 -2 6 6"
              className="size-6"
            >
              <rect width="2" height="2" fill="var(--color-primary)" rx="1" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              fill="none"
              viewBox="-2 -2 6 6"
              className="size-6"
            >
              <rect width="2" height="2" fill="var(--color-primary)" rx="1" />
            </svg>

            <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280]">
              2
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280]">
              3
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280]">
              4
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-4">
            <button className="font-semibold text-heading">
              Plan your course
            </button>
            <button
              onClick={() => setStep("INTENDED_LEARNERS")}
              disabled={step === "INTENDED_LEARNERS"}
              className={`ml-4 ${step === "INTENDED_LEARNERS" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
            >
              Intended learners
            </button>
            <button
              onClick={() => setStep("LANDING_PAGE")}
              disabled={step === "LANDING_PAGE"}
              className={`ml-4 ${step === "LANDING_PAGE" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
            >
              Landing page
            </button>
            <button className="font-semibold text-heading">
              Create your content
            </button>
            <button className="font-semibold text-heading">
              Publish your course
            </button>
            <button className="font-semibold text-heading">
              Submit for review
            </button>
          </div>
        </div>
        {(() => {
          switch (step) {
            case "INTENDED_LEARNERS":
              return <IntendedLearners />;
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
}
