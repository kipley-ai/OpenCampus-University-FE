import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import GalleryImages from "@/public/json/image-gallery-app.json";

interface ModalImageGalleryProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setImage: (value: string | undefined) => void;
  setUploadedFile: (value: File | null) => void;
}

export default function ModalImageGallery({
  title,
  isOpen,
  setIsOpen,
  setImage,
  setUploadedFile,
}: ModalImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <Transition.Child
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <Dialog.Panel className="bg-white dark:bg-container rounded shadow-lg overflow-auto max-w-3xl w-full max-h-full">
            {/* Modal header */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <Dialog.Title className="font-semibold text-slate-800 dark:text-slate-100 text-2xl">
                  {title}
                </Dialog.Title>
                <button
                  className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  <div className="sr-only">Close</div>
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
            </div>
            {/* Modal body */}
            <div className="grid grid-cols-10 gap-4 overflow-y-scroll	max-h-[69vh] h-4/5 p-6">
              {GalleryImages.map((image, index: number) => {
                return (
                  <Image
                    key={index}
                    width={300}
                    height={300}
                    onClick={() => setSelectedImage(image)}
                    className={`border-4 ${
                      selectedImage == image
                        ? "border-primary"
                        : "border-transparent"
                    }  col-span-2 rounded-xl`}
                    style={{ aspectRatio: "300/300" }}
                    src={image}
                    alt="random image"
                  />
                );
              })}
            </div>
            {/* Modal footer */}
            <div className="px-5 py-3 border-t dark:border-slate-700 flex justify-center gap-16">
              <button
                className="dark:text-slate-100 hover:opacity-75 rounded-3xl w-32 py-2 border-2 border-[#50575F]"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="button w-32"
                onClick={() => {
                  setImage(selectedImage);
                  // setUploadedFile(null);
                  setIsOpen(false);
                }}
              >
                Select
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
