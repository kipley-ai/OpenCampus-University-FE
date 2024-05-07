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
import UploadIcon from "public/images/upload-file/upload-file.svg";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { UIFile } from "./select-data-elements";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Toast from "@/components/toast";
import { useAppProvider } from "@/providers/app-provider";
import ArrowRight from "public/images/arrow-right.svg";

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

  // Check file limit exceed function
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);

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
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log("Inserted a new file from drop");

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
          <svg
            className="text-heading-0 -ml-1 mr-3 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="stroke-container opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
            />
            <path
              className="fill-primary opacity-75"
              d="M4 12c0-4.418 3.582-8 8-8v8h8c0 4.418-3.582 8-8 8s-8-3.582-8-8z"
            />
          </svg>
        );
      case "failed":
        return (
          <Image width={30} height={30} src={FailedIcon} alt="Failed Icon" />
        );
      case "success":
        return (
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.73907 10.1136V4.85273C5.73907 4.06032 6.38145 3.41795 7.17386 3.41795C7.96626 3.41795 8.60864 4.06032 8.60864 4.85273V10.1136C8.60864 11.6984 7.32389 12.9832 5.73907 12.9832C4.15426 12.9832 2.86951 11.6984 2.86951 10.1136V6.28751M11.9565 2.46143H14.5391C16.1462 2.46143 16.9497 2.46143 17.5636 2.77419C18.1035 3.0493 18.5425 3.48829 18.8176 4.02824C19.1304 4.64207 19.1304 5.44562 19.1304 7.05273V17.0006C19.1304 18.6077 19.1304 19.4112 18.8176 20.0251C18.5425 20.565 18.1035 21.004 17.5636 21.2791C16.9497 21.5919 16.1462 21.5919 14.5391 21.5919H8.41733C6.81023 21.5919 6.00667 21.5919 5.39284 21.2791C4.8529 21.004 4.41391 20.565 4.13879 20.0251C3.82603 19.4112 3.82603 18.6077 3.82603 17.0006V16.331"
              stroke="#141BEB"
              stroke-width="1.91304"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
    }
  };

  useEffect(() => {
    console.log(files);
    if (files.length > 10) {
      setFileLimitExceeded(true);
    } else {
      setFileLimitExceeded(false);
    }
  }, [files, toast]);

  return (
    <>
      <Toast
        children={"KB creation successful"}
        open={toast}
        setOpen={setToast}
        className="mx-auto"
      />
      <div className="border- mt-8 rounded-3xl bg-white px-10 pt-8">
        <h1 className="mb-8 text-2xl font-semibold text-primary">
          Upload Knowledge Files
        </h1>
        <div className="">
          <div
            className="font-inter mb-4 mt-5 flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed bg-container px-20 py-12 text-center text-heading "
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
            <label className="text-md mb-3 cursor-pointer font-semibold text-gray-500">
              Drag & drop or{" "}
              <span className="text-primary">click to select file</span>
            </label>
          </div>
          <p className="mb-4 text-xs text-gray-500">
            Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx,
            .docx. Maximum number of files allowed: 10
          </p>
          <div>
            {fileLimitExceeded && (
              <div className="mt-4 text-center text-red-500">
                Maximum number of files exceeded.
              </div>
            )}
          </div>
          <div>
            {files.map((file, index) => {
              return (
                <div
                  key={file.bucketPath}
                  className="my-5 flex justify-between bg-box px-8 py-5 text-heading"
                >
                  <div className="flex flex-row">
                    {showStateIcon(file.status)}
                    <div className="ml-8 flex flex-col">
                      <h3 className="font-semibold text-primary">
                        {file.filename}
                      </h3>
                      <p className="text-xs">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <button
                    className="font-semibold text-primary underline"
                    onClick={async () => {
                      const filename = files[index].filename;

                      files[index].aborter?.abort();

                      setFiles((prevFiles: UIFile[]) => {
                        return prevFiles.filter((_, i) => {
                          return index !== i;
                        });
                      });

                      await deleteFileS3(files[index].bucketPath);

                      console.log("Deleted the item: " + filename);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-8 flex items-center justify-between border-t-2 pt-4">
          <button
            className="flex items-center justify-center gap-2"
            type="submit"
            onClick={() => {
              setStep("data_source");
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
            className="flex items-center justify-center gap-2 disabled:opacity-50"
            type="submit"
            disabled={files.length === 0 || fileLimitExceeded}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              if (!fileLimitExceeded && files.length > 0) {
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
                setStep("mint_nft");
              }
            }}
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
      </div>
    </>
  );
}
