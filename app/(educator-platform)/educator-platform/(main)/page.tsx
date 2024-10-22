"use client";

import { useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useCourseIndex } from "@/hooks/api/educator-platform";
import { useUserDetail } from "@/hooks/api/user";
import { CourseList } from "./course-list";
import { WelcomeOptions } from "./welcome-options";

export default function Educator() {
  const [tab, setTab] = useState<string>("courses");

  const { authState, ocAuth } = useOCAuth();

  function getFirstName(username: string): string {
    const [firstName] = username.split("_");
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  const userDetail = useUserDetail();

  const courses = useCourseIndex({
    data_status: 0,
    published: 0,
    created_by: userDetail.data?.data.data.wallet_addr,
  });

  return (
    <div className="mb-10 mt-3 max-w-[1100px] space-y-8 rounded-2xl border-2 border-border bg-sidebar p-3 pb-8 md:p-10 xl:mt-4">
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
      {courses.isPending ? (
        <div>Loading...</div>
      ) : courses.isError ? (
        <div>Error: {courses.error.message}</div>
      ) : courses.data.data.data.courses.length === 0 ? null : (
        <>
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
          <CourseList courses={courses.data.data.data.courses} />
          <p className="text-center text-sm">
            Based on your experience, we think these resources will be helpful
          </p>
        </>
      )}
      <WelcomeOptions />
    </div>
  );
}
