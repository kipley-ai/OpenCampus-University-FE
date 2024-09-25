"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useParams, useRouter, redirect } from "next/navigation";
import { useCreateChatbotAPI } from "@/hooks/api/chatbot";
import {
  CreateChatbotProvider,
  useCreateChatbotContext,
} from "./create-chatbot-context";
import { useGetCategory } from "@/hooks/api/chatbot";
import { useChatbotPKLStatus } from "@/hooks/api/chatbot";
import { useSession } from "next-auth/react";
import CreateChatbotModal from "@/components/toast-4";
import { useNftDetail } from "@/hooks/api/nft";
import ImageInput from "@/components/image-input-2";
import { ZodError, number, string, z } from "zod";
import Switcher from "@/components/switcher";
import { useAppProvider } from "@/providers/app-provider";
import { KF_TITLE } from "@/utils/constants";
import Tooltip from "@/components/tooltip";
import { noMoreThanCharacters } from "@/utils/utils";
import SpinnerIcon from "@/public/images/spinner-icon.svg";
import SpinnerCheckIcon from "@/public/images/spinner-check-icon.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FormInput, FormTextarea } from "@/components/form-input";
import { ModalSuccessBasic } from "@/components/modal-success-basic";
import { useCreateAppContext } from "../create-app/create-app-context";
import { createAsset } from "@/smart-contract/edu-asset";

interface Category {
  title: string;
  created: string;
  category_id: string;
  use_for: string;
  sort: number;
}

interface Form {
  name?: string;
  category_id?: string;
  pricePerQuery?: number;
}

export const ChatBotForm = () => {
  useEffect(() => {
    setHeaderTitle("");
  }, []);

  const title = KF_TITLE + "Create Chatbot";
  const { setHeaderTitle } = useAppProvider();
  const [description, setDescription] = useState({
    tmp: true,
    value: "",
  });
  const {
    session: { address },
  } = useAppProvider();
  const [categories, setCategories] = useState<Category[]>([]);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [example, setExample] = useState("");
  const router = useRouter();
  const createChatbot = useCreateChatbotAPI();
  const { setStep, plugin } = useCreateAppContext();
  const { id } = useParams();
  const { data: nftData } = useNftDetail({ sft_id: id as string });
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [mode, setMode] = useState(0);
  const [toneData, setToneData] = useState("");
  const [personality, setPersonality] = useState(0);
  const [personalityData, setPersonalityData] = useState("");

  const [errorMessage, setErrorMessage] = useState<any>({});
  const [allowGenerate, setAllowGenerate] = useState(false);
  const [form, setForm] = useState<Form>({});

  const { data: twitterSession } = useSession();

  const categoryList = useGetCategory();

  const [chatbotPKLStatus, setChatbotPKLStatus] = useState<any>(false);
  const [willRefetch, setWillRefetch] = useState<boolean>(true);
  const { theme, setTheme } = useTheme();
  const [isSvgHovered, setIsSvgHovered] = useState<boolean>(false);

  const formValidation = z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .max(100, noMoreThanCharacters(100)),

    category_id: z.string({
      required_error: "Category is required",
    }),

    pricePerQuery: z
      .string({
        required_error: "Price per query is required",
      })
      .min(1, "Price per query is required"),
  });

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (form.name && description.tmp) {
      setDescription({
        tmp: true,
        value: `This is the Digital Twin of ${form.name}`,
      });
    }
  }, [form.name]);

  if (twitterSession?.user) {
    twitterSession?.user?.username;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validateForm()) return;

    createChatbot.mutate(
      {
        profile_image: selectedFile,
        name: form.name as string,
        sft_id: id as string,
        kb_id: nftData?.data.data.kb_id as string,
        tone: toneData,
        personality: personalityData,
        price_per_query: form.pricePerQuery as number,
        category_id: form.category_id,
        description: description.value,
        // instruction: instructions,
        // example_conversation: example,
        plugin_id: plugin?.plugin_id,
      },
      {
        async onSuccess(data, variables, context) {
          const { retrieve_uri, chatbot_id } = data.data;
          await createAsset(variables.price_per_query, retrieve_uri, chatbot_id);
          setShowModal(true);
        },
      },
    );
  };

  useEffect(() => {
    const title = KF_TITLE + "Create Chatbot";
    document.title = title;

    return () => setHeaderTitle("");
  }, []);

  useEffect(() => {
    document.title = title;
    if (categoryList && categoryList.data) {
      const categoryData: Category[] = categoryList.data.data.data;
      setCategories(categoryData);
    }
  }, [title, categoryList]);

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

  const { data, isFetching, isError, isSuccess, refetch } = useChatbotPKLStatus(
    {
      kb_id: nftData?.data?.data.kb_id as string,
      willRefetch: willRefetch,
    },
  );

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      switch (data.data.status) {
        case "success":
          setWillRefetch(false);
          setChatbotPKLStatus(true);
          break;
        case "error":
          setWillRefetch(true);
          setChatbotPKLStatus(false);
          break;
        default:
          setWillRefetch(false);
      }
    }
  }, [data]);

  const validateForm = () => {
    let errorTmp = {};
    try {
      formValidation.parse(form);
    } catch (error) {
      const er = error as ZodError;
      er.errors.map((e) => {
        errorTmp = {
          ...errorTmp,
          [e.path[0]]: e.message,
        };
      });
    } finally {
      setErrorMessage(errorTmp);

      if (Object.keys(errorTmp).length > 0) {
        return false;
      }

      return true;
    }
  };

  return (
    <>
      <ModalSuccessBasic
        message="Your digital twin app was created successfully!"
        imagePath="/images/create-chatbot-success.svg"
        open={showModal}
        setOpen={setShowModal}
      />
      <div className="flex flex-col sm:px-6 lg:px-0">
        <div className="flex items-center justify-between max-lg:mb-4">
          <h1 className="text-lg font-semibold text-primary">Digital Twin</h1>
          <div className="flex w-min items-center gap-3 md:w-1/4">
            {chatbotPKLStatus ? (
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[32px] shrink-0"
                >
                  <g clipPath="url(#clip0_687_7110)">
                    <rect
                      x="1"
                      y="1"
                      width="22"
                      height="22"
                      rx="7"
                      fill="#141BEB"
                      stroke="#141BEB"
                      strokeWidth="2"
                    />
                    <g clipPath="url(#clip1_687_7110)">
                      <path
                        d="M7.33325 12.0001L10.6666 15.3334L17.3333 8.66675"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_687_7110">
                      <rect width="24" height="24" rx="12" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_687_7110">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-xs leading-5 xs:text-sm">
                  Your KnowledgeKey is ready!
                </span>
              </>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="size-10 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="var(--color-primary)"
                  />
                </svg>
                <span className="text-xs leading-5 xs:text-sm">
                  Your KnowledgeKey is vectorising…
                </span>
              </>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <ImageInput
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              useDefaultImage={false}
            />

            <div className="w-full space-y-5">
              <FormInput
                id="name"
                label="Name"
                type="text"
                value={form.name || ""}
                onChange={(e) => handleFormChange("name", e.target.value)}
                placeholder="Name your digital twin app"
                maxLength={100}
                isRequired
                errorMessage={errorMessage.name}
              />
              <FormTextarea
                id="description"
                label="Description"
                value={description.value}
                onChange={(e) =>
                  setDescription({
                    tmp: false,
                    value: e.target.value,
                  })
                }
                placeholder="Describe your digital twin app"
                rows={3}
                maxLength={1000}
              />
              <div className="flex items-end gap-4">
                <div className="w-full">
                  <label
                    className="flex w-full flex-col text-xs font-semibold lg:text-sm"
                    htmlFor="category"
                  >
                    Category*
                  </label>
                  <select
                    id="category"
                    value={form.category_id}
                    className="my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm"
                    onChange={(e) =>
                      handleFormChange("category_id", e.target.value)
                    }
                  >
                    <option
                      className="bg-sidebar text-body"
                      selected
                      disabled
                      hidden
                      value=""
                    >
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option
                        className="rounded-md border-transparent bg-sidebar text-body hover:bg-secondary hover:text-heading"
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
                  <label className=" flex flex-row items-center space-x-3 text-wrap text-xs font-semibold lg:text-sm">
                    <span>Price Per Query (in OCU Credits)*</span>
                    <Tooltip bg="dark" position="right" size="md">
                      Set your price per query on your chatbot app and get paid
                      in OCU Credits.
                    </Tooltip>
                  </label>
                  <input
                    className="my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm"
                    type="number"
                    name="pricePerQuery"
                    placeholder="e.g. 1"
                    onChange={(e) => {
                      if (parseFloat(e.target.value) < 0)
                        handleFormChange("pricePerQuery", 0);
                      else handleFormChange("pricePerQuery", e.target.value);
                    }}
                    value={form.pricePerQuery}
                  />
                  {errorMessage && errorMessage.pricePerQuery && (
                    <p className="text-xs text-red-400">
                      {errorMessage.pricePerQuery}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <label
                    htmlFor="tone"
                    className="block text-xs font-semibold text-heading lg:text-sm "
                  >
                    Tone
                  </label>
                  <div className="mt-1 w-full">
                    <Switcher
                      texts={["1st Person Tone", "3rd Person Tone"]}
                      mode={mode}
                      setWhich={setMode}
                      fullWidth={true}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="personality"
                    className="block text-xs font-semibold text-heading lg:text-sm"
                  >
                    Personality
                  </label>
                  <div className="mt-1 w-full">
                    <Switcher
                      texts={["More Focused", "More Creative"]}
                      mode={personality}
                      setWhich={setPersonality}
                      fullWidth={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 flex items-center justify-between border-t-2 pt-4">
            <button
              className="flex items-center justify-center gap-2 hover:underline"
              type="button"
              onClick={() => {
                setStep("");
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
                  fill="var(--color-primary)"
                />
              </svg>

              <p className="text-sm font-medium uppercase">Back</p>
            </button>
            <button
              className="flex items-center justify-center gap-2 hover:underline"
              type="submit"
            >
              <p className="text-sm font-medium uppercase">Next</p>
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 0.889648L0.589996 2.29965L5.17 6.88965L0.589996 11.4796L2 12.8896L8 6.88965L2 0.889648Z"
                  fill="var(--color-primary)"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export function CreateChatbotForm() {
  return (
    <CreateChatbotProvider>
      <ChatBotForm />
    </CreateChatbotProvider>
  );
}
