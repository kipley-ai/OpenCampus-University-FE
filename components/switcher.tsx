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
      className={`${!fullWidth ? "max-w-[501px]" : ""} rounded-lg border border-border ${bg} p-1 lg:h-10`}
    >
      <div className="relative flex w-full items-center">
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
          className={`absolute h-full w-1/${texts.length} rounded-lg bg-container transition-all ${mode === 0 ? "left-0" : "left-1/" + texts.length}`}
        ></span>
      </div>
    </div>
  );
};

export default Switcher;
