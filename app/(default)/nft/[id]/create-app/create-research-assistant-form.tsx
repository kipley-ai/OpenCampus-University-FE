"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCreateChatbotAPI } from "@/hooks/api/chatbot";
import { useGetCategory } from "@/hooks/api/chatbot";
import CreateChatbotModal from "@/components/toast-4";
import { useNftDetail } from "@/hooks/api/nft";
import ImageInput from "@/components/image-input-2";
import { ZodError, number, string, z } from "zod";
import Tooltip from "@/components/tooltip";
import { noMoreThanCharacters } from "@/utils/utils";
import Image from "next/image";
import { FormInput, FormTextarea } from "@/components/form-input";
import { ModalCreateAppSuccess } from "./modal-create-app-success";
import { useCreateAppContext } from "./create-app-context";
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
  description?: string;
  category_id?: string;
  pricePerQuery?: number;
}

export const CreateResearchAssistantForm = () => {
  const { id } = useParams();
  const { setStep, plugin } = useCreateAppContext();
  const { data: nftData } = useNftDetail({ sft_id: id as string });

  const [form, setForm] = useState<Form>({});
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>({});

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const categoryList = useGetCategory();

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

  const createChatbot = useCreateChatbotAPI();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validateForm()) return;

    createChatbot.mutate(
      {
        profile_image: selectedFile,
        name: form.name as string,
        sft_id: id as string,
        kb_id: nftData?.data.data.kb_id as string,
        price_per_query: form.pricePerQuery as number,
        category_id: form.category_id,
        description: form.description as string,
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
    if (categoryList && categoryList.data) {
      const categoryData: Category[] = categoryList.data.data.data;
      setCategories(categoryData);
    }
  }, [categoryList]);

  // console.log("Plugin: ", plugin);

  return (
    <>
      <ModalCreateAppSuccess
        open={showModal}
        setOpen={setShowModal}
        message="Your research assistant app was created successfully!"
      />
      <div className="flex flex-col sm:px-6 lg:px-0">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">
            Research Assistant
          </h1>
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
                placeholder="Name your research assistant app"
                maxLength={100}
                isRequired
                errorMessage={errorMessage.name}
              />
              <FormTextarea
                id="description"
                label="Description"
                value={form.description || ""}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Describe your research assistant app"
                rows={3}
                maxLength={1000}
              />
              <div className="flex items-end gap-4">
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
                    className={`my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm ${form.category_id ? "" : "text-[#6B7280]"
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
                        className="text-heading"
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
                  fill="#141BEB"
                />
              </svg>

              <p className="text-sm font-medium">Back</p>
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
                  fill="#141BEB"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
