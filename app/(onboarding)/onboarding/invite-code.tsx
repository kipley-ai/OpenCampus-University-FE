"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useCreateChatbotContext } from "../create-knowledge-context";
import { useIsWhitelisted } from "@/hooks/api/user";
import { useRouter, redirect } from "next/navigation";
import { ONBOARDING_FLOW } from "@/utils/constants";

type InviteCodeProps = {
  address: string | undefined | null;
};

const InviteCode = ({ address }: InviteCodeProps) => {
  const router = useRouter();
  const [isBlankPresent, setIsBlankPresent] = useState(true);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { setStep } = useCreateChatbotContext();

  const handleChange = (element: any, index: number) => {
    if (!/^[A-Za-z0-9]$/.test(element.value)) {
      return false;
    }

    let value = element.value;

    if (isNaN(value)) {
      value = value.toUpperCase();
    }

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    const deleteKeys: string[] = ["Backspace", "Delete"];
    if (deleteKeys.includes(e.key)) {
      e.preventDefault();

      const newOtp = [...otp];

      if (Boolean(newOtp[index])) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowRight") {
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (/^[A-Za-z0-9]$/.test(e.key)) {
      const key = e.key.toUpperCase();
      if (index < 5) {
        setOtp([...otp.map((d, idx) => (idx === index ? key : d))]);
        inputsRef.current[index + 1]?.focus();
      } else {
        setOtp([...otp.map((d, idx) => (idx === index ? key : d))]);
      }
    }
  };

  const handlePaste = (event: any) => {
    event.preventDefault();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    let clipboardText = clipboardData.getData("text").trim().toUpperCase();

    if (clipboardText.length > 6) {
      clipboardText = clipboardText.slice(0, 6);
    }

    const otpArray = Array(6).fill("");

    for (let i = 0; i < clipboardText.length; i++) {
      otpArray[i] = clipboardText[i];
    }

    setOtp(otpArray);

    const lastFilledInputIndex = otpArray.lastIndexOf(clipboardText.slice(-1));
    const firstBlankInputIndex = otpArray.findIndex((value) => value === "");

    if (lastFilledInputIndex !== -1) {
      if (lastFilledInputIndex < 5) {
        inputsRef.current[lastFilledInputIndex + 1]?.focus();
      } else {
        inputsRef.current[lastFilledInputIndex]?.blur();
      }
    } else if (firstBlankInputIndex !== -1) {
      inputsRef.current[firstBlankInputIndex]?.focus();
    }
  };

  const handleContinue = async () => {
    try {
      const res = await axios.post(
        "/api/onboarding/check-invite-code",
        { invite_code: otp.join("") },
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      );

      if (
        res?.data?.status === "error" &&
        res?.data?.msg !== "Wallet already validated."
      ) {
        setErrorMessage(res.data?.msg);
        setTimeout(function () {
          setErrorMessage("");
        }, 2000);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to verify invite code. Please try again.");
      setTimeout(function () {
        setErrorMessage("");
      }, 2000);
    }
  };

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Check if any string in the OTP array is blank
    const blankCheck = otp.some((otpValue) => otpValue.trim() === "");
    setIsBlankPresent(blankCheck);
  }, [otp]);

  useEffect(() => {
    // Check if all OTP inputs are filled
    const cont = async () => {
      if (!otp.some((value) => value.trim() === "")) {
        await handleContinue();
      }
    };

    cont();
  }, [otp]);

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <p className="text-xl font-semibold">Enter Invite Code to Join</p>
      <div className="flex h-1 gap-2">
        <p className="text-sm font-semibold text-red-500">{errorMessage}</p>
      </div>
      <div className="mb-8 flex gap-4">
        {otp.map((data, index) => {
          return (
            <input
              className="size-12 border-0 border-b-[3px] border-gray-500 bg-inherit text-center text-3xl font-semibold outline-none focus:border-primary focus:ring-0 md:size-24 md:text-5xl"
              maxLength={1}
              key={index}
              value={otp[index]}
              onChange={(e) => null}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(ref) => (inputsRef.current[index] = ref)}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InviteCode;
