import Image from "next/image"

import TestImage from "components/quiz-app/product img.png"

export default function QuizApp() {
    return (
        <div className="w-full">
            <div className="ml-4 mt-2">
                <span className="text-2xl font-bold">Quiz App</span>
            </div>
            <Header />
            <QuizForm />
        </div>
    )
}

function Header() {
    return (
        <div className="mx-4 mt-2 rounded-lg shadow-md p-6 space-x-4">
            <div className="flex flex-col items-center">
                <Image src={TestImage} alt="" />
                <h1 className="text-2xl font-bold text-blue-600">Tech Innovations Quiz</h1>
                <p className="text-sm">
                    Any time is a good time for a quiz and even better if
                </p>
                <p className="text-sm">
                    that happens to be a tech innovations quiz!
                </p>
            </div>
        </div>
    )
}

function QuizForm() {
    return (
        <div className="mx-4 mt-2 flex flex-row justify-between items-start space-y-0 space-x-6 p-6 rounded-lg shadow-md">
            <div className="flex flex-col w-2/3 space-y-4">
                <h2 className="font-semibold text-lg mb-2 text-blue-600">Generate your own Topic</h2>
                <textarea
                    placeholder="Enter your topic here"
                    className="border border-gray-300 p-4 rounded w-full h-32 resize-none"
                />
                <button
                    className="mt-4 bg-[#141BEB] text-white py-3 px-4 rounded-xl self-end"
                >
                    Start Quiz
                </button>
            </div>
            <div className="flex flex-col w-1/3 space-y-2">
                <h2 className="font-semibold text-lg mb-4 text-blue-600">or Suggest for You</h2>
                <ul className="space-y-2">
                    <li className="border rounded p-4 flex justify-between items-center cursor-pointer">
                        Biology Brain Teasers
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </li>
                    <li className="border rounded p-4 flex justify-between items-center cursor-pointer">
                        Biology Brain Teasers
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </li>
                    <li className="border rounded p-4 flex justify-between items-center cursor-pointer">
                        Biology Brain Teasers
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
    );
}
