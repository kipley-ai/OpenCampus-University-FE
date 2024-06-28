"use client";

import React from "react";
import ModalBlank from "@/components/modal-blank-3";
import Image from "next/image";
import Button from "@/components/button";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useSwitchToSepolia,
  useSwitchToBase,
  useSwitchToArbitrumSepolia,
} from "@/hooks/useSwitchNetwork";
import NoCover from "public/images/no-cover.svg";

export default function ModalMintConfirmation({
  isOpen,
  setIsOpen,
  nftImage,
  handleMintNFT,
  isMinting,
}: {
  isOpen: boolean;
  setIsOpen: any;
  nftImage: string;
  handleMintNFT: () => void;
  isMinting?: boolean;
}) {
  // Determine the environment and accordingly use the switch network hook
  const isDevelopment = process.env.NEXT_PUBLIC_ENV_DEV === "1";
  const { isSepolia, switchToSepolia } = useSwitchToSepolia();
  const { isBase, switchToBase } = useSwitchToBase();
  const { isArbitrumSepolia, switchToArbitrumSepolia } =
    useSwitchToArbitrumSepolia();

  // Determine which network is currently active and which switch function to use
  const isTargetNetworkActive = isDevelopment ? isArbitrumSepolia : isBase;
  const switchToTargetNetwork = isDevelopment
    ? switchToArbitrumSepolia
    : switchToBase;
  const targetNetworkName = isDevelopment ? "Arbitrum Sepolia" : "Base";

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { isConnected } = useAccount();

  const handleConnect = async () => {
    try {
      await connect();
      console.log("Wallet address connected");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col rounded-2xl border border-[#DDDDEB] bg-box px-10 py-2 shadow-md">
        <div className="self-stretch border-b-2 py-5">
          <div className="text-lg font-semibold text-primary">
            <span>Mint your KnowledgeKey</span>
          </div>
          {/* <button
            className="text-[#FCFCFD] hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div className="sr-only">Close</div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="var(--color-heading)"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="var(--color-heading)"
              />
            </svg>
          </button> */}
        </div>
        <div className="my-5 flex items-center gap-8">
          <Image
            src={nftImage ? nftImage : NoCover}
            alt="NFT Image"
            width={125}
            height={125}
            className="rounded-lg"
          />
          <span>Price:</span>
          <div className="flex items-center gap-2">
            <span className="line-through">50$EDU</span>
            <span className="text-2xl font-extrabold leading-tight text-[#00BF99]">
              FREE
            </span>
          </div>
        </div>
        <span className="text-sm">
          🔥 Limited-Time Promotion: Zero Platform Fee
        </span>
        <div className="my-4 inline-flex items-center justify-between self-stretch">
          <div className="grid w-full grid-cols-1 text-heading">
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary underline underline-offset-2 hover:underline-offset-4"
              >
                Cancel
              </button>
              {!isConnected ? (
                <Button onClick={handleConnect}>Connect Wallet</Button>
              ) : !isTargetNetworkActive ? (
                <Button onClick={switchToTargetNetwork}>
                  <span className="">
                    Change Network to {targetNetworkName}
                  </span>
                  <svg
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              ) : (
                <Button
                  onClick={handleMintNFT}
                  disabled={isMinting}
                  className="rounded-md bg-primary px-6 py-2 text-white"
                >
                  {isMinting ? "Minting..." : "Confirm"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}
