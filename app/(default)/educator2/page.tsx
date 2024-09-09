"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import BuildAiIcon from "@/public/images/educators/build-ai-app.svg";
import CreateCourseIcon from "@/public/images/educators/create-course.svg";
import CreateKnowledgeKeyImage from "@/public/images/educators/create-knowledgekey.svg";
import Faq from "@/public/images/educators/faq.svg";
import HelpSupport from "@/public/images/educators/help-support.svg";
import CoursesIcon from "@/public/images/educators/courses.svg";

const ProgressBar = ({ current, total }: {current: number, total: number}) => {
  const width = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full bg-[#393E44]">
      <div
        className="bg-primary text-xs font-medium text-blue-100 text-center p-1 leading-none"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

const CreateCourse = () => {
  return (
    <div className="flex flex-row p-4 border rounded-2xl">
      <Image src={CreateCourseIcon} alt="Create Course" />
      <div className="flex flex-col space-y-3 justify-center">
        <h2>Create Course</h2>
        <p className="text-sm text-body">Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</p>
        <Link href="/educator2" className="text-sm text-primary underline">Get Started</Link>
      </div>
    </div>
  )
}

const CreateKnowledgeKey = () => {
  return (
    <div className="flex flex-row p-4 border rounded-2xl">
      <Image src={CreateKnowledgeKeyImage} alt="Create KnowledgeKey" />
      <div className="flex flex-col space-y-3 justify-center">
        <h2 className="text-xl">Create KnowledgeKey</h2>
        <p className="text-sm text-body">Set your course up for success by building your audience.</p>
        <Link href="/educator2" className="text-sm text-primary underline">Get Started</Link>
      </div>
    </div>
  )
}

const BuildAiApp = () => {
  return (
    <div className="flex flex-row p-4 border rounded-2xl">
      <Image src={BuildAiIcon} alt="Build AI App" />
      <div className="flex flex-col space-y-3 justify-center">
        <h2 className="text-xl">Build AI App</h2>
        <p className="text-sm text-body">Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!</p>
        <Link href="/educator2" className="text-sm text-primary underline">Get Started</Link>
      </div>
    </div>
  )
}

const Courses = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row border rounded-2xl cursor-pointer">
        <Image src={CoursesIcon} alt="Courses" />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between p-4 w-5/12">
            <h3 className="text-base">Marketing Strategy</h3>
            <p className="text-sm text-body"><span className="uppercase font-bold">Public</span> &nbsp;&nbsp;Public</p>
          </div>
          <div className="my-auto mr-3 w-1/2">
            <p className="text-sm text-body font-semibold">Finish your progress</p>
            <ProgressBar current={5} total={5} />
          </div>
        </div>
      </div>
      <div className="relative group flex flex-row border rounded-2xl cursor-pointer">
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl">
          <p className=" text-primary font-semibold">Edit / manage course</p>
        </div>
        <Image src={CoursesIcon} alt="Courses" className="z-0"/>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between p-4 w-5/12">
            <h3 className="text-base">Learn to Build Mobile Apps from Scratch</h3>
            <p className="text-sm text-body"><span className="uppercase font-bold">Draft</span> &nbsp;&nbsp;Public</p>
          </div>
          <div className="my-auto mr-3 w-1/2">
            <p className="text-sm text-body font-semibold">Finish your progress</p>
            <ProgressBar current={5} total={5} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const Educator = () => {
  const [tab, setTab] = useState<string>("courses");
  return (
    <div className="mb-10 mt-3 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4 space-y-9">
      <div className="flex flex-row justify-between">
        <h1 className="text-primary text-lg font-semibold">Welcome Ray!</h1>
      </div>
      <div className="flex flex-row items-center space-x-10 border-b-2 border-border text-sm font-semibold text-primary">
        <button className={`${tab == "courses" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100 transition-opacity duration-300"}`} onClick={() => setTab("courses")}>Courses</button>
        <button className={`${tab == "knowledgekeys" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100 transition-opacity duration-300"}`} onClick={() => setTab("knowledgekeys")}>KnowledgeKeys</button>
        <button className={`${tab == "aiapps" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100 transition-opacity duration-300"}`} onClick={() => setTab("aiapps")}>AI Apps</button>
      </div>
      <Courses />
      <p className="text-center text-sm">Based on your experience, we think these resources will be helpful</p>
      <div className="flex flex-col space-y-6">
        <CreateCourse />
        <CreateKnowledgeKey />
        <BuildAiApp />
      </div>
      <div className="flex flex-col items-center mt-10 space-y-7 w-7/12 mx-auto">
        <p>Have questions? Here are our most popular instructor resources.</p>
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col">
            <Link href="/educator2" className="flex flex-col items-center justify-center space-y-5 mb-3 hover:bg-slate-100">
              <Image src={Faq} alt="FAQ" />
              <p className="text-sm text-primary underline">FAQ</p>
            </Link>
            <p className="text-center">Learn about best practices for teaching on Open Campus</p>
          </div>
          <div className="flex flex-col">
            <Link href="/educator2" className="flex flex-col items-center justify-center space-y-5 mb-3 hover:bg-slate-100">
              <Image src={HelpSupport} alt="Help and Support" />
              <p className="text-sm text-primary underline">Help and Support</p>
            </Link>
            <p className="text-center">Browse our Help Center or contact our support team</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Educator;