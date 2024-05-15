import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import ProgressBar from "@/components/progress-bar";
import ModalTopUp from "@/components/modal-top-up";
import ModalTopUpSuccessful from "@/components/modal-top-up-successful";
import ModalTopUpFailed from "@/components/modal-top-up-failed";
import CreditBalanceIcon from "@/components/icon/credit-balance-icon.svg";
import RefreshCreditIcon from "@/components/icon/refresh-credit-icon.svg";
import Button from "@/components/button";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";
import { useRechargeStatus } from "@/hooks/api/user";
import { useAppProvider } from "@/providers/app-provider";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaArrowRight } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function CreditBalance() {
  const [topUpStatus, setTopUpStatus] = useState<string>("");
  const [willRefetch, setWillRefetch] = useState<boolean>(true);
  const [modalTopUpSuccessful, setModalTopUpSuccessful] =
    useState<boolean>(false);
  const [modalTopUpFailed, setModalTopUpFailed] = useState<boolean>(false);

  const { modalTopUp, setModalTopUp } = useAppProvider();
  const { creditBalance, setRefetch } = useCreditBalanceContext();

  const { data } = useRechargeStatus({ willRefetch });

  const { theme } = useTheme();
  const { status } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (data) {
      if (topUpStatus === "processing") {
        switch (data.data.data[0]?.status) {
          case "success":
            setModalTopUpSuccessful(true);
            setWillRefetch(false);
            setTopUpStatus("");
            break;
          case "failed":
            setModalTopUpFailed(true);
            setWillRefetch(false);
            setTopUpStatus("");
            break;
          default:
            setWillRefetch(true);
        }
      } else if (topUpStatus === "") {
        switch (data.data.data[0]?.status) {
          case "processing":
            setTopUpStatus("processing");
            setWillRefetch(true);
            break;
          default:
            setWillRefetch(false);
        }
      }
    }
  }, [data, topUpStatus]);

  const handleTopUp = () => {
    if (status === "connected") {
      setModalTopUp(true);
    } else if (status === "disconnected" && openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <div className="flex w-full flex-col justify-start gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xs text-secondary-text">OC POINTS BALANCE</h2>
        </div>
        <button
          className="self-end rounded-full hover:text-primary"
          onClick={() => setRefetch(true)}
        >
          <div className="rounded-full border-border font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="-2 -2 16 16"
              fill="none"
              className="stroke-secondary-text hover:stroke-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.5 1 7 2.5m0 0L5.5 4M7 2.5H3.4c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656C1 3.639 1 4.059 1 4.9v2.85c0 .232 0 .348.013.446a1.5 1.5 0 0 0 1.291 1.291c.098.013.214.013.446.013M5 9.5h3.6c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656C11 8.361 11 7.941 11 7.1V4.25c0-.232 0-.348-.013-.446a1.5 1.5 0 0 0-1.291-1.291C9.598 2.5 9.482 2.5 9.25 2.5M5 9.5 6.5 11M5 9.5 6.5 8"
              />
            </svg>
          </div>
        </button>
      </div>
      <div className="mx-2 mb-2 flex items-center gap-3 text-secondary-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          className="fill-current"
        >
          <path
            fillRule="evenodd"
            d="M9 .25a8.75 8.75 0 1 0 0 17.5A8.75 8.75 0 0 0 9 .25ZM9 16A7 7 0 1 1 9 2a7 7 0 0 1 0 14Zm.875-11.812v.437c.966 0 1.75.784 1.75 1.75v.656a.438.438 0 0 1-.438.438h-.656a.438.438 0 0 1-.437-.438v-.875H7.906v.77a.192.192 0 0 0 .079.167l3.001 2.476c.403.331.638.825.639 1.347v.709a1.75 1.75 0 0 1-1.75 1.75v.438a.438.438 0 0 1-.438.437h-.874a.438.438 0 0 1-.438-.438v-.437a1.75 1.75 0 0 1-1.75-1.75v-.656c0-.242.196-.438.438-.438h.656c.241 0 .437.196.437.438v.875h2.188v-.77a.193.193 0 0 0-.079-.166L7.014 8.43a1.75 1.75 0 0 1-.639-1.347v-.709c0-.966.784-1.75 1.75-1.75v-.437c0-.242.196-.438.438-.438h.874c.242 0 .438.196.438.438Z"
            clipRule="evenodd"
          />
        </svg>
        <p>
          <span className="lg:text-md text-sm font-medium">
            {creditBalance} OC Points
          </span>
        </p>
      </div>
      {topUpStatus === "processing" && (
        <div className="flex items-center">
          <FaSpinner className="animate-spin" />
          <span className="ml-2 text-xs font-medium">Processing Top-Up...</span>
        </div>
      )}
      <Button onClick={handleTopUp} disabled={topUpStatus === "processing"}>
        <p>Top up OC Points</p>
        <FaArrowRight />
      </Button>
      <ModalTopUpSuccessful
        isOpen={modalTopUpSuccessful}
        setIsOpen={setModalTopUpSuccessful}
      />
      <ModalTopUpFailed
        isOpen={modalTopUpFailed}
        setIsOpen={setModalTopUpFailed}
      />
      <ModalTopUp
        isOpen={modalTopUp}
        setIsOpen={setModalTopUp}
        setTopUpStatus={setTopUpStatus}
      />
    </div>
  );
}
