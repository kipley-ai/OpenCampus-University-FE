"use client";
import XIcon from "public/images/X-icon.svg";
import XLightIcon from "public/images/knowledge-source/twitter-light.svg";
import NotionIcon from "public/images/notion.svg";
import NotionLightIcon from "public/images/knowledge-source/notion-light.svg";
import FolderAddIcon from "public/images/knowledge-source/folder-add.svg";
import MirrorIcon from "public/images/knowledge-source/mirror.svg";
import SubstackIcon from "public/images/knowledge-source/substack-icon.svg";
import MediumIcon from "public/images/knowledge-source/medium.svg";
import MediumLightIcon from "public/images/knowledge-source/medium-light.svg";
import ApiIcon from "public/images/knowledge-source/api-icon.svg";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import React, { useState } from "react";
import { ImageSrc, ReactSetter } from "@/lib/aliases";
import { PossibleOption } from "./page";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useTheme } from "next-themes";

const ButtonItem = ({
  onClick,
  isSelected,
  optionIcon,
  optionText,
  isComingSoon,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected: boolean;
  optionIcon: ImageSrc;
  optionText: string;
  isComingSoon: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <button
      className={`relative flex flex-col gap-6 items-center border-2 py-5 md:pt-10 ${isSelected ? "border-primary" : "border-transparent"} justify-end rounded-2xl`}
      onClick={onClick}
    >
      <Image
        width={48}
        height={48}
        src={optionIcon}
        className="grow"
        alt={`${optionText} Icon`}
      />
      <h3>{optionText}</h3>
      {isComingSoon && isSelected && (
        <span className="absolute right-2 top-2 rounded-md border border-primary bg-primary px-2 text-xs text-container">
          COMING SOON
        </span>
      )}
    </button>
  );
};

const buttons = [
  {
    type: "twitter",
    icon: XIcon,
    lightIcon: XLightIcon,
    text: "Twitter",
    comingSoon: false,
  },
  {
    type: "notion",
    icon: NotionIcon,
    lightIcon: NotionLightIcon,
    text: "Notion",
    comingSoon: true,
  },
  {
    type: "substack",
    icon: SubstackIcon,
    text: "Substack",
    comingSoon: true,
  },
  {
    type: "medium",
    icon: MediumIcon,
    lightIcon: MediumLightIcon,
    text: "Medium",
    comingSoon: true,
  },
  {
    type: "mirror",
    icon: MirrorIcon,
    text: "Mirror",
    comingSoon: true,
  },
  {
    type: "files",
    icon: FolderAddIcon,
    text: "Upload files",
    comingSoon: false,
  },
  {
    type: "api",
    icon: ApiIcon,
    text: "Customized API",
    comingSoon: true,
  },
  // Add more buttons here...
];

export default function Step1({
  selectedButton,
  setSelectedButton,
}: {
  selectedButton: string;
  setSelectedButton: Function;
}) {
  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const { handleChangeKb, setIsComingSoon, setStep } =
    useCreateChatbotContext();

  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-4 font-bold text-heading md:grid-cols-4">
      {buttons.map((button) => (
        <ButtonItem
          key={button.type}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleChangeKb("type", button.type);
            setSelectedButton(button.type);
            setIsComingSoon(button.comingSoon);

            if (button.type == "twitter") {
              sessionStorage.setItem("kbType", "twitter");
              if (twitterStatus != "authenticated") {
                setShowTwitterLogin(true);
                sessionStorage.setItem("mintNFTRedirect", "true");
              } else {
                setStep("mint_nft");
              }
            } else if (button.type == "files") {
              setStep("upload_files");
            }
          }}
          isSelected={selectedButton == button.type}
          optionIcon={theme === "dark" ? button.icon : button.lightIcon || button.icon}
          optionText={button.text}
          isComingSoon={button.comingSoon}
        />
      ))}
    </div>
  );
}
