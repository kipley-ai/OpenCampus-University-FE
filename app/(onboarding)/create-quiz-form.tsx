import { useEffect, useState } from "react";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useSession } from "next-auth/react";
import ImageInput from "@/components/image-input-2";
import { ZodError, number, string, z } from "zod";
import Switcher from "@/components/switcher";
import { useAppProvider } from "@/providers/app-provider";
import { KF_TITLE } from "@/utils/constants";
import Tooltip from "@/components/tooltip";
import { noMoreThanCharacters } from "@/utils/utils";
import { FormInput, FormTextarea } from "@/components/form-input";
import { ModalSuccessBasic } from "@/components/modal-success-basic";
import { useCreateQuizAPI } from "@/hooks/api/quiz_app";
import ModalBasic from "@/components/modal-basic";

interface Form {
  name?: string;
  num_questions?: string;
  pricePerQuery?: number;
}

export const QuizForm = () => {
  const { setHeaderTitle } = useAppProvider();
  const [description, setDescription] = useState({
    tmp: true,
    value: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const createQuizApp = useCreateQuizAPI();
  const { setStep, plugin, kbId, sftId } = useCreateChatbotContext();
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [mode, setMode] = useState(0);
  const [difficultyData, setDifficultyData] = useState("");
  const questions = [3, 5, 8];

  const [errorMessage, setErrorMessage] = useState<any>({});
  const [form, setForm] = useState<Form>({});

  const { data: twitterSession } = useSession();

  const formValidation = z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .max(100, noMoreThanCharacters(100)),
  });

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (twitterSession?.user) {
    twitterSession?.user?.username;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validateForm()) return;

    const metaData = JSON.stringify({
      difficulty: difficultyData,
      num_questions: form.num_questions || "3",
    });

    createQuizApp.mutate(
      {
        profile_image: selectedFile,
        name: form.name as string,
        description: description.value,
        meta_data: metaData,
        price_per_query: form.pricePerQuery as number,
        sft_id: sftId as string,
        kb_id: kbId as string,
        plugin_id: plugin?.plugin_id,
      },
      {
        async onSuccess() {
          setShowModal(true);
        },
        async onError() {
          setShowModalError(true);
        },
      },
    );
  };

  useEffect(() => {
    const title = KF_TITLE + "Create Quiz";
    document.title = title;

    return () => setHeaderTitle("");
  }, []);

  useEffect(() => {
    if (form.name && description.tmp) {
      setDescription({
        tmp: true,
        value: `This is the AI Quizapp of ${form.name}`,
      });
    }
  }, [form.name]);

  useEffect(() => {
    if (mode == 0) {
      setDifficultyData("Easy");
    } else if (mode == 1) {
      setDifficultyData("Hard");
    }
  }, [mode]);

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
        message="Your quiz is created successfully!"
        imagePath="/images/create-quiz-success.svg"
        open={showModal}
        setOpen={setShowModal}
      />
      <ModalBasic
        title="Error..."
        isOpen={showModalError}
        setIsOpen={setShowModalError}
      >
        <div className="px-5 py-4">
          <div className="text-sm">
            <div className="mb-3 font-medium text-slate-800 dark:text-slate-100">
              Your quiz failed to create!
            </div>
          </div>
        </div>
      </ModalBasic>
      <div className="flex flex-col sm:px-6 lg:px-0">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">Quiz</h1>
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
                placeholder="Name your Quizbot"
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
                placeholder="Describe your Quizbot"
                rows={6}
                maxLength={1000}
              />
              <div className="flex gap-4">
                <div className="w-full">
                  <label
                    htmlFor="difficult"
                    className="block text-xs font-semibold text-heading lg:text-sm "
                  >
                    Difficult
                  </label>
                  <div className="mt-1 w-full">
                    <Switcher
                      texts={["Easy", "Hard"]}
                      mode={mode}
                      setWhich={setMode}
                      fullWidth={true}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    className="flex w-full flex-col text-xs font-semibold lg:text-sm"
                    htmlFor="category"
                  >
                    No. of Questions
                  </label>
                  <select
                    id="num_questions"
                    defaultValue={""}
                    value={form.num_questions}
                    className="my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm"
                    onChange={(e) =>
                      handleFormChange("num_questions", e.target.value)
                    }
                  >
                    <option
                      className="bg-sidebar text-body"
                      selected
                      disabled
                      hidden
                      value=""
                    >
                      Select
                    </option>
                    {questions.map((num) => (
                      <option
                        className="rounded-md border-transparent bg-sidebar text-body hover:bg-secondary hover:text-heading"
                        key={num}
                        value={num}
                      >
                        {num}
                      </option>
                    ))}
                  </select>
                  {errorMessage && errorMessage.category_id && (
                    <p className="text-xs text-red-400">
                      {errorMessage.category_id}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full space-y-5">
                <div className="w-full">
                  <label className=" flex flex-row items-center space-x-3 text-wrap text-xs font-semibold lg:text-sm">
                    <span>Price Per Query (in OCU Credits)</span>
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
            </div>
          </div>

          <div className="my-8 flex items-center justify-between border-t-2 pt-4">
            <button
              className="flex items-center justify-center gap-2 hover:underline"
              type="button"
              onClick={() => {
                setStep("choose_app");
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

              <p>Back</p>
            </button>
            <button
              className="flex items-center justify-center gap-2 hover:underline"
              type="submit"
            >
              <p>Next</p>
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
