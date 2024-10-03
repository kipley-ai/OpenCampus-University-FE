"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { KF_TITLE } from "@/utils/constants";
import { IntendedLearners } from "./intended-learners";
import { LandingPage } from "./landing-page";
import { Pricing } from "./pricing";
import CourseMessages from "./course-messages";
import SubmitForReview from "./submit-for-review";
import { useUpdateCourse, useFetchCourse } from "@/hooks/api/educator-platform";
import { useUserDetail } from "@/hooks/api/user";

export default function CourseDraft() {
  const [step, setStep] = useState("INTENDED_LEARNERS");
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
      console.log("Course updated successfully");
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  }, [id, courseDetails, updateCourseMutation, userDetail.data?.data.data.wallet_addr]);

  if (isLoading) return <div>Loading course data...</div>;
  if (isError) return <div>Error loading course data: {error.message}</div>;

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
      <div className="flex items-start gap-16 bg-container px-8 py-8">
        <div className="mt-8 flex w-fit items-center gap-4">
          <div className="flex flex-col items-center justify-start gap-4 rounded-full bg-primary-light p-1 text-white">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary text-sidebar">
              1
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              fill="none"
              viewBox="-2 -2 6 6"
              className="size-6"
            >
              <rect width="2" height="2" fill="var(--color-primary)" rx="1" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              fill="none"
              viewBox="-2 -2 6 6"
              className="size-6"
            >
              <rect width="2" height="2" fill="var(--color-primary)" rx="1" />
            </svg>

            <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280]">
              2
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280]">
              3
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-[#6B7280]">
              4
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-4">
            <button className="font-semibold text-heading">
              Plan your course
            </button>
            <button
              onClick={() => setStep("INTENDED_LEARNERS")}
              disabled={step === "INTENDED_LEARNERS"}
              className={`ml-4 ${step === "INTENDED_LEARNERS" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
            >
              Intended learners
            </button>
            <button
              onClick={() => setStep("LANDING_PAGE")}
              disabled={step === "LANDING_PAGE"}
              className={`ml-4 ${step === "LANDING_PAGE" ? "font-semibold text-primary" : "font-medium text-[#6B7280] hover:text-secondary"}`}
            >
              Landing page
            </button>
            <button className="font-semibold text-heading">
              Create your content
            </button>
            <button className="font-semibold text-heading">
              Publish your course
            </button>
            <button className="font-semibold text-heading">
              Submit for review
            </button>
          </div>
        </div>
        <main className="w-4/5 rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
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