import React from "react";
import clsx from "clsx";

type PaginationNumberProps = {
  page: number | string;
  onClick: (page: number) => void;
  isActive: boolean;
  position?: "first" | "last" | "middle";
};

export const PaginationNumber: React.FC<PaginationNumberProps> = ({
  page,
  onClick,
  isActive,
  position,
}) => {
  const handleClick = () => {
    if (page !== "...") {
      onClick(Number(page));
    }
  };

  const className = clsx(
    "rounded inline-flex items-center justify-center leading-5 px-3.5 py-2 cursor-pointer",
    {
      "text-primary border border-2 border-primary": isActive,
      "border border-transparent hover:border-primary text-gray-400 hover:text-primary":
        !isActive && page !== "...",
      "cursor-default": page === "...",
    },
  );

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={page === "..."}
    >
      {page}
    </button>
  );
};
