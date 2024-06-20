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
import { useState, useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import Notification from "@/components/notification";
import Button from "@/components/button";
import { UnderlinedButton } from "@/components/buttons/underlined-button";
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
  const [form, setForm] = useState<Form>({ amount: 0 });
  const [continueBtn, setContinueBtn] = useState({
    disable: false,
    text: "Top up",
  });

  const [toast3ErrorOpen, setToast3ErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
  const { setTopUpAmount } = useAppProvider();

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleContinue = async () => {
    if (!form.amount || form.amount <= 0 || isNaN(form.amount)) {
      setToast3ErrorOpen(true);
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    try {
      const bal = await balanceOf();
      if (bal === 0) {
        setToast3ErrorOpen(true);
        setErrorMessage(
          "Insufficient OCU Credits balance. Please get more OCU Credits token.",
        );
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
        text: "Topping up...",
      });

      const rechargeTx = await recharge(form.amount!);
      setTopUpAmount(form.amount!);

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
              text: "Top up",
            });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    } catch (error: any) {
      console.error(error);

      const allw = await allowance();
      if (allw < form.amount! * KIP_TOKEN_DECIMAL) {
        setContinueBtn({
          disable: false,
          text: "Approve",
        });
      } else {
        setContinueBtn({
          disable: false,
          text: "Top up",
        });
      }

      switch (error.code) {
        case "ACTION_REJECTED":
          setErrorMessage("Top up rejected.");
          break;
        case "CALL_EXCEPTION":
          setErrorMessage(
            "An internal error occurred. Please check your chain data and gas fee.",
          );
          break;
        default:
          setErrorMessage("An error occurred. Please try again.");
      }
      setToast3ErrorOpen(true);
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

  useEffect(() => {
    const checkAllowance = async () => {
      const allw = await allowance();
      if (allw < form.amount! * KIP_TOKEN_DECIMAL) {
        setContinueBtn({
          disable: false,
          text: "Approve",
        });
      }
    };

    checkAllowance();
  }, [form]);

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <Notification
        type="error"
        open={toast3ErrorOpen}
        setOpen={setToast3ErrorOpen}
        className="fixed inset-x-0 top-9 flex items-center justify-center"
        action={false}
      >
        <p className="font-semibold">{errorMessage}</p>
      </Notification>
      <div className="flex flex-col justify-between gap-4 rounded-lg p-8 shadow-md">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-primary">
            Top Up OCU Credits
          </h1>
          <h2 className="text-sm font-medium text-body">
            Get OCU Credits by Paying
            <span className="text-primary"> $EDU </span>
            token.
          </h2>
        </div>
        <div className="w-full border border-border"></div>
        <p className="text-sm font-medium">Enter your OCU Credit amount</p>
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="w-full text-lg leading-10">
            <input
              className="placeholder-text-[#7C878E] w-full rounded-lg border-border bg-transparent text-sm font-medium leading-6 placeholder-[#777E90]"
              type="number"
              name="amount"
              placeholder="Number"
              onChange={(e) => {
                handleFormChange("amount", e.target.value);
              }}
              value={form?.amount}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="grid w-full grid-cols-3 gap-3">
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-lg border-2 font-medium text-heading ${
                form?.amount == 50 ? "border-primary" : "border-border"
              }`}
              onClick={() => {
                handleFormChange("amount", 50);
              }}
            >
              <span className="text-sm leading-6">50</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-lg border-2 font-medium text-heading ${
                form?.amount == 100 ? "border-primary" : "border-border"
              }`}
              onClick={() => {
                handleFormChange("amount", 100);
              }}
            >
              <span className="text-sm leading-6">100</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-lg border-2 font-medium text-heading ${
                form?.amount == 300 ? "border-primary" : "border-border"
              }`}
              onClick={() => {
                handleFormChange("amount", 300);
              }}
            >
              <span className="text-sm leading-6">300</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-lg border-2 font-medium text-heading ${
                form?.amount == 500 ? "border-primary" : "border-border"
              }`}
              onClick={() => {
                handleFormChange("amount", 500);
              }}
            >
              <span className="text-sm leading-6">500</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-lg border-2 font-medium text-heading ${
                form?.amount == 750 ? "border-primary" : "border-border"
              }`}
              onClick={() => {
                handleFormChange("amount", 750);
              }}
            >
              <span className="text-sm leading-6">750</span>
            </button>
            <button
              className={`flex h-12 flex-col items-center justify-center rounded-lg border-2 font-medium text-heading ${
                form?.amount == 1000 ? "border-primary" : "border-border"
              }`}
              onClick={() => {
                handleFormChange("amount", 1000);
              }}
            >
              <span className="text-sm leading-6">1000</span>
            </button>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="w-80 text-sm font-medium text-body">
            <span>You are paying </span>
            <span className="text-primary">
              {form?.amount ? form.amount : 0} $EDU
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <UnderlinedButton
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setMinted(false);
            }}
          >
            Cancel
          </UnderlinedButton>
          {!isTargetNetworkActive ? (
            <Button onClick={switchToTargetNetwork} className="px-6 py-2">
              <h5>Change Network to {targetNetworkName}</h5>
            </Button>
          ) : (
            <Button
              onClick={handleContinue}
              disabled={continueBtn.disable}
              className="px-6 py-2"
            >
              <h5>{continueBtn.text}</h5>
            </Button>
          )}
        </div>
      </div>
    </ModalBlank>
  );
}
