import ReferralBanner from "@/public/images/referral-banner.png";
import Image from "next/image";

export const ReferralBonus = () => {
  return (
    <div className="space-y-10">
      <Image
        className="w-full"
        src="/images/referral-banner.svg"
        alt="ReferralBanner"
        width={950}
        height={260}
      />
      <div className="flex flex-col gap-4 md:gap-8">
        <h1 className="text-lg font-semibold">Your Referral Link</h1>
        <div className="flex flex-col justify-between gap-4 text-sm md:flex-row">
          <p className="w-full text-body md:w-1/3">
            Points will be added when your friend successfully signs up with
            your link.
          </p>
          <div className="flex w-full flex-row items-center justify-between rounded-xl border p-3 md:w-8/12 md:px-5 md:py-3">
            <span className="font-medium">
              https://oc-campus.com/reffer/?refid=325re33272ku
            </span>
            <span
              className="cursor-pointer font-medium text-primary hover:underline"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://oc-campus.com/reffer/?refid=325re33272ku",
                );
              }}
            >
              Copy link
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralBonus;
