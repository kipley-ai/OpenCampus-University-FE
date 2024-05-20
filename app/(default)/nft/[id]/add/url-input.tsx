import ModalBlank from "@/components/modal-blank-3";
import Button from "@/components/button";
import { useState } from "react";
import { useCreateChatbotContext } from "./create-knowledge-context";

export default function URLInput({
  isOpen,
  setIsOpen,
  type,
}: {
  isOpen: boolean;
  setIsOpen: any;
  type: string;
}) {
  const { handleChangeKb, kbDetail, addYoutubeItem, addMediumItem } =
    useCreateChatbotContext();
  const [url, setUrl] = useState("");

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col items-center justify-between rounded-2xl border border-[#D1D5DB] px-10 pb-7 pt-5 shadow-md">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="mb-4 w-80 border-b border-[#DDDDEB] pb-2 text-lg font-semibold leading-10 text-primary">
            Import from <span className="capitalize">{type}</span>
          </div>
        </div>
        <div className="mb-5 w-80">
          <label htmlFor="url" className="block text-sm font-medium">
            Copy and paste your <span className="capitalize">{type}</span> URL
          </label>
          <input
            id="url"
            type="text"
            placeholder="Enter URL here"
            className="mt-2 block w-full rounded-lg border border-[#D1D5DB] bg-transparent px-3 py-2 text-sm font-medium text-heading placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div className="flex w-80 items-center justify-end gap-4">
          <button
            className="text-sm font-medium text-primary underline hover:text-secondary"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <Button
            className="ml-1 rounded-md bg-primary px-5 py-2 font-medium text-white"
            type="button"
            onClick={() => {
              if (type === "youtube") {
                addYoutubeItem(kbDetail?.kb_id!, url);
              } else if (type === "medium") {
                addMediumItem(kbDetail?.kb_id!, url);
              }
              setIsOpen(false);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </ModalBlank>
  );
}
