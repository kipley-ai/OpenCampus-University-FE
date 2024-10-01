"use client";

import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TitleInput } from "./title-input";
import { CategoryInput } from "./category-input";
import { useCreateCourse } from "@/hooks/api/educator-platform";

export default function CreateCoursePage() {
  const [step, setStep] = useState<number>(1);
  const [courseData, setCourseData] = useState({
    title: "",
    category_id: "",
  });

  const router = useRouter();
  const createCourseMutation = useCreateCourse();

  const handleCreateCourse = async () => {
    try {
      await createCourseMutation.mutateAsync({
        ...courseData,
        created_by: "", // Add the missing properties
        level: "",
        published: 0,
        create: 0,
        user_id: "",
        subtitle: "",
        outline: "",
        language: "",
        description: "",
        taught: "",
        course_for: [],
        course_instructors: [],
        course_goals: [],
        duration: 0,
        course_reqs: [],
        subcategory_id: 0,
        cover_image: "",
        cover_video: "",
        price: "0.00",
        data_status: 0,
        category_id: parseInt(courseData.category_id)
      });
      router.push("/educator/existing");
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="relative flex h-dvh flex-1 grow flex-col overflow-y-auto text-heading">
      <title className="sr-only">Create Course</title>
      <Header />
      <main className="flex max-w-[1100px] grow flex-col items-center self-center p-3 md:p-6 xl:w-5/6 xl:pl-8 xl:pr-0 xl:pt-4">
        {(() => {
          switch (step) {
            case 1:
              return <TitleInput value={courseData.title} onChange={(title) => setCourseData({ ...courseData, title })} />;
            case 2:
              return <CategoryInput value={courseData.category_id} onChange={(category_id) => setCourseData({ ...courseData, category_id })} />;
            default:
              return null;
          }
        })()}
      </main>
      <footer className="flex items-center justify-between border-t border-border p-3">
        <button
          className="btn-secondary border-heading px-4 py-2 font-bold text-heading enabled:hover:bg-secondary enabled:hover:text-heading"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Back
        </button>
        <button
          className="btn-primary px-4 py-2 font-bold"
          onClick={
            step === 2
              ? handleCreateCourse
              : () => setStep(step + 1)
          }
        >
          {step === 2 ? "Create Course" : "Continue"}
        </button>
      </footer>
    </div>
  );
}
