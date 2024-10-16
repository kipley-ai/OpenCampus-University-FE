import Link from "next/link";
import Image from "next/image";

import BuildAiIcon from "@/public/images/educators/build-ai-app.svg";
import CreateCourseIcon from "@/public/images/educators/create-course.svg";
import CreateKnowledgeKeyImage from "@/public/images/educators/create-knowledgekey.svg";
import Faq from "@/public/images/educators/faq.svg";
import HelpSupport from "@/public/images/educators/help-support.svg";

export const CreateCourse = () => {
  return (
    <div className="flex flex-col rounded-xl border border-border p-4 max-sm:gap-4 sm:flex-row">
      <Image
        src={CreateCourseIcon}
        alt="Create Course"
        className="max-sm:mx-auto"
      />
      <div className="flex flex-col justify-center space-y-3">
        <h2 className="text-xl font-medium">Create Course</h2>
        <p className="text-sm text-body">
          Whether you've been teaching for years or are teaching for the first
          time, you can make an engaging course. We've compiled resources and
          best practices to help you get to the next level, no matter where
          you're starting.
        </p>
        <Link
          href="/educator-platform/courses/create"
          className="text-sm font-medium text-primary underline hover:text-secondary"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export const CreateKnowledgeKey = () => {
  return (
    <div className="flex flex-col rounded-xl border border-border p-4 max-sm:gap-4 sm:flex-row">
      <Image
        src={CreateKnowledgeKeyImage}
        alt="Create KnowledgeKey"
        className="max-sm:mx-auto"
      />
      <div className="flex flex-col justify-center space-y-3">
        <h2 className="text-xl font-medium">Create KnowledgeKey</h2>
        <p className="text-sm text-body">
          Set your course up for success by building your audience.
        </p>
        <Link
          href="/knowledge/create"
          className="text-sm font-medium text-primary underline hover:text-secondary"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export const BuildAiApp = () => {
  return (
    <div className="flex flex-col rounded-xl border border-border p-4 max-sm:gap-4 sm:flex-row">
      <Image src={BuildAiIcon} alt="Build AI App" className="max-sm:mx-auto" />
      <div className="flex flex-col justify-center space-y-3">
        <h2 className="text-xl font-medium">Build AI App</h2>
        <p className="text-sm text-body">
          Get exclusive tips and resources designed to help you launch your
          first course faster! Eligible instructors who publish their first
          course on time will receive a special bonus to celebrate. Start today!
        </p>
        <Link
          href="#"
          className="text-sm font-medium text-primary underline hover:text-secondary"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export const WelcomeOptions = () => {
  return (
    <>
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
              href="#"
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
              href="#"
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
    </>
  );
};
