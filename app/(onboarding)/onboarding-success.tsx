"use client";
import React, { useState } from "react";
import OnboardingProgress from "./onboarding-progress";
import Image from "next/image";
import CheckIcon from "public/images/double-check.svg";
import OnboardingSuccessImage from "public/images/onboarding-success-2.gif";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import MonetizeReady from "public/images/Chain floating coin.png";

interface ToastProps {
  children: React.ReactNode;
  type?: "warning" | "error" | "success" | "";
  open: boolean;
  setOpen: (open: boolean) => void;
}

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export default function OnboardingSuccess() {
  const router = useRouter();
  return (
    <div className="flex flex-col px-6 pb-20 lg:px-8 xl:px-32">
      <OnboardingProgress step={5} />
      <div className="mt-8 flex flex-col items-center justify-center rounded-3xl bg-white px-10 pt-8">
        <Image src={MonetizeReady} alt="monetize ready" />
        <h1 className="my-2 text-2xl font-semibold text-primary">
          Ready to Monetise!
        </h1>
        <p className="text-sm">Your chatbot has been created successfully!</p>
        <div className="my-8 flex w-full items-center justify-center border-t-2 pt-4">
          <button
            className="flex items-center justify-center gap-2 hover:underline"
            type="submit"
            onClick={() => router.push("/dashboard")}
          >
            <p>Enter OCU</p>
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 0.889648L0.589996 2.29965L5.17 6.88965L0.589996 11.4796L2 12.8896L8 6.88965L2 0.889648Z"
                fill="#141BEB"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
