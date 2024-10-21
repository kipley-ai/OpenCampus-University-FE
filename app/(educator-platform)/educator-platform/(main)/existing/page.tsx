"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { WelcomeOptions } from "../welcome-options";

import Link from "next/link";
import Image from "next/image";

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
  const router = useRouter();

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
      <div
        className="group relative flex cursor-pointer flex-row gap-4 rounded-2xl border border-border"
        onClick={() => router.push("/educator-platform/courses/draft/1")}
      >
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

  const { authState, ocAuth } = useOCAuth();

  function getFirstName(username: string): string {
    const [firstName] = username.split("_");
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  return (
    <div className="mb-10 mt-3 space-y-9 rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-lg font-semibold text-primary">
          {authState.isLoading ? (
            <div>Loading...</div>
          ) : authState.error ? (
            <div>Error: {authState.error.message}</div>
          ) : authState.isAuthenticated ? (
            <>Welcome, {getFirstName(ocAuth.getAuthInfo().edu_username)}!</>
          ) : (
            <>Welcome!</>
          )}
        </h1>
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
      <WelcomeOptions />
    </div>
  );
}
