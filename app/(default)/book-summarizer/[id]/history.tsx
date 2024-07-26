import Image from "next/image";
import OCLogo from "@/components/logo/OC Logo.svg";
import { SidebarRight } from "@/components/ui/sidebar-right";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useBookContext } from "./context";
import { useGetHistory } from "@/hooks/api/book-summarizer";

function HistorySidebar({
  isOpen,
  onClose,
  history,
}: {
  isOpen: boolean;
  onClose: () => void;
  history: any;
}) {
  return (
    <SidebarRight isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center gap-2 border-b-2 border-border px-6 pb-8">
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.96042 6.89779L1.33542 12.5228C1.22987 12.6283 1.08671 12.6876 0.937447 12.6876C0.788179 12.6876 0.645026 12.6283 0.539478 12.5228C0.43393 12.4172 0.374634 12.2741 0.374634 12.1248C0.374634 11.9756 0.43393 11.8324 0.539478 11.7269L5.76721 6.49982L0.539478 1.27279C0.43393 1.16725 0.374634 1.02409 0.374634 0.874824C0.374634 0.725557 0.43393 0.582404 0.539478 0.476856C0.645026 0.371308 0.788179 0.312012 0.937447 0.312012C1.08671 0.312012 1.22987 0.371308 1.33542 0.476856L6.96042 6.10186C7.01271 6.1541 7.0542 6.21613 7.08251 6.28442C7.11082 6.35271 7.12539 6.4259 7.12539 6.49982C7.12539 6.57375 7.11082 6.64694 7.08251 6.71523C7.0542 6.78351 7.01271 6.84555 6.96042 6.89779ZM12.5854 6.10186L6.96042 0.476856C6.85487 0.371308 6.71171 0.312012 6.56245 0.312012C6.41318 0.312012 6.27003 0.371308 6.16448 0.476856C6.05893 0.582404 5.99963 0.725557 5.99963 0.874824C5.99963 1.02409 6.05893 1.16725 6.16448 1.27279L11.3922 6.49982L6.16448 11.7269C6.05893 11.8324 5.99963 11.9756 5.99963 12.1248C5.99963 12.2741 6.05893 12.4172 6.16448 12.5228C6.27003 12.6283 6.41318 12.6876 6.56245 12.6876C6.71171 12.6876 6.85487 12.6283 6.96042 12.5228L12.5854 6.89779C12.6377 6.84555 12.6792 6.78351 12.7075 6.71523C12.7358 6.64694 12.7504 6.57375 12.7504 6.49982C12.7504 6.4259 12.7358 6.35271 12.7075 6.28442C12.6792 6.21613 12.6377 6.1541 12.5854 6.10186Z"
            fill="#1C1C1C"
          />
        </svg>
        <h2 className="font-semibold">History</h2>
      </div>
      <div className="flex flex-col gap-4 px-6 py-8">
        {history.map((history: any, index: number) => (
          <div className="flex divide-x-2 divide-border rounded-xl border-2 border-border">
            <div
              className="flex cursor-pointer flex-col gap-2 rounded-l-lg p-4 hover:bg-secondary"
              onClick={() => {}}
            >
              <h3 className="line-clamp-2 text-sm font-medium text-body">
                {history.summary}
              </h3>
              <div className="flex items-center justify-start gap-2">
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 12 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                    fill="var(--color-primary)"
                  />
                </svg>
                <span className="text-xs text-[#A8A5AD]">
                  {history.created_time}
                </span>
              </div>
            </div>
            <div className="flex cursor-pointer items-center justify-center rounded-r-lg p-4 hover:bg-secondary">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="12.5" cy="12" rx="11.8519" ry="12" fill="none" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5345 6.82172H14.3654C14.6527 6.82172 14.8922 6.57948 14.8922 6.28879C14.8922 5.9981 14.6527 5.75586 14.3654 5.75586H10.5345C10.2472 5.75586 10.0078 5.9981 10.0078 6.28879C10.0078 6.57948 10.2472 6.82172 10.5345 6.82172ZM18.2001 8.75922H6.70735C6.42003 8.75922 6.1806 8.51698 6.1806 8.22629C6.1806 7.9356 6.42003 7.69336 6.70735 7.69336H18.2001C18.4874 7.69336 18.7268 7.9356 18.7268 8.22629C18.7268 8.51698 18.4874 8.75922 18.2001 8.75922ZM15.8043 18.4011H9.05238C8.2862 18.4011 7.61579 17.7228 7.61579 16.8508V10.2618C7.61579 9.97114 7.85522 9.77734 8.09465 9.77734C8.33408 9.77734 8.57351 10.0196 8.57351 10.2618V16.8992C8.57351 17.1899 8.76506 17.4322 9.00449 17.4322H15.7565C15.9959 17.4322 16.1874 17.1899 16.1874 16.8992V10.2618C16.1874 9.97114 16.4269 9.77734 16.6663 9.77734C16.9057 9.77734 17.1452 10.0196 17.1452 10.2618V16.8992C17.2409 17.7228 16.6184 18.4011 15.8043 18.4011Z"
                  fill="#141BEB"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.2508 15.0085C10.2508 15.2992 10.4902 15.5414 10.7775 15.5414C11.0649 15.5414 11.3043 15.2992 11.3043 15.0085V10.6482C11.3043 10.3575 11.0649 10.1152 10.7775 10.1152C10.4902 10.1152 10.2508 10.3575 10.2508 10.6482V15.0085ZM13.5996 15.0085C13.5996 15.2992 13.839 15.5414 14.1263 15.5414C14.4136 15.5414 14.6531 15.2992 14.6531 15.0085V10.6482C14.6531 10.3575 14.4136 10.1152 14.1263 10.1152C13.839 10.1152 13.5996 10.3575 13.5996 10.6482V15.0085Z"
                  fill="#141BEB"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </SidebarRight>
  );
}

export function History() {
  const [isOpen, setIsOpen] = useState(false);

  const { setStep, setResultId } = useBookContext();
  const { id } = useParams();
  const { isPending, isError, data } = useGetHistory({
    chatbot_id: id,
  });

  const handleHistoryClick = (history: any) => {};

  if (isPending) {
    return <div className="mt-12">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-12">Error...</div>;
  }

  return (
    <>
      <HistorySidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        history={data.data.history}
      />
      <div className="mt-12 grid w-full grid-cols-4 gap-2">
        {data.data.history.map((history: any, index: number) => (
          <div
            className="flex cursor-pointer flex-col gap-2 rounded-xl border-2 border-border p-4 hover:bg-secondary"
            onClick={() => handleHistoryClick(history)}
          >
            <h3 className="line-clamp-2 text-sm font-medium text-body">
              {history.summary}
            </h3>
            <div className="flex items-center justify-start gap-2">
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.98168 12.3245C2.77433 12.3245 0.174805 9.71648 0.174805 6.49967C0.174816 3.2824 2.77432 0.674805 5.98168 0.674805C9.18896 0.674805 11.7885 3.2824 11.7885 6.49967C11.7885 9.71648 9.18896 12.3245 5.98168 12.3245ZM5.98159 1.76667C3.37588 1.76667 1.26374 3.88544 1.26374 6.49968C1.26374 9.11296 3.37588 11.2322 5.98159 11.2322C8.58725 11.2322 10.6994 9.11296 10.6994 6.49968C10.6994 3.88545 8.58725 1.76667 5.98159 1.76667ZM7.25167 7.04543H8.34073C8.64128 7.04543 8.88496 6.80127 8.88496 6.49974C8.88496 6.19821 8.64127 5.95357 8.34073 5.95357H7.25167H6.52632V3.22273C6.52632 2.92118 6.28262 2.67655 5.98158 2.67655C5.68098 2.67655 5.43729 2.92118 5.43729 3.22273V6.49974C5.43729 6.80126 5.68098 7.04543 5.98158 7.04543H6.52632H7.25167Z"
                  fill="var(--color-primary)"
                />
              </svg>
              <span className="text-xs text-[#A8A5AD]">
                {history.created_time}
              </span>
            </div>
          </div>
        ))}
        {data.data.history.length > 4 && (
          <div
            className="flex cursor-pointer flex-col space-y-2 rounded-xl border-2 border-border p-4 hover:bg-secondary"
            onClick={() => setIsOpen(true)}
          >
            <Image src={OCLogo} alt="OCU Logo" width={40} height={40} />
            <span className="text-sm font-medium text-primary">
              View more history
            </span>
          </div>
        )}
      </div>
    </>
  );
}
