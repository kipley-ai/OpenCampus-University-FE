"use client";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { ImageSrc } from "@/lib/aliases";
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
      className={`relative flex flex-col items-center gap-2 border-2 bg-container py-5 ${isSelected ? "border-primary" : "border-border"} justify-end rounded-xl hover:bg-secondary`}
      onClick={onClick}
    >
      <Image
        width={48}
        height={48}
        src={optionIcon}
        className="object-fit size-8 grow"
        alt={`${optionText} Icon`}
      />
      <h3 className="font-poppins font-medium text-primary">{optionText}</h3>
      {isComingSoon && isSelected && (
        <span className="absolute right-1 top-1 rounded-md bg-primary px-2 text-xs leading-4 text-sidebar">
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
  const { handleChangeKb, setIsComingSoon, twitterExist } =
    useCreateChatbotContext();

  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-5 pt-4 font-bold text-heading md:mt-4 md:grid-cols-5">
      {buttons.map((button) => {
        if (twitterExist && button.type === "twitter") {
          return null;
        }
        return (
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
        );
      })}
    </div>
  );
}
