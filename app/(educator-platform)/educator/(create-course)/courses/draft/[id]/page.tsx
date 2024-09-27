"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CourseDraft() {
  const [step, setStep] = useState("INTENDED_LEARNERS");
  const router = useRouter();

  return (
    <>
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
            <span className="font-semibold text-heading">Plan your course</span>
            <span className="ml-4 font-semibold text-primary">
              Intended learners
            </span>
            <span className="ml-4 font-medium text-[#6B7280]">
              Landing page
            </span>
            <span className="font-semibold text-heading">
              Create your content
            </span>
            <span className="font-semibold text-heading">
              Publish your course
            </span>
            <span className="font-semibold text-heading">
              Submit for review
            </span>
          </div>
        </div>
        <main className="flex w-3/4 flex-col gap-8 rounded-2xl border-2 border-border bg-sidebar p-3 text-sm md:p-10 xl:mt-4">
          <h1 className="text-lg font-semibold text-primary">
            Intended Learners
          </h1>
          <p className="text-body">
            The following descriptions will be publicly visible on your{" "}
            <span
              className="cursor-pointer text-primary underline hover:text-secondary"
              onClick={() => router.push("/courses")}
            >
              Course Landing Page
            </span>{" "}
            and will have a direct impact on your course performance. These
            descriptions will help learners decide if your course is right for
            them.
          </p>

          <section>
            <h2 className="font-bold text-heading">
              What will students learn in your course?
            </h2>
            <p className="mt-2 text-body">
              You must enter at least 4{" "}
              <span className="text-primary underline">
                learning objectives or outcomes
              </span>{" "}
              that learners can expect to achieve after completing your course.
            </p>
            <div className="relative w-full xl:w-10/12">
              <input
                className="input-text mt-4 w-full font-normal"
                type="text"
                placeholder="Example: Define the roles and responsibilities of a project manager"
              />
              <span className="absolute right-4 top-7 text-xs text-[#6B7280]">
                14
              </span>
            </div>
            <div className="relative w-full xl:w-10/12">
              <input
                className="input-text mt-4 w-full font-normal"
                type="text"
                placeholder="Example: Estimate project timelines and budgets"
              />
              <span className="absolute right-4 top-7 text-xs text-[#6B7280]">
                160
              </span>
            </div>
            <div className="relative w-full xl:w-10/12">
              <input
                className="input-text mt-4 w-full font-normal"
                type="text"
                placeholder="Example: Identify and manage project risks"
              />
              <span className="absolute right-4 top-7 text-xs text-[#6B7280]">
                160
              </span>
            </div>
            <div className="relative w-full xl:w-10/12">
              <input
                className="input-text mt-4 w-full font-normal"
                type="text"
                placeholder="Example: Complete a case study to manage a project from conception to completion"
              />
              <span className="absolute right-4 top-7 text-xs text-[#6B7280]">
                14
              </span>
            </div>
            <button className="mt-6 flex items-center gap-2 font-bold leading-none text-primary hover:text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                fill="none"
                viewBox="0 0 14 15"
              >
                <path
                  fill="currentColor"
                  d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
                />
              </svg>
              Add more
            </button>
          </section>

          <section>
            <h2 className="font-bold text-heading">
              What are the requirements or prerequisites for taking your course?
            </h2>
            <p className="mt-2 text-body">
              List the required skills, experience, tools or equipment learners
              should have prior to taking your course. If there are no
              requirements, use this space as an opportunity to lower the
              barrier for beginners.
            </p>
            <div className="relative w-full xl:w-10/12">
              <input
                className="input-text mt-4 w-full font-normal"
                type="text"
                placeholder="Example: No programming experience needed. You will learn everything you need to know"
              />
            </div>
            <button className="mt-6 flex items-center gap-2 font-bold leading-none text-primary hover:text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                fill="none"
                viewBox="0 0 14 15"
              >
                <path
                  fill="currentColor"
                  d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
                />
              </svg>
              Add more
            </button>
          </section>

          <section>
            <h2 className="font-bold text-heading">Who is this course for?</h2>
            <p className="mt-2 text-body">
              Write a clear description of the{" "}
              <span className="text-primary underline">intended learners</span>{" "}
              for your course who will find your course content valuable. This
              will help you attract the right learners to your course.
            </p>
            <div className="relative w-full xl:w-10/12">
              <input
                className="input-text mt-4 w-full font-normal"
                type="text"
                placeholder="Example: Beginner Python developers curious about data science"
              />
            </div>
            <button className="mb-12 mt-6 flex items-center gap-2 font-bold leading-none text-primary hover:text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                fill="none"
                viewBox="0 0 14 15"
              >
                <path
                  fill="currentColor"
                  d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
                />
              </svg>
              Add more
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
