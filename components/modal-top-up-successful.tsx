import Image from "next/image";
import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";

interface ModalTopupSuccessfulProps {
  amount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ModalTopupSuccessful({
  amount,
  isOpen,
  setIsOpen,
}: ModalTopupSuccessfulProps) {
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-lg flex flex-col items-center justify-center gap-4 rounded-2xl p-8 pt-0 font-semibold">
        <Image
          src="/images/top-up-success.svg"
          alt="Top up was successful!"
          width={400}
          height={250}
        />
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-row items-center justify-center gap-3 text-sm">
            <svg
              viewBox="0 0 33 33"
              xmlns="http://www.w3.org/2000/svg"
              fill="#00D4AA"
              className="size-6 shrink-0"
            >
              <rect width="30" height="30" rx="15" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.7071 10.2929C22.0976 10.6834 22.0976 11.3166 21.7071 11.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071L8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L13 17.5858L20.2929 10.2929C20.6834 9.90237 21.3166 9.90237 21.7071 10.2929Z"
                fill="#FFFFFF"
              />
            </svg>
            <h1 className="text-sm md:text-lg">
              You've successfully topped up
            </h1>
          </div>
          <h2 className="text-lg text-aqua-700 md:text-2xl">
            {amount} OC Points
          </h2>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm md:text-lg"
        >
          Continue
        </Button>
      </div>
    </ModalBlank>
  );
}
