interface BoxWithNumberProps {
  number: number;
  isActive: boolean;
}

const BoxWithNumber: React.FC<BoxWithNumberProps> = ({ number, isActive }) => {
  return (
    <div
      className={`flex h-5 w-5 items-center justify-center border border-2 bg-container ${isActive ? "border-primary text-primary" : "border-[#50575F]"}`}
    >
      <span className="text-sm">{number}</span>
    </div>
  );
};

const ProgressItem = ({
  number,
  isActive,
  children,
}: {
  number: number;
  isActive: boolean;
  children: React.ReactNode;
}) => {
  return (
    <li className="flex-1">
      <div className="flex justify-center">
        <span className="">
          <BoxWithNumber number={number} isActive={isActive} />
        </span>
      </div>
      <div className="flex justify-center">
        <span
          className={`text-center text-sm ${isActive ? "text-primary" : ""}`}
        >
          {children}
        </span>
      </div>
    </li>
  );
};

export default function OnboardingProgress({ step = 1 }: { step?: number }) {
  return (
    <div className="mb-2 flex w-full justify-center">
      <div className="relative font-poppins font-semibold text-[#50575F]">
        <div
          className="absolute inset-x-8 xs:inset-x-14 top-[10px] z-0 -mt-px h-[2px] bg-[#50575F]"
          aria-hidden="true"
        ></div>
        <ul className="relative z-20 flex justify-between gap-24">
          <ProgressItem number={1} isActive={step === 1}>
            Select Data Elements
          </ProgressItem>
          <ProgressItem number={2} isActive={step === 2}>
            Mint SFT
          </ProgressItem>
          <ProgressItem number={3} isActive={step === 3}>
            Create Chatbot
          </ProgressItem>
        </ul>
      </div>
    </div>
  );
}
