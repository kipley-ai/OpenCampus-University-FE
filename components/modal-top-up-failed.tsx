"use client";

import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export default function ModalTopUpFailed({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-[360px] flex-col items-center justify-center rounded-2xl bg-container p-7 font-semibold">
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-xl">Top Up Failed</h2>
        </div>
        <div className="my-7 flex flex-row items-center justify-center text-sm text-rose-500">
          <BsFillExclamationCircleFill className="mr-4 h-[35px] w-[35px]" />
          <span>Sorry, something went wrong. Please try again.</span>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm md:text-lg"
        >
          Try Again
        </Button>
      </div>
    </ModalBlank>
  );
}
