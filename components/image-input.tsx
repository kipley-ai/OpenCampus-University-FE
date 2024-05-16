import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Dropzone from "react-dropzone";
import ModalImageGallery from "@/components/modal-image-gallery";
import Button from "@/components/button";
import GalleryImages from "@/public/json/image-gallery-app.json";
import LoadingIcon from "public/images/loading-icon.svg";
import NoCover from "public/images/no-cover.svg";

type ImageInputProps = {
  selectedFile: string;
  setSelectedFile: (value: any) => void;
  setUploadedFile: (value: File | null) => void;
};

const ImageInput = ({
  selectedFile,
  setSelectedFile,
  setUploadedFile,
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingCover, setLoadingCover] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

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

  const handleGalleryCover = (e: any) => {
    e.preventDefault();
    setIsGalleryModalOpen(true);
  };

  const handleDeviceCover = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        setSelectedFile(URL.createObjectURL(file));
        setUploadedFile(file);
      });
    }
  };

  const handleRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * GalleryImages.length);
    setSelectedFile(GalleryImages[randomIndex]);
    setUploadedFile(null);
  };

  const handleRemoveCover = () => {
    setSelectedFile("");
    setUploadedFile(null);
  };

  return (
    <div className="flex gap-8">
      <div>
        <Dropzone
          onDrop={handleFileDrop}
          accept={{ "image/*": [] }}
          multiple={false}
          maxFiles={1}
          maxSize={2000000}
          disabled
        >
          {({ getRootProps, getInputProps }) => (
            <div className="px-auto" {...getRootProps()}>
              <input
                {...getInputProps()}
                accept="image/*"
                onChange={handleCoverChange}
                ref={inputRef}
              />
              {loadingCover ? (
                <Image
                  width={30}
                  height={30}
                  src={LoadingIcon}
                  alt="Loading Icon"
                />
              ) : selectedFile ? (
                <Image
                  src={selectedFile}
                  alt="Edit Preview"
                  width={125}
                  height={125}
                  className="rounded-lg object-cover"
                  priority
                />
              ) : (
                <Image
                  src={NoCover}
                  alt="no cover"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                  priority
                />
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div className="flex flex-col gap-2 pt-6 md:pt-0">
        <div className="flex gap-2">
          <Button
            onClick={handleDeviceCover}
            className="rounded-lg bg-primary text-white"
          >
            Upload Image
          </Button>
          <Button onClick={handleGalleryCover} className="bg-sidebar text-primary rounded-lg border border-primary border-2 hover:bg-sidebar">
            Choose From Gallery
          </Button>
        </div>
        <p className="w-3/5 text-xs text-gray-400 my-0.5 leading-4">
          Please upload JPG, GIF or PNG only. Maximum size of 800KB, minimum
          dimension of 200 x 200px
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleRandomCover}
            className="text-xs text-primary underline"
          >
            Random
          </button>
          <button
            onClick={handleRemoveCover}
            className="text-xs text-red-700 underline"
            type="button"
          >
            Remove image
          </button>
        </div>
      </div>
      <ModalImageGallery
        isOpen={isGalleryModalOpen}
        setIsOpen={setIsGalleryModalOpen}
        title="Cover Image Gallery"
        setImage={setSelectedFile}
        setUploadedFile={setUploadedFile}
      />
    </div>
  );
};

export default ImageInput;
