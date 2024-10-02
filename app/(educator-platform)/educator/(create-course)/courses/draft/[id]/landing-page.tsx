import { useRouter } from "next/navigation";
import Image from "next/image";
import Tooltip from "@/components/tooltip";

import { useCategoryIndex, useLanguageIndex, useLevelIndex } from "@/hooks/api/educator-platform";

export const LandingPage = ({ title, subtitle, description, taught, category_id, language, level, onUpdateTitle, onUpdateSubtitle, onUpdateDescription, onUpdateTaught, onUpdateCategory, onUpdateLanguage, onUpdateLevel }: { title: string, subtitle: string, description: string, taught: string, category_id: number, language: string, level: string, onUpdateTitle: (value: string) => void, onUpdateSubtitle: (value: string) => void, onUpdateDescription: (value: string) => void, onUpdateTaught: (value: string) => void, onUpdateCategory: (value: number) => void, onUpdateLanguage: (value: string) => void, onUpdateLevel: (value: string) => void }) => {
  const router = useRouter();

  const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError } = useCategoryIndex();
  const { data: languagesData, isLoading: isLanguagesLoading, error: languagesError } = useLanguageIndex();
  const { data: levelsData, isLoading: isLevelsLoading, error: levelsError } = useLevelIndex();

  const categories = categoriesData?.data?.data?.categories || {};
  const languages = languagesData?.data?.data?.languages || {};
  const levels = levelsData?.data?.data?.levels || [];

  return (
    <main className="flex w-3/4 max-w-[1000px] flex-col gap-8 rounded-2xl border-2 border-border bg-sidebar p-3 text-sm md:p-10 xl:mt-4">
      <h1 className="text-lg font-semibold text-primary">
        Course Landing Page
      </h1>
      <p className="text-body">
        Your course landing page is crucial to your success on Open Campus. If
        it&#39;s done right, it can also help you gain visibility in search
        engines like Google. As you complete this section, think about creating
        a compelling Course Landing Page that demonstrates why someone would
        want to enroll in your course. Learn more about{" "}
        <span className="cursor-pointer text-primary underline hover:text-secondary">
          creating your course landing page
        </span>{" "}
        and{" "}
        <span className="cursor-pointer text-primary underline hover:text-secondary">
          course title standards.
        </span>
      </p>

      {/* Course Title Section */}
      <section>
        <h2 className="font-bold text-heading">Course title</h2>
        <div className="relative w-full">
          <input
            className="input-text mt-2 w-full font-normal"
            type="text"
            placeholder="Learn Java from Scratch"
            value={title}
            onChange={(e) => onUpdateTitle(e.target.value)}
          />
          <span className="absolute right-4 top-5 text-[#6B7280]">
            {title.length}
          </span>
        </div>
        <p className="mt-2 text-xs text-body">
          Your title should be a mix of attention-grabbing, informative, and
          optimized for search
        </p>
      </section>

      {/* Course Subtitle Section */}
      <section>
        <h2 className="font-bold text-heading">Course subtitle</h2>
        <div className="relative w-full">
          <input
            className="input-text mt-2 w-full font-normal"
            type="text"
            placeholder="Insert your course subtitle"
            value={subtitle}
            onChange={(e) => onUpdateSubtitle(e.target.value)}
          />
          <span className="absolute right-4 top-5 text-[#6B7280]">
            {subtitle.length}
          </span>
        </div>
        <p className="mt-2 text-xs text-body">
          Use 1 or 2 related keywords, and mention 3-4 of the most important
          areas that you've covered during your course.
        </p>
      </section>

      {/* Course Description Section */}
      <section>
        <h2 className="font-bold text-heading">Course description</h2>
        <div className="relative mt-2 w-full">
          <div className="flex flex-col rounded-lg border border-border">
            <div className="flex items-center gap-8 border-b-2 border-border px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="13"
                fill="none"
                viewBox="0 0 10 13"
              >
                <path
                  fill="#525252"
                  d="M8 6.425C8.81 5.867 9.377 4.95 9.377 4.1c0-1.883-1.459-3.333-3.334-3.333H.834v11.666h5.867c1.741 0 3.091-1.416 3.091-3.158 0-1.267-.716-2.35-1.791-2.85ZM3.335 2.85h2.5c.692 0 1.25.558 1.25 1.25s-.558 1.25-1.25 1.25h-2.5v-2.5Zm2.917 7.5H3.334v-2.5h2.917c.691 0 1.25.558 1.25 1.25s-.559 1.25-1.25 1.25Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="13"
                fill="none"
                viewBox="0 0 10 13"
              >
                <path
                  fill="#525252"
                  d="M3.333.767v2.5h1.842l-2.85 6.666H0v2.5h6.667v-2.5H4.825l2.85-6.666H10v-2.5H3.333Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                fill="none"
                viewBox="0 0 17 15"
              >
                <path
                  fill="#525252"
                  d="M.666 11.767h1.667v.416h-.834v.834h.834v.416H.666v.834h2.5v-3.334h-2.5v.834Zm.833-7.5h.834V.933H.666v.834h.833v2.5Zm-.833 2.5h1.5l-1.5 1.75v.75h2.5v-.834h-1.5l1.5-1.75v-.75h-2.5v.834Zm4.167-5v1.666h11.666V1.767H4.833Zm0 11.666h11.666v-1.666H4.833v1.666Zm0-5h11.666V6.767H4.833v1.666Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="13"
                fill="none"
                viewBox="0 0 16 13"
              >
                <path
                  fill="#525252"
                  d="M1.334 5.35c-.692 0-1.25.558-1.25 1.25s.558 1.25 1.25 1.25 1.25-.558 1.25-1.25-.558-1.25-1.25-1.25Zm0-5C.642.35.084.908.084 1.6s.558 1.25 1.25 1.25 1.25-.558 1.25-1.25S2.026.35 1.334.35Zm0 10c-.692 0-1.25.567-1.25 1.25s.567 1.25 1.25 1.25a1.26 1.26 0 0 0 1.25-1.25c0-.683-.558-1.25-1.25-1.25Zm2.5 2.083h11.667v-1.666H3.834v1.666Zm0-5h11.667V5.767H3.834v1.666Zm0-6.666v1.666h11.667V.767H3.834Z"
                />
              </svg>
            </div>
            <textarea
              className="size-full border-none px-3 text-sm"
              placeholder="Insert your course description"
              value={description}
              onChange={(e) => onUpdateDescription(e.target.value)}
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-body">
          Description should have minimum 200 words.
        </p>
      </section>

      {/* Basic Info Section */}
      <section>
        <h2 className="font-bold text-heading">Basic info</h2>
        <div className="mt-2 grid w-full grid-cols-3 gap-4">
          
          {/* Language */}
          <select
            name="language"
            id="language"
            onChange={(e) => onUpdateLanguage(e.target.value)}
            value={language || ""}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          >
            <option value="">-- Select Language --</option>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name as string}
              </option>
            ))}
          </select>

          {/* Level */}
          <select
            name="level"
            id="level"
            onChange={(e) => onUpdateLevel(e.target.value)}
            value={level || ""}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          >
            <option value="">-- Select Level --</option>
            {levels.map((levelOption: any) => (
              <option key={levelOption} value={levelOption}>
                {levelOption}
              </option>
            ))}
          </select>
          
          {/* Category */}
          <select
            name="category"
            id="category"
            onChange={(e) => onUpdateCategory(Number(e.target.value))}
            value={category_id || ""}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          >
            <option value="">-- Select category --</option>
            {Object.entries(categories).map(([id, name]) => (
              <option key={id} value={Number(id)}>
                {name as string}
              </option>
            ))}
          </select>
          
          {/* Subcategory */}
          <select
            name="subcategory"
            id="subcategory"
            onChange={(e) => console.log(e.target.value)}
            defaultValue="select-subcategory"
            className="col-start-3 w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-heading placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          >
            <option value="select-subcategory">-- Select Subcategory --</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="c">C</option>
          </select>
        </div>
      </section>

      {/* Taught Section */}
      <section>
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-heading">
            What is primarily taught in your course?
          </h2>
          <Tooltip className="ml-2">
            <div className="whitespace-nowrap text-center text-xs">
              Built with{" "}
              <a
                className="underline"
                href="https://www.chartjs.org/"
                target="_blank"
                rel="noreferrer"
              >
                Chart.js
              </a>
            </div>
          </Tooltip>
        </div>
        <input
          className="input-text mt-2 w-full font-normal xl:w-1/2"
          type="text"
          placeholder="e.g. Landscape Photography"
          value={taught}
          onChange={(e) => onUpdateTaught(e.target.value)}
        />
      </section>

      {/* Course Image Section */}
      <section>
        <h2 className="font-bold text-heading">Course image</h2>
        <div className="flex gap-4">
          <figure className="mt-2 flex h-60 w-5/12 items-center justify-center rounded-lg border border-border bg-container">
            <Image
              src="/images/create-quiz-success.svg"
              alt="Course image default image"
              width={220}
              height={220}
            />
          </figure>
          <div className="flex w-7/12 flex-col gap-4">
            <p className="text-body">
              Upload your course image here. It must meet our{" "}
              <span className="cursor-pointer text-primary underline hover:text-secondary">
                course image quality standards
              </span>{" "}
              to be accepted. Important guidelines: 750x422 pixels; .jpg,
              .jpeg,. gif, or .png. no text on the image.
            </p>
            <div className="flex items-center rounded-lg border border-border">
              <div className="w-9/12 border-r border-border bg-container p-3 text-body">
                No file selected
              </div>
              <div className="flex w-3/12 items-center justify-center p-3 font-semibold text-heading">
                <span>Upload File</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Video Section */}
      <section>
        <h2 className="font-bold text-heading">Promotional video</h2>
        <div className="flex gap-4">
          <figure className="mt-2 flex h-60 w-5/12 items-center justify-center rounded-lg border border-border bg-container">
            <Image
              src="/images/educators/promotional-video.svg"
              alt="Promotional video default image"
              width={400}
              height={400}
            />
          </figure>
          <div className="flex w-7/12 flex-col gap-4">
            <p className="text-body">
              Your promo video is a quick and compelling way for students to
              preview what they&#39;ll learn in your course. Students
              considering your course are more likely to enroll if your promo
              video is well-made.
            </p>
            <div className="flex items-center rounded-lg border border-border">
              <div className="w-9/12 border-r border-border bg-container p-3 text-body">
                No file selected
              </div>
              <div className="flex w-3/12 items-center justify-center p-3 font-semibold text-heading">
                <span>Upload File</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Profile Section */}
      <section>
        <h2 className="font-bold text-heading">Instructor profile(s)</h2>
        <div className="mt-2 flex items-start gap-4 bg-primary-light p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="none"
            viewBox="0 0 24 25"
          >
            <path
              fill="var(--color-heading)"
              d="M13.333 13.823h-2.666v-8h2.666v8ZM12 19.557a1.731 1.731 0 1 1 0-3.462 1.731 1.731 0 0 1 0 3.462ZM16.973.49H7.027L0 7.517v9.946l7.027 7.027h9.946L24 17.463V7.517L16.973.49Z"
            />
          </svg>
          <div className="flex w-full flex-col gap-2">
            <h3 className="font-bold">
              All visible instructors of this course must complete their profile
              before the course can be published.
            </h3>
            <p className="text-xs">
              This includes name, image, and a short summary of your background
              50 words minimum.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            fill="none"
            viewBox="0 0 20 17"
          >
            <path
              fill="#F4522D"
              d="M.834 16.78h18.333L10.001.947.834 16.78Zm10-2.5H9.167v-1.667h1.667v1.667Zm0-3.333H9.167V6.78h1.667v4.167Z"
            />
          </svg>
          <div className="flex size-10 items-center justify-center rounded-full bg-heading text-sidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              fill="none"
              viewBox="0 0 16 17"
            >
              <path
                fill="#fff"
                d="M8 8.28c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
              />
            </svg>
          </div>
          <span className="font-medium text-primary">Ray Smith</span>
        </div>
        <div className="mt-2 bg-primary-light p-4">
          <h3 className="font-bold">Incomplete</h3>
          <p>Your instructor image is required.</p>
          <button className="cursor-pointer text-primary underline hover:text-secondary">
            Update your profile.
          </button>
        </div>
      </section>
    </main>
  );
};