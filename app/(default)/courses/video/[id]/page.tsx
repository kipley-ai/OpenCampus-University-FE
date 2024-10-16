"use client";

import {
  ControlledAccordion,
  AccordionItem as Item,
  useAccordionProvider,
} from "@szhsin/react-accordion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { KF_TITLE } from "@/utils/constants";
import Link from "next/link";
import CourseVideos from "@/public/json/course-videos.json";
import Courses from "@/public/json/courses.json";

const AccordionItem = ({ section, ...rest }: any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <div className="flex flex-col items-start gap-2 text-sm">
          <h2 className={`font-medium ${isEnter ? "" : "text-heading"}`}>
            {section?.title}
          </h2>
          <p className="text-body">0/2 | 12.50</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter ? "rotate-180" : ""
          }`}
          width="24"
          height="24"
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
      </>
    )}
    className=""
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left bg-container hover:bg-secondary border border-border ${
          isEnter && ""
        }`,
    }}
    contentProps={{
      className:
        "transition-height duration-200 ease-out border border-border text-sm",
    }}
    panelProps={{ className: "" }}
  />
);

export default function VideoPage() {
  const [tab, setTab] = useState<string>("Notes");
  const categories = ["Notes", "Q & A", "Learning Tools"];

  const { id } = useParams();

  interface CourseVideo {
    id: string;
    courseId: string;
    type: string;
    link: string;
  }

  const video: CourseVideo | undefined =
    CourseVideos.find((video) => video.id === id) ||
    CourseVideos.find((video) => video.id === "999");
  const course = Courses.find((course) => course.id === video?.courseId);

  const [isAllCollapsed, setIsAllCollapsed] = useState<boolean>(true);

  const providerValue = useAccordionProvider({
    allowMultiple: true,
    transition: true,
    transitionTimeout: 250,
    // onStateChange: ({ key, current }) => {
    //   if (current.isResolved)
    //     console.log(`${key} is expanded: ${current.isEnter}`);
    // },
  });

  const { toggle, toggleAll } = providerValue;

  const handleExpandAll = () => {
    toggleAll(isAllCollapsed);
    setIsAllCollapsed(!isAllCollapsed);
  };

  const getResourceSVG = (type: string) => {
    switch (type) {
      case "video":
        return (
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8469 5.72969L8.09688 3.22969C8.00273 3.16687 7.89329 3.1308 7.78024 3.12533C7.6672 3.11985 7.55479 3.14517 7.45501 3.19859C7.35523 3.25201 7.27183 3.33152 7.21371 3.42863C7.15559 3.52575 7.12493 3.63682 7.125 3.75V8.75C7.12493 8.86318 7.15559 8.97425 7.21371 9.07137C7.27183 9.16848 7.35523 9.24799 7.45501 9.30141C7.55479 9.35483 7.6672 9.38015 7.78024 9.37467C7.89329 9.3692 8.00273 9.33313 8.09688 9.27031L11.8469 6.77031C11.9326 6.71326 12.0029 6.63591 12.0515 6.54513C12.1002 6.45436 12.1256 6.35298 12.1256 6.25C12.1256 6.14702 12.1002 6.04564 12.0515 5.95487C12.0029 5.86409 11.9326 5.78674 11.8469 5.72969ZM8.375 7.58203V4.92188L10.3734 6.25L8.375 7.58203ZM15.875 0.625H2.125C1.79348 0.625 1.47554 0.756696 1.24112 0.991116C1.0067 1.22554 0.875 1.54348 0.875 1.875V10.625C0.875 10.9565 1.0067 11.2745 1.24112 11.5089C1.47554 11.7433 1.79348 11.875 2.125 11.875H15.875C16.2065 11.875 16.5245 11.7433 16.7589 11.5089C16.9933 11.2745 17.125 10.9565 17.125 10.625V1.875C17.125 1.54348 16.9933 1.22554 16.7589 0.991116C16.5245 0.756696 16.2065 0.625 15.875 0.625ZM15.875 10.625H2.125V1.875H15.875V10.625ZM17.125 13.75C17.125 13.9158 17.0592 14.0747 16.9419 14.1919C16.8247 14.3092 16.6658 14.375 16.5 14.375H1.5C1.33424 14.375 1.17527 14.3092 1.05806 14.1919C0.940848 14.0747 0.875 13.9158 0.875 13.75C0.875 13.5842 0.940848 13.4253 1.05806 13.3081C1.17527 13.1908 1.33424 13.125 1.5 13.125H16.5C16.6658 13.125 16.8247 13.1908 16.9419 13.3081C17.0592 13.4253 17.125 13.5842 17.125 13.75Z"
              fill="#525252"
            />
          </svg>
        );
      case "image":
        return (
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.875 0.625H2.125C1.79348 0.625 1.47554 0.756696 1.24112 0.991116C1.0067 1.22554 0.875 1.54348 0.875 1.875V13.125C0.875 13.4565 1.0067 13.7745 1.24112 14.0089C1.47554 14.2433 1.79348 14.375 2.125 14.375H15.875C16.2065 14.375 16.5245 14.2433 16.7589 14.0089C16.9933 13.7745 17.125 13.4565 17.125 13.125V1.875C17.125 1.54348 16.9933 1.22554 16.7589 0.991116C16.5245 0.756696 16.2065 0.625 15.875 0.625ZM15.875 1.875V9.90234L13.8383 7.86641C13.7222 7.7503 13.5844 7.6582 13.4327 7.59537C13.281 7.53253 13.1185 7.50019 12.9543 7.50019C12.7901 7.50019 12.6276 7.53253 12.4759 7.59537C12.3242 7.6582 12.1864 7.7503 12.0703 7.86641L10.5078 9.42891L7.07031 5.99141C6.83592 5.75716 6.5181 5.62558 6.18672 5.62558C5.85534 5.62558 5.53752 5.75716 5.30313 5.99141L2.125 9.16953V1.875H15.875ZM2.125 10.9375L6.1875 6.875L12.4375 13.125H2.125V10.9375ZM15.875 13.125H14.2055L11.393 10.3125L12.9555 8.75L15.875 11.6703V13.125ZM10.25 5.3125C10.25 5.12708 10.305 4.94582 10.408 4.79165C10.511 4.63748 10.6574 4.51732 10.8287 4.44636C11 4.37541 11.1885 4.35684 11.3704 4.39301C11.5523 4.42919 11.7193 4.51848 11.8504 4.64959C11.9815 4.7807 12.0708 4.94775 12.107 5.1296C12.1432 5.31146 12.1246 5.49996 12.0536 5.67127C11.9827 5.84257 11.8625 5.98899 11.7083 6.092C11.5542 6.19502 11.3729 6.25 11.1875 6.25C10.9389 6.25 10.7004 6.15123 10.5246 5.97541C10.3488 5.7996 10.25 5.56114 10.25 5.3125Z"
              fill="#525252"
            />
          </svg>
        );
      case "file":
        return (
          <svg
            width="17"
            height="16"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.875 5C4.875 4.83424 4.94085 4.67527 5.05806 4.55806C5.17527 4.44085 5.33424 4.375 5.5 4.375H10.5C10.6658 4.375 10.8247 4.44085 10.9419 4.55806C11.0592 4.67527 11.125 4.83424 11.125 5C11.125 5.16576 11.0592 5.32473 10.9419 5.44194C10.8247 5.55915 10.6658 5.625 10.5 5.625H5.5C5.33424 5.625 5.17527 5.55915 5.05806 5.44194C4.94085 5.32473 4.875 5.16576 4.875 5ZM5.5 8.125H10.5C10.6658 8.125 10.8247 8.05915 10.9419 7.94194C11.0592 7.82473 11.125 7.66576 11.125 7.5C11.125 7.33424 11.0592 7.17527 10.9419 7.05806C10.8247 6.94085 10.6658 6.875 10.5 6.875H5.5C5.33424 6.875 5.17527 6.94085 5.05806 7.05806C4.94085 7.17527 4.875 7.33424 4.875 7.5C4.875 7.66576 4.94085 7.82473 5.05806 7.94194C5.17527 8.05915 5.33424 8.125 5.5 8.125ZM8 9.375H5.5C5.33424 9.375 5.17527 9.44085 5.05806 9.55806C4.94085 9.67527 4.875 9.83424 4.875 10C4.875 10.1658 4.94085 10.3247 5.05806 10.4419C5.17527 10.5592 5.33424 10.625 5.5 10.625H8C8.16576 10.625 8.32473 10.5592 8.44194 10.4419C8.55915 10.3247 8.625 10.1658 8.625 10C8.625 9.83424 8.55915 9.67527 8.44194 9.55806C8.32473 9.44085 8.16576 9.375 8 9.375ZM15.5 1.25V9.74141C15.5005 9.90562 15.4684 10.0683 15.4055 10.22C15.3426 10.3717 15.2502 10.5093 15.1336 10.625L11.125 14.6336C11.0093 14.7502 10.8717 14.8426 10.72 14.9055C10.5683 14.9684 10.4056 15.0005 10.2414 15H1.75C1.41848 15 1.10054 14.8683 0.866116 14.6339C0.631696 14.3995 0.5 14.0815 0.5 13.75V1.25C0.5 0.918479 0.631696 0.600537 0.866116 0.366116C1.10054 0.131696 1.41848 0 1.75 0H14.25C14.5815 0 14.8995 0.131696 15.1339 0.366116C15.3683 0.600537 15.5 0.918479 15.5 1.25ZM1.75 13.75H9.875V10C9.875 9.83424 9.94085 9.67527 10.0581 9.55806C10.1753 9.44085 10.3342 9.375 10.5 9.375H14.25V1.25H1.75V13.75ZM11.125 10.625V12.8672L13.3664 10.625H11.125Z"
              fill="#525252"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-10 mt-3 flex gap-4 rounded-2xl border-2 border-border bg-sidebar p-3 pb-16 md:p-4 md:pb-16 xl:mt-4">
      <div className="w-1/3">
        <h1 className="font-medium">{course?.title}</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="mr-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1.5 rounded-full bg-primary"
              style={{ width: `${0}%` }}
            ></div>
          </div>
          <span className="font-medium">0%</span>
        </div>
        <hr className="my-4 border-border" />
        <ControlledAccordion
          providerValue={providerValue}
          className="flex flex-col rounded-lg"
        >
          {course?.sections &&
            course?.sections.map((section, i) => {
              return (
                <AccordionItem
                  key={i}
                  section={section}
                  initialEntered={section?.resources?.some(
                    (resource) => resource.id.toString() === id,
                  )}
                >
                  <div className="flex flex-col gap-4 ">
                    {section?.resources.map((resource, j) => (
                      <Link
                        key={j}
                        href={`/courses/video/${resource?.id}`} // hardcoded to video for now
                      >
                        <div
                          className={`group flex items-start gap-2 p-4 ${resource?.id.toString() === id ? "bg-primary-light" : ""}`}
                        >
                          {resource?.id.toString() === id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 20 20"
                              className="shrink-0"
                            >
                              <rect
                                width="20"
                                height="20"
                                fill="#141BEB"
                                rx="4"
                              />
                              <g clip-path="url(#a)">
                                <path
                                  stroke="var(--color-sidebar)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="m5.333 10 3.334 3.333 6.666-6.666"
                                />
                              </g>
                              <defs>
                                <clipPath id="a">
                                  <path fill="#fff" d="M2 2h16v16H2z" />
                                </clipPath>
                              </defs>
                            </svg>
                          ) : (
                            <div className="size-5 rounded border-2 border-border"></div>
                          )}
                          <div className="flex flex-col items-start gap-2">
                            <p className="font-medium leading-4 group-hover:text-primary">
                              {resource?.title}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-body">
                              {getResourceSVG(resource?.type)}
                              <span>6.25</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionItem>
              );
            })}
        </ControlledAccordion>
      </div>
      <div className="w-2/3">
        <div className="col-lg-8">
          {video?.type === "YOUTUBE" ? (
            <iframe
              width="100%"
              height="400"
              src={video?.link}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            video?.type === "TED" && (
              <iframe
                src="https://embed.ted.com/talks/yat_siu_the_dream_of_digital_ownership_powered_by_the_metaverse?subtitle=en"
                width="100%"
                height="400"
                title="The dream of digital ownership, powered by the metaverse"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              ></iframe>
            )
          )}
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
          </div>

          <h2 className="mt-4 font-medium">Add Note</h2>
          <div className="relative">
            <textarea
              className="mt-2 h-32 w-full rounded-lg border border-border p-4"
              placeholder="Write your note..."
            ></textarea>
            <div className="absolute bottom-6 left-4 flex items-center gap-4 text-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
                />
                <path
                  fill="#6B7280"
                  stroke="currentColor"
                  strokeWidth=".125"
                  d="M7.906 8.438a.719.719 0 1 1-1.437 0 .719.719 0 0 1 1.437 0Zm5.625 0a.719.719 0 1 1-1.437 0 .719.719 0 0 1 1.437 0Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13.25 11.875a3.758 3.758 0 0 1-6.5 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="14"
                fill="none"
                viewBox="0 0 12 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 6.375h6.875a3.125 3.125 0 1 1 0 6.25H1V.75h5.938a2.813 2.813 0 0 1 0 5.625"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="14"
                fill="none"
                viewBox="0 0 6 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m4.875 1.375-3.75 11.25"
                />
              </svg>
            </div>
            <button className="btn-primary absolute bottom-4 right-4 flex items-center gap-3 px-4 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  fill="#fff"
                  d="M13.125 7a.705.705 0 0 1-.707.706H7.707v4.712a.707.707 0 0 1-1.414 0V7.706H1.582a.707.707 0 1 1 0-1.413h4.711V1.581a.707.707 0 0 1 1.414 0v4.712h4.711c.392 0 .707.318.707.707Z"
                />
              </svg>
              Add Note
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-2xl font-medium">Notes &#40;2&#41;</h2>
            <div className="flex items-center gap-4">
              Sort by:
              <select className="h-10 w-48 rounded-lg border border-border bg-transparent px-4 text-sm">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="w-fit rounded-2xl bg-primary-light px-4 py-1 text-primary">
              1.0
            </div>
            <div className="flex gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#32BCA3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7.5 16.875H3.75a.625.625 0 0 1-.625-.625v-3.492a.617.617 0 0 1 .18-.438l9.375-9.375a.625.625 0 0 1 .89 0l3.485 3.485a.627.627 0 0 1 0 .89L7.5 16.875ZM10.625 5 15 9.375m1.875 7.5H7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#FF6550"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16.875 4.375H3.125m3.75-2.5h6.25m2.5 2.5V16.25a.624.624 0 0 1-.625.625H5a.625.625 0 0 1-.625-.625V4.375"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 rounded-2xl border border-border bg-container p-4 text-sm text-body">
            <p>
              Talk about multitaskers &mdash; our personalised notebooks and
              journals are perfect for everything from notetaking to life admin
              and general scrawling. Pick and personalise a cover &mdash; in
              hardback or softback &mdash; with any text you like, then select
              the paper type you want inside.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="w-fit rounded-2xl bg-primary-light px-4 py-1 text-primary">
              2.0
            </div>
            <div className="flex gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#32BCA3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7.5 16.875H3.75a.625.625 0 0 1-.625-.625v-3.492a.617.617 0 0 1 .18-.438l9.375-9.375a.625.625 0 0 1 .89 0l3.485 3.485a.627.627 0 0 1 0 .89L7.5 16.875ZM10.625 5 15 9.375m1.875 7.5H7.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#FF6550"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16.875 4.375H3.125m3.75-2.5h6.25m2.5 2.5V16.25a.624.624 0 0 1-.625.625H5a.625.625 0 0 1-.625-.625V4.375"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 rounded-2xl border border-border bg-container p-4 text-sm text-body">
            <p>
              Talk about multitaskers &mdash; our personalised notebooks and
              journals are perfect for everything from notetaking to life admin
              and general scrawling. Pick and personalise a cover &mdash; in
              hardback or softback &mdash; with any text you like, then select
              the paper type you want inside.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
