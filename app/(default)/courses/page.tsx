"use client";

import { useState } from "react";
import { KF_TITLE } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

function CourseCard({ course }: { course: any }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="flex w-full cursor-pointer flex-col gap-3 rounded-2xl border-2 border-border p-4 hover:bg-secondary">
        <Image
          src={course.image}
          alt="Course Thumbnail"
          width={270}
          height={160}
          className="w-full rounded-lg object-contain"
        />
        <div className="bg-primary-light w-fit rounded-lg px-3 py-1 text-sm text-primary dark:bg-primary-dark dark:text-heading">
          <span>{course.category}</span>
        </div>
        <h2 className="text-lg font-medium leading-none">{course.title}</h2>
        <div className="flex items-center gap-6 md:mr-6">
          <div className="flex items-center gap-1 text-body">
            <svg
              width="15"
              height="18"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-body">{course.duration}</p>
          </div>
          <div className="flex items-center gap-1 text-body">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 12.375L9 16.3125L15.75 12.375"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.25 9L9 12.9375L15.75 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.25 5.625L9 9.5625L15.75 5.625L9 1.6875L2.25 5.625Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm">{course.lessons} lessons</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

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

  const courses = [
    {
      id: 1,
      image: "/images/applications-image-01.jpg",
      category: "Business",
      title: "MBA in a Box: Business Lessons from a CEO",
      duration: "30 minutes",
      lessons: 12,
    },
    {
      id: 2,
      image: "/images/applications-image-02.jpg",
      category: "Marketing",
      title: "Instagram Marketing Course: From 0-10K Followers",
      duration: "30 minutes",
      lessons: 12,
    },
    {
      id: 3,
      image: "/images/applications-image-03.jpg",
      category: "Development",
      title: "Learn to Build Mobile Apps from Scratch",
      duration: "30 minutes",
      lessons: 12,
    },
    {
      id: 4,
      image: "/images/applications-image-04.jpg",
      category: "Design",
      title: "User Experience (UX): The Ultimate Guide",
      duration: "30 minutes",
      lessons: 12,
    },
    {
      id: 5,
      image: "/images/applications-image-05.jpg",
      category: "Development",
      title: "100 Days of Code: The Complete Class",
      duration: "30 minutes",
      lessons: 12,
    },
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
