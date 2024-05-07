"use client";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import React, { useState } from "react";
import { ImageSrc, ReactSetter } from "@/lib/aliases";
import { PossibleOption } from "./select-data-elements";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/providers/app-provider";
import { useTheme } from "next-themes";
import { buttons } from "@/components/utils/data-elements";

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
  return (
    <button
      className={` relative flex flex-col items-center gap-2 border-2 bg-container py-4 ${isSelected ? "border-primary" : "border-transparent"} justify-end rounded-xl`}
      onClick={onClick}
    >
      <Image
        width={42}
        height={42}
        src={optionIcon}
        className="grow"
        alt={`${optionText} Icon`}
      />
      <h3 className="font-poppins font-semibold text-primary">{optionText}</h3>
      {isComingSoon && isSelected && (
        <span className="absolute right-2 top-2 rounded-md border border-primary bg-primary px-2 text-xs text-container">
          COMING SOON
        </span>
      )}
    </button>
  );
};

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
    <div className="grid grid-cols-2 gap-4 font-bold  text-heading md:mt-4 md:grid-cols-5">
      {buttons.map((button) => (
        <ButtonItem
          key={button.type}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleChangeKb("type", button.type);
            setSelectedButton(button.type);
            setIsComingSoon(button.comingSoon);
          }}
          isSelected={selectedButton == button.type}
          optionIcon={
            theme === "dark" ? button.icon : button.lightIcon || button.icon
          }
          optionText={button.text}
          isComingSoon={button.comingSoon}
        />
      ))}
    </div>
  );
}
