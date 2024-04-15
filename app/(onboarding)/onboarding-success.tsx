"use client";
import React, { useState } from "react";
import OnboardingProgress from "./onboarding-progress";
import Image from "next/image";
import CheckIcon from "public/images/double-check.svg";
import OnboardingSuccessImage from "public/images/onboarding-success-2.gif";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col justify-center px-6 pb-20 pt-6 lg:px-8 xl:px-32">
      <OnboardingProgress step={5} />
      <div
        className={`flex w-[610px] flex-col items-center justify-center self-center rounded-2xl px-7 py-12 text-heading ${dmsans.className} font-semibold`}
      >
        <div
          style={{
            backgroundImage: `url(${OnboardingSuccessImage.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "223px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="font-mono text-4xl font-semibold text-heading text-center">
            Ready to Monetise!
          </p>
        </div>
        <div
          className={`flex flex-row ${poppins.className} my-8 items-center justify-center text-sm`}
        >
          <svg className="mr-4" width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 -0.000976562H16V1.99902H14V-0.000976562ZM12 3.99902V1.99902H14V3.99902H12ZM10 5.99902V3.99902H12V5.99902H10ZM8 7.99902V5.99902H10V7.99902H8ZM6 9.99902V7.99902H8V9.99902H6ZM4 9.99902H6V11.999H4V9.99902ZM2 7.99902H4V9.99902H2V7.99902ZM2 7.99902H0V5.99902H2V7.99902ZM10 9.99902H12V11.999H10V9.99902ZM14 7.99902V9.99902H12V7.99902H14ZM16 5.99902V7.99902H14V5.99902H16ZM18 3.99902V5.99902H16V3.99902H18ZM20 1.99902H18V3.99902H20V1.99902ZM20 1.99902H22V-0.000976562H20V1.99902Z" fill="var(--color-primary)"/>
          </svg>

          <h1 className="font-mono text-base font-semibold">
            Your chatbot has been created successfully!
          </h1>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="font-mono rounded-full px-12 py-4 button font-bold"
          >
            Enter KnowledgeFi Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
