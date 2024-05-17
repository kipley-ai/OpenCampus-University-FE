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
            <div className="flex flex-col items-center justify-center rounded-2xl px-10 pt-7 pb-8 shadow-md border border-[#DDDDEB]">
                <div className="w-80 flex items-center justify-center">
                  <Image width={40} height={40} src={Loading} alt="Failed Icon" className="animate-spin" />
                  <span className="font-semibold text-lg ml-1">
                    Quiz is generating...
                  </span>
                </div>
            </div>
        </ModalBlank>
    )
}
