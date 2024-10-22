import Link from "next/link";
import Image from "next/image";

import CoursesIcon from "@/public/images/educators/courses.svg";

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const width = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full bg-[#393E44]">
      <div
        className="bg-primary p-1 text-center text-xs font-medium leading-none text-blue-100"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const Course = ({ course }: any) => {
  if (course.published) {
    return (
      <div className="flex cursor-pointer flex-row gap-4 rounded-2xl border border-border">
        <Image src={CoursesIcon} alt="Courses" />
        <div className="flex w-full flex-col justify-between p-3 sm:flex-row">
          <div className="flex w-full flex-col justify-between sm:w-5/12">
            <h3 className="font-medium">{course.title}</h3>
            <p className="text-sm text-body">
              <span className="font-bold uppercase">Public</span>{" "}
              &nbsp;&nbsp;Public
            </p>
          </div>
          <div className="my-auto mr-3 w-full sm:w-1/2">
            <p className="text-sm font-medium">Course published</p>
            <ProgressBar current={5} total={5} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link href={`/educator-platform/courses/draft/${course.uuid}`}>
        <div className="group relative flex cursor-pointer flex-row gap-4 rounded-2xl border border-border">
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 bg-opacity-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black/80">
            <p className=" font-semibold text-primary">Edit / manage course</p>
          </div>
          <Image src={CoursesIcon} alt="Courses" className="z-0" />
          <div className="flex w-full flex-col justify-between p-3 sm:flex-row">
            <div className="flex w-full flex-col justify-between sm:w-5/12">
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-body">
                <span className="font-bold uppercase">Draft</span>{" "}
                &nbsp;&nbsp;Public
              </p>
            </div>
            <div className="my-auto mr-3 w-full sm:w-1/2">
              <p className="text-sm font-medium">Finish your course</p>
              <ProgressBar current={1} total={5} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

interface CourseListProps {
  courses: any;
}

export const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="flex flex-col space-y-6">
      {courses.map((course: any, index: number) => (
        <Course key={index} course={course} />
      ))}
    </div>
  );
};
