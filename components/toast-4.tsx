import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon-2.png";
import ModalBlank from "./modal-blank-3";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

interface ToastProps {
  children: React.ReactNode;
  type?: "warning" | "error" | "success" | "";
  open: boolean;
  setOpen: (open: boolean) => void;
  onDone?: any;
  onClose?: any;
}

export default function SuccessFailModal({
  children,
  type = "success",
  open,
  setOpen,
  onDone,
  onClose,
}: ToastProps) {
  const router = useRouter();
  // TODO: add fail type
  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div
        className={`flex w-[360px] flex-col items-center justify-center rounded-2xl px-7 py-10 text-heading font-semibold`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-3xl">{type === "success" ? "Success" : type === "error" ? "Error" : null}</h2>
          <Image
            className="h-[12px] w-[12px] cursor-pointer"
            src={CrossIcon}
            alt="cross icon"
            onClick={onClose || (() => router.push("/nft"))}
          />
        </div>
        <div
          className={`flex flex-row gap-3 my-7 items-center justify-center text-sm`}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect className="fill-primary" width="30" height="30" rx="15"/>
            <path className="fill-container" fillRule="evenodd" clipRule="evenodd" d="M21.7071 10.2929C22.0976 10.6834 22.0976 11.3166 21.7071 11.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071L8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L13 17.5858L20.2929 10.2929C20.6834 9.90237 21.3166 9.90237 21.7071 10.2929Z"/>
          </svg>
          {children}
        </div>
        <button
          onClick={onDone || (() => router.push("/nft"))}
          className="button w-full"
        >
          Done
        </button>
      </div>
    </ModalBlank>
  );
}
