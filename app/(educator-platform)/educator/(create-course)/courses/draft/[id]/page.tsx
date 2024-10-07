"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { KF_TITLE } from "@/utils/constants";
import { IntendedLearners } from "./intended-learners";
import { LandingPage } from "./landing-page";
import { Curriculum } from "./curriculum";
import { Pricing } from "./pricing";
import CourseMessages from "./course-messages";
import SubmitForReview from "./submit-for-review";
import { useUpdateCourse, useFetchCourse } from "@/hooks/api/educator-platform";
import { useUserDetail } from "@/hooks/api/user";

interface NumberBulletProps {
  currentStep: number;
  number: number;
}

const NumberBullet = ({ currentStep, number }: NumberBulletProps) => {
  return (
    <>
      {currentStep === number ? (
        <div className="flex size-6 items-center justify-center rounded-full bg-primary text-sidebar">
          {number}
        </div>
      ) : currentStep < number ? (
        <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280] text-sidebar">
          {number}
        </div>
      ) : (
        <div className="flex size-6 items-center justify-center rounded-full bg-[#228403]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M11.603.675a.656.656 0 0 1 .035.927L4.607 9.195a.656.656 0 0 1-.98-.019L.344 5.332a.656.656 0 0 1 .998-.852l2.802 3.282 6.53-7.051a.656.656 0 0 1 .927-.036Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default function CourseDraft() {
  const [step, setStep] = useState<string>("INTENDED_LEARNERS");
  const router = useRouter();
  const { id } = useParams();

  const { data: courseData, isLoading, error, isError } = useFetchCourse(id as string);
  const updateCourseMutation = useUpdateCourse();
  const userDetail = useUserDetail();

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "",
    level: "",
    category_id: 0,
    subcategory_id: 0,
    course_goals: "[]",
    course_reqs: "[]",
    course_for: "[]",
    taught: "",
    cover_image: "",
    cover_video: "",
  });

  useEffect(() => {
    if (courseData?.data?.data?.course) {
      const course = courseData.data.data.course;
      setCourseDetails({
        title: course.title || "",
        subtitle: course.subtitle || "",
        description: course.description || "",
        language: course.language || "",
        level: course.level || "All",
        category_id: course.category_id || 0,
        subcategory_id: course.subcategory_id || 0,
        course_goals: course.course_goals || "[]",
        course_reqs: course.course_reqs || "[]",
        course_for: course.course_for || "[]",
        taught: course.taught || "",
        cover_image: course.cover_image || "",
        cover_video: course.cover_video || "",
      });
    }
  }, [courseData]);

  const handleCourseGoalsUpdate = (updatedGoals: string) => {
    setCourseDetails(prev => ({
      ...prev,
      course_goals: updatedGoals
    }));
  };

  const handleCourseReqsUpdate = (updatedReqs: string) => {
    setCourseDetails(prev => ({
      ...prev,
      course_reqs: updatedReqs
    }));
  };

  const handleCourseForUpdate = (updatedFor: string) => {
    setCourseDetails(prev => ({
      ...prev,
      course_for: updatedFor
    }));
  };

  const handleTitleUpdate = (updatedTitle: string) => {
    setCourseDetails(prev => ({
      ...prev,
      title: updatedTitle
    }));
  };

  const handleSubtitleUpdate = (updatedSubtitle: string) => {
    setCourseDetails(prev => ({
      ...prev,
      subtitle: updatedSubtitle
    }));
  };

  const handleDescriptionUpdate = (updatedDescription: string) => {
    setCourseDetails(prev => ({
      ...prev,
      description: updatedDescription
    }));
  };

  const handleTaughtUpdate = (updatedTaught: string) => {
    setCourseDetails(prev => ({
      ...prev,
      taught: updatedTaught
    }));
  };

  const handleCategoryUpdate = (updatedCategory: number) => {
    setCourseDetails(prev => ({
      ...prev,
      category_id: updatedCategory
    }));
  };

  const handleLanguageUpdate = (updatedLanguage: string) => {
    setCourseDetails(prev => ({
      ...prev,
      language: updatedLanguage
    }));
  };

  const handleLevelUpdate = (updatedLevel: string) => {
    setCourseDetails(prev => ({
      ...prev,
      level: updatedLevel
    }));
  };

  const handleCoverImageUpdate = (updatedCoverImage: string) => {
    setCourseDetails(prev => ({
      ...prev,
      cover_image: updatedCoverImage
    }));
  };

  const handleCoverVideoUpdate = (updatedCoverVideo: string) => {
    setCourseDetails(prev => ({
      ...prev,
      cover_video: updatedCoverVideo
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      await updateCourseMutation.mutateAsync({
        uuid: id as string,
        ...courseDetails, // This now includes cover_image
        created_by: `4610212f-4980-4b51-a30d-9b40c6d44edd`,
        published: 0,
        create: 0,
        user_id: ``,
        course_instructors: "[]",
        duration: 0,
        price: "",
        data_status: 0,
        outline: ""
      });
      // console.log("Course updated successfully");
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  }, [id, courseDetails, updateCourseMutation, userDetail.data?.data.data.wallet_addr]);

  if (isLoading) return <div>Loading course data...</div>;
  if (isError) return <div>Error loading course data: {error.message}</div>;

  interface StepDict {
    [key: string]: number;
  }

  const stepDict: StepDict = {
    INTENDED_LEARNERS: 1,
    LANDING_PAGE: 1,
    CURRICULUM: 2,
    AI_APPS: 2,
    PRICING: 3,
    PROMOTIONS: 3,
    COURSE_MESSAGES: 3,
    SUBMIT_FOR_REVIEW: 4,
  };

  return (
    <>
    <title>{KF_TITLE + "Course Draft - " + courseData?.data?.data?.course?.title}</title>
      <div className="flex h-12 w-full items-center justify-between bg-primary px-8 text-sidebar shadow-lg">
        <div className="flex items-center gap-12">
          <button
            className="flex items-center gap-3 text-sidebar hover:text-secondary"
            onClick={() => router.push("/educator/existing")}
          >
            <svg
              width="8"
              height="13"
              viewBox="0 1 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 2.29965L6 0.889648L0 6.88965L6 12.8896L7.41 11.4796L2.83 6.88965L7.41 2.29965Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-4">
            <h1 className="font-bold">{courseData?.data?.data?.course?.title}</h1>
            <span className="bg-[#6B7280] px-2 py-1 text-xs font-semibold uppercase text-white">
              Draft
            </span>
          </div>
        </div>
        <button 
          className="rounded-lg bg-sidebar px-6 py-1 text-primary hover:bg-secondary"
          onClick={handleSave}
        >
          <span className="text-sm font-bold">Save</span>
        </button>
      </div>

      <div className="flex items-start gap-16 bg-container px-8 py-8 max-sm:flex-col">
        <div className="mt-8 flex w-fit items-start gap-4">
          <div className="flex flex-col items-center justify-start gap-4 rounded-full bg-primary-light p-1 text-white">
            <NumberBullet currentStep={stepDict[step]} number={1} />
            {stepDict[step] === 1 &&
              [...Array(2)].map((e, i) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  fill="none"
                  viewBox="-2 -2 6 6"
                  className="size-6"
                  key={i}
                >
                  <rect
                    width="2"
                    height="2"
                    fill="var(--color-primary)"
                    rx="1"
                  />
                </svg>
              ))}
            <NumberBullet currentStep={stepDict[step]} number={2} />
            {stepDict[step] === 2 &&
              [...Array(2)].map((e, i) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  fill="none"
                  viewBox="-2 -2 6 6"
                  className="size-6"
                  key={i}
                >
                  <rect
                    width="2"
                    height="2"
                    fill="var(--color-primary)"
                    rx="1"
                  />
                </svg>
              ))}
            <NumberBullet currentStep={stepDict[step]} number={3} />
            {stepDict[step] === 3 &&
              [...Array(3)].map((e, i) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  fill="none"
                  viewBox="-2 -2 6 6"
                  className="size-6"
                  key={i}
                >
                  <rect
                    width="2"
                    height="2"
                    fill="var(--color-primary)"
                    rx="1"
                  />
                </svg>
              ))}
            <NumberBullet currentStep={stepDict[step]} number={4} />
          </div>

          <div className="flex flex-col items-start justify-start gap-4 pt-1">
            <button
              onClick={() => setStep("INTENDED_LEARNERS")}
              disabled={stepDict[step] === 1}
              className="text-left font-semibold text-heading enabled:hover:text-secondary"
            >
              Plan your course
            </button>
            {stepDict[step] === 1 && (
              <>
                <button
                  onClick={() => setStep("INTENDED_LEARNERS")}
                  disabled={step === "INTENDED_LEARNERS"}
                  className={`ml-4 text-left ${step === "INTENDED_LEARNERS" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  Intended learners
                </button>
                <button
                  onClick={() => setStep("LANDING_PAGE")}
                  disabled={step === "LANDING_PAGE"}
                  className={`ml-4 text-left ${step === "LANDING_PAGE" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  Landing page
                </button>
              </>
            )}
            <button
              onClick={() => setStep("CURRICULUM")}
              disabled={stepDict[step] === 2}
              className="text-left font-semibold text-heading enabled:hover:text-secondary"
            >
              Create your content
            </button>
            {stepDict[step] === 2 && (
              <>
                <button
                  onClick={() => setStep("CURRICULUM")}
                  disabled={step === "CURRICULUM"}
                  className={`ml-4 text-left ${step === "CURRICULUM" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setStep("AI_APPS")}
                  disabled={step === "AI_APPS"}
                  className={`ml-4 text-left ${step === "AI_APPS" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  AI apps
                </button>
              </>
            )}
            <button
              onClick={() => setStep("PRICING")}
              disabled={stepDict[step] === 3}
              className="text-left font-semibold text-heading enabled:hover:text-secondary"
            >
              Publish your course
            </button>
            {stepDict[step] === 3 && (
              <>
                <button
                  onClick={() => setStep("PRICING")}
                  disabled={step === "PRICING"}
                  className={`ml-4 text-left ${step === "PRICING" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setStep("PROMOTIONS")}
                  disabled={step === "PROMOTIONS"}
                  className={`ml-4 text-left ${step === "PROMOTIONS" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  Promotions
                </button>
                <button
                  onClick={() => setStep("COURSE_MESSAGES")}
                  disabled={step === "COURSE_MESSAGES"}
                  className={`ml-4 text-left ${step === "COURSE_MESSAGES" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
                >
                  Course messages
                </button>
              </>
            )}
            <button
              onClick={() => setStep("SUBMIT_FOR_REVIEW")}
              disabled={stepDict[step] === 4}
              className="text-left font-semibold text-heading enabled:hover:text-secondary"
            >
              Submit for review
            </button>
          </div>
        </div>

        <main className="w-4/5 max-w-[1000px] rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
        {(() => {
          switch (step) {
            case "INTENDED_LEARNERS":
              return <IntendedLearners 
                courseGoals={courseDetails.course_goals}
                courseReqs={courseDetails.course_reqs}
                courseFor={courseDetails.course_for}
                onUpdateGoals={handleCourseGoalsUpdate}
                onUpdateReqs={handleCourseReqsUpdate}
                onUpdateFor={handleCourseForUpdate}
              />;
            case "LANDING_PAGE":
              return <LandingPage
                title={courseDetails.title}
                subtitle={courseDetails.subtitle}
                description={courseDetails.description}
                taught={courseDetails.taught}
                category_id={courseDetails.category_id}
                language={courseDetails.language}
                level={courseDetails.level}
                onUpdateTitle={handleTitleUpdate}
                onUpdateSubtitle={handleSubtitleUpdate}
                onUpdateDescription={handleDescriptionUpdate}
                onUpdateTaught={handleTaughtUpdate}
                onUpdateCategory={handleCategoryUpdate}
                onUpdateLanguage={handleLanguageUpdate}
                onUpdateLevel={handleLevelUpdate}
                cover_image={courseDetails.cover_image}
                onUpdateCoverImage={handleCoverImageUpdate}
                cover_video={courseDetails.cover_video}
                onUpdateCoverVideo={handleCoverVideoUpdate}
                created_by={courseData?.data?.data?.course?.created_by || ""}
              />;
            case "CURRICULUM":
              return <Curriculum />;
            case "PRICING":
              return <Pricing />;
            case "COURSE_MESSAGES":
              return <CourseMessages />;
            case "SUBMIT_FOR_REVIEW":
              return <SubmitForReview />;
            default:
              return null;
          }
        })()}
      </main>
      </div>
    </>
  );
}
