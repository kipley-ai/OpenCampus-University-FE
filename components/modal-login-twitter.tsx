"use client";

import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import CrossIcon from "public/images/cross-icon-2.png";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import fbLogo from '@/public/images/icon-facebook.svg'
import twtLogo from "@/public/images/logo-twitter.svg";
// import emailLogo from '@/public/images/icon-linkedin.svg'

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
          <Image
            className="h-[12px] w-[12px] cursor-pointer"
            src={CrossIcon}
            alt="cross icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
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
