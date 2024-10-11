import Image from "next/image";
import Link from "next/link";

export function CourseCard({ course }: { course: any }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="flex h-full w-full cursor-pointer flex-col gap-3 rounded-2xl border-2 border-border p-4 hover:bg-secondary">
        <div className="relative aspect-video w-full">
          <Image
            src={course.image}
            alt="Course Thumbnail"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <div className="w-fit rounded-lg bg-primary-light px-3 py-1 text-sm text-primary dark:bg-primary-dark dark:text-heading">
              <span>{course.category}</span>
            </div>
            <h2 className="mt-2 text-lg font-medium leading-tight">{course.title}</h2>
          </div>
          <div className="mt-auto flex items-center gap-6 md:mr-6">
            <div className="flex items-center gap-1 text-body">
              <svg
                width="15"
                height="18"
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
              <p className="text-sm text-body">{course.duration}</p>
            </div>
            <div className="flex items-center gap-1 text-body">
              <svg
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
              <p className="text-sm">{course.lessons} lessons</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
