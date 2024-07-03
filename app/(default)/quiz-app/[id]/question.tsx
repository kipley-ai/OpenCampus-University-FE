"use client";

import { useQuiz } from "../[id]/quiz-app-context";
import QuizFalse from "./false";
import QuizTrue from "./true";

export default function QuizQuestion() {
  const {
    step,
    setStep,
    chatbot_id,
    chatbot_name,
    questions,
    answers,
    setAnswers,
    answer_state,
    setAnswerState,
    total_right,
    setTotalRight,
    question_now,
    setQuestionNow,
    selected_answer,
    setSelectedAnswer,
    cancel,
  } = useQuiz();

  const totalQuestions = questions?.length as number;

  const progress = (question_now / totalQuestions) * 100;
  //console.log("Questions: ", questions); // For debugging purpose
  //console.log(totalQuestions); // For debugging purpose

  const isDisabled = !selected_answer;

  const checkAnswer = () => {
    const isCorrect = selected_answer === questions[question_now - 1]?.answer;

    setAnswers([...answers, selected_answer]);

    setAnswerState(isCorrect); // Update the answer state
    if (isCorrect) {
      setTotalRight(total_right + 1); // Increment the count of correct answers
      setStep("true"); // Move to the result or next question step
    } else {
      setStep("false"); // Handle retry or feedback logic
    }
  };

  //console.log(selected); // For debugging purpose

  return (
    <div className="w-full">
      <span className="text-lg font-semibold">{chatbot_name}</span>
      <div className="my-10 mt-2 w-full rounded-xl border border-border bg-white">
        <div className="px-10 pt-8">
          <div className="mb-4 flex items-center">
            <div className="mr-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-1.5 rounded-full bg-[#141BEB]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-[#141BEB] px-6 py-3 text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_687_7097)">
                  <path
                    d="M4 7H7C7.26522 7 7.51957 6.89464 7.70711 6.70711C7.89464 6.51957 8 6.26522 8 6V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3C10.5304 3 11.0391 3.21071 11.4142 3.58579C11.7893 3.96086 12 4.46957 12 5V6C12 6.26522 12.1054 6.51957 12.2929 6.70711C12.4804 6.89464 12.7348 7 13 7H16C16.2652 7 16.5196 7.10536 16.7071 7.29289C16.8946 7.48043 17 7.73478 17 8V11C17 11.2652 17.1054 11.5196 17.2929 11.7071C17.4804 11.8946 17.7348 12 18 12H19C19.5304 12 20.0391 12.2107 20.4142 12.5858C20.7893 12.9609 21 13.4696 21 14C21 14.5304 20.7893 15.0391 20.4142 15.4142C20.0391 15.7893 19.5304 16 19 16H18C17.7348 16 17.4804 16.1054 17.2929 16.2929C17.1054 16.4804 17 16.7348 17 17V20C17 20.2652 16.8946 20.5196 16.7071 20.7071C16.5196 20.8946 16.2652 21 16 21H13C12.7348 21 12.4804 20.8946 12.2929 20.7071C12.1054 20.5196 12 20.2652 12 20V19C12 18.4696 11.7893 17.9609 11.4142 17.5858C11.0391 17.2107 10.5304 17 10 17C9.46957 17 8.96086 17.2107 8.58579 17.5858C8.21071 17.9609 8 18.4696 8 19V20C8 20.2652 7.89464 20.5196 7.70711 20.7071C7.51957 20.8946 7.26522 21 7 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V17C3 16.7348 3.10536 16.4804 3.29289 16.2929C3.48043 16.1054 3.73478 16 4 16H5C5.53043 16 6.03914 15.7893 6.41421 15.4142C6.78929 15.0391 7 14.5304 7 14C7 13.4696 6.78929 12.9609 6.41421 12.5858C6.03914 12.2107 5.53043 12 5 12H4C3.73478 12 3.48043 11.8946 3.29289 11.7071C3.10536 11.5196 3 11.2652 3 11V8C3 7.73478 3.10536 7.48043 3.29289 7.29289C3.48043 7.10536 3.73478 7 4 7"
                    stroke="white"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_687_7097">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="ml-2 font-medium tracking-widest">
                {question_now}/{totalQuestions}
              </span>
            </div>
          </div>
          <div className="mb-2 text-sm font-semibold text-body">
            QUESTION {question_now} OF {totalQuestions}
          </div>
          <div className="mb-6 text-xl font-medium">
            {questions[question_now - 1]?.question}
          </div>
          <div className="mb-6 space-y-4">
            {questions &&
              ["a", "b", "c", "d"].map((option: any, index: any) => {
                return (
                  <label
                    key={index}
                    className={`relative flex w-full cursor-pointer flex-row rounded-lg border border-gray-300 px-4 py-3 text-left ${selected_answer === option ? "bg-[#ECECFF] font-medium" : ""} ${step === "question" ? "hover:bg-secondary" : ""}`}
                  >
                    <input
                      type="radio"
                      name="quiz"
                      value={option}
                      className="absolute w-full cursor-pointer opacity-0"
                      checked={selected_answer === option}
                      onChange={() => setSelectedAnswer(option)}
                      disabled={step !== "question"}
                    />
                    {selected_answer === option && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-4"
                      >
                        <g clipPath="url(#clip0_687_7110)">
                          <rect
                            x="1"
                            y="1"
                            width="22"
                            height="22"
                            rx="7"
                            fill="#141BEB"
                            stroke="#141BEB"
                            strokeWidth="2"
                          />
                          <g clipPath="url(#clip1_687_7110)">
                            <path
                              d="M7.33325 12.0001L10.6666 15.3334L17.3333 8.66675"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_687_7110">
                            <rect width="24" height="24" rx="12" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_687_7110">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(4 4)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                    {questions[question_now - 1][option]}
                  </label>
                );
              })}
          </div>
        </div>
        {(() => {
          switch (step) {
            case "question":
              return (
                <div className="px-10 py-8">
                  <div className="border-t border-gray-300"></div>
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      className="z-[999] flex flex-row font-medium hover:underline"
                      onClick={() => cancel()}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                          fill="#141BEB"
                        />
                      </svg>
                      CANCEL
                    </button>
                    <button
                      className={`flex flex-row font-medium hover:underline ${isDisabled ? "text-slate-500" : "text-heading"}`}
                      disabled={isDisabled}
                      onClick={checkAnswer}
                    >
                      CHECK
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke={`${isDisabled ? "#475569" : "#141BEB"}`}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            case "false":
              return <QuizFalse />;
            case "true":
              return <QuizTrue />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
