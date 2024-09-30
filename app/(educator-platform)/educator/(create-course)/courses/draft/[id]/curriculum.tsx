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
          <div className="absolute bottom-full bg-sidebar right-4 flex items-center gap-4 rounded-t-lg border-x border-t border-border px-4 py-2">
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

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
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
            Why, What, When
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
