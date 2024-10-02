"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { KF_TITLE } from "@/utils/constants";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import { chatbotIdFromSlug } from "@/utils/utils";
import WebsiteLogo from "public/images/social-logo/website.svg";
import TwitterLogo from "public/images/social-logo/twitter.svg";
import FacebookLogo from "public/images/social-logo/facebook.svg";
import LinkedinLogo from "public/images/social-logo/linkedin.svg";
import YoutubeLogo from "public/images/social-logo/youtube.svg";

type Tabs = "KnowledgeKeys" | "Apps";

export default function ProfilePageV2() {
  const [activeTab, setActiveTab] = useState<Tabs>("KnowledgeKeys");

  const { id: slug } = useParams();
  const id = chatbotIdFromSlug(slug.toString());

  const { data: chatbotData } = useChatbotDetail({
    chatbot_id: id as string,
  });

  console.log(chatbotData?.data.data); // For debugging purpose

  return (
    <>
      <title>{KF_TITLE + chatbotData?.data.data.name + " - Profile"}</title>
      <div className="mt-12 flex">
        <div className="w-2/3 rounded-2xl border-2 border-border bg-sidebar">
          <div className="px-3 py-10 md:px-10">
            <div className="mb-8">
              <h1 className="text-sm font-semibold">INTRUCTOR</h1>
              <h1 className="text-2xl font-semibold text-primary">
                {chatbotData?.data.data.name}
              </h1>
              <h1 className="text-sm font-semibold">DS & AI INSTRUCTOR</h1>
            </div>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">About</h2>
              {id === "1d7a4ecf-bcf6-44da-bf05-92225aec8a03" ? (
                <>
                  <p className="mb-4 text-sm text-body">
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
                  <p className="text-sm text-body">
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
                  <p className="text-sm text-body">
                    {chatbotData?.data.data.description}
                  </p>
                </>
              )}
            </section>

            <div className="mt-8 flex gap-8">
              <div>
                <h1 className="mb-2 text-sm font-semibold">TOTAL ENROLLED</h1>
                <p className="text-right text-lg font-semibold">175,003</p>
              </div>
              <div>
                <h1 className="mb-2 text-sm font-semibold">TOTAL REVIEWS</h1>
                <p className="text-right text-lg font-semibold">87</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-grow justify-center">
          <section className="">
            <div className="flex w-full flex-col items-center gap-2">
              <Image
                src={chatbotData?.data.data.profile_image as string}
                width={200}
                height={200}
                alt="Chatbot Profile Image"
                className="rounded-full border-4 border-border"
              />
              <div className="mt-6 flex w-[200px] flex-col gap-2">
                <button className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary">
                  <Image src={WebsiteLogo} alt="website-logo" />
                  <p>Website</p>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary">
                  <Image src={TwitterLogo} alt="website-logo" />
                  <p>Twitter</p>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary">
                  <Image src={FacebookLogo} alt="website-logo" />
                  <p>Facebook</p>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary">
                  <Image src={LinkedinLogo} alt="website-logo" />
                  <p>Linkedin</p>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary">
                  <Image src={YoutubeLogo} alt="website-logo" />
                  <p>Youtube</p>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border-2 border-border bg-sidebar">
        <div className="px-3 pb-10 md:px-10">
          <section className="mt-8">
            <ul className="mb-8 flex w-full gap-12 border-b-2 border-secondary text-sm font-semibold dark:border-border">
              <li
                onClick={() => setActiveTab("KnowledgeKeys")}
                className={`relative top-[1px] cursor-pointer ${activeTab === "KnowledgeKeys" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
              >
                KnowledgeKeys
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
                case "KnowledgeKeys":
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
