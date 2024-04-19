"use client";

import Image from "next/image";
import Link from "next/link";
import ProfileImage from "components/images/michael-dziedzic-D6FMtY6XCyM-unsplash 1.png";
import SFTImage from "components/images/michael-dziedzic-D6FMtY6XCyM-unsplash 2.png";
import Button from "@/components/button";
import { useParams, useRouter } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import { chatbotIdFromSlug } from "@/utils/utils";

export default function Profile() {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  console.log(id);

  return (
    <div className="bg-container px-6 pb-6">
      <ChatbotProfile />
      <div className="my-4" />
      <SFTDetail />
    </div>
  );
}

function ChatbotProfile() {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  // console.log(chatbotData?.data.data); //For debugging purpose

  return (
    <div>
      <div className="mx-6 my-3">
        <h2 className="text-4xl font-medium text-heading">
          {chatbotData?.data.data.name}
        </h2>
      </div>
      <div className="mx-6 flex flex-col gap-2 rounded-xl bg-box p-6 text-heading">
        <div className="flex gap-4">
          <div className="w-4 rounded-md bg-primary"></div>
          <h2 className="font-poppins text-xl font-medium text-primary">
            About
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:gap-16 md:pl-8">
          <div className="relative mb-4 size-[200px] shrink-0">
            <Image
              src={chatbotData?.data.data.profile_image as string}
              alt="Chatbot Profile Image"
              layout="fill"
              className="rounded-lg object-fill"
            />
          </div>
          <div className="flex flex-col justify-between text-body">
            <div className="items-start">
              {id === "1d7a4ecf-bcf6-44da-bf05-92225aec8a03" ? (
                <>
                  <p className="mb-4 line-clamp-6 font-poppins">
                    Veteran technology entrepreneur/investor Yat Siu is the
                    co-founder and executive chairman of Animoca Brands, a
                    global leader in blockchain and gaming with the goal to
                    provide property rights for virtual assets. Yat began his
                    career at Atari Germany, then established Hong Kong
                    Cybercity/Freenation, the first free web page and email
                    provider in Asia. In 1998 he set up Outblaze, an
                    award-winning pioneer of multilingual white label web
                    services. After selling one of its business units to IBM, he
                    pivoted Outblaze to incubate digital entertainment projects.
                    One of those projects is Animoca Brands.
                  </p>
                  <p className="mb-4 line-clamp-6 font-poppins">
                    Yat has numerous accolades, including Global Leader of
                    Tomorrow at the World Economic Forum, Young Entrepreneur of
                    the Year at the DHL/SCMP Awards, and recognition as one of
                    Cointelegraph's top 100 notable people in blockchain. A
                    classically trained musician, Yat is a member of the
                    advisory board of BAFTA (British Academy of Film and
                    Television Arts) and a director of the Asian Youth
                    Orchestra.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4 line-clamp-6 font-poppins">
                    {chatbotData?.data.data.description}
                  </p>
                </>
              )}
            </div>
            <div className="items-end">
              <Link href={`/chatbot/${slug}`}>
                <Button className="my-5 px-8">
                  Chat with {chatbotData?.data.data.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SFTDetail() {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());
  const router = useRouter();

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const { data: sftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });

  return (
    <div>
      <div className="mx-6 flex flex-col gap-2 rounded-xl bg-box p-6 text-heading">
        <div className="flex gap-4">
          <div className="w-4 rounded-md bg-primary"></div>
          <h2 className="font-poppins text-xl font-medium text-primary">
            Knowledge Assets SFT
          </h2>
        </div>
        <div className="flex flex-col-reverse justify-between md:flex-row">
          <div className="text-body md:pl-8">
            <div className="md:w-3/4">
              <h1 className="text-3xl font-medium text-heading">
                {sftData?.data.data.name}
              </h1>
              <p className="my-2 line-clamp-6 font-poppins">
                {sftData?.data.data.description}
              </p>
            </div>
          </div>
          <div className="">
            <div className="relative mb-4 size-[200px]">
              <Image
                src={sftData?.data.data.profile_image as string}
                alt="SFT Image"
                layout="fill"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YatSiuProfile() {
  const { id: slug } = useParams();
  return (
    <div>
      <div className="mx-6 my-3">
        <h2 className="text-4xl font-medium text-heading">Yat Siu</h2>
      </div>
      <div className="mx-6 flex flex-col gap-2 rounded-xl bg-box p-6 text-heading">
        <div className="flex gap-4">
          <div className="w-4 rounded-md bg-primary"></div>
          <h2 className="font-poppins text-xl font-medium text-primary">
            About
          </h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/5">
            <div
              className="mb-4"
              style={{ width: "250px", height: "250px", position: "relative" }}
            >
              <Image
                src={ProfileImage}
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="ml-8 flex flex-col justify-between text-body md:w-4/5 md:pl-6">
            <div className="items-start">
              <p className="mb-4 line-clamp-6 font-poppins">
                Veteran technology entrepreneur/investor Yat Siu is the
                co-founder and executive chairman of Animoca Brands, a global
                leader in blockchain and gaming with the goal to provide
                property rights for virtual assets. Yat began his career at
                Atari Germany, then established Hong Kong Cybercity/Freenation,
                the first free web page and email provider in Asia. In 1998 he
                set up Outblaze, an award-winning pioneer of multilingual white
                label web services. After selling one of its business units to
                IBM, he pivoted Outblaze to incubate digital entertainment
                projects. One of those projects is Animoca Brands.
              </p>
              <p className="mb-4 line-clamp-6 font-poppins">
                Yat has numerous accolades, including Global Leader of Tomorrow
                at the World Economic Forum, Young Entrepreneur of the Year at
                the DHL/SCMP Awards, and recognition as one of Cointelegraph's
                top 100 notable people in blockchain. A classically trained
                musician, Yat is a member of the advisory board of BAFTA
                (British Academy of Film and Television Arts) and a director of
                the Asian Youth Orchestra.
              </p>
            </div>
            <div className="items-end">
              <Link href={`/chatbot/${slug}`}>
                <Button className="my-5 px-8">Chat with Yat Siu</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YatSiuSFT() {
  return (
    <div>
      <div className="mx-6 flex flex-col gap-2 rounded-xl bg-box p-6 text-heading">
        <div className="flex gap-4">
          <div className="w-4 rounded-md bg-primary"></div>
          <h2 className="font-poppins text-xl font-medium text-primary">
            Knowledge Assets SFT
          </h2>
        </div>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="-mr-10 text-body md:w-4/5 md:pl-6">
            <div className="md:w-3/4">
              <h1 className="text-3xl font-medium text-heading">
                Yat Siu's Ideas
              </h1>
              <p className="my-2 line-clamp-6 font-poppins">
                Chairman of Animoca Brands and generally excited to talk about
                true digital property rights!
              </p>
            </div>
          </div>
          <div className="md:w-1/5">
            <div
              style={{ width: "250px", height: "250px", position: "relative" }}
            >
              <Image
                src={SFTImage}
                alt="Knowledge Asset"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
