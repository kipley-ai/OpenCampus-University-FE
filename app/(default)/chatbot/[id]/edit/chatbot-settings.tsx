import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { 
  useChatbotDetail, 
  useUpdateChatbotAPI, 
  useGetCategory,
} from "@/hooks/api/chatbot";
import { useSuperAdmin } from "@/hooks/api/access";
import defaulUserAvatar from "public/images/chatbot-avatar.png";
import { useParams, redirect, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import ImageInput from "@/components/image-input-2";
import LoadingIcon from "public/images/loading-icon.svg";
import CreateChatbotModal from "@/components/toast-4";
import Switcher from "@/components/switcher";
import Tooltip from "@/components/tooltip";

interface Category {
  title: string;
  created: string;
  category_id: string;
  use_for: string;
  sort: number;
}

interface Form {
  category_id: string;
  chatbot_id: string;
  name: string;
  description: string;
  instruction: string;
  example_conversation: string;
  profile_image: string;
}

const ChatbotSettings = () => {
  const updateChatbot = useUpdateChatbotAPI();
  const { address } = useAccount();

  const { id } = useParams();
  const router = useRouter();
  const chatbotDetail = useChatbotDetail({ chatbot_id: id as string });
  const superAdmin = useSuperAdmin();
  const categoryList = useGetCategory();
  const [form, setForm] = useState<any>({
    category_id: "",
    chatbot_id: "",
    name: "",
    description: "",
    profile_image: "",
    chatbot_price_per_query: 0,
  });
  const [selectedFile, setSelectedFile] = useState<any>(LoadingIcon);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mode, setMode] = useState(0);
  const [toneData, setToneData] = useState("");
  const [personality, setPersonality] = useState(0);
  const [personalityData, setPersonalityData] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>({});

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleUpdateChatbot = async () => {
    try {
      updateChatbot.mutate(
        {
          category_id: form.category_id as string,
          chatbot_id: id as string,
          profile_image: selectedFile,
          name: form.name as string,
          description: form.description as string,
          tone: toneData,
          personality: personalityData,
          price_per_query: form.chatbot_price_per_query as number,
        },
        {
          onSuccess(data, variables, context) {
            setShowModal(true);
          },
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categoryList && categoryList.data) {
      const categoryData: Category[] = categoryList.data.data.data;
      setCategories(categoryData);
    }
  }, [categoryList]);

  useEffect(() => {
    if (mode == 0) {
      setToneData("instruction");
    } else if (mode == 1) {
      setToneData("instruction_2");
    }
  }, [mode]);

  useEffect(() => {
    if (personality == 0) {
      setPersonalityData("focused");
    } else if (personality == 1) {
      setPersonalityData("creative");
    }
  }, [personality]);

  useEffect(() => {
    if (superAdmin.isSuccess && chatbotDetail.isSuccess) {
      if (
        superAdmin.data?.data.status === "failed" &&
        chatbotDetail.data?.data.data.wallet_addr !== address
      ) {
        redirect(`/nft/${chatbotDetail.data?.data.data.sft_id}`);
      }
    }
  }, [superAdmin.isSuccess, chatbotDetail.isSuccess]);

  useEffect(() => {
    if (chatbotDetail.isSuccess) {
      setForm(chatbotDetail.data?.data.data);
      setSelectedFile(chatbotDetail.data?.data.data.profile_image);
      setMode(chatbotDetail.data?.data.data.tone === "instruction" ? 0 : 1);
      setPersonality(
        chatbotDetail.data?.data.data.personality === "focused" ? 0 : 1,
      );
    }
  }, [chatbotDetail.isSuccess]);

  return (
    <>
      <CreateChatbotModal
        children={"Your chatbot has been updated successfully!"}
        open={showModal}
        setOpen={setShowModal}
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">
            Chatbot Settings
          </h1>
        </div>
      </div>
      <form className="mt-4 flex flex-col gap-8">
        <ImageInput
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        <div className="flex w-full flex-col gap-0">
          <div className="flex flex-col gap-1">
            <label htmlFor="characterName" className="text-xs font-semibold text-heading lg:text-sm">
              Name*
            </label>
            <input
              id="characterName"
              type="text"
              value={form.name}
              className="rounded-lg border-[#D1D5DB] bg-transparent text-xs text-heading lg:text-sm"
              placeholder="Name your Chatbot"
              onChange={(e) => handleFormChange("name", e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="flex flex-col gap-1 mt-7">
            <label
              htmlFor="description"
              className="text-xs font-semibold text-heading lg:text-sm"
            >
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              className="placeholder-text-[#6B7280] rounded-lg border-[#D1D5DB] bg-transparent text-xs text-heading lg:text-sm"
              placeholder="Describe your Chatbot"
              onChange={(e) =>
                handleFormChange("description", e.target.value)
              }
              rows={3}
              maxLength={1000}
            />
          </div>

          <div className="flex flex-col gap-1 mt-7">
            <label
              className="text-xs font-semibold text-heading lg:text-sm"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={form.category_id}
              className="w-full rounded-lg border-[#D1D5DB] bg-transparent text-xs text-heading lg:text-sm"
              onChange={(e) => 
                handleFormChange("category_id", e.target.value)
              }
            >
              <option 
                className="bg-sidebar text-[#6B7280]" 
                selected 
                disabled 
                hidden 
                value=""
              >
                Select a category
              </option>
              {categories.map((cat) => (
                <option 
                  className="bg-sidebar text-body" 
                  key={cat.category_id} 
                  value={cat.category_id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="flex flex-col col-span-6 gap-1 mt-7">
              <label
                htmlFor="tone"
                className="w-full rounded-lg border-[#D1D5DB] bg-transparent text-xs text-heading lg:text-sm"
              >
                Tone
              </label>
              <Switcher
                texts={["1st Person Tone", "3rd Person Tone"]}
                mode={mode}
                setWhich={setMode}
              />
            </div>

            <div className="flex flex-col col-span-6  gap-1 mt-7">
              <label
                htmlFor="personality"
                className="w-full rounded-lg border-[#D1D5DB] bg-transparent text-xs text-heading lg:text-sm"
              >
                Personality
              </label>
              <Switcher
                texts={["More Focused", "More Creative"]}
                mode={personality}
                setWhich={setPersonality}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-7">
            <label className=" flex flex-row items-center space-x-3 text-wrap text-xs font-semibold lg:text-sm">
              <span>Price Per Query (in OC Points)</span>
              {/* <Tooltip bg="dark" position="right" size="md">
                Set your price per query on your chatbot app and get paid in
                OC Points.
              </Tooltip> */}
            </label>
            <input
              className="rounded-lg border-[#D1D5DB] bg-transparent text-xs text-heading lg:text-sm"
              type="number"
              name="pricePerQuery"
              placeholder="e.g. 1"
              onChange={(e) => {
                if (parseFloat(e.target.value) < 0)
                  handleFormChange("chatbot_price_per_query", 0);
                else
                  handleFormChange(
                    "chatbot_price_per_query",
                    Number(e.target.value),
                  );
              }}
              value={form.chatbot_price_per_query}
            />
            {errorMessage && errorMessage.pricePerQuery ? (
              <div className=" text-xs text-red-400">
                {errorMessage.pricePerQuery}
              </div>
            ) : (
              <div className="text-xs opacity-0 lg:text-sm">a</div>
            )}
          </div>
        </div>

        {/* Cancel and Save Changes Button */}
        {/* <div className="form-action flex flex-row justify-between">
          <button
            className="mt-8 flex items-center justify-center rounded-3xl p-2 px-5 ring-2 ring-gray-600 hover:opacity-75"
            type="button"
            onClick={() => {
              router.push(`/app/${chatbotDetail.data?.data.data.chatbot_id}`);
            }}
          >
            <h5 className="text-sm">Cancel</h5>
          </button>
          <button
            className="mt-8 button w-32"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateChatbot();
            }}
          >
            <h5>
              Save Changes
            </h5>
          </button>
        </div> */}
        <div className="my-8 mt-0 flex items-center justify-between">
          <button 
            className="flex items-center justify-center gap-2 hover:underline"
            type="button"
            onClick={() => {
              router.push(`/app/${chatbotDetail.data?.data.data.chatbot_id}`);
            }}
          >
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41 2.29965L6 0.889648L0 6.88965L6 12.8896L7.41 11.4796L2.83 6.88965L7.41 2.29965Z"
                fill="#141BEB"
              />
            </svg>

            <p className="uppercase font-medium text-sm ml-2">Cancel</p>
          </button>
          <button
            className="flex items-center justify-center gap-2 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateChatbot();
            }}
            type="button"
          >
            <p className="uppercase font-medium text-sm mr-2">Save Changes</p>
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 0.889648L0.589996 2.29965L5.17 6.88965L0.589996 11.4796L2 12.8896L8 6.88965L2 0.889648Z"
                fill="#141BEB"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatbotSettings;