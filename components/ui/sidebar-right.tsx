import React from "react";

interface SidebarRightProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const SidebarRight: React.FC<SidebarRightProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-96 transform pt-5 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } bg-container duration-300 ease-in-out`}
      >
        {children}
        <button
          className="absolute right-4 top-5 hover:text-primary"
          onClick={onClose}
        >
          &#10006;
        </button>
      </div>
      {/* Darkened overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 z-40 bg-slate-900 bg-opacity-30"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};
