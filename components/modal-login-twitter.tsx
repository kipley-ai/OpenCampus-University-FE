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
    signIn("twitter", { callbackUrl: redirectUrl }).then(onSuccess).catch(onError);
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center justify-between rounded-lg p-8 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="w-80 text-2xl font-bold leading-10 text-heading">
            Sign in to continue
          </div>
          <button
            className="hover:text-secondary"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div className="sr-only">Close</div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-none hover:fill-secondary"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="#353945"
                strokeWidth="2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="var(--color-heading)"
              />
            </svg>
          </button>
        </div>
        <div className="flex max-w-full flex-col justify-center gap-5 py-5 md:w-96">
          <div className="flex flex-grow items-center justify-center rounded-3xl">
            <Button
              onClick={handleLoginButton}
              className="w-full py-2"
            >
              <Image
                priority={true}
                className="flex h-5 w-5 items-center justify-center rounded-3xl bg-neutral-800"
                src={twtLogo}
                width={40}
                height={40}
                alt="Twitter-X Icon"
              />
              <div className="text-center text-xs leading-none tracking-wide md:text-sm">
                Connect X
              </div>
            </Button>
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}
