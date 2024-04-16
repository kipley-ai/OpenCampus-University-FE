"use client";

import React from "react";
import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import { BsExclamationSquare } from "react-icons/bs";
import CrossIcon from "public/images/cross-icon.svg";

export default function ModalTopUpFailed({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl bg-container px-7 py-10 font-semibold`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-xl">TOP UP FAILED</h2>
          <button
            className="text-heading hover:text-secondary"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
							className="hover:opacity-75"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="var(--color-heading)"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="var(--color-heading)"
              />
            </svg>
          </button>
        </div>
        <div
          className="flex flex-row my-7 items-center justify-center text-sm text-rose-500"
        >
          <BsExclamationSquare className="mr-4 h-[35px] w-[35px]" />
          <span>Sorry, something went wrong. Please try again.</span>
        </div>
        <div className="flex w-full">
          <button className="button w-full">
              Try again
          </button>
          {/* <button
            onClick={() =>
              router.push("/nft/" + "/create-chatbot")
            }
            className="w-full rounded-3xl bg-[#353945] py-2 text-sm text-primary"
          >
            Create Chatbot
          </button> */}
        </div>
      </div>
    </ModalBlank>
  );
}
