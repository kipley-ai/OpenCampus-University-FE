import React from "react";

interface ClickableReferencesProps {
  text: string;
  onReferenceClick: (number: number) => void;
}

export const ClickableReferences: React.FC<ClickableReferencesProps> = ({
  text,
  onReferenceClick,
}) => {
  const createMarkup = () => {
    const regex = /\[(\d+)\]/g;
    const replacedText = text.replace(regex, (match, p1) => {
      return `<span class="inline cursor-pointer hover:border-b border-heading" data-number="${p1}">${match}</span>`;
    });
    return { __html: replacedText };
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
