"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CreateCourse, CreateKnowledgeKey, BuildAiApp } from "../educator/page";

import BuildAiIcon from "@/public/images/educators/build-ai-app.svg";
import CreateCourseIcon from "@/public/images/educators/create-course.svg";
import CreateKnowledgeKeyImage from "@/public/images/educators/create-knowledgekey.svg";
import Faq from "@/public/images/educators/faq.svg";
import HelpSupport from "@/public/images/educators/help-support.svg";
import CoursesIcon from "@/public/images/educators/courses.svg";

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const width = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full bg-[#393E44]">
      <div
        className="bg-primary p-1 text-center text-xs font-medium leading-none text-blue-100"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const Courses = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex cursor-pointer flex-row gap-4 rounded-2xl border border-border">
        <Image src={CoursesIcon} alt="Courses" />
        <div className="flex w-full flex-col justify-between p-3 sm:flex-row">
          <div className="flex w-full flex-col justify-between sm:w-5/12">
            <h3 className="font-medium">Marketing Strategy</h3>
            <p className="text-sm text-body">
              <span className="font-bold uppercase">Public</span>{" "}
              &nbsp;&nbsp;Public
            </p>
          </div>
          <div className="my-auto mr-3 w-full sm:w-1/2">
            <p className="text-sm font-medium">Finish your course</p>
            <ProgressBar current={5} total={5} />
          </div>
        </div>
      </div>
      <div className="group relative flex cursor-pointer flex-row gap-4 rounded-2xl border border-border">
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white bg-opacity-80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className=" font-semibold text-primary">Edit / manage course</p>
        </div>
        <Image src={CoursesIcon} alt="Courses" className="z-0" />
        <div className="flex w-full flex-col justify-between p-3 sm:flex-row">
          <div className="flex w-full flex-col justify-between sm:w-5/12">
            <h3 className="font-medium">Learn Java from Scratch</h3>
            <p className="text-sm text-body">
              <span className="font-bold uppercase">Draft</span>{" "}
              &nbsp;&nbsp;Public
            </p>
          </div>
          <div className="my-auto mr-3 w-full sm:w-1/2">
            <p className="text-sm font-medium">Finish your course</p>
            <ProgressBar current={5} total={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Educator2() {
  const [tab, setTab] = useState<string>("courses");
  return (
    <div className="mb-10 mt-3 max-w-[1100px] space-y-9 rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-lg font-semibold text-primary">Welcome Ray!</h1>
        <input
          className="input-text w-full font-normal sm:w-1/2 xl:w-1/4"
          type="text"
          placeholder="Search course"
        />
      </div>
      <div className="flex flex-row items-center space-x-4 border-b-2 border-border text-sm font-semibold text-primary sm:space-x-10">
        <button
          className={`${tab == "courses" ? "border-b-2 border-primary" : "opacity-50 transition-opacity duration-300 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("courses")}
        >
          Courses
        </button>
        <button
          className={`${tab == "knowledgekeys" ? "border-b-2 border-primary" : "opacity-50 transition-opacity duration-300 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("knowledgekeys")}
        >
          KnowledgeKeys
        </button>
        <button
          className={`${tab == "aiapps" ? "border-b-2 border-primary" : "opacity-50 transition-opacity duration-300 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("aiapps")}
        >
          AI Apps
        </button>
      </div>
      <Courses />
      <p className="text-center text-sm">
        Based on your experience, we think these resources will be helpful
      </p>
      <div className="flex flex-col space-y-6">
        <CreateCourse />
        <CreateKnowledgeKey />
        <BuildAiApp />
      </div>
      <div className="mx-auto mt-10 flex w-7/12 w-full flex-col items-center space-y-7">
        <p className="text-center">
          Have questions? Here are our most popular instructor resources.
        </p>
        <div className="flex flex-col gap-10 sm:flex-row">
          <div className="flex w-full flex-col">
            <Link
              href="/educator"
              className="mb-1 flex flex-col items-center justify-center space-y-5 rounded-lg p-2 hover:bg-secondary"
            >
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37 30C38.0609 30 39.0783 29.5786 39.8284 28.8284C40.5786 28.0783 41 27.0609 41 26V4C41 2.93913 40.5786 1.92172 39.8284 1.17157C39.0783 0.421427 38.0609 0 37 0H15.92C16.62 1.22 17 2.6 17 4H37V26H19V30H37ZM27 10V14H15V40H11V28H7V40H3V24H0V14C0 12.9391 0.421427 11.9217 1.17157 11.1716C1.92172 10.4214 2.93913 10 4 10H27ZM13 4C13 5.06087 12.5786 6.07828 11.8284 6.82843C11.0783 7.57857 10.0609 8 9 8C7.93913 8 6.92172 7.57857 6.17157 6.82843C5.42143 6.07828 5 5.06087 5 4C5 2.93913 5.42143 1.92172 6.17157 1.17157C6.92172 0.421427 7.93913 0 9 0C10.0609 0 11.0783 0.421427 11.8284 1.17157C12.5786 1.92172 13 2.93913 13 4Z"
                  fill="var(--color-primary)"
                />
              </svg>
              <p className="text-sm font-medium text-primary underline">FAQ</p>
            </Link>
            <p className="text-center text-sm text-body">
              Learn about best practices for teaching on Open Campus
            </p>
          </div>
          <div className="flex w-full flex-col">
            <Link
              href="/educator"
              className="mb-1 flex flex-col items-center justify-center space-y-5 rounded-lg p-2 hover:bg-secondary"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0H4C1.8 0 0 1.8 0 4V32C0 34.2 1.8 36 4 36H32C34.2 36 36 34.2 36 32V4C36 1.8 34.2 0 32 0ZM18.02 30C16.62 30 15.5 28.88 15.5 27.48C15.5 26.06 16.62 24.98 18.02 24.98C19.44 24.98 20.52 26.06 20.52 27.48C20.5 28.86 19.44 30 18.02 30ZM24.04 15.2C22.52 17.42 21.08 18.12 20.3 19.54C19.98 20.12 19.86 20.5 19.86 22.36H16.22C16.22 21.38 16.06 19.78 16.84 18.4C17.82 16.66 19.68 15.62 20.76 14.08C21.9 12.46 21.26 9.42 18.02 9.42C15.9 9.42 14.86 11.02 14.42 12.38L11.12 10.98C12.02 8.3 14.44 6 17.98 6C20.94 6 22.96 7.34 24 9.04C24.88 10.48 25.4 13.18 24.04 15.2Z"
                  fill="var(--color-primary)"
                />
              </svg>
              <p className="text-sm font-medium text-primary underline">
                Help and Support
              </p>
            </Link>
            <p className="text-center text-sm text-body">
              Browse our Help Center or contact our support team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
