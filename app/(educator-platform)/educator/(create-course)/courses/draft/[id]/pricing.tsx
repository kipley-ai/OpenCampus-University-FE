'use client';

import Image from 'next/image';
import PricingWarningIcon from "components/icon/pricing-warning.svg";
import InfoOutlineIcon from "components/icon/icon-info-outline.svg";

export const Pricing = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl text-[#141BEB] font-bold mb-6">Pricing</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <Image src={PricingWarningIcon} alt="Pricing Warning" className="flex-shrink-0 w-6 h-6 text-orange-500 mr-3" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Please finish your premium application</h3>
            <p className="text-gray-600 mb-4">You'll be able to set your price once your payout method is approved.</p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Complete the premium application
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-xl text-[#111827] font-semibold mb-4">Set a price for your course</h3>
      <p className="text-[#6B7280] mb-6">
        Please select the currency and the price tier for your course. If you'd like to offer your 
        course for free, it must have a total video length of less than 2 hours. Also, courses 
        with practice tests can not be free.
      </p>

      <div className="flex gap-4 mb-6">
        <div>
          <label htmlFor="currency" className="block text-sm font-semibold text-[#111827] mb-1">Currency</label>
          <select id="currency" className="border rounded-md px-3 py-2 w-32">
            <option>USD</option>
          </select>
        </div>
        <div className="flex-grow">
          <label htmlFor="price-tier" className="block text-sm font-semibold text-[#111827] mb-1">
            Price Tier 
            <Image src={InfoOutlineIcon} alt="Info" className="inline-block w-4 h-4 ml-1 text-gray-400" />
          </label>
          <select id="price-tier" className="border rounded-md px-3 py-2 w-full">
            <option>Free</option>
          </select>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
        Save
      </button>
    </div>
    </>
  );
};
