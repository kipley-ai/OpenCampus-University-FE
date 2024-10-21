"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";
import { WelcomeOptions } from "../welcome-options";

export default function Educator() {
  const { authState, ocAuth } = useOCAuth();

  function getFirstName(username: string): string {
    const [firstName] = username.split("_");
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  return (
    <div className="mb-10 mt-3 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar p-3 pb-8 md:p-10 xl:mt-4">
      <div className="flex flex-row justify-between">
        <h1 className="mb-4 text-lg font-semibold text-primary sm:mb-8">
          {authState.isLoading ? (
            <div>Loading...</div>
          ) : authState.error ? (
            <div>Error: {authState.error.message}</div>
          ) : authState.isAuthenticated ? (
            <>Welcome, {getFirstName(ocAuth.getAuthInfo().edu_username)}!</>
          ) : (
            <>Welcome!</>
          )}
        </h1>
      </div>
      <WelcomeOptions />
    </div>
  );
}
