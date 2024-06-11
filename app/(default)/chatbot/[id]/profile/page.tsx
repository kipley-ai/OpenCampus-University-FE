"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import { chatbotIdFromSlug } from "@/utils/utils";
import { BiPencil } from "react-icons/bi";

type Tabs = "Knowledge Keys" | "Apps";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tabs>("Knowledge Keys");

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  console.log(chatbotData?.data.data); // For debugging purpose

  return (
    <>
      <h1 className="mb-4 text-lg font-semibold">Profile</h1>
      <div className="rounded-2xl border-2 border-border bg-sidebar">
        <section className="">
          <Image
            src="/images/dashboard-banner.svg"
            alt="Main Banner"
            className="w-full rounded-t-2xl"
            width={1030}
            height={264}
          />
          <div className="relative bottom-16 flex w-full flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={chatbotData?.data.data.profile_image as string}
                width={120}
                height={120}
                alt="Chatbot Profile Image"
                className="rounded-full border-4 border-border"
              />
              {/* Pencil Button */}
              {/* <button className="absolute bottom-0 right-2 size-6 rounded-full bg-primary text-white hover:bg-secondary">
              <BiPencil className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
            </button> */}
            </div>
            <h2 className="text-2xl font-semibold leading-none text-primary">
              {chatbotData?.data.data.name}
            </h2>
            <h3 className="font-medium text-gray-500">
              @{chatbotData?.data.data.name}
            </h3>
          </div>
        </section>

        <div className="px-3 pb-10 md:px-10">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-primary">About</h2>
            {id === "1d7a4ecf-bcf6-44da-bf05-92225aec8a03" ? (
              <>
                <p className="mb-4 text-sm text-body">
                  Veteran technology entrepreneur/investor Yat Siu is the
                  co-founder and executive chairman of Animoca Brands, a global
                  leader in blockchain and gaming with the goal to provide
                  property rights for virtual assets. Yat began his career at
                  Atari Germany, then established Hong Kong
                  Cybercity/Freenation, the first free web page and email
                  provider in Asia. In 1998 he set up Outblaze, an award-winning
                  pioneer of multilingual white label web services. After
                  selling one of its business units to IBM, he pivoted Outblaze
                  to incubate digital entertainment projects. One of those
                  projects is Animoca Brands.
                </p>
                <p className="text-sm text-body">
                  Yat has numerous accolades, including Global Leader of
                  Tomorrow at the World Economic Forum, Young Entrepreneur of
                  the Year at the DHL/SCMP Awards, and recognition as one of
                  Cointelegraph's top 100 notable people in blockchain. A
                  classically trained musician, Yat is a member of the advisory
                  board of BAFTA (British Academy of Film and Television Arts)
                  and a director of the Asian Youth Orchestra.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-body">
                  {chatbotData?.data.data.description}
                </p>
              </>
            )}
          </section>

          <section className="mt-8">
            <ul className="mb-8 flex w-full gap-12 border-b-2 border-secondary text-sm font-semibold dark:border-border">
              <li
                onClick={() => setActiveTab("Knowledge Keys")}
                className={`relative top-[1px] cursor-pointer ${activeTab === "Knowledge Keys" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
              >
                Knowledge Keys
              </li>
              <li
                onClick={() => setActiveTab("Apps")}
                className={`relative top-[1px] cursor-pointer ${activeTab === "Apps" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
              >
                Apps
              </li>
            </ul>
            {(() => {
              switch (activeTab) {
                case "Knowledge Keys":
                  return <KnowledgeAssets />;
                case "Apps":
                  return <Apps />;
                default:
                  return null;
              }
            })()}
          </section>
        </div>
      </div>
    </>
  );
}

const KnowledgeAssets = () => {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const { data: sftData } = useNftDetail({
    sft_id: chatbotData?.data.data.sft_id as string,
  });

  const sftID = sftData?.data.data.sft_id as string;

  return (
    <div className="flex flex-wrap gap-8">
      <Link href={`/nft/${sftID}`}>
        {[sftData?.data.data].map((item: any) => (
          <ProfileItem
            key={item}
            name={sftData?.data.data.name as string}
            profileImage={sftData?.data.data.profile_image as string}
          />
        ))}
      </Link>
    </div>
  );
};

const Apps = () => {
  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  const appID = chatbotData?.data.data.chatbot_id;

  return (
    <div className="flex flex-wrap gap-8">
      <Link href={`/chatbot/${appID}`}>
        {[chatbotData?.data.data].map((item: any) => (
          <ProfileItem
            key={item}
            name={chatbotData?.data.data.name as string}
            profileImage={chatbotData?.data.data.profile_image as string}
          />
        ))}
      </Link>
    </div>
  );
};

const ProfileItem = ({
  name,
  profileImage,
}: {
  name: string;
  profileImage: string;
}) => {
  return (
    <div className="group flex w-fit flex-col gap-4 md:w-max">
      <Image
        src={profileImage}
        alt="Profile Image"
        className="rounded-lg group-hover:shadow-xl dark:group-hover:shadow-gray-700 max-sm:w-[110px]"
        width={200}
        height={200}
      />
      <h2 className="font-semibold text-primary">{name}</h2>
    </div>
  );
};

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
          <h2 className=" text-xl font-medium text-primary">About</h2>
        </div>
        <div className="flex flex-col md:flex-row md:gap-16 md:pl-8">
          <div className="relative mb-4 size-[150px] shrink-0 md:size-[200px]">
            <Image
              src={chatbotData?.data.data.profile_image as string}
              alt="Chatbot Profile Image"
              layout="fill"
              className="rounded-lg object-fill"
            />
          </div>
          <div className="flex flex-col justify-between text-body">
            <div className="items-start max-md:text-sm">
              {id === "1d7a4ecf-bcf6-44da-bf05-92225aec8a03" ? (
                <>
                  <p className="mb-4">
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
                  <p className="mb-4">
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
                  <p className="mb-4">{chatbotData?.data.data.description}</p>
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
          <h2 className="text-xl font-medium text-primary">Knowledge Keys</h2>
        </div>
        <div className="flex flex-col-reverse justify-between md:flex-row">
          <div className="text-body md:pl-8">
            <div className="md:w-3/4">
              <h1 className="text-3xl font-medium text-heading">
                {sftData?.data.data.name}
              </h1>
              <p className="my-2 max-md:text-sm">
                {sftData?.data.data.description}
              </p>
            </div>
          </div>
          <div className="">
            <div className="relative mb-4 size-[150px] md:size-[200px]">
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
