import ModalBlank from "@/components/modal-blank-4";
import Image from "next/image";
import Loading from "public/images/loading.svg";

export default function ModalQuizLoading({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#DDDDEB] px-10 pb-8 pt-7 shadow-md">
        <Image
          width={130}
          height={130}
          src="/images/quiz-generating.svg"
          alt="Quiz Generating"
        />
        <div className="flex w-80 items-center justify-center">
          <Image
            width={40}
            height={40}
            src={Loading}
            alt="Failed Icon"
            className="animate-spin"
          />
          <span className="ml-1 text-lg font-semibold">
            Quiz is generating...
          </span>
        </div>
      </div>
    </ModalBlank>
  );
}
