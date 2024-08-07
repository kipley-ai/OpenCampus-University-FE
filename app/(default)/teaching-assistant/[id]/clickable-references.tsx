import React from "react";
import Markdown from "react-markdown";

interface ClickableReferencesProps {
  text: string;
  onReferenceClick: (number: number) => void;
}

export const ClickableReferences: React.FC<ClickableReferencesProps> = ({
  text,
  onReferenceClick,
}) => {
  const createMarkup = () => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const withBoldText = text.replace(boldRegex, "<b>$1</b>");

    const referenceRegex = /\[(\d+)\]/g;
    const withClickableReferences = withBoldText.replace(
      referenceRegex,
      (match, p1) => {
        return `<span class="inline cursor-pointer hover:border-b border-heading" data-number="${p1}">${match}</span>`;
      },
    );

    const newLineRegex = /\n/g;
    const withNewLines = withClickableReferences.replace(
      newLineRegex,
      "<br />",
    );

    return { __html: withNewLines };
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.matches(".cursor-pointer")) {
      const number = target.getAttribute("data-number");
      if (number) {
        onReferenceClick(Number(number));
      }
    }
  };

  return (
    <div
      className="text-sm"
      onClick={handleClick}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};
