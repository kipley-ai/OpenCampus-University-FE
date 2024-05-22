"use client";

import React, { useState, useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import ManageDataSources from "./manage-data-source";

import { useRouter } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";
import { KF_TITLE } from "@/utils/constants";

export default function EditChatbot() {
  const { setHeaderTitle } = useAppProvider();
  const title = "Manage Data Sources";

  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    setHeaderTitle(title);
    document.title = KF_TITLE + title;
    return () => setHeaderTitle("Default Title");
  }, [setHeaderTitle, title]);

  return (
    <div className="h-full flex-col justify-start bg-container px-4 md:w-5/6 md:flex-row md:pl-10">
      <h1 className="py-3 text-lg font-semibold text-heading">
        Knowledge Key Details
      </h1>
      <div className="flex flex-col rounded-2xl border border-[#DDDDEB] bg-sidebar px-6 py-9 pb-0 lg:px-8 xl:px-14">
        <ManageDataSources />
      </div>
    </div>
  );
}
