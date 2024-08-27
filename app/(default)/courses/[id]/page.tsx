"use client";

import {
  ControlledAccordion,
  AccordionItem as Item,
  useAccordionProvider,
} from "@szhsin/react-accordion";
import { useState } from "react";
import { KF_TITLE } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const AccordionItem = ({ section, ...rest }: any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <div className="flex flex-col items-start gap-2">
          <h2 className={`font-medium ${isEnter ? "" : "text-heading"}`}>
            {section.title}
          </h2>
          <p className="text-body">
            {section.duration} Min • {section.lessons} Lessons
          </p>
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
      className: "transition-height duration-200 ease-out border border-border",
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default function CourseDetailPage() {
  const [tab, setTab] = useState<string>("Overview");
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

  const sections = [
    {
      title: "Marketing Principles",
      duration: 58, // in minutes
      lessons: 6,
      resources: [
        {
          id: 1,
          type: "video",
          title: "Introduction",
        },
        {
          id: 2,
          type: "video",
          title: "Jakob's Law - Other Pages",
        },
        {
          id: 3,
          type: "video",
          title: "Consistency is Key",
        },
        {
          id: 1,
          type: "image",
          title: "ROC Analysis Chart",
        },
        {
          id: 1,
          type: "file",
          title: "The strategic importance of the industry life cycle model",
        },
        {
          id: 2,
          type: "file",
          title: "Organic growth - building a solid foundation",
        },
      ],
    },
    {
      title: "Identity Your Customer Lifetime Value",
      duration: 58,
      lessons: 6,
      resources: [
        {
          id: 1,
          type: "video",
          title: "Introduction",
        },
      ],
    },
    {
      title: "Build Your Online Presence",
      duration: 58,
      lessons: 6,
      resources: [
        {
          id: 1,
          type: "video",
          title: "Introduction",
        },
      ],
    },
  ];

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

  const objectives = [
    "Improve the structure of your plan by understanding marketing principles",
    "Improve your communication skills with your team",
    "Improve your writing skills",
    "Improve the design quality of your project or your clients",
  ];

  const similarCourses = [
    {
      id: 10,
      image: "/images/applications-image-10.jpg",
      title: "Intro to Marketing Strategy",
      author: "Sen Janson",
      rating: 4.8,
      raters: 122,
      duration: 30,
      lessons: 12,
    },
    {
      id: 11,
      image: "/images/applications-image-11.jpg",
      title: "How to Write a Business Plan",
      author: "Sen Janson",
      rating: 4.8,
      raters: 122,
      duration: 30,
      lessons: 12,
    },
  ];

  return (
    <div className="relative mb-10 mt-3 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar xl:mt-4">
      <title>{KF_TITLE + "Course Detail"}</title>
      <div className="absolute left-6 top-8 z-10 w-1/4">
        <Image
          src="/images/applications-image-01.jpg"
          className="rounded-t-lg"
          alt="..."
          width={600}
          height={400}
        />
        <div className="rounded-b-lg border-x border-b border-border bg-sidebar p-4">
          <button className="btn-primary flex w-full items-center justify-center gap-3 p-3">
            Join this course
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.00065 0.333984L5.82565 1.50898L10.4757 6.16732H0.333984V7.83398H10.4757L5.82565 12.4923L7.00065 13.6673L13.6673 7.00065L7.00065 0.333984Z" />
            </svg>
          </button>
          <hr className="my-4 border-border" />
          <div className="space-y-2 text-sm">
            <p className="font-medium">This course includes:</p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M6.188 11.75a3.656 3.656 0 1 0 0-7.313 3.656 3.656 0 0 0 0 7.313Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.927 4.571a3.81 3.81 0 0 1 .99-.133 3.656 3.656 0 0 1 0 7.312M1.125 14.38a6.187 6.187 0 0 1 10.125 0"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M11.918 11.75a6.182 6.182 0 0 1 5.063 2.63"
                />
              </svg>
              20 Enrolled
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                width="17"
                height="19"
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
              40 minutes to complete
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
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
              12 lessons
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16.936 15.125H1.069M16.706 3.313H12.77v11.812h3.937V3.312Zm-5.737 3.375H7.03v8.437h3.938V6.687Z"
                />
                <path
                  fill="#525252"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.231 10.063H1.294v5.062H5.23v-5.063Z"
                />
              </svg>
              Beginner level
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 16.25a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m3.488 13.395.822-.499a.562.562 0 0 0 .267-.478l.014-2.538a.541.541 0 0 1 .092-.296l1.392-2.186a.57.57 0 0 1 .809-.155l1.378.998c.119.083.263.12.408.106l2.214-.302a.549.549 0 0 0 .345-.19l1.56-1.8a.57.57 0 0 0 .135-.394l-.078-1.709m.309 10.871-.759-.76a.576.576 0 0 0-.253-.147l-1.512-.394a.563.563 0 0 1-.408-.626l.162-1.139a.577.577 0 0 1 .345-.436l2.137-.893a.563.563 0 0 1 .598.106l1.75 1.603"
                />
              </svg>
              English
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m7.495 11.194-.611.69a3.368 3.368 0 1 1 0-4.768l4.232 4.768a3.369 3.369 0 1 0 0-4.768l-.611.69"
                />
              </svg>
              Full Lifetime Access
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3.938 4.438v3.874c0 2.791 2.235 5.104 5.027 5.126a5.064 5.064 0 0 0 5.098-5.063V4.437a.563.563 0 0 0-.563-.562h-9a.563.563 0 0 0-.563.563ZM6.75 16.25h4.5M9 13.438v2.812"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13.936 9.5h.689a2.25 2.25 0 0 0 2.25-2.25V6.125a.563.563 0 0 0-.563-.563h-2.25M4.078 9.5h-.71a2.25 2.25 0 0 1-2.25-2.25V6.125a.563.563 0 0 1 .562-.563h2.25"
                />
              </svg>
              Certificate of Completion
            </p>
            <p className="text-body">
              <svg
                className="mr-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12.656 3.875a1.969 1.969 0 1 1 0 3.938h-1.969v-1.97a1.969 1.969 0 0 1 1.97-1.968v0ZM7.313 7.813h-1.97a1.969 1.969 0 1 1 1.97-1.97v1.97Zm3.375 3.375h1.968a1.969 1.969 0 1 1-1.969 1.968v-1.969Zm-5.344 3.937a1.969 1.969 0 1 1 0-3.938h1.968v1.97a1.969 1.969 0 0 1-1.968 1.968v0Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.688 7.813H7.312v3.375h3.375V7.812Z"
                />
              </svg>
              Updated on 03/07/2024
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary-light flex w-full gap-14 rounded-t-xl px-6 pt-8 dark:bg-primary-dark">
        <div className="w-3/12"></div>
        <div className="w-9/12">
          <div className="dark:text-primary-light flex items-center gap-4 text-xs font-medium text-[#888CEB]">
            <Link href="/" className="hover:text-primary">
              <span className="">Browse</span>
            </Link>
            <span className="">&gt;</span>
            <Link href="/courses" className="hover:text-primary">
              <span className="">Courses</span>
            </Link>
            <span className="">&gt;</span>
            <span className="text-primary">Marketing</span>
          </div>
          <h1 className="mt-4 text-2xl font-medium text-primary">
            MBA in a Box: Business Lessons from a CEO
          </h1>
          <p className="mb-4 mt-2 text-sm text-body">
            Learn the most common Business Development Essentials Principals
            used in all the major Fortune 500 companies.
          </p>
          <p className="mb-2 text-xs text-body">
            Created by{" "}
            <span className="text-primary underline">Sean Janson</span>
          </p>
          <div className="mb-8 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0813 5.32656C13.0265 5.15429 12.921 5.00258 12.7785 4.89132C12.636 4.78007 12.4633 4.71447 12.2829 4.70312L9.03443 4.47891L7.8313 1.44375C7.7656 1.27663 7.65125 1.13307 7.50305 1.03167C7.35485 0.93027 7.17962 0.875691 7.00005 0.875V0.875C6.82048 0.875691 6.64525 0.93027 6.49705 1.03167C6.34885 1.13307 6.2345 1.27663 6.1688 1.44375L4.9438 4.49531L1.71724 4.70312C1.53705 4.71521 1.36462 4.78108 1.22228 4.89223C1.07993 5.00338 0.974216 5.15468 0.9188 5.32656C0.861893 5.50108 0.858568 5.68865 0.909254 5.86508C0.959941 6.0415 1.06231 6.1987 1.20318 6.31641L3.68599 8.41641L2.94771 11.3203C2.89663 11.5168 2.90582 11.724 2.97409 11.9152C3.04236 12.1063 3.16655 12.2725 3.33052 12.3922C3.48968 12.5064 3.6793 12.5706 3.87512 12.5764C4.07094 12.5823 4.26405 12.5295 4.42974 12.425L6.99458 10.8008H7.00552L9.76724 12.5453C9.90891 12.6374 10.0741 12.6867 10.243 12.6875C10.381 12.6864 10.5168 12.6537 10.6402 12.5919C10.7635 12.5301 10.871 12.4409 10.9545 12.331C11.0379 12.2211 11.0951 12.0936 11.1215 11.9582C11.148 11.8228 11.143 11.6832 11.1071 11.55L10.3251 8.37266L12.7969 6.31641C12.9378 6.1987 13.0402 6.0415 13.0908 5.86508C13.1415 5.68865 13.1382 5.50108 13.0813 5.32656Z"
                  fill="#FFC761"
                />
              </svg>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0813 5.32656C13.0265 5.15429 12.921 5.00258 12.7785 4.89132C12.636 4.78007 12.4633 4.71447 12.2829 4.70312L9.03443 4.47891L7.8313 1.44375C7.7656 1.27663 7.65125 1.13307 7.50305 1.03167C7.35485 0.93027 7.17962 0.875691 7.00005 0.875V0.875C6.82048 0.875691 6.64525 0.93027 6.49705 1.03167C6.34885 1.13307 6.2345 1.27663 6.1688 1.44375L4.9438 4.49531L1.71724 4.70312C1.53705 4.71521 1.36462 4.78108 1.22228 4.89223C1.07993 5.00338 0.974216 5.15468 0.9188 5.32656C0.861893 5.50108 0.858568 5.68865 0.909254 5.86508C0.959941 6.0415 1.06231 6.1987 1.20318 6.31641L3.68599 8.41641L2.94771 11.3203C2.89663 11.5168 2.90582 11.724 2.97409 11.9152C3.04236 12.1063 3.16655 12.2725 3.33052 12.3922C3.48968 12.5064 3.6793 12.5706 3.87512 12.5764C4.07094 12.5823 4.26405 12.5295 4.42974 12.425L6.99458 10.8008H7.00552L9.76724 12.5453C9.90891 12.6374 10.0741 12.6867 10.243 12.6875C10.381 12.6864 10.5168 12.6537 10.6402 12.5919C10.7635 12.5301 10.871 12.4409 10.9545 12.331C11.0379 12.2211 11.0951 12.0936 11.1215 11.9582C11.148 11.8228 11.143 11.6832 11.1071 11.55L10.3251 8.37266L12.7969 6.31641C12.9378 6.1987 13.0402 6.0415 13.0908 5.86508C13.1415 5.68865 13.1382 5.50108 13.0813 5.32656Z"
                  fill="#FFC761"
                />
              </svg>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0813 5.32656C13.0265 5.15429 12.921 5.00258 12.7785 4.89132C12.636 4.78007 12.4633 4.71447 12.2829 4.70312L9.03443 4.47891L7.8313 1.44375C7.7656 1.27663 7.65125 1.13307 7.50305 1.03167C7.35485 0.93027 7.17962 0.875691 7.00005 0.875V0.875C6.82048 0.875691 6.64525 0.93027 6.49705 1.03167C6.34885 1.13307 6.2345 1.27663 6.1688 1.44375L4.9438 4.49531L1.71724 4.70312C1.53705 4.71521 1.36462 4.78108 1.22228 4.89223C1.07993 5.00338 0.974216 5.15468 0.9188 5.32656C0.861893 5.50108 0.858568 5.68865 0.909254 5.86508C0.959941 6.0415 1.06231 6.1987 1.20318 6.31641L3.68599 8.41641L2.94771 11.3203C2.89663 11.5168 2.90582 11.724 2.97409 11.9152C3.04236 12.1063 3.16655 12.2725 3.33052 12.3922C3.48968 12.5064 3.6793 12.5706 3.87512 12.5764C4.07094 12.5823 4.26405 12.5295 4.42974 12.425L6.99458 10.8008H7.00552L9.76724 12.5453C9.90891 12.6374 10.0741 12.6867 10.243 12.6875C10.381 12.6864 10.5168 12.6537 10.6402 12.5919C10.7635 12.5301 10.871 12.4409 10.9545 12.331C11.0379 12.2211 11.0951 12.0936 11.1215 11.9582C11.148 11.8228 11.143 11.6832 11.1071 11.55L10.3251 8.37266L12.7969 6.31641C12.9378 6.1987 13.0402 6.0415 13.0908 5.86508C13.1415 5.68865 13.1382 5.50108 13.0813 5.32656Z"
                  fill="#FFC761"
                />
              </svg>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0813 5.32656C13.0265 5.15429 12.921 5.00258 12.7785 4.89132C12.636 4.78007 12.4633 4.71447 12.2829 4.70312L9.03443 4.47891L7.8313 1.44375C7.7656 1.27663 7.65125 1.13307 7.50305 1.03167C7.35485 0.93027 7.17962 0.875691 7.00005 0.875V0.875C6.82048 0.875691 6.64525 0.93027 6.49705 1.03167C6.34885 1.13307 6.2345 1.27663 6.1688 1.44375L4.9438 4.49531L1.71724 4.70312C1.53705 4.71521 1.36462 4.78108 1.22228 4.89223C1.07993 5.00338 0.974216 5.15468 0.9188 5.32656C0.861893 5.50108 0.858568 5.68865 0.909254 5.86508C0.959941 6.0415 1.06231 6.1987 1.20318 6.31641L3.68599 8.41641L2.94771 11.3203C2.89663 11.5168 2.90582 11.724 2.97409 11.9152C3.04236 12.1063 3.16655 12.2725 3.33052 12.3922C3.48968 12.5064 3.6793 12.5706 3.87512 12.5764C4.07094 12.5823 4.26405 12.5295 4.42974 12.425L6.99458 10.8008H7.00552L9.76724 12.5453C9.90891 12.6374 10.0741 12.6867 10.243 12.6875C10.381 12.6864 10.5168 12.6537 10.6402 12.5919C10.7635 12.5301 10.871 12.4409 10.9545 12.331C11.0379 12.2211 11.0951 12.0936 11.1215 11.9582C11.148 11.8228 11.143 11.6832 11.1071 11.55L10.3251 8.37266L12.7969 6.31641C12.9378 6.1987 13.0402 6.0415 13.0908 5.86508C13.1415 5.68865 13.1382 5.50108 13.0813 5.32656Z"
                  fill="#FFC761"
                />
              </svg>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0813 5.32656C13.0265 5.15429 12.921 5.00258 12.7785 4.89133C12.636 4.78008 12.4633 4.71448 12.2829 4.70313L9.0563 4.49531C9.05154 4.49474 9.04701 4.49292 9.04317 4.49004C9.03933 4.48716 9.03631 4.48332 9.03443 4.47891L7.8313 1.44375C7.76636 1.27606 7.65221 1.13193 7.50386 1.03029C7.35551 0.928651 7.17988 0.87426 7.00005 0.87426C6.82022 0.87426 6.64459 0.928651 6.49624 1.03029C6.34789 1.13193 6.23374 1.27606 6.1688 1.44375L4.96568 4.47891C4.96379 4.48332 4.96078 4.48716 4.95694 4.49004C4.9531 4.49292 4.94857 4.49474 4.9438 4.49531L1.71724 4.70313C1.53683 4.71448 1.36405 4.78008 1.22157 4.89133C1.07909 5.00258 0.973556 5.15429 0.9188 5.32656C0.861893 5.50108 0.858568 5.68865 0.909254 5.86508C0.959941 6.04151 1.06231 6.19871 1.20318 6.31641L3.67505 8.37266C3.68067 8.37827 3.68466 8.38531 3.68659 8.39302C3.68852 8.40072 3.68831 8.40881 3.68599 8.41641L2.94771 11.3203C2.89739 11.5168 2.90695 11.7238 2.97516 11.9148C3.04337 12.1058 3.16712 12.272 3.33052 12.3922C3.48968 12.5064 3.6793 12.5706 3.87512 12.5764C4.07094 12.5823 4.26405 12.5295 4.42974 12.425L6.99458 10.8008H7.00552L9.76724 12.5453C9.90891 12.6374 10.0741 12.6867 10.243 12.6875C10.4294 12.685 10.6106 12.6259 10.7626 12.518C10.911 12.4103 11.0234 12.2602 11.0849 12.0874C11.1464 11.9146 11.1542 11.7273 11.1071 11.55L10.3141 8.41641C10.3118 8.40881 10.3116 8.40072 10.3135 8.39302C10.3154 8.38531 10.3194 8.37827 10.3251 8.37266L12.7969 6.31641C12.9378 6.19871 13.0402 6.04151 13.0908 5.86508C13.1415 5.68865 13.1382 5.50108 13.0813 5.32656ZM12.2391 5.64375L9.76177 7.7C9.63023 7.81161 9.53277 7.958 9.48054 8.12242C9.42831 8.28683 9.42343 8.46263 9.46646 8.62969L10.2594 11.7633C10.2649 11.7852 10.2649 11.7906 10.2594 11.7961C10.2558 11.8031 10.2501 11.8089 10.243 11.8125H10.2321L7.47583 10.0625C7.3337 9.97208 7.1685 9.92461 7.00005 9.92578V1.75C7.00552 1.75 7.01099 1.75 7.01646 1.76641L8.22505 4.80156C8.28666 4.95957 8.3918 5.09687 8.52828 5.19754C8.66477 5.29821 8.82699 5.35812 8.99614 5.37031L12.2282 5.57813C12.2336 5.57813 12.2391 5.57813 12.2446 5.6C12.2501 5.62188 12.2446 5.63828 12.2391 5.64375V5.64375Z"
                  fill="#FFC761"
                />
              </svg>
            </div>
            <span className="text-xs text-body">4.8 (122)</span>
          </div>
        </div>
      </div>
      <div className="mb-8 flex w-full gap-14 bg-primary px-6 dark:text-sidebar">
        <div className="w-3/12"></div>
        <div className="flex w-9/12 items-center justify-start gap-4">
          <button
            className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold ${
              tab === "Overview"
                ? "bg-sidebar text-primary"
                : "text-sidebar hover:bg-secondary hover:text-primary"
            }`}
            onClick={() => setTab("Overview")}
          >
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.125 10.375H12.25V5.31914C12.25 5.19804 12.2249 5.07826 12.1762 4.96736C12.1276 4.85647 12.0564 4.75689 11.9673 4.67492L7.59227 0.54711C7.59013 0.545244 7.58812 0.543234 7.58625 0.541094C7.42517 0.394605 7.21527 0.313431 6.99754 0.313431C6.77981 0.313431 6.56991 0.394605 6.40883 0.541094L6.40281 0.54711L2.03273 4.67492C1.94359 4.75689 1.87244 4.85647 1.82377 4.96736C1.7751 5.07826 1.74998 5.19804 1.75 5.31914V10.375H0.875C0.758968 10.375 0.647688 10.4211 0.565641 10.5031C0.483594 10.5852 0.4375 10.6965 0.4375 10.8125C0.4375 10.9285 0.483594 11.0398 0.565641 11.1219C0.647688 11.2039 0.758968 11.25 0.875 11.25H13.125C13.241 11.25 13.3523 11.2039 13.4344 11.1219C13.5164 11.0398 13.5625 10.9285 13.5625 10.8125C13.5625 10.6965 13.5164 10.5852 13.4344 10.5031C13.3523 10.4211 13.241 10.375 13.125 10.375ZM2.625 5.31914L2.63102 5.31367L7 1.1875L11.3695 5.31258L11.3755 5.31805V10.375H8.75V7.75C8.75 7.51794 8.65781 7.29538 8.49372 7.13128C8.32962 6.96719 8.10706 6.875 7.875 6.875H6.125C5.89294 6.875 5.67038 6.96719 5.50628 7.13128C5.34219 7.29538 5.25 7.51794 5.25 7.75V10.375H2.625V5.31914ZM7.875 10.375H6.125V7.75H7.875V10.375Z"
                fill="currentColor"
              />
            </svg>
            Overview
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold ${
              tab === "Reviews"
                ? "bg-sidebar text-primary"
                : "text-sidebar hover:bg-secondary hover:text-primary"
            }`}
            onClick={() => setTab("Reviews")}
          >
            Reviews
          </button>
        </div>
      </div>
      <div className="mb-16 flex w-full gap-14 rounded-xl px-6">
        <div className="w-3/12"></div>
        <div className="w-9/12">
          <ControlledAccordion
            providerValue={providerValue}
            className="flex flex-col rounded-lg"
          >
            {sections &&
              sections.map((section, i) => {
                return (
                  <AccordionItem key={i} section={sections[i]}>
                    <div className="flex flex-col gap-4 ">
                      {section.resources.map((resource, j) => (
                        <Link
                          key={j}
                          href={`/courses/${resource.type}/${resource.id}`}
                        >
                          <div className="group flex items-center gap-4">
                            {getResourceSVG(resource.type)}
                            <p className="font-medium group-hover:text-primary">
                              {resource.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionItem>
                );
              })}
          </ControlledAccordion>

          <h2 className="mt-8 text-lg font-semibold text-primary">
            What You&apos;ll Learn
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 rounded-lg border border-border p-6">
            {objectives.map((objective, i) => (
              <div key={i} className="flex items-start justify-start gap-2">
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative top-1 shrink-0"
                >
                  <path
                    d="M13.1875 1.0625L5.3125 8.9375L1.375 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p key={i} className="">
                  {objective}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-lg font-semibold text-primary">
            Similar Courses
          </h2>
          {similarCourses.map((course, i) => (
            <div
              key={i}
              className="mt-4 flex items-start gap-4 rounded-lg border border-border p-4"
            >
              <Image
                src={course.image}
                alt="..."
                width={200}
                height={200}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">{course.title}</h3>
                <p className="mb-4 mt-2 flex items-center gap-2 text-sm text-body">
                  <span>By {course.author}</span>
                  <span>•</span>
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline"
                  >
                    <path
                      d="M9.30943 12.9086L12.8532 15.1586C13.3102 15.4469 13.8727 15.018 13.7391 14.4906L12.7126 10.4547C12.6848 10.3428 12.6892 10.2254 12.7253 10.1159C12.7614 10.0065 12.8276 9.9094 12.9165 9.83595L16.0946 7.18517C16.5094 6.84064 16.2985 6.14455 15.7571 6.10939L11.6087 5.8422C11.4955 5.83562 11.3866 5.7962 11.2955 5.72877C11.2043 5.66135 11.1348 5.56883 11.0954 5.46252L9.5485 1.5672C9.50755 1.45464 9.43295 1.35739 9.33484 1.28868C9.23672 1.21996 9.11984 1.18311 9.00006 1.18311C8.88027 1.18311 8.76339 1.21996 8.66528 1.28868C8.56716 1.35739 8.49257 1.45464 8.45162 1.5672L6.90475 5.46252C6.86532 5.56883 6.79578 5.66135 6.70463 5.72877C6.61348 5.7962 6.50466 5.83562 6.39146 5.8422L2.24303 6.10939C1.70162 6.14455 1.49068 6.84064 1.90553 7.18517L5.08365 9.83595C5.17248 9.9094 5.23875 10.0065 5.27483 10.1159C5.3109 10.2254 5.31532 10.3428 5.28756 10.4547L4.33834 14.1953C4.17662 14.8281 4.85162 15.3414 5.39303 14.9969L8.69068 12.9086C8.78316 12.8498 8.89047 12.8186 9.00006 12.8186C9.10964 12.8186 9.21696 12.8498 9.30943 12.9086V12.9086Z"
                      stroke="#FFC761"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {course.rating} ({course.raters})
                </p>
                <p className="flex items-center gap-6 text-sm text-body">
                  <span>
                    <svg
                      width="15"
                      height="18"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                    {course.duration} minutes
                  </span>
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline"
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
                    </svg>{" "}
                    {course.lessons} lessons
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
