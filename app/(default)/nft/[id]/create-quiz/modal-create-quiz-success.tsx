import Image from "next/image";
import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

interface ModalCreateQuizSuccessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ModalCreateQuizSuccess({
  open,
  setOpen,
}: ModalCreateQuizSuccessProps) {
  const router = useRouter();

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div className="w-lg flex flex-col items-center justify-center gap-4 rounded-2xl px-7 py-12 font-semibold">
        <Image
          src="/images/create-quiz-success.svg"
          alt="Success"
          width={220}
          height={220}
        />
        <div className="flex flex-row items-center justify-center gap-3 text-sm">
          <Image
            src="/images/check-icon-3.svg"
            width={25}
            height={25}
            alt="Check Icon"
          />
          <h1 className="text-sm md:text-lg">
            Your Quiz App is created successfully!
          </h1>
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
