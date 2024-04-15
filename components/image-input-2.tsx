import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Dropzone from "react-dropzone";
import ModalImageGallery from "@/components/modal-image-gallery";
import GalleryImages from "@/public/json/image-gallery-app.json";
import UploadingIcon from "public/images/upload-file/uploading-icon-white.svg";
import LoadingIcon from "public/images/loading-icon.svg";

const ImageInput = ({ selectedFile, setSelectedFile }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingCover, setLoadingCover] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const uploadFile = async (newFile: any, callback: any) => {
    try {
      const response = await axios.post("/api/upload/s3/asset", newFile);

      if (response.status === 200) {
        const data = response.data;
        callback(data.link);
        return data;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCoverChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files) {
      // console.log(e.target.files)
      Array.from(e.target.files).map((newFileObj) => {
        const newFile = new FormData();
        // return
        newFile.append("input-file-upload", newFileObj);
        newFile.append("file-dir", "cover_image/nft");
        setLoadingCover(true);
        const uploadedFile = uploadFile(newFile, (uploadedFile: string) => {
          setSelectedFile(uploadedFile);
          setLoadingCover(false);
        });
      });
      // handleFiles(e.target.files);
    }
  };

  const handleFileDrop = (acceptedFiles: any) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * GalleryImages.length);
    setSelectedFile(GalleryImages[randomIndex]);
  };

  return (
    <>
      <div className="flex w-60 flex-col gap-2">
        <label
          className="form-label mb-1 self-start text-sm font-semibold lg:text-base"
          htmlFor="email"
        >
          Cover Image
        </label>
        <Dropzone
          onDrop={handleFileDrop}
          accept={{ "image/*": [] }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone cursor-pointer " {...getRootProps()}>
              <input
                {...getInputProps()}
                onChange={handleCoverChange}
                ref={inputRef}
              />
              {loadingCover ? (
                <svg aria-hidden="true" role="status" className="mr-3 animate-spin w-5 h-5" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="var(--color-primary)"/>
                </svg>
              ) : selectedFile ? (
                <Image
                  src={selectedFile}
                  alt="Edit Preview"
                  width={250}
                  height={250}
                  className="rounded-2xl object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-[#777E90] px-2 py-14 text-center">
                  <p className="text-xs text-heading">Drop your files here OR</p>
                  <p className="text-xs text-primary">Click here to browse</p>
                  <p className="text-xs text-[#777E90]">
                    PNG, GIF, WEBP or JPEG.<br />
                    Max 10MB.
                  </p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsImageModalOpen(true);
            }}
            className="button rounded-xl"
          >
            Choose Image From Gallery
          </button>
          <button
            onClick={handleChangeImage}
            className="button rounded-xl"
          >
            Choose Image From Device
          </button>
          <div
            // className="w-full cursor-pointer rounded-xl border-2 border-border py-1 text-center text-xs font-bold text-gray-400 hover:brightness-75"
            className="w-full cursor-pointer rounded-xl border-2 border-2 border-[#50575F] hover:opacity-75 py-1 text-center text-xs lg:text-sm"
            onClick={handleRandomCover}
          >
            Random
          </div>
        </div>
        <ModalImageGallery
          isOpen={isImageModalOpen}
          setIsOpen={setIsImageModalOpen}
          title="Cover Image Gallery"
          setImage={setSelectedFile}
          setUploadedFile={setSelectedFile}
        />
      </div>
    </>
  );
};

export default ImageInput;
