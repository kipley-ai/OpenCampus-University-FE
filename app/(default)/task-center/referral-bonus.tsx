import ReferralBanner from "@/public/images/referral-banner.png";
import Image from "next/image";

export const ReferralBonus = () => {
  return (
    <div className="space-y-10">
      <Image className="w-full" src={ReferralBanner} alt="ReferralBanner" />
      <div className="flex flex-col space-y-8">
        <h1 className="text-lg font-semibold">Your Referral Link</h1>
        <div className="flex flex-row justify-between">
            <p className="w-1/3">Points will be added when your friend successfully signs up with your link.</p>
            <div className="w-6/12 flex flex-row justify-between border items-center px-5 rounded-xl">
              <span className="opacity-50">https://oc-campus.com/reffer/?refid=325re33272ku</span>
              <span 
                className="text-primary cursor-pointer" 
                onClick={() => {
                  navigator.clipboard.writeText("https://oc-campus.com/reffer/?refid=325re33272ku");
                }}>
                Copy Link</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralBonus;