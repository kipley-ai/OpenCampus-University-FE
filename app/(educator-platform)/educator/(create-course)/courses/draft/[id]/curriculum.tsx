"use client";

import { useState } from "react";

interface LessonProps {
  number: number;
  title: string;
}

const Lesson = ({ number, title }: LessonProps) => {
  const [isNewContentExpanded, setIsNewContentExpanded] = useState(false);

  return (
    <>
      <div
        className={`relative mt-4 flex items-center justify-between rounded-t-lg ${isNewContentExpanded ? "" : "rounded-b-lg"} border border-border bg-sidebar p-4`}
      >
        <h3 className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
            className="mb-1 mr-2 inline"
          >
            <path
              fill="#111827"
              d="M7 .323A6.67 6.67 0 0 0 .335 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm-1.333 10L2.782 7.438l.94-.94 1.945 1.939L9.89 4.215l.94.946-5.162 5.162Z"
            />
          </svg>
          Lesson {number}:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="14"
            fill="none"
            viewBox="0 0 12 14"
            className="mb-1 ml-3 mr-2 inline"
          >
            <path
              fill="#111827"
              d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
            />
          </svg>
          {title}
        </h3>
        {!isNewContentExpanded && (
          <button
            onClick={() => setIsNewContentExpanded(!isNewContentExpanded)}
            className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary"
          >
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
            <span className="font-bold">Content</span>
          </button>
        )}
      </div>
      {isNewContentExpanded && (
        <div className="relative z-20 flex w-full flex-col items-center gap-4 rounded-b-lg border-x border-b border-border bg-sidebar px-4 py-2">
          <div className="absolute bottom-full right-4 flex items-center gap-4 rounded-t-lg border-x border-t border-border bg-sidebar px-4 py-2">
            <span className="text-xs font-semibold">Select content type</span>
            <button
              onClick={() => setIsNewContentExpanded(false)}
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="12"
                fill="none"
                viewBox="0 0 13 12"
              >
                <path
                  fill="currentColor"
                  d="M12.385 1.241 11.21.066 6.552 4.725 1.894.066.719 1.241 5.377 5.9.72 10.558l1.175 1.175 4.658-4.658 4.658 4.658 1.175-1.175L7.727 5.9l4.658-4.659Z"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs">
            Select the main type of content. Files and links can be added as
            resources.{" "}
            <span className="cursor-pointer text-primary underline hover:text-secondary">
              Learn more about content types.
            </span>
          </p>
          <div className="flex items-center gap-8">
            <button className="group flex w-20 flex-col items-center justify-between gap-2 rounded-lg border border-border bg-container pt-2 hover:bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="27"
                fill="none"
                viewBox="0 0 28 27"
              >
                <path
                  fill="#D1D7DC"
                  d="M.666 13.6c0 7.367 5.967 13.333 13.333 13.333 7.367 0 13.334-5.966 13.334-13.333S21.366.267 13.999.267C6.633.267.666 6.233.666 13.6Zm20 .152L9.999 18.933V8.267l10.667 5.485Z"
                />
              </svg>
              <div className="w-full rounded-b-lg bg-primary-light text-[0.6rem] text-primary group-hover:bg-primary group-hover:text-sidebar">
                Video
              </div>
            </button>
            <button className="group flex w-20 flex-col items-center justify-between gap-2 rounded-lg border border-border bg-container pt-2 hover:bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                fill="none"
                viewBox="0 0 24 25"
              >
                <path
                  fill="#D1D7DC"
                  d="M9.333 7.267v10.666L16 12.6 9.333 7.267Zm12-6.667H2.667A2.675 2.675 0 0 0 0 3.267v18.666C0 23.4 1.2 24.6 2.667 24.6h18.666C22.8 24.6 24 23.4 24 21.933V3.267C24 1.8 22.8.6 21.333.6Zm0 21.333H2.667V3.267h18.666v18.666Z"
                />
              </svg>
              <div className="w-full rounded-b-lg bg-primary-light text-[0.6rem] text-primary group-hover:bg-primary group-hover:text-sidebar">
                Video & Slide
              </div>
            </button>
            <button className="group flex w-20 flex-col items-center justify-between gap-2 rounded-lg border border-border bg-container pt-2 hover:bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="27"
                fill="none"
                viewBox="0 0 22 27"
              >
                <path
                  fill="#D1D7DC"
                  d="M13.667.267H3.001A2.663 2.663 0 0 0 .347 2.933L.334 24.267a2.663 2.663 0 0 0 2.653 2.666h16.014c1.466 0 2.666-1.2 2.666-2.666v-16l-8-8Zm-10.666 24V2.933h9.333V9.6h6.667v14.667H3Z"
                />
              </svg>
              <div className="w-full rounded-b-lg bg-primary-light text-[0.6rem] text-primary group-hover:bg-primary group-hover:text-sidebar">
                Article
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Quiz = ({ number, title }: LessonProps) => {
  const [step, setStep] = useState<string>("DEFAULT");

  return (
    <>
      <div
        className={`relative mt-4 flex items-center justify-between rounded-t-lg ${step === "DEFAULT" ? "rounded-b-lg" : ""} border border-border bg-sidebar p-4`}
      >
        <h3 className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
            className="mb-1 mr-2 inline"
          >
            <path
              fill="#111827"
              d="M7 .323A6.67 6.67 0 0 0 .335 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm-1.333 10L2.782 7.438l.94-.94 1.945 1.939L9.89 4.215l.94.946-5.162 5.162Z"
            />
          </svg>
          Quiz 1:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 14 14"
            className="mb-1 ml-3 mr-2 inline"
          >
            <path
              fill="#111827"
              d="M6.334 10.99h1.333V9.657H6.334v1.333ZM7.001.323A6.67 6.67 0 0 0 .334 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm0 12A5.34 5.34 0 0 1 1.667 6.99a5.34 5.34 0 0 1 5.334-5.333 5.34 5.34 0 0 1 5.333 5.333 5.34 5.34 0 0 1-5.333 5.333ZM7 2.99a2.666 2.666 0 0 0-2.667 2.667h1.333c0-.734.6-1.334 1.334-1.334.733 0 1.333.6 1.333 1.334 0 1.333-2 1.166-2 3.333h1.333c0-1.5 2-1.667 2-3.333A2.666 2.666 0 0 0 7.001 2.99Z"
            />
          </svg>
          {title}
        </h3>
        {step === "DEFAULT" && (
          <button
            onClick={() => setStep("SELECT_QUESTION_TYPE")}
            className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary"
          >
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
            <span className="font-bold">Question</span>
          </button>
        )}
      </div>
      {step !== "DEFAULT" && (
        <div className="relative z-20 w-full rounded-b-lg border-x border-b border-border bg-sidebar px-4 py-2">
          <div className="absolute bottom-full right-4 flex items-center gap-4 rounded-t-lg border-x border-t border-border bg-sidebar px-4 py-2">
            <span className="text-xs font-semibold">Select question type</span>
            <button
              onClick={() => setStep("DEFAULT")}
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="12"
                fill="none"
                viewBox="0 0 13 12"
              >
                <path
                  fill="currentColor"
                  d="M12.385 1.241 11.21.066 6.552 4.725 1.894.066.719 1.241 5.377 5.9.72 10.558l1.175 1.175 4.658-4.658 4.658 4.658 1.175-1.175L7.727 5.9l4.658-4.659Z"
                />
              </svg>
            </button>
          </div>
          {(() => {
            switch (step) {
              case "SELECT_QUESTION_TYPE":
                return (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-xs">
                      Select the main type of content. Files and links can be
                      added as resources.{" "}
                      <span className="cursor-pointer text-primary underline hover:text-secondary">
                        Learn more about content types.
                      </span>
                    </p>
                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => setStep("MULTIPLE_CHOICE")}
                        className="group flex w-24 flex-col items-center justify-between gap-2 rounded-lg border border-border bg-container pt-2 hover:bg-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="#D1D7DC"
                          viewBox="-2 0 18 18"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                        </svg>
                        <div className="w-full rounded-b-lg bg-primary-light text-[0.6rem] text-primary group-hover:bg-primary group-hover:text-sidebar">
                          Multiple Choice
                        </div>
                      </button>
                    </div>
                  </div>
                );
              case "MULTIPLE_CHOICE":
                return (
                  <div className="flex flex-col">
                    <h3 className="font-semibold">Question</h3>
                    <div className="relative mt-2 w-full">
                      <div className="flex flex-col rounded-lg border border-border">
                        <div className="flex items-center gap-8 border-b-2 border-border px-3 py-2 text-heading">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="13"
                            fill="none"
                            viewBox="0 0 10 13"
                          >
                            <path
                              fill="currentColor"
                              d="M8 6.425C8.81 5.867 9.377 4.95 9.377 4.1c0-1.883-1.459-3.333-3.334-3.333H.834v11.666h5.867c1.741 0 3.091-1.416 3.091-3.158 0-1.267-.716-2.35-1.791-2.85ZM3.335 2.85h2.5c.692 0 1.25.558 1.25 1.25s-.558 1.25-1.25 1.25h-2.5v-2.5Zm2.917 7.5H3.334v-2.5h2.917c.691 0 1.25.558 1.25 1.25s-.559 1.25-1.25 1.25Z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="13"
                            fill="none"
                            viewBox="0 0 10 13"
                          >
                            <path
                              fill="currentColor"
                              d="M3.333.767v2.5h1.842l-2.85 6.666H0v2.5h6.667v-2.5H4.825l2.85-6.666H10v-2.5H3.333Z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill="currentColor"
                              d="M15.5 14.033V2.367C15.5 1.45 14.75.7 13.833.7H2.167C1.25.7.5 1.45.5 2.367v11.666c0 .917.75 1.667 1.667 1.667h11.666c.917 0 1.667-.75 1.667-1.667ZM5.083 9.45l2.084 2.508L10.083 8.2l3.75 5H2.167l2.916-3.75Z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="11"
                            fill="none"
                            viewBox="0 0 18 11"
                          >
                            <path
                              fill="currentColor"
                              d="M6.833 9.033 2.999 5.2l3.834-3.833L5.666.2l-5 5 5 5 1.167-1.167Zm4.333 0L14.999 5.2l-3.833-3.833L12.333.2l5 5-5 5-1.167-1.167Z"
                            />
                          </svg>
                        </div>
                        <textarea
                          className="size-full rounded-b-lg border-none px-3 text-sm"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <h3 className="mt-4 font-semibold">Answers</h3>
                    {[...Array(3)].map((e, i) => (
                      <div key={i} className="mt-2 flex items-start gap-4">
                        <input
                          type="radio"
                          name="answer"
                          id={`answer-${i}`}
                          className="mr-2"
                        />
                        <div className="flex w-full flex-col gap-2 xl:w-10/12">
                          <textarea
                            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                            placeholder="Add an answer."
                            rows={2}
                          />
                          <input
                            type="text"
                            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                            placeholder="Explain why this is or isn't the best answer."
                          />
                        </div>
                      </div>
                    ))}
                    <p className="mt-2 text-xs text-body">
                      Write up to 15 possible answers and indicate which one is
                      the best.
                    </p>

                    <h3 className="mt-4 font-semibold">Related Lecture</h3>
                    <select className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm">
                      <option value="">-- Select One --</option>
                      <option value="1">Lesson 1: The Basic</option>
                      <option value="2">Lesson 2: dsds</option>
                    </select>
                    <p className="mt-2 text-xs text-body">
                      Select a related video lecture to help students answer
                      this question.
                    </p>

                    <button
                      onClick={() => setStep("DEFAULT")}
                      className="btn-primary my-4 self-end px-6"
                    >
                      Save
                    </button>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      )}
    </>
  );
};

export const Curriculum = () => {
  return (
    <div className="text-sm">
      <h1 className="text-lg font-semibold text-primary">Curriculum</h1>

      <p className="mt-4 text-body">
        Start putting together your course by creating sections, lectures and
        practice activities (<span className="underline">quizzes</span>,{" "}
        <span className="underline">coding exercises</span> and{" "}
        <span className="underline">assignments</span>). Use your{" "}
        <span className="underline">course outline</span> to structure your
        content and label your sections and lectures clearly. If you&#39;re
        intending to offer your course for free, the total length of video
        content must be less than 2 hours.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-container p-6 text-heading">
        <h2>
          <span className="font-bold text-heading">Section 1: </span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="14"
            fill="none"
            viewBox="0 0 12 14"
            className="mx-2 mb-1 inline"
          >
            <path
              fill="#111827"
              d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
            />
          </svg>
          Introduction
        </h2>

        <Lesson number={1} title="The Basic" />

        <Quiz number={1} title="Why, What, When" />

        <Lesson number={2} title="dsds" />

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
          <h3 className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              fill="none"
              viewBox="0 0 16 14"
              className="mb-1 mr-2 inline"
            >
              <path
                fill="#F69C08"
                d="M.666 13.29h14.667L7.999.623.666 13.29Zm8-2H7.333V9.957h1.333v1.333Zm0-2.667H7.333V5.29h1.333v3.333Z"
              />
            </svg>
            Unpublished Assignment:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              fill="none"
              viewBox="0 0 12 14"
              className="mb-1 ml-3 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
              />
            </svg>
            test.pdf
          </h3>
          <button className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary">
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
            <span className="font-bold">Content</span>
          </button>
        </div>

        <button className="mb-8 mt-4 flex w-fit items-center gap-2 rounded-lg border border-border bg-sidebar px-4 py-2 text-primary hover:bg-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
          </svg>
          <span className="font-bold">Curriculum item</span>
        </button>
      </div>

      <button className="mb-12 mt-4 flex w-fit items-center gap-2 rounded-lg border border-border bg-container px-12 py-2 text-primary hover:bg-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          fill="none"
          viewBox="0 0 14 15"
        >
          <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
        </svg>
        <span className="font-bold">Section</span>
      </button>
    </div>
  );
};
