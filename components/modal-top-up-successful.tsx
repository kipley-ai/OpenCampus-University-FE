"use client";

import React from "react";
import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import { useTheme } from "next-themes";

export default function ModalTopUpSuccessful({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl px-7 py-10 font-semibold text-heading`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-xl">Top Up Successful!</h2>
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
          className={`my-7 flex flex-row gap-4 items-center justify-center text-sm`}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect className="fill-primary" width="30" height="30" rx="15"/>
            <path className="fill-container" fillRule="evenodd" clipRule="evenodd" d="M21.7071 10.2929C22.0976 10.6834 22.0976 11.3166 21.7071 11.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071L8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L13 17.5858L20.2929 10.2929C20.6834 9.90237 21.3166 9.90237 21.7071 10.2929Z"/>
          </svg>
          <span>Your wallet has been successfully topped up</span>
        </div>
        <div className="flex w-full">
          <button
            className="button mr-4 w-full rounded-3xl py-2 text-sm text-primary"
            onClick={() => setIsOpen(false)}
          >
            Close
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
