interface BoxWithNumberProps {
  number: number;
  isActive: boolean;
}

const BoxWithNumber: React.FC<BoxWithNumberProps> = ({ number, isActive }) => {
  return (
    <div
      className={`flex h-5 w-5 items-center justify-center border-2 bg-container ${isActive ? "border-primary text-primary" : "border-[#50575F]"}`}
    >
      <span className="text-sm">{number}</span>
    </div>
  );
};

const CircleWithNumber: React.FC<BoxWithNumberProps> = ({
  number,
  isActive,
}) => {
  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-primary text-white ${isActive ? "" : "border-primary_50 bg-primary_50"}`}
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
          <CircleWithNumber number={number} isActive={isActive} />
        </span>
      </div>
      <div className="flex w-[160px] justify-center">
        <span
          className={`text-center text-sm text-primary ${isActive ? "" : "text-primary_50"}`}
        >
          {children}
        </span>
      </div>
    </li>
  );
};

export default function OnboardingProgress({ step = 1 }: { step?: number }) {
  return (
    <div className="flex w-full">
      <div className="relative font-poppins font-semibold text-[#50575F]">
        <div
          className="absolute inset-x-8 top-[10px] z-0 -mt-px h-[2px] bg-[#50575F] xs:inset-x-20"
          aria-hidden="true"
        ></div>
        <ul className="relative z-20 flex justify-between gap-10">
          <ProgressItem number={1} isActive={step >= 1}>
            Select Data Elements
          </ProgressItem>
          <ProgressItem number={2} isActive={step >= 2}>
            Mint KnowledgeKey
          </ProgressItem>
          <ProgressItem number={3} isActive={step >= 3}>
            Create App
          </ProgressItem>
        </ul>
      </div>
    </div>
  );
}
