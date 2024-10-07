import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const IntendedLearners = ({ courseGoals, courseReqs, courseFor, onUpdateGoals, onUpdateReqs, onUpdateFor }: { courseGoals: string, courseReqs: string, courseFor: string, onUpdateGoals: (value: string) => void, onUpdateReqs: (value: string) => void, onUpdateFor: (value: string) => void }) => {
  const [goals, setGoals] = useState(["", "", "", ""]);
  const [reqs, setReqs] = useState([""]);
  const [forWhom, setForWhom] = useState([""]);

  useEffect(() => {
    if (courseGoals) {
      const parsedGoals = JSON.parse(courseGoals);
      setGoals(parsedGoals.length >= 4 ? parsedGoals : [...parsedGoals, ...Array(4 - parsedGoals.length).fill("")]);
    }
  }, [courseGoals]);

  useEffect(() => {
    if (courseReqs) {
      const parsedReqs = JSON.parse(courseReqs);
      setReqs(parsedReqs.length > 0 ? parsedReqs : [""]);
    }
  }, [courseReqs]);

  useEffect(() => {
    if (courseFor) {
      const parsedFor = JSON.parse(courseFor);
      setForWhom(parsedFor.length > 0 ? parsedFor : [""]);
    }
  }, [courseFor]);

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value.slice(0, 160); // Limit to 160 characters
    setGoals(newGoals);
    onUpdateGoals(JSON.stringify(newGoals.filter(Boolean)));
  };

  const handleReqChange = (index: number, value: string) => {
    const newReqs = [...reqs];
    newReqs[index] = value.slice(0, 160); // Limit to 160 characters
    setReqs(newReqs);
    onUpdateReqs(JSON.stringify(newReqs.filter(Boolean)));
  };

  const handleForChange = (index: number, value: string) => {
    const newFor = [...forWhom];
    newFor[index] = value.slice(0, 160); // Limit to 160 characters
    setForWhom(newFor);
    onUpdateFor(JSON.stringify(newFor.filter(Boolean)));
  };

  const addMoreGoal = () => {
    setGoals([...goals, ""]);
  };

  const addMoreReq = () => {
    setReqs([...reqs, ""]);
  };

  const addMoreFor = () => {
    setForWhom([...forWhom, ""]);
  };

  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 text-sm">
      <h1 className="text-lg font-semibold text-primary">Intended Learners</h1>
      <p className="text-body">
        The following descriptions will be publicly visible on your{" "}
        <span
          className="cursor-pointer text-primary underline hover:text-secondary"
          onClick={() => router.push("/courses")}
        >
          Course Landing Page
        </span>{" "}
        and will have a direct impact on your course performance. These
        descriptions will help learners decide if your course is right for them.
      </p>

      {/* Course Goal Section */}
      <section>
        <h2 className="font-bold text-heading">
          What will students learn in your course?
        </h2>
        <p className="mt-2 text-body">
          You must enter at least 4{" "}
          <span className="text-primary underline">
            learning objectives or outcomes
          </span>{" "}
          that learners can expect to achieve after completing your course.
        </p>
        {goals.map((goal, index) => (
          <div key={index} className="relative w-full xl:w-10/12">
            <input
              className="input-text mt-4 w-full font-normal"
              type="text"
              value={goal}
              onChange={(e) => handleGoalChange(index, e.target.value)}
              placeholder={`Example: ${
                index === 0 ? "Define the roles and responsibilities of a project manager" :
                index === 1 ? "Estimate project timelines and budgets" :
                index === 2 ? "Identify and manage project risks" :
                index === 3 ? "Complete a case study to manage a project from conception to completion" :
                "Enter another learning objective"
              }`}
            />
            <span className="absolute right-4 top-7 text-sm text-[#6B7280]">
              {160 - goal.length}
            </span>
          </div>
        ))}
        <button
          className="mt-6 flex items-center gap-2 font-bold leading-none text-primary hover:text-secondary"
          onClick={addMoreGoal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
          </svg>
          Add more
        </button>
      </section>

      {/* Course Requirements Section */}
      <section>
        <h2 className="font-bold text-heading">
          What are the requirements or prerequisites for taking your course?
        </h2>
        <p className="mt-2 text-body">
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </p>
        {reqs.map((req, index) => (
          <div key={index} className="relative w-full xl:w-10/12">
            <input
              className="input-text mt-4 w-full font-normal"
              type="text"
              value={req}
              onChange={(e) => handleReqChange(index, e.target.value)}
              placeholder="Example: No programming experience needed. You will learn everything you need to know"
            />
            <span className="absolute right-4 top-7 text-sm text-[#6B7280]">
              {160 - req.length}
            </span>
          </div>
        ))}
        <button 
          className="mt-6 flex items-center gap-2 font-bold leading-none text-primary hover:text-secondary"
          onClick={addMoreReq}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
          </svg>
          Add more
        </button>
      </section>

      {/* Course For Section */}
      <section>
        <h2 className="font-bold text-heading">Who is this course for?</h2>
        <p className="mt-2 text-body">
          Write a clear description of the{" "}
          <span className="text-primary underline">intended learners</span> for
          your course who will find your course content valuable. This will help
          you attract the right learners to your course.
        </p>
        {forWhom.map((forWhom: string, index: number) => (
          <div key={index} className="relative w-full xl:w-10/12">
            <input
              className="input-text mt-4 w-full font-normal"
              type="text"
              value={forWhom}
              onChange={(e) => handleForChange(index, e.target.value)}
              placeholder="Example: Beginner Python developers curious about data science"
            />
            <span className="absolute right-4 top-7 text-sm text-[#6B7280]">
              {160 - forWhom.length}
            </span>
          </div>
        ))}
        <button 
          className="mb-12 mt-6 flex items-center gap-2 font-bold leading-none text-primary hover:text-secondary"
          onClick={addMoreFor}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
          </svg>
          Add more
        </button>
      </section>
    </div>
  );
};