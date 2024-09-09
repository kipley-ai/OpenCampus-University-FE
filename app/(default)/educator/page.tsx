"use client"
import Link from "next/link";
import Image from "next/image";

import BuildAiIcon from "@/public/images/educators/build-ai-app.svg";
import CreateCourseIcon from "@/public/images/educators/create-course.svg";
import CreateKnowledgeKeyImage from "@/public/images/educators/create-knowledgekey.svg";
import Faq from "@/public/images/educators/faq.svg";
import HelpSupport from "@/public/images/educators/help-support.svg";

const CreateCourse = () => {
  return (
    <div className="flex flex-row p-4 border rounded-xl">
      <Image src={CreateCourseIcon} alt="Create Course" />
      <div className="flex flex-col space-y-3 justify-center">
        <h2>Create Course</h2>
        <p className="text-sm text-body">Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</p>
        <Link href="/educator" className="text-sm text-primary underline">Get Started</Link>
      </div>
    </div>
  )
}

const CreateKnowledgeKey = () => {
  return (
    <div className="flex flex-row p-4 border rounded-xl">
      <Image src={CreateKnowledgeKeyImage} alt="Create KnowledgeKey" />
      <div className="flex flex-col space-y-3 justify-center">
        <h2 className="text-xl">Create KnowledgeKey</h2>
        <p className="text-sm text-body">Set your course up for success by building your audience.</p>
        <Link href="/educator" className="text-sm text-primary underline">Get Started</Link>
      </div>
    </div>
  )
}

const BuildAiApp = () => {
  return (
    <div className="flex flex-row p-4 border rounded-xl">
      <Image src={BuildAiIcon} alt="Build AI App" />
      <div className="flex flex-col space-y-3 justify-center">
        <h2 className="text-xl">Build AI App</h2>
        <p className="text-sm text-body">Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!</p>
        <Link href="/educator" className="text-sm text-primary underline">Get Started</Link>
      </div>
    </div>
  )
}

export default function Educator() {
  return (
    <div className="mb-10 mt-3 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-primary text-lg font-semibold mb-9">Welcome Ray!</h1>
      </div>
      <div className="flex flex-col space-y-6">
        <CreateCourse />
        <CreateKnowledgeKey />
        <BuildAiApp />
      </div>
      <div className="flex flex-col items-center mt-10 space-y-7 w-7/12 mx-auto">
        <p>Have questions? Here are our most popular instructor resources.</p>
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col">
            <Link href="/educator" className="flex flex-col items-center justify-center space-y-5 mb-3 hover:bg-slate-100">
              <Image src={Faq} alt="FAQ" />
              <p className="text-sm text-primary underline">FAQ</p>
            </Link>
            <p className="text-center">Learn about best practices for teaching on Open Campus</p>
          </div>
          <div className="flex flex-col">
            <Link href="/educator" className="flex flex-col items-center justify-center space-y-5 mb-3 hover:bg-slate-100">
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