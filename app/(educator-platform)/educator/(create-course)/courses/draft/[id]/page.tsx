import { Pricing } from "./pricing";
import CourseMessages from "./course-messages";
import SubmitForReview from "./submit-for-review";

export default function CourseDraft() {
  return (
    <>
      <div className="flex h-12 w-full items-center justify-between bg-primary px-8 text-white">
        <div className="flex items-center gap-12">
          <span>Back to Dashboard</span>
          <div className="flex items-center items-center gap-4">
            <h1 className="font-bold">Learn Java from Scratch</h1>
            <span className="text-xs font-medium uppercase">Draft</span>
          </div>
        </div>
      </div>
      <div className="flex max-w-[1300px] gap-6 px-8 py-8">
        <div className="grid w-1/5 grid-cols-[10%_90%] place-content-center place-items-start gap-4">
          <div className="relative size-7 rounded-full bg-primary">
            <span className="absolute left-3 top-1 w-fit text-white">1</span>
          </div>
          <span className="font-semibold text-heading">Plan your course</span>
        </div>
        <main className="w-4/5 rounded-2xl border-2 border-border bg-sidebar p-3 md:p-10 xl:mt-4">
          <SubmitForReview />
        </main>
      </div>
    </>
  );
}
