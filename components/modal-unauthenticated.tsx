import Image from "next/image";
import Link from "next/link";
import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { handleLogin } from "@/utils/auth";

export function ModalUnauthenticated() {
  return (
    <ModalBlank isOpen={true} setIsOpen={() => {}}>
      <div className="w-lg flex flex-col items-center justify-center gap-4 rounded-2xl px-20 py-8 font-semibold">
        <Image
          src="/images/unauthenticated-modal.svg"
          alt="Please login"
          width={180}
          height={180}
        />
        <h1 className="text-center text-sm md:text-lg">
          Please log in with your
          <br />
          Open Campus ID to continue
        </h1>
        <div className="flex items-center justify-center gap-8">
          <Link href="/dashboard">
            <button className="btn-underlined">Close</button>
          </Link>
          <Button
            className="px-4 py-2 text-sm md:text-lg"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </ModalBlank>
  );
}
