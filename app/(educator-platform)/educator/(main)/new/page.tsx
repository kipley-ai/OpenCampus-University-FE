"use client";

import { WelcomeOptions } from "../welcome-options";

export default function Educator() {
  return (
    <div className="mb-10 mt-3 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar p-3 pb-8 md:p-10 xl:mt-4">
      <div className="flex flex-row justify-between">
        <h1 className="mb-4 text-lg font-semibold text-primary sm:mb-8">
          Welcome Ray!
        </h1>
      </div>
      <WelcomeOptions />
    </div>
  );
}
