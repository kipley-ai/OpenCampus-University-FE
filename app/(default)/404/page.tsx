"use client";
import Image from "next/image";
import ErrorBanner from "components/banner/404.png"; // Ensure the path is correct

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <Image src={ErrorBanner} alt="Error 404" width={960} height={570} />
            <h1 className="text-2xl font-semibold mt-5">Sorry, the page you are looking for cannot be found or it does not exist.</h1>
            <div className="mt-6">
                <a href="/dashboard">
                    <button className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded">
                        <div className="flex items-center justify-center">
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99935 3.33398L9.17435 4.50898L4.52435 9.16732H14.666V10.834H4.52435L9.17435 15.4923L7.99935 16.6673L1.33268 10.0007L7.99935 3.33398Z" fill="white" />
                            </svg>
                            <span className="text-md ml-2">Back to your Dashboard</span>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    )
}
