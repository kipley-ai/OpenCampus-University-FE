import Image from "next/image";
import Link from "next/link";
import CheckIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import ModalBlank from "@/components/modal-blank-3";
import { DM_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useNftDetail } from "@/hooks/api/nft";
import { useScrapeTwitter, useScrapeTwitterStatus } from "@/hooks/api/kb";
import { useSession } from "next-auth/react";
import { delay } from "@/utils/utils";

interface ToastProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export default function TwitterFailModal({
  children,
  open,
  setOpen,
}: ToastProps) {
  const scrapeTwitter = useScrapeTwitter();
  const { data: twitterData } = useSession();
  const { refetch: refetchScrapeStatus } = useScrapeTwitterStatus({
    username: twitterData?.user?.username!,
  });

  const handleTryAgain = () => {
    scrapeTwitter.mutate({ username: twitterData?.user?.username! });
    refetchScrapeStatus().then(async () => {
      await delay(100);
      setOpen(false);
    });
  };

  return (
    <ModalBlank isOpen={open} setIsOpen={setOpen}>
      <div className="flex w-[360px] flex-col justify-center rounded-2xl px-7 py-10">
        <div className="flex w-full flex-row items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Error</h2>
        </div>
        <div className="my-7 flex items-start justify-center gap-4 text-sm text-red-500">
          <svg
            width="48"
            height="25"
            viewBox="0 -4 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.00049 6H10H10.0005H38V10H10.0005V38H38V42L10.0005 42L10 42L6.00049 42V6ZM42.0005 6H38.0005V42H42.0005V6ZM22.0005 30.0001H26.0005V34.0001H22.0005V30.0001ZM26.0005 14H22.0005V26H26.0005V14Z"
              fill="currentColor"
            />
          </svg>
          {children}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className="btn-underlined px-5 py-2"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <button
            className="btn-primary px-5 py-2"
            onClick={() => handleTryAgain()}
            disabled={twitterData?.user?.username === undefined}
          >
            Try Again
          </button>
        </div>
      </div>
    </ModalBlank>
  );
}
