"use client";

import { useState } from "react";
import { courses, KF_TITLE } from "@/utils/constants";
import { CourseCard } from "./course-card";

export default function CoursesPage() {
  const [tab, setTab] = useState<string>("All");

  const categories = [
    "All",
    "Business",
    "Marketing",
    "Design",
    "Photography",
    "Development",
  ];

  return (
    <div className="mb-10 mt-3 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
      <title>{KF_TITLE + "Courses"}</title>
      <div className="flex justify-between gap-3 max-md:flex-col">
        <h1 className="text-xl font-bold text-primary">Popular Courses</h1>
        <input
          type="text"
          placeholder="Search courses"
          className="h-10 w-48 rounded-lg border-2 border-border bg-transparent px-4 text-sm"
        />
      </div>
      <div className="mb-8 mt-4 flex items-center gap-8 overflow-x-auto border-b-2 border-border text-sm font-semibold text-primary md:gap-10">
        {categories.map((category) => (
          <button
            key={category}
            className={`${
              tab === category
                ? "border-b-2 border-primary"
                : "opacity-50 hover:text-body hover:opacity-100"
            }`}
            onClick={() => setTab(category)}
          >
            {category}
          </button>
        ))}
        <button className="relative right-8 text-primary opacity-50 hover:text-body hover:opacity-100 md:right-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=""
            width="18"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}
