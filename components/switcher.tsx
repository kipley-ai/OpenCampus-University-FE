"use client";

type SwitcherProps = {
  texts: string[];
  mode: number;
  setWhich: any;
  fullWidth?: boolean;
  bg?: string;
};

const Switcher = ({
  texts = [],
  mode,
  setWhich,
  fullWidth = false,
  bg = "bg-secondary",
}: SwitcherProps) => {
  return (
    <div
      className={`${!fullWidth ? "max-w-[501px]" : ""} rounded-lg border border-border ${bg} md:h-10 md:p-1`}
    >
      <div className="relative flex w-full flex-row items-center">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`z-10 cursor-pointer rounded-sm py-1 w-1/${texts.length}`}
          >
            <h1
              onClick={() => setWhich(index)}
              className={`text-center text-xs font-medium lg:text-sm ${mode === index ? "" : "hover:text-primary"}`}
            >
              {text}
            </h1>
          </div>
        ))}
        <span
          aria-hidden="true"
          className={`${mode != 0 ? `left-[${(mode * 100) / texts.length}%]` : "left-0"} absolute h-full w-1/${texts.length} rounded-lg bg-container transition-all`}
        ></span>
      </div>
    </div>
  );
};

export default Switcher;
