"use client";

import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import twtLogo from "@/public/images/logo-twitter.svg";

export default function ModalLoginTwitter({
  isOpen,
  setIsOpen,
  redirectUrl,
  onSuccess,
  onError,
}: {
  isOpen: boolean;
  setIsOpen: any;
  redirectUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const handleLoginButton = () => {
    signIn("twitter", { callbackUrl: redirectUrl })
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center justify-between rounded-lg p-8 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch">
          <h2 className="w-80 text-lg font-semibold leading-10 text-primary">
            Import from Twitter X
          </h2>
        </div>
        <div className="flex max-w-full flex-col justify-center gap-5 py-5 md:w-96">
          <div className="flex flex-grow items-center justify-center rounded-3xl">
            <button
              onClick={handleLoginButton}
              className="flex w-full items-center justify-between gap-4 rounded-md border-2 border-border p-6 hover:bg-secondary"
            >
              <div className="flex items-center gap-4">
                <Image
                  width={32}
                  height={32}
                  className="rounded-md bg-heading p-2"
                  src="/images/X-icon.svg"
                  alt="Twitter-X Icon"
                />
                <p className="text-left font-medium leading-none">
                  Sign In to Continue
                </p>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="fill-primary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.00065 0.333984L5.82565 1.50898L10.4757 6.16732H0.333984V7.83398H10.4757L5.82565 12.4923L7.00065 13.6673L13.6673 7.00065L7.00065 0.333984Z" />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="btn-underlined self-end"
        >
          Cancel
        </button>
      </div>
    </ModalBlank>
  );
}
