import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import ProgressBar from "@/components/progress-bar";
import ModalTopUp from "@/components/modal-top-up";
import ModalTopUpSuccessful from "@/components/modal-top-up-successful";
import ModalTopUpFailed from "@/components/modal-top-up-failed";
import CreditBalanceIcon from "@/components/icon/credit-balance-icon.svg";
import RefreshCreditIcon from "@/components/icon/refresh-credit-icon.svg";
import { useCreditBalanceContext } from "./credit-balance-context";
import { useCreditBalance } from "@/hooks/api/credit";
import { useRechargeStatus } from "@/hooks/api/user";
import { useAppProvider } from "@/providers/app-provider";
import { useState, useEffect } from "react";

export default function CreditBalance() {
  const [topUpStatus, setTopUpStatus] = useState<string>("");
  const [willRefetch, setWillRefetch] = useState<boolean>(true);
  const [modalTopUpSuccessful, setModalTopUpSuccessful] =
    useState<boolean>(false);
  const [modalTopUpFailed, setModalTopUpFailed] = useState<boolean>(false);

  const { modalTopUp, setModalTopUp } = useAppProvider();
  const { creditBalance, setRefetch } = useCreditBalanceContext();

  const { data } = useRechargeStatus({ willRefetch });

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

  return (
    <div className="flex w-full flex-col justify-start gap-2 px-5 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={CreditBalanceIcon} alt="credit-icon" width={20} height={20} />
          <h6 className="text-lg font-bold tracking-tight">Credit Balance</h6>
        </div>
        <button
          className="self-end rounded-full text-gray-400 hover:text-blue-500"
          onClick={() => setRefetch(true)}
        >
          <div className="rounded-full border-gray-700 p-1 font-semibold">
            <Image src={RefreshCreditIcon} alt="refresh-icon" width={16} height={16} />
          </div>
        </button>
      </div>
      <p>
        <span className="lg:text-md text-sm font-medium">
          {creditBalance} Credits
        </span>
      </p>
      {topUpStatus === "processing" && (
        <div className="flex items-center">
          <FaSpinner className="animate-spin" />
          <span className="ml-2 text-xs font-medium">Processing Top-Up...</span>
        </div>
      )}
      <button
        className="mt-2 flex w-full justify-center rounded-full border-2 border-aqua-700 px-2 py-2 disabled:brightness-50"
        onClick={() => setModalTopUp(true)}
        disabled={topUpStatus === "processing"}
      >
        <span className="text-xs font-medium text-[#FCFCFD] duration-200">
          Top Up Credits
        </span>
      </button>
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
