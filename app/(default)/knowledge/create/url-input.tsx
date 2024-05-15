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
    const { setStep, handleChangeKb } = useCreateChatbotContext();
    const [url, setUrl] = useState("");

    return (
        <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col items-center justify-between rounded-2xl px-10 pt-5 pb-7 shadow-md border border-[#D1D5DB]">
                <div className="inline-flex items-center justify-between self-stretch">
                    <div className="w-80 text-lg font-semibold leading-10 text-primary border-b border-[#DDDDEB] pb-2 mb-4">Import from <span className="capitalize">{type}</span></div>
                </div>
                <div className="w-80 mb-5">
                    <label htmlFor="url" className="block text-sm font-medium">
                        Copy and paste your <span className="capitalize">{type}</span> URL
                    </label>
                    <input
                        id="url"
                        type="text"
                        placeholder="Enter URL here"
                        className="mt-2 block w-full px-3 py-2 bg-transparent text-heading rounded-lg border border-[#D1D5DB] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm font-medium"
                        onChange={(e) => {
                            setUrl(e.target.value)
                        }}
                    />
                </div>
                <div className="w-80 flex items-center justify-end gap-4">
                    <button
                        className="text-primary underline hover:text-secondary text-sm font-medium"
                        onClick={() => 
                            {
                                setIsOpen(false);  
                            }
                        }
                    >
                        Cancel
                    </button>
                    <Button
                        className="rounded-md bg-primary px-5 py-2 ml-1 text-white font-medium"
                        type="button"
                        onClick={() => {
                            if (type === 'youtube') {
                                setStep("mint_nft");
                                handleChangeKb("youtube_url", url);
                            } else if (type === 'medium') {
                                setStep("mint_nft");
                                handleChangeKb("medium_url", url);
                            }
                            setIsOpen(false);
                        }}
                    >
                            Submit
                    </Button>
                </div>
            </div>
        </ModalBlank>
    )
}
