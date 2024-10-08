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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <path
              d="M0.703125 10C0.703125 15.0628 4.80704 19.1667 9.86979 19.1667C14.9325 19.1667 19.0365 15.0628 19.0365 10C19.0365 4.93729 14.9325 0.833374 9.86979 0.833374C4.80704 0.833374 0.703125 4.93729 0.703125 10ZM17.2031 10C17.2031 11.945 16.4305 13.8102 15.0552 15.1855C13.68 16.5608 11.8147 17.3334 9.86979 17.3334C7.92487 17.3334 6.05961 16.5608 4.68434 15.1855C3.30908 13.8102 2.53646 11.945 2.53646 10C2.53646 8.05512 3.30908 6.18986 4.68434 4.81459C6.05961 3.43932 7.92487 2.66671 9.86979 2.66671C11.8147 2.66671 13.68 3.43932 15.0552 4.81459C16.4305 6.18986 17.2031 8.05512 17.2031 10ZM15.3698 10C15.3698 11.4587 14.7903 12.8577 13.7589 13.8891C12.7274 14.9206 11.3285 15.5 9.86979 15.5C8.4111 15.5 7.01215 14.9206 5.9807 13.8891C4.94925 12.8577 4.36979 11.4587 4.36979 10H9.86979V4.50004C11.3285 4.50004 12.7274 5.0795 13.7589 6.11095C14.7903 7.1424 15.3698 8.54135 15.3698 10Z"
              fill="#141BEB"
            />
          </svg>
        );
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
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
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
    <div className="flex flex-col rounded-2xl border border-[#DDDDEB] bg-sidebar px-6 py-9 pb-0 lg:px-8 xl:px-14">
      <Toast
        children={"KB creation successful"}
        open={toast}
        setOpen={setToast}
        className="mx-auto"
      />
      <div className="">
        <h1 className="text-lg font-semibold text-primary">
          Upload Knowledge Files
        </h1>
      </div>
      <div className="mt-4">
        <div
          className="mb-4 mt-1 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-[#E1E1ED] bg-container px-12 py-14 text-center text-heading hover:bg-secondary xs:px-20"
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
          {/* <div className="mb-8 h-14 w-14 shrink-0 grow-0 rounded-full bg-container p-4">
            <svg width="24" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-heading">
              <path d="M4.33329 18.6563C2.72531 17.58 1.66663 15.7469 1.66663 13.6667C1.66663 10.5419 4.0553 7.97506 7.10628 7.69249C7.73038 3.89618 11.027 1 15 1C18.973 1 22.2695 3.89618 22.8936 7.69249C25.9446 7.97506 28.3333 10.5419 28.3333 13.6667C28.3333 15.7469 27.2746 17.58 25.6666 18.6563M9.66663 18.3333L15 13M15 13L20.3333 18.3333M15 13V25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div> */}
          <label className="text-md cursor-pointer font-medium text-body">
            Drag & drop or{" "}
            <span className="text-primary">click to select file</span>
          </label>
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
          <p className="mb-2 text-xs text-body">
            Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx,
            .docx. Maximum number of files allowed: 10
          </p>
        </div>
        <div>
          {files.map((file, index) => {
            return (
              <div
                key={file.bucketPath}
                className="mt-5 flex justify-between rounded-3xl p-5"
              >
                <div className="flex flex-row items-center">
                  {showStateIcon(file.status)}
                  <div className="ml-8 flex flex-col">
                    <h3 className="font-medium text-primary">
                      {file.filename}
                    </h3>
                    <p className="text-sm font-medium text-body">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                {/* <button onClick={async () => {
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
                </button> */}
                <button
                  className="text-sm font-medium text-primary underline hover:text-secondary"
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
      {/* <div className="flex justify-between">
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
      </div> */}
      <div className="my-8 flex items-center justify-between border-t-2 pt-4">
        <button
          className="flex items-center justify-center gap-2 hover:underline"
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
              fill="var(--color-primary)"
            />
          </svg>
          <p>Back</p>
        </button>
        <button
          className="flex items-center justify-center gap-2 hover:underline"
          type="submit"
          disabled={files.length === 0 || fileLimitExceeded}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            console.log(files);
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
          <p>NEXT</p>
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
    </div>
  );
}
