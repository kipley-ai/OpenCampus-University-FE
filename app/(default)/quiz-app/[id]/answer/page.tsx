"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { PiSpeakerHighLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import {
  AppleSvg,
  BigCloseSvg,
  BoySvg,
  CloseSvg,
  DoneSvg,
  LessonFastForwardEndFailSvg,
  LessonFastForwardEndPassSvg,
  LessonFastForwardStartSvg,
  LessonTopBarEmptyHeart,
  LessonTopBarHeart,
  WomanSvg,
} from "./components/svgs";

const ProgressBar = ({
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  setQuitMessageShown,
}: {
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  setQuitMessageShown: (isShown: boolean) => void;
}) => {
  return (
    <header className="flex items-center gap-4">
      {correctAnswerCount === 0 ? (
        <Link href="/learn" className="text-gray-400">
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </Link>
      ) : (
        <button
          className="text-gray-400"
          onClick={() => setQuitMessageShown(true)}
        >
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </button>
      )}
      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={correctAnswerCount / totalCorrectAnswersNeeded}
      >
        <div
          className={
            "h-full rounded-full bg-green-500 transition-all duration-700 " +
            (correctAnswerCount > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(correctAnswerCount / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-green-400"></div>
        </div>
      </div>
      <span className="text-gray-400">
        {correctAnswerCount}/{totalCorrectAnswersNeeded}
      </span>
    </header>
  );
};

const lessonProblem1 = {
  type: "SELECT_1_OF_3",
  question: `In which industry is Yat Siu a prominent figure?`,
  answers: [
    { name: "Finance" },
    { name: "Healthcare" },
    { name: "Technology and gaming" },
    { name: "Agriculture" },
  ],
  correctAnswer: 2,
} as const;

const lessonProblem2 = {
  type: "SELECT_1_OF_3",
  question: `What was Yat Siu's role in establishing Hong Kong Cybercity/Freenation?`,
  answers: [
    { name: "Co-founder and executive chairman" },
    { name: "CEO" },
    { name: "Chief Technology Officer" },
    { name: "Marketing Director" },
  ],
  correctAnswer: 0,
} as const;

const lessonProblem3 = {
  type: "SELECT_1_OF_3",
  question: `What was one of the key achievements of Outblaze under Yat Siu's leadership?`,
  answers: [
    { name: "Developing cutting-edge medical devices" },
    { name: "Pioneering multilingual white label web services" },
    { name: "Building autonomous vehicles" },
    { name: "Creating renewable energy solutions" },
  ],
  correctAnswer: 1,
} as const;

const lessonProblem4 = {
  type: "SELECT_1_OF_3",
  question: `Which organization recognized Yat Siu as one of the top 100 notable people in blockchain?`,
  answers: [
    { name: "The World Economic Forum" },
    { name: "DHL/SCMP Awards" },
    { name: "Cointelegraph" },
    { name: "BAFTA" },
  ],
  correctAnswer: 2,
} as const;

const lessonProblem5 = {
  type: "SELECT_1_OF_3",
  question: `Besides his work in technology and gaming, what other field is Yat Siu involved in?`,
  answers: [
    { name: "Agriculture" },
    { name: "Music" },
    { name: "Real estate" },
    { name: "Sports" },
  ],
  correctAnswer: 1,
} as const;

const lessonProblems = [
  lessonProblem1,
  lessonProblem2,
  lessonProblem3,
  lessonProblem4,
  lessonProblem5,
];

const numbersEqual = (a: readonly number[], b: readonly number[]): boolean => {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
};

const formatTime = (timeMs: number): string => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

export default function QuizPage() {
  const question = `Which one of these is "the apple"?`;
  const answers = [
    { name: "la manzana" },
    { name: "el niño" },
    { name: "la mujer" },
    { name: "la niña" },
  ];

  const [lessonProblem, setLessonProblem] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);

  const problem = lessonProblems[lessonProblem] ?? lessonProblem1;

  const totalCorrectAnswersNeeded = 5;

  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const hearts = null;

  const { correctAnswer } = problem;
  const isAnswerCorrect = Array.isArray(correctAnswer)
    ? numbersEqual(selectedAnswers, correctAnswer)
    : selectedAnswer === correctAnswer;

  const onCheckAnswer = () => {
    setCorrectAnswerShown(true);
    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1);
    } else {
      setIncorrectAnswerCount((x) => x + 1);
    }
    setQuestionResults((questionResults) => [
      ...questionResults,
      {
        question: problem.question,
        yourResponse: problem.answers[selectedAnswer ?? 0]?.name ?? "",
        correctResponse: problem.answers[problem.correctAnswer].name,
      },
    ]);
  };

  const onFinish = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);
    setLessonProblem((x) => (x + 1) % lessonProblems.length);
    endTime.current = Date.now();
  };

  const onSkip = () => {
    setSelectedAnswer(null);
    setCorrectAnswerShown(true);
  };

  if (
    correctAnswerCount + incorrectAnswerCount >= totalCorrectAnswersNeeded &&
    !correctAnswerShown
  ) {
    return (
      <LessonComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  switch (problem.type) {
    case "SELECT_1_OF_3": {
      return (
        <ProblemSelect1Of3
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          incorrectAnswerCount={incorrectAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
        />
      );
    }
  }
}

const CheckAnswer = ({
  isAnswerSelected,
  isAnswerCorrect,
  correctAnswerShown,
  correctAnswer,
  correctAnswerIndex,
  onCheckAnswer,
  onFinish,
  onSkip,
}: {
  isAnswerSelected: boolean;
  isAnswerCorrect: boolean;
  correctAnswerShown: boolean;
  correctAnswer: string;
  correctAnswerIndex: number;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
}) => {
  return (
    <>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button className="button w-32" onClick={() => {}}>
            Options
          </button>
          {!isAnswerSelected ? (
            <button className="button w-32 py-2" disabled>
              Check
            </button>
          ) : (
            <button onClick={onCheckAnswer} className="button w-32 py-2">
              Check
            </button>
          )}
        </div>
      </section>

      <div
        className={
          correctAnswerShown
            ? isAnswerCorrect
              ? "fixed bottom-0 left-0 right-0 bg-lime-100 font-bold text-green-600 transition-all"
              : "fixed bottom-0 left-0 right-0 bg-red-100 font-bold text-red-500 transition-all"
            : "fixed -bottom-52 left-0 right-0"
        }
      >
        <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-8">
          <>
            {isAnswerCorrect ? (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                  <DoneSvg />
                </div>
                <div className="text-2xl">Correct!</div>
              </div>
            ) : (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                  <BigCloseSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">Correct answer:</div>{" "}
                  <div className="text-sm font-normal">{`${String.fromCharCode(correctAnswerIndex + "A".charCodeAt(0))}. ${correctAnswer}`}</div>
                </div>
              </div>
            )}
          </>
          <button
            onClick={onFinish}
            className={
              isAnswerCorrect
                ? "w-32 rounded-full border-2 border-green-500 bg-green-500 p-3 text-white transition-all hover:border-green-600 hover:bg-green-600"
                : "w-32 rounded-full border-2 border-red-500 bg-red-500 p-3 text-white transition-all hover:border-red-600 hover:bg-red-600"
            }
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const ProblemSelect1Of3 = ({
  problem,
  correctAnswerCount,
  incorrectAnswerCount,
  totalCorrectAnswersNeeded,
  selectedAnswer,
  setSelectedAnswer,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
}: {
  problem: any;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
}) => {
  const { question, answers, correctAnswer } = problem;

  return (
    <div className="flex h-[calc(100dvh-114px)] flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount + incorrectAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
          />
        </div>
        <section className="flex w-8/12 grow flex-col gap-5 sm:items-center sm:justify-center sm:gap-8 sm:px-5">
          <header className="flex items-center justify-start gap-4  self-start">
            <h1 className="text-lg font-bold sm:text-xl">{question}</h1>
            <PiSpeakerHighLight />
          </header>
          <div
            className="flex w-full flex-col gap-4 self-center"
            role="radiogroup"
          >
            {answers.map((answer: any, i: number) => {
              return (
                <div
                  key={i}
                  className={
                    i === selectedAnswer
                      ? "flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-blue-300 p-4"
                      : "flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-blue-100 p-4 hover:bg-gray-100"
                  }
                  role="radio"
                  aria-checked={i === selectedAnswer}
                  tabIndex={0}
                  onClick={() => !correctAnswerShown && setSelectedAnswer(i)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={
                        i === selectedAnswer
                          ? "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
                          : "flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-500"
                      }
                    >
                      <h2 className="rounded text-lg font-bold">
                        {String.fromCharCode(i + "A".charCodeAt(0))}
                      </h2>
                    </div>
                    <p className="text-black">{answer.name}</p>
                  </div>
                  <PiSpeakerHighLight />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={answers[correctAnswer].name}
        correctAnswerIndex={correctAnswer}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswer !== null}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />
    </div>
  );
};

const LessonComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const router = useRouter();

  return (
    <div className="flex h-[calc(100dvh-114px)] flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8">
        <div className="hidden rounded-full bg-green-400 p-5 text-white sm:block">
          <DoneSvg />
        </div>
        <h1 className="text-center text-3xl font-bold">Quiz Complete!</h1>
        <h2 className="text-center text-2xl font-medium">
          Your final score is {correctAnswerCount}/
          {correctAnswerCount + incorrectAnswerCount}
          &#40;
          {Math.round(
            (correctAnswerCount / (correctAnswerCount + incorrectAnswerCount)) *
              100,
          )}
          %&#41;
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          <button className="button w-32 p-2">Share</button>
          <button onClick={() => router.refresh()} className="button w-32 p-2">
            Restart
          </button>
        </div>
        <p>
          <Link href="/onboarding" className="text-primary">
            Create an account
          </Link>{" "}
          for free to track and review your answers.
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button className="button w-32 py-2" onClick={() => {}}>
            Options
          </button>
          <Link
            className="button flex w-32 items-center justify-center py-2"
            href="/dashboard"
            onClick={() => {}}
          >
            Quit
          </Link>
        </div>
      </section>
    </div>
  );
};

type QuestionResult = {
  question: string;
  yourResponse: string;
  correctResponse: string;
};
