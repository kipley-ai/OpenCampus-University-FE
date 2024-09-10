"use client";
import { KF_TITLE } from "@/utils/constants";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect, useState } from "react";
import ImageInput from "@/components/image-input";

export default function TaskCenter() {
  const [tab, setTab] = useState<string>("your-profile");

  const [selectedFile, setSelectedFile] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <div className="mt-2 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar px-3 pb-10 pt-3 md:p-10 xl:mt-4">
      <title>{KF_TITLE + "Profile & Settings"}</title>
      <div>
        <h1 className="text-lg font-bold">Profile & Settings</h1>
      </div>
      <div className="mb-4 mt-4 flex items-center space-x-10 border-b-2 border-border text-sm font-semibold text-primary">
        <button
          className={`${tab == "your-profile" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("your-profile")}
        >
          Your Profile
        </button>
        {/* <button
          className={`${tab == "referral-bonus" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("referral-bonus")}
        >
          Referral Bonus
        </button> */}
        {/* <button className={`${tab == "leaderboard" ? "underline underline-offset-8" : "opacity-50"}`} onClick={() => setTab("leaderboard")}>Leaderboard</button> */}
      </div>
      <h2 className="mb-2 text-sm font-semibold text-primary">
        Profile Picture
      </h2>
      <ImageInput
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setUploadedFile={setUploadedFile}
      />
      <form className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="first-name">
            First Name*
          </label>
          <input
            type="text"
            className="input-text"
            placeholder="Ray"
            id="first-name"
            name="first-name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="website">
            Website
          </label>
          <input
            type="text"
            className="input-text"
            placeholder="URL"
            id="website"
            name="website"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="last-name">
            Last Name*
          </label>
          <input
            type="text"
            className="input-text"
            placeholder="Smith"
            id="last-name"
            name="last-name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="twitter">
            Twitter
          </label>
          <div className="flex items-center">
            <div className="h-full rounded-l-md border-2 border-r-0 border-border bg-container px-3 py-2 text-body">
              http://twitter.com/
            </div>
            <input
              type="text"
              className="input-text grow rounded-l-none"
              placeholder="Username"
              id="twitter"
              name="twitter"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="headline">
            Headline*
          </label>
          <input
            type="text"
            className="input-text"
            placeholder="PhD"
            id="headline"
            name="headline"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="linkedin">
            Linkedin
          </label>
          <div className="flex max-w-full items-center">
            <div className="flex h-full shrink items-center rounded-l-md border-2 border-r-0 border-border bg-container px-3 py-2 text-body">
              http://linkedin.com/
            </div>
            <input
              type="text"
              className="input-text grow rounded-l-none"
              placeholder="Username"
              id="linkedin"
              name="linkedin"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="biography">
            Biography*
          </label>
          <textarea
            className="input-text text-xs"
            rows={10}
            placeholder="F. Berghmans was born in Ukkel (Belgium) in 1969. He received his Ph.D. in Applied Sciences in 1998 from the VUB (Vrije Universiteit Brussel, Brussels, Belgium). In 1993 he joined the Belgian nuclear research center SCK∙CEN, where he served as...."
            id="biography"
            name="biography"
          />
          <p className="text-xs italic text-body">
            To help learners learn more about you, your bio should reflect your
            Credibility, Empathy, Passion, and Personality. Your biography
            should have at least 50 words, links and coupon codes are not
            permitted.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="youtube">
            Youtube
          </label>
          <div className="flex items-center">
            <div className="flex h-full items-center rounded-l-md border-2 border-r-0 border-border bg-container px-3 py-2 text-body">
              http://youtube.com/
            </div>
            <input
              type="text"
              className="input-text grow rounded-l-none"
              placeholder="Username"
              id="youtube"
              name="youtube"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="language">
            Language*
          </label>
          <select className="input-text" id="language" name="language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="italian">Italian</option>
          </select>
        </div>
      </form>
    </div>
  );
}
