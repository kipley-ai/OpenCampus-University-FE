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
import { useNftDetail } from "@/hooks/api/nft";
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
  const { createKb, handleChangeKb, setStep, kbDetail } =
    useCreateChatbotContext();
  const { toast, setToast } = useAppProvider();
  const updateKB = useUpdateKB();
  const [showModal, setShowModal] = useState(false);

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
        kb_id: kbDetail?.kb_id!,
        type: "files",
        kb_data: files.map((file) => {
          return {
            type: "file",
            name: file.filename,
            file: file.bucketPath,
          };
        }),
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
        // return <Image width={30} height={30} src={SuccessIcon} alt="Success Icon" />;
        return (
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-2"
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
  }, [files]);

  return (
    <>
      <CreateChatbotModal
        children={"Your data source has been updated successfully!"}
        open={showModal}
        setOpen={setShowModal}
      />

      <div className="flex flex-col rounded-2xl border border-[#DDDDEB] bg-sidebar px-6 py-9 pb-0 lg:px-8 xl:px-14">
        {/* <Toast children={"KB creation successful"} open={toast} setOpen={setToast} className="mx-auto" /> */}
        <div className="">
          <h1 className="text-lg font-semibold text-primary">
            Upload Knowledge Files
          </h1>
        </div>
        <div className="mt-4">
          <div
            className="font-inter mb-4 mt-1 flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-[#E1E1ED] bg-box bg-container px-20 py-14 text-center text-heading"
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
            {/* <div className="bg-white w-14 h-14 shrink-0 grow-0 rounded-full p-4 mb-8">
							<Image width={30} height={30} src={UploadIcon} alt="Upload Icon" />
						</div> */}
            <label className="text-md cursor-pointer font-medium">
              Drag & drop or{" "}
              <span className="text-primary">click to select file</span>
            </label>
            {/* <p className="text-slate-400 text-xs">
							Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx, .docx.
						</p>
						<p className="text-slate-400 text-xs">
							Maximum number of files allowed: 10
						</p> */}
          </div>
          <div>
            <p className="mb-2 text-xs">
              Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx,
              .docx. Maximum number of files allowed: 10
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
        <div className="my-8 mt-16 flex items-center justify-between border-t-2 pt-4">
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
                fill="#141BEB"
              />
            </svg>
            <p>Back</p>
          </button>
          <button
            className="flex items-center justify-center gap-2 hover:underline"
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleUpdateKB();

              // setStep("mint_nft")
            }}
          >
            <p>Continue</p>
            {/* <svg
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
						</svg> */}
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
