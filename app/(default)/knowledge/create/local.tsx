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
import Button from "@/components/button";
import { useAppProvider } from "@/providers/app-provider";
import { error } from "console";

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
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-heading-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25 stroke-container" cx="12" cy="12" r="10" strokeWidth="4"/>
            <path className="opacity-75 fill-primary" d="M4 12c0-4.418 3.582-8 8-8v8h8c0 4.418-3.582 8-8 8s-8-3.582-8-8z"/>
          </svg>
        );
      case "failed":
        return (
          <Image width={30} height={30} src={FailedIcon} alt="Failed Icon" />
        );
      case "success":
        return (
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect className="fill-primary" width="30" height="30" rx="15"/>
            <path className="fill-container" fillRule="evenodd" clipRule="evenodd" d="M21.7071 10.2929C22.0976 10.6834 22.0976 11.3166 21.7071 11.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071L8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L13 17.5858L20.2929 10.2929C20.6834 9.90237 21.3166 9.90237 21.7071 10.2929Z"/>
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
    <div className="flex flex-col px-6 py-10 pb-20 lg:px-8 xl:px-32 bg-container">
      <Toast
        children={"KB creation successful"}
        open={toast}
        setOpen={setToast}
        className="mx-auto"
      />
      <div className="">
        <h1 className="text-2xl font-semibold text-heading">
          Upload Knowledge Files
        </h1>
        <hr className="my-4 border border-border" />
      </div>
      <div className="">
        <div
          className="mb-4 mt-5 flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-heading px-20 py-12 bg-box text-center font-inter text-heading "
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
          <div className="mb-8 h-14 w-14 shrink-0 grow-0 rounded-full bg-container p-4">
            <svg width="24" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-heading">
              <path d="M4.33329 18.6563C2.72531 17.58 1.66663 15.7469 1.66663 13.6667C1.66663 10.5419 4.0553 7.97506 7.10628 7.69249C7.73038 3.89618 11.027 1 15 1C18.973 1 22.2695 3.89618 22.8936 7.69249C25.9446 7.97506 28.3333 10.5419 28.3333 13.6667C28.3333 15.7469 27.2746 17.58 25.6666 18.6563M9.66663 18.3333L15 13M15 13L20.3333 18.3333M15 13V25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <label className="text-md mb-3 cursor-pointer font-semibold">
            Drop your files here OR{" "}
            <span className="text-primary">Click here to browse</span>
          </label>
          <p className="text-xs">
            Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx,
            .docx.
          </p>
          <p className="text-xs">
            Maximum number of files allowed: 10
          </p>
        </div>
        {/* Warning if file exceeded */}
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
                className="my-5 flex justify-between rounded-3xl border-2 border-border bg-box px-8 py-5 text-heading"
              >
                <div className="flex flex-row">
                  {showStateIcon(file.status)}
                  <div className="ml-8 flex flex-col">
                    <h3 className="font-semibold">{file.filename}</h3>
                    <p className="text-xs">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <button onClick={async () => {
                  const filename = files[index].filename;

                  files[index].aborter?.abort();
            
                  setFiles((prevFiles: UIFile[]) => {
                    return prevFiles.filter((_, i) => {
                      return index !== i;
                    });
                  });
            
                  await deleteFileS3(files[index].bucketPath);
            
                  console.log("Deleted the item: " + filename);
                }}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:opacity-75"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="38"
                      rx="19"
                      stroke="#353945"
                      stroke-width="2"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
                      fill="var(--color-heading)"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="mt-8 flex flex-row items-center justify-between rounded-3xl border-2 border-[#50575F] p-2 px-5 hover:opacity-75"
          type="submit"
          onClick={() => {
            setStep("data_source");
          }}
        >
          <h5 className="text-sm">Back</h5>
        </button>
        <button
          className="button mt-8 w-32"
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
          <h5>
            Continue
          </h5>
        </button>
      </div>
    </div>
  );
}
