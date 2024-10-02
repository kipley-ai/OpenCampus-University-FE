"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  useChatbotDetail,
  useUpdateChatbotAPI,
  useGetCategory,
} from "@/hooks/api/chatbot";
import { useUserDetail } from "@/hooks/api/user";
import { useSuperAdmin } from "@/hooks/api/access";
import defaulUserAvatar from "public/images/chatbot-avatar.png";
import { useParams, redirect, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import ImageInput from "@/components/image-input-2";
import LoadingIcon from "public/images/loading-icon.svg";
import CreateChatbotModal from "@/components/toast-4";
import Switcher from "@/components/switcher";
import Tooltip from "@/components/tooltip";
import { useAppProvider } from "@/providers/app-provider";

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
  const {
    session: { address },
  } = useAppProvider();

  const { id } = useParams();
  const router = useRouter();
  const chatbotDetail = useChatbotDetail({ chatbot_id: id as string });
  const userDetail = useUserDetail();
  const superAdmin = useSuperAdmin(userDetail.data?.data.data.wallet_addr);
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
    if (chatbotDetail.isSuccess) {
      setForm(chatbotDetail.data?.data.data);
      setSelectedFile(chatbotDetail.data?.data.data.profile_image);
      setMode(chatbotDetail.data?.data.data.tone === "instruction" ? 0 : 1);
      setPersonality(
        chatbotDetail.data?.data.data.personality === "focused" ? 0 : 1,
      );
    }
  }, [chatbotDetail.isSuccess]);

  if (chatbotDetail.isPending || userDetail.isPending || superAdmin.isPending) {
    return null;
  }

  if (
    chatbotDetail.data?.data.data.wallet_addr !==
    userDetail.data?.data.data.wallet_addr
  ) {
    if (superAdmin.data?.data.status !== "success") {
      redirect("/app/" + id);
    }
  }

  return (
    <>
      <CreateChatbotModal
        children={"Your chatbot has been updated successfully!"}
        open={showModal}
        setOpen={setShowModal}
        onDone={() => {
          router.push(`/app/${chatbotDetail.data?.data.data.chatbot_id}`);
        }}
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">
            Research Assistant Settings
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
            <label
              htmlFor="characterName"
              className="text-xs font-semibold text-heading lg:text-sm"
            >
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

          <div className="mt-7 flex flex-col gap-1">
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
              onChange={(e) => handleFormChange("description", e.target.value)}
              rows={3}
              maxLength={1000}
            />
          </div>

          <div className="mt-7 flex items-end gap-4 max-sm:flex-col">
            <div className="w-full">
              <label
                className="flex w-full flex-col text-xs font-medium lg:text-sm"
                htmlFor="category"
              >
                Category*
              </label>
              <select
                id="category"
                value={form.category_id}
                className={`my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm ${
                  form.category_id ? "" : "text-[#6B7280]"
                }`}
                onChange={(e) =>
                  handleFormChange("category_id", e.target.value)
                }
              >
                <option selected disabled hidden value="">
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option
                    className="bg-sidebar text-heading"
                    key={cat.category_id}
                    value={cat.category_id}
                  >
                    {cat.title}
                  </option>
                ))}
              </select>
              {errorMessage && errorMessage.category_id && (
                <p className="text-xs text-red-400">
                  {errorMessage.category_id}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className=" flex flex-row items-center space-x-3 text-wrap text-xs font-medium lg:text-sm">
                <span>Price Per Query (in OCU Credits)*</span>
                <Tooltip bg="dark" position="right" size="md">
                  Set your price per query on your app and get paid in OCU
                  Credits.
                </Tooltip>
              </label>
              <input
                className="my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm"
                type="number"
                name="pricePerQuery"
                placeholder="e.g. 1"
                onChange={(e) => {
                  if (parseFloat(e.target.value) < 0)
                    handleFormChange("chatbot_price_per_query", 0);
                  else
                    handleFormChange("chatbot_price_per_query", e.target.value);
                }}
                value={form.chatbot_price_per_query}
              />
              {errorMessage && errorMessage.chatbot_price_per_query && (
                <p className="text-xs text-red-400">
                  {errorMessage.chatbot_price_per_query}
                </p>
              )}
            </div>
          </div>
        </div>

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

            <p className="ml-2 text-sm font-medium uppercase">Cancel</p>
          </button>
          <button
            className="flex items-center justify-center gap-2 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateChatbot();
            }}
            type="button"
          >
            <p className="mr-2 text-sm font-medium uppercase">Save Changes</p>
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
