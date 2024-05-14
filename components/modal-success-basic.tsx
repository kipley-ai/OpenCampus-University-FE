import Image from "next/image";
import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

interface ModalSuccessBasicProps {
  message: string;
  imagePath: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ModalSuccessBasic({
  message,
  imagePath,
  open,
  setOpen,
}: ModalSuccessBasicProps) {
  const router = useRouter();

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div className="w-lg flex flex-col items-center justify-center gap-4 rounded-2xl px-7 py-12 font-semibold">
        <Image src={imagePath} alt="Success" width={98} height={150} />
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
          <h1 className="text-sm md:text-lg">{message}</h1>
        </div>
        <Button
          onClick={() => router.push("/nft")}
          className="px-4 py-2 text-sm md:text-lg"
        >
          Continue
        </Button>
      </div>
    </ModalBlank>
  );
}
