import Image from "next/image"

import ResultImage from "components/quiz-app/result.png"

export default function QuizApp() {
    return (
        <div className="w-full">
            <div className="ml-4 mt-2">
                <span className="text-2xl font-bold">Quiz App</span>
            </div>
            <QuizComplete />
        </div>
    )
}

function QuizComplete() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full mx-auto my-10">
            <h2 className="text-2xl font-bold self-start">Quiz Complete!</h2>
            <div className="flex justify-center mt-2">
                <div className="flex flex-col items-center bg-[#F9F9FF] p-6 w-full rounded-lg shadow">
                    <Image src={ResultImage} alt=""></Image>
                    <p className="text-lg font-bold text-center mt-4">Your final score is 7 / 10 (70%)</p>
                    <button className="border border-[#141BEB] text-[#141BEB] px-4 py-2 rounded mt-4">
                        Restart the Quiz
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col w-1/4 self-center">
                    <div className="flex justify-center items-center mt-8 text-lg">
                        <div className="flex flex-col mr-2">
                            <span className="font-semibold">CORRECT ANSWER</span>
                            <p>7</p>
                        </div>
                        <div className="flex flex-col ml-2">
                            <span className="font-semibold">INCORRECT ANSWER</span>
                            <p>3</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 mt-4"></div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button className="flex flex-row px-6 py-2">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_687_7249)">
                            <path d="M6 15.9358C7.65685 15.9358 9 14.5926 9 12.9358C9 11.2789 7.65685 9.93579 6 9.93579C4.34315 9.93579 3 11.2789 3 12.9358C3 14.5926 4.34315 15.9358 6 15.9358Z" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 9.93579C19.6569 9.93579 21 8.59265 21 6.93579C21 5.27894 19.6569 3.93579 18 3.93579C16.3431 3.93579 15 5.27894 15 6.93579C15 8.59265 16.3431 9.93579 18 9.93579Z" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 21.9358C19.6569 21.9358 21 20.5926 21 18.9358C21 17.2789 19.6569 15.9358 18 15.9358C16.3431 15.9358 15 17.2789 15 18.9358C15 20.5926 16.3431 21.9358 18 21.9358Z" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.7002 11.6358L15.3002 8.23584" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.7002 14.2358L15.3002 17.6358" stroke="#141BEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_687_7249">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.935791)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-[#141BEB] ml-4">Share</span>
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ml-4">
                    Done
                </button>
            </div>
        </div>
    );
}