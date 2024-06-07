"use client";

import { mintToken } from "@/smart-contract/kip-token";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { KIP_TOKEN_DECIMAL } from "@/utils/constants";
import { delay } from "@/utils/utils";
import { useState } from "react";

export default function FreeKFIToken() {
  const { setStep } = useCreateChatbotContext();
  const [minting, setMinting] = useState(false);

  const handleMintToken = async () => {
    try {
      setMinting(true);
      await mintToken(1000 * KIP_TOKEN_DECIMAL);
      await delay(3000);
      setStep("onboarding_success");
    } catch (error) {
      console.log("handleMintToken", error);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 mt-8 text-5xl font-bold text-heading">
          Free Mint $EDU Token
        </h1>
        <p className="mb-8 w-2/3 text-lg text-heading">
          Get free $EDU Token. You can use it to top up OCU Credits and interact
          with any chatbots on KnowledgeFi.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleMintToken}
            className="button w-auto max-w-xs px-8 py-2 font-bold"
            disabled={minting}
          >
            {minting ? "Minting..." : "Mint Now"}
          </button>
          <button
            onClick={() => setStep("onboarding_success")}
            className="w-auto max-w-xs bg-transparent px-8 py-2 hover:opacity-75"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
}
