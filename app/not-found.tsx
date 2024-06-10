"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import Button from "@/components/button";

export default function NotFound() {
  return (
    <div className="flex h-dvh divide-x-2 divide-border text-heading">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto">
        <div className="h-[max(100vh, fit-content)] grow bg-container">
          <Header />
          <main className="h-[calc(100%-7rem)] grow">
            <div className="h-full mx-3 my-4 xl:my-8 flex flex-col items-center justify-center rounded-2xl border-2 border-border bg-sidebar px-4 py-20 xs:px-8 md:mx-6 xl:w-5/6">
              <Image
                src="/images/404.svg"
                alt="Error 404"
                width={960}
                height={570}
              />
              <h1 className="mt-5 text-center font-semibold md:text-xl">
                Sorry, the page you are looking for cannot be found or it does
                not exist.
              </h1>
              <div className="mt-6">
                <Link href="/dashboard">
                  <Button className="rounded-lg px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        width="16"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99935 3.33398L9.17435 4.50898L4.52435 9.16732H14.666V10.834H4.52435L9.17435 15.4923L7.99935 16.6673L1.33268 10.0007L7.99935 3.33398Z"
                          fill="white"
                        />
                      </svg>
                      <span className="md:text-lg">Back to your Dashboard</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
