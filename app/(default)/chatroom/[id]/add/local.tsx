import {
  deleteFileS3,
  fetchPresignedUrlS3,
  uploadFileS3,
} from "@/app/api/upload/s3/helper";
import { formatBytes } from "lib/string";
import type { ReactSetter } from "lib/aliases";
import Image from "next/image";
import SuccessIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import UploadingIcon from "public/images/upload-file/uploading-icon-white.svg";
import FailedIcon from "public/images/upload-file/failed-icon.svg";
import UploadIcon from "public/images/upload-icon.svg";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { UIFile } from "./page";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Toast from "@/components/toast";
import { useAppProvider } from "@/providers/app-provider";
import { useKBDetail, useUpdateKB } from "@/hooks/api/kb";
import { useParams } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import CreateChatbotModal from "@/components/toast-4";

export default function Local({
  files,
  setFiles,
}: {
  files: UIFile[];
  setFiles: ReactSetter<UIFile[]>;
}) {
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createKb, handleChangeKb, setStep } = useCreateChatbotContext();
  const { toast, setToast } = useAppProvider();
  const updateKB = useUpdateKB();
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const chatbotDetail = useChatbotDetail({
    chatbot_id: id as string,
  });

  const kbDetail = useKBDetail({
    kb_id: chatbotDetail.data?.data.data.kb_id as string,
  });

  const dummyFile = [
    { fileName: "file1.txt", fileSize: "10 KB" },
    { fileName: "file2.txt", fileSize: "5 KB" },
    { fileName: "file3.txt", fileSize: "8 KB" },
  ];

  const handleUpdateKB = () => {
    handleChangeKb(
      "kb_data",
      files.map((file) => {
        return {
          type: "file",
          name: file.filename,
          file: file.bucketPath,
        };
      }),
    );
    updateKB.mutate(
      {
        kb_id: kbDetail.data?.data.data.kb_id,
        kb_data: files.map((file) => {
          return {
            type: "file",
            name: file.filename,
            file: file.bucketPath,
          };
        }),
        type: "files",
        username: "",
        medium_url: "",
        youtube_url: "",
      },
      {
        onSuccess(data, variables, context) {
          setShowModal(true);
        },
      },
    );
  };

  const formats =
    ".docx, .doc, .odt, .pptx, .ppt, .xlsx, .csv, .tsv, .eml, .msg, .rtf, .epub, .html, .xml, .json, .jpg, .png, .pdf, .txt";

  const handleNewFiles = (newFileObjects: File[]) => {
    newFileObjects.forEach(async (newFileObject: File) => {
      const filenameArray = newFileObject.name.split(".");
      const fileformat = filenameArray.pop();

      // Check if format valid
      if (
        formats.split(", ").filter((format) => "." + fileformat === format)
          .length == 0
      ) {
        setShowInvalidModal(true);
        return;
      }

      // Check if there's actual new unprocessed new files
      if (
        newFileObjects &&
        newFileObject &&
        (files.length === 0 ||
          files.filter((file) => file.filename == newFileObject.name).length ==
            0)
      ) {
        console.log("New file detected");
        const { presignedUrl, bucketPath } = await fetchPresignedUrlS3(
          newFileObject.name,
        );

        // Use aborter if the file is bigger than 10 MB
        const aborter =
          newFileObject.size > 1024 * 1024 * 10 ? new AbortController() : null;

        console.log(presignedUrl, bucketPath);

        setFiles((prevFiles) => {
          return [
            ...prevFiles,
            {
              filename: newFileObject.name,
              size: newFileObject.size,
              status: "uploading",
              bucketPath: bucketPath,
              link: `${process.env.NEXT_PUBLIC_KBFILES_S3_URL}/${bucketPath}`,
              aborter: aborter,
            },
          ];
        });

        await uploadFileS3(newFileObject, presignedUrl, aborter)
          .then(async (res) => {
            if (res.ok) {
              console.log("Uploading file succeed: " + newFileObject.name);
              setFiles((prevFiles) => {
                return prevFiles.map((prevFile) => {
                  if (prevFile.filename === newFileObject.name) {
                    return {
                      ...prevFile,
                      status: "success",
                    };
                  }
                  return prevFile;
                });
              });
            }
          })
          .catch((e) => {
            console.error(e);

            setFiles((prevFiles) => {
              return prevFiles.map((file) => {
                if (file.filename === newFileObject.name) {
                  file.aborter?.abort();

                  return {
                    ...file,
                    status: "failed",
                  };
                }
                return file;
              });
            });

            // TODO: Add toast
            // setToastAttribute({
            // 	open: true,
            // 	message: "Unpredictable error",
            // 	type: "danger",
            // 	noteElement: null,
            // });
          });
      }
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    console.log("Inserted a new file from drop");
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const newFileObjects = Array.from(e.dataTransfer?.files || []) as File[];

    handleNewFiles(newFileObjects);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Insert a new file from manual upload");
    e.preventDefault();
    e.stopPropagation();

    const newFileObjects = Array.from(e.target.files || []) as File[];
    handleNewFiles(newFileObjects);
  };

  const handleDelete =
    (index: number) => async (e: React.MouseEvent<HTMLImageElement>) => {
      const filename = files[index].filename;

      files[index].aborter?.abort();

      setFiles((prevFiles: UIFile[]) => {
        return prevFiles.filter((_, i) => {
          return index !== i;
        });
      });

      await deleteFileS3(files[index].bucketPath);

      console.log("Deleted the item: " + filename);
    };

  const handleDivClick = useDebouncedCallback(
    () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },
    300, // 300ms debounce time
    {
      leading: true,
      trailing: false,
    },
  );

  const showStateIcon = (state: "uploading" | "success" | "failed") => {
    switch (state) {
      case "uploading":
        return (
          <Image
            width={30}
            height={30}
            className={"animate-spin"}
            src={UploadingIcon}
            alt="Loading Icon"
          />
        );
      case "failed":
        return (
          <Image width={30} height={30} src={FailedIcon} alt="Failed Icon" />
        );
      case "success":
        return (
          <Image width={30} height={30} src={SuccessIcon} alt="Success Icon" />
        );
    }
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <CreateChatbotModal
        children={"Your data source has been updated successfully!"}
        open={showModal}
        setOpen={setShowModal}
      />

      <div className="flex flex-col bg-[#292D32] py-8 sm:px-6 lg:px-8">
        {/* <Toast children={"KB creation successful"} open={toast} setOpen={setToast} className="mx-auto" /> */}
        <div className="mx-56">
          <h1 className="text-2xl font-semibold text-heading">
            Upload Knowledge Files
          </h1>
          <hr className="my-4 border border-border" />
        </div>
        <div className="mx-56">
          <div
            className="color-[#aaa] font-inter mb-8 mt-5 flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-[#aaa] px-20 py-20 text-center text-heading "
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleDivClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="file-input"
              multiple
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div className="mb-8 h-14 w-14 shrink-0 grow-0 rounded-full bg-white p-4">
              <Image
                width={30}
                height={30}
                src={UploadIcon}
                alt="Upload Icon"
              />
            </div>
            <label className="text-md mb-3 cursor-pointer font-semibold">
              Drop your files here OR{" "}
              <span className="text-primary">Click here to browse</span>
            </label>
            <p className="text-xs text-slate-400">
              Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx,
              .docx.
            </p>
            <p className="text-xs text-slate-400">
              Maximum number of files allowed: 10
            </p>
          </div>
          <div>
            {files.map((file, index) => {
              return (
                <div
                  key={file.bucketPath}
                  className="my-5 flex justify-between rounded-3xl bg-container px-8 py-5 text-heading"
                >
                  <div className="flex flex-row">
                    {showStateIcon(file.status)}
                    <div className="ml-8 flex flex-col">
                      <h3 className="font-semibold">{file.filename}</h3>
                      <p className="text-xs">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <Image
                    onClick={handleDelete(index)}
                    src={CrossIcon}
                    alt="Cross Icon"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-56 flex justify-between">
          <button
            className="mt-8 flex flex-row items-center  justify-between rounded-3xl border-2 border-[#50575F] p-2 px-5"
            type="submit"
            onClick={() => {
              setStep("data_source");
            }}
          >
            <h5 className="text-sm font-semibold text-heading">Back</h5>
          </button>
          <button
            className="mt-8 flex w-36 flex-row items-center justify-between rounded-3xl bg-primary p-2 px-5"
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleUpdateKB();

              // setStep("mint_nft")
            }}
          >
            <h5 className="text-sm font-semibold text-black">Continue</h5>
            <svg
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                fill="#151515"
              />
              <path
                d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                fill="#151515"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
