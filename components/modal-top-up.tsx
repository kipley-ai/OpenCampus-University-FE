"use client";

import ModalBlank from "@/components/modal-blank-3";
import { balanceOf, allowance, approve } from "@/smart-contract/edu-coin";
import { topup } from "@/smart-contract/payment";
import { KIP_TOKEN_DECIMAL } from "@/utils/constants";
import { useState, useEffect } from "react";
import { useAppProvider } from "@/providers/app-provider";
import Notification from "@/components/notification";
import Button from "@/components/button";
import { UnderlinedButton } from "@/components/buttons/underlined-button";
import {
  useSwitchToSepolia,
  useSwitchToBase,
  useSwitchToArbitrumSepolia,
} from "@/hooks/useSwitchNetwork";
import { useAddRecharge } from "@/hooks/api/user";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa6";
import { delay } from "@/utils/utils";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";

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

  const [isWarningToastOpen, setIsWarningToastOpen] = useState<boolean>(false);
  const [toast3ErrorOpen, setToast3ErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  // Determine the environment and accordingly use the switch network hook
  const isDevelopment = process.env.NEXT_PUBLIC_ENV_DEV === "1";
  // const { isSepolia, switchToSepolia } = useSwitchToSepolia();
  const { isBase, switchToBase } = useSwitchToBase();
  const { isArbitrumSepolia, switchToArbitrumSepolia } =
    useSwitchToArbitrumSepolia();

  // Determine which network is currently active and which switch function to use
  const isTargetNetworkActive = isDevelopment ? isArbitrumSepolia : isBase;
  const switchToTargetNetwork = isDevelopment
    ? switchToArbitrumSepolia
    : switchToBase;
  const targetNetworkName = isDevelopment ? "Arbitrum Sepolia" : "Base";

  const addRecharge = useAddRecharge();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { setTopUpAmount, session } = useAppProvider();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const calculateToken = (amount: number) => {
    if (process.env.NEXT_PUBLIC_ENV_DEV === "1") {
      return amount / 1000;
    }
    return amount;
  };

  const handleConnect = async () => {
    try {
      openConnectModal && openConnectModal();
      setIsWarningToastOpen(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setToast3ErrorOpen(true);
      setErrorMessage(
        "Error connecting wallet. Please make sure you have a wallet connected.",
      );
    }
  };

  const handleContinue = async () => {
    if (!form.amount || form.amount <= 0 || isNaN(form.amount)) {
      setToast3ErrorOpen(true);
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    try {
      const bal = await balanceOf();
      console.log("bal :>> ", bal);
      if (bal === 0) {
        setToast3ErrorOpen(true);
        setErrorMessage(
          "Insufficient OCU Credits balance. Please get more OCU Credits token.",
        );
        return;
      }

      const allw = await allowance();
      console.log("allw :>> ", allw);

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

      const topUpTransaction = await topup(
        form.amount! / 1000,
        session.address,
      );
      setTopUpAmount(form.amount!);

      addRecharge.mutate(
        {
          tx_id: topUpTransaction.hash,
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

  const checkAllowance = async () => {
    const allw = await allowance();
    console.log("allw :>> ", allw);
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
  };

  useEffect(() => {
    if (isConnected && isTargetNetworkActive) {
      checkAllowance();
    }
  }, [form, isConnected, isTargetNetworkActive]);

  useEffect(() => {
    if (isConnected && isTargetNetworkActive) {
      checkAllowance();
    }
  }, [address]);

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
      <Notification
        type="warning"
        open={isWarningToastOpen}
        setOpen={setIsWarningToastOpen}
        className="fixed inset-x-0 top-9 flex items-center justify-center"
        action={false}
      >
        <p className="font-semibold">
          {isConnected ? (
            <>
              You are connected to{" "}
              <span className="text-primary">
                {address?.substring(0, 5) +
                  "..." +
                  address?.substring(address.length - 5)}
              </span>
              , which will be used to top up OCU Credits for{" "}
              <span className="text-primary">{session.edu_username}</span>.
            </>
          ) : (
            <>
              Please connect your wallet to top up OCU Credits for your{" "}
              <span className="text-primary">{session.edu_username}</span>{" "}
              account.
            </>
          )}
        </p>
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
              {form?.amount ? form.amount / 1000 : 0} $EDU
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isConnected && isTargetNetworkActive && (
              <button
                className="btn-plain outline-none"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <UnderlinedButton
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setMinted(false);
              }}
            >
              Cancel
            </UnderlinedButton>
            {!isConnected ? (
              <Button onClick={handleConnect} className="px-6 py-2">
                <h5>Connect Wallet</h5>
              </Button>
            ) : !isTargetNetworkActive ? (
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
      </div>
    </ModalBlank>
  );
}
