"use client";

import ModalBlank from "@/components/modal-blank-3";
import { recharge } from "@/smart-contract/kip-protocol-contract";
import {
  allowance,
  approve,
  balanceOf,
  mintToken,
} from "@/smart-contract/kip-token";
import { KIP_TOKEN_DECIMAL } from "@/utils/constants";
import { useState } from "react";
import Notification from "@/components/notification";
import ModalTopUpSuccessful from "./modal-top-up-successful";
import ModalTopUpFailed from "./modal-top-up-failed";
import ModalTopUpPending from "./modal-top-up-pending";
import Button from "@/components/button";
import { useSwitchToSepolia, useSwitchToBase } from "@/hooks/useSwitchNetwork";
import { useAddRecharge } from "@/hooks/api/user";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa6";
import { delay } from "@/utils/utils";

interface Form {
  amount?: number;
}

export default function ModalTopUp({
  isOpen,
  setIsOpen,
  setTopUpStatus,
}: {
  isOpen: boolean;
  setIsOpen: any;
  setTopUpStatus?: any;
}) {
  const [form, setForm] = useState<Form>({});
  const [continueBtn, setContinueBtn] = useState({
    disable: false,
    text: "Continue",
  });

  const [toast3ErrorOpen, setToast3ErrorOpen] = useState<boolean>(false);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  // Determine the environment and accordingly use the switch network hook
  const isDevelopment = process.env.NEXT_PUBLIC_ENV_DEV === "1";
  const { isSepolia, switchToSepolia } = useSwitchToSepolia();
  const { isBase, switchToBase } = useSwitchToBase();

  // Determine which network is currently active and which switch function to use
  const isTargetNetworkActive = isDevelopment ? isSepolia : isBase;
  const switchToTargetNetwork = isDevelopment ? switchToSepolia : switchToBase;
  const targetNetworkName = isDevelopment ? "Sepolia" : "Base";

  const addRecharge = useAddRecharge();

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleContinue = async () => {
    if (!form.amount || form.amount == 0) {
      return;
    }

    try {
      const bal = await balanceOf();
      if (bal === 0) {
        setToast3ErrorOpen(true);
        return;
      }

      const allw = await allowance();

      if (allw < form.amount! * KIP_TOKEN_DECIMAL) {
        setContinueBtn({
          disable: true,
          text: "Approving...",
        });
        const approveTx = await approve(bal);
        await approveTx.wait();
      }

      setContinueBtn({
        disable: true,
        text: "Confirming...",
      });

      const rechargeTx = await recharge(form.amount!);

      addRecharge.mutate(
        {
          tx_id: rechargeTx.hash,
        },
        {
          onSuccess: () => {
            setTopUpStatus("processing");
            setIsOpen(false);
            setContinueBtn({
              disable: false,
              text: "Continue",
            });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    } catch (error) {
      console.log(error);
      setContinueBtn({
        disable: false,
        text: "Continue",
      });
    }
  };

  const handleMintToken = async () => {
    try {
      setMinting(true);
      await mintToken(1000 * KIP_TOKEN_DECIMAL);
      await delay(3000);
      setMinted(true);
    } catch (error) {
      console.log("handleMintToken", error);
    } finally {
      setMinting(false);
    }
  };

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <Notification
        type="error"
        open={toast3ErrorOpen}
        setOpen={setToast3ErrorOpen}
        className="fixed inset-x-0 top-9 flex items-center justify-center"
        action={false}
      >
        <p className="font-semibold">
          Insufficient $CREDIT balance. Please get more $CREDIT token.
        </p>
      </Notification>
      <div className="flex flex-col items-center justify-between rounded-lg p-4 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="w-80 text-[32px] font-black leading-10">
            <span>Top up credits</span>
          </div>
          <button
            className="text-heading hover:text-secondary"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setMinted(false);
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
                stroke="#353945"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                fill="var(--color-heading)"
              />
            </svg>
          </button>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5 pt-0">
          <div className="w-full text-base font-semibold leading-10">
            <span>Get Credits by Paying </span>
            <span className="text-primary">$CREDIT </span>
            <span>token</span>
          </div>
        </div>
        <div className="inline-flex items-center self-stretch pl-5">
          <div className="flex cursor-pointer items-center gap-2">
            {!isTargetNetworkActive ? (
              <button
                onClick={switchToTargetNetwork}
                className="text-sm underline underline-offset-4 hover:opacity-75"
              >
                Change network to claim $CREDIT token
              </button>
            ) : (
              <button
                disabled={minting || minted}
                onClick={handleMintToken}
                className="text-sm underline underline-offset-4 enabled:hover:opacity-75"
              >
                {minting
                  ? "Claiming..."
                  : minted
                    ? "Successfully claimed 1,000 $CREDIT Token!"
                    : "Claim Free $CREDIT Token"}
              </button>
            )}
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="w-full text-lg font-bold leading-10">
            <input
              className="placeholder-text-[#7C878E] w-full bg-transparent rounded-xl px-4 py-3 text-sm leading-6 placeholder-[#777E90]"
              type="number"
              name="amount"
              placeholder="Enter your credit amount here"
              onChange={(e) => {
                handleFormChange("amount", e.target.value);
              }}
              value={form?.amount}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch px-5 py-0">
          <div className="grid w-full grid-cols-3 gap-3 font-bold text-heading">
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${
                form?.amount == 50 ? "border-primary" : "border-[#50575F]"
              }`}
              onClick={() => {
                handleFormChange("amount", 50);
              }}
            >
              <span className="text-sm font-bold leading-6">50</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${
                form?.amount == 100 ? "border-primary" : "border-[#50575F]"
              }`}
              onClick={() => {
                handleFormChange("amount", 100);
              }}
            >
              <span className="text-sm font-bold leading-6">100</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${
                form?.amount == 300 ? "border-primary" : "border-[#50575F]"
              }`}
              onClick={() => {
                handleFormChange("amount", 300);
              }}
            >
              <span className="text-sm font-bold leading-6">300</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${
                form?.amount == 500 ? "border-primary" : "border-[#50575F]"
              }`}
              onClick={() => {
                handleFormChange("amount", 500);
              }}
            >
              <span className="text-sm font-bold leading-6">500</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${
                form?.amount == 750 ? "border-primary" : "border-[#50575F]"
              }`}
              onClick={() => {
                handleFormChange("amount", 750);
              }}
            >
              <span className="text-sm font-bold leading-6">750</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-3xl border-2 ${
                form?.amount == 1000 ? "border-primary" : "border-[#50575F]"
              }`}
              onClick={() => {
                handleFormChange("amount", 1000);
              }}
            >
              <span className="text-sm font-bold leading-6">1000</span>
            </button>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5 pt-2 ">
          <div className="w-80 text-sm font-semibold leading-10">
            <span>You are paying </span>
            <span className="text-primary">{form?.amount} $CREDIT</span>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch p-5">
          <div className="grid w-full grid-cols-1 font-bold text-heading">
            {!isTargetNetworkActive ? (
              <Button
                onClick={switchToTargetNetwork}
              >
                <h5>
                  Change Network to {targetNetworkName}
                </h5>
              </Button>
            ) : (
              <Button
                onClick={handleContinue}
                disabled={continueBtn.disable}
              >
                <h5>{continueBtn.text}</h5>
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}
