"use client";

import { randomIntBetween } from "@/utils/utils";
import YatSiuPic from "public/images/professors/1 Yat Siu.jpg";
import YatSiuInst from "public/images/professors/1 Animoca Brands Logo.png";
import WilliamPengPic from "public/images/professors/2 William Peng.png";
import WilliamPengInst from "public/images/professors/2 NYU.png";
import SergioMoralesPic from "public/images/professors/3 sergio morales.jpg";
import SergioMoralesInst from "public/images/professors/3 University buenos aires.jpg";
import DalharSusantoPic from "public/images/professors/4 Dalhar Susanto.jpg";
import DalharSusantoInst from "public/images/professors/4 University Indonesia.png";
import JavierChaPic from "public/images/professors/5 Javier Cha.jpg";
import JavierCharInst from "public/images/professors/5 HKU.jpg";
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
import React from "react";

export const ProfessorList = [
  {
    id: "oc-prof-Yat-Siu",
    name: "Yat Siu",
    headline: "Co-founder and executive chairman of Animoca Brands",
    about:
      "Veteran technology entrepreneur/investor Yat Siu is the co-founder and executive chairman of Animoca Brands, a global leader in blockchain and gaming with the goal to provide property rights for virtual assets. Yat began his career at Atari Germany, then established Hong Kong Cybercity/Freenation, the first free web page and email provider in Asia. In 1998 he set up Outblaze, an award-winning pioneer of multilingual white label web services. After selling one of its business units to IBM, he pivoted Outblaze to incubate digital entertainment projects. One of those projects is Animoca Brands. Yat has numerous accolades, including Global Leader of Tomorrow at the World Economic Forum, Young Entrepreneur of the Year at the DHL/SCMP Awards, and recognition as one of Cointelegraph's top 100 notable people in blockchain. A classically trained musician, Yat is a member of the advisory board of BAFTA (British Academy of Film and Television Arts) and a director of the Asian Youth Orchestra.",
    profilePic: YatSiuPic,
    website: null,
    twitter: "https://x.com/ysiu",
    linkedin: "https://www.linkedin.com/in/yatsiu/",
    blog: "https://ysiu.medium.com/",
    googleScholar: null,
    institutionName: "Animoca Brands",
    institutionLogo: YatSiuInst,
    totalEnrolled: randomIntBetween(1000, 10000),
    totalReviews: randomIntBetween(100, 1000),
  },
  {
    id: "oc-prof-William-Peng",
    name: "William Peng",
    headline:
      "Asst. Professor, Mechanical and Aerospace Engineering, New York University",
    about:
      "Dr. William Z. Peng is a Visiting Assistant Professor in theDepartment of Mechanical and Aerospace Engineering at New York University (NYU) and has previously taught at NYU’s Center for Urban Science and Progress. He holdsdual B.S./M.S. (2016) and doctoral (2022) degrees in mechanical engineering from NYU. He is a research associate affiliated with the Applied Dynamics and Optimization Lab where he researches the dynamics, control, and optimization of multi-body systems, and leads the I-SITE program at the Center for K12 STEM Education. His current research topics include the integration of balance stability, actuator modeling, and conditional constraints for trajectory optimization in the design, analysis, and control of legged robots.",
    profilePic: WilliamPengPic,
    website: "https://engineering.nyu.edu/faculty/william-peng",
    twitter: null,
    linkedin: "https://www.linkedin.com/in/william-peng-phd-6077b011b/",
    blog: null,
    googleScholar:
      "https://scholar.google.com/citations?user=SAMBaaEAAAAJ&hl=en&oi=sra",
    institutionName: "New York University",
    institutionLogo: WilliamPengInst,
    totalEnrolled: randomIntBetween(1000, 10000),
    totalReviews: randomIntBetween(100, 1000),
  },
  {
    id: "oc-prof-Sergio-Morales",
    name: "Sergio Morales",
    headline: "Professor, Universidad de Buenos Aires",
    about:
      "Fintech & Blockchain Advisor 🇦🇷 l Angel Investor l MSc & PhD(c) in Finance @UBAonline l 📖 Author 'Análisis Fundamental', Ed. Penguin Random House. Adviser specialized in Financial Innovation and Blockchain Technology for Companies, Governments and International Organizations. Contributor to the World Economic Forum (WEF) and member of the G-20 Working Group on Infrastructure and Financial Regulation.",
    profilePic: SergioMoralesPic,
    website: "https://www.sergiomorales.com.ar/",
    twitter: "https://x.com/SergioMoralesAR",
    linkedin: "https://www.linkedin.com/in/sergiomoralesar/",
    blog: null,
    googleScholar: null,
    institutionName: "Universidad de Buenos Aires",
    institutionLogo: SergioMoralesInst,
    totalEnrolled: randomIntBetween(1000, 10000),
    totalReviews: randomIntBetween(100, 1000),
  },
  {
    id: "oc-prof-Dalhar-Susanto",
    name: "Dalhar Susanto",
    headline: "Head of Department of Architecture, University of Indonesia",
    about:
      "Professor Dalhar Susanto holds a doctoral degree in Architecture, Urban and Housing at Fakultaet fuer Architektur, Universitaet Stuttgart, Germany, in 1999. He has been a permanent lecturer at the Department of Architecture, University of Indonesia since 1991, teaching Architectural Design, Building Technology and Housing. He has been active in research and community service activities with the specialization topics of “sustainablehousing technology” and “appropriate building technology”. He practiced as a professional architect and has designed several hotel, residential and commercial buildings. He is a holder of several professional certificates: “Associate Architect Certificate of Expertise” lkatan ArsitekIndonesia (2008); ‘Building Technical Performer License /PTB’ DKl Jakarta 2008; and ‘Certificate of Educator / Lecturer’ Ministry of National Education Rl 2011. Currently, he is a member of the Indonesian Architects Association (lAl); a member of the Jakarta City Architecture Advisory Team 2010-2013; a member of the Jakarta Building Experts 2014-2017; and an assessor of the National Accreditation Board for Higher Education since 2014.",
    profilePic: DalharSusantoPic,
    website: "https://architecture.ui.ac.id/people/dalhar-susanto/",
    twitter: null,
    linkedin: null,
    blog: null,
    googleScholar: null,
    institutionName: "University of Indonesia",
    institutionLogo: DalharSusantoInst,
    totalEnrolled: randomIntBetween(1000, 10000),
    totalReviews: randomIntBetween(100, 1000),
  },
  {
    id: "oc-prof-Javier-Cha",
    name: "Javier Cha",
    headline: "Director, Big Data Studies Lab, The University of Hong Kong",
    about:
      "Professor Javier Chat currently works as Assistant Professor of Digital Humanities in the Department of History at the University of Hong Kong, where he teaches in the new Bachelor of Arts in Humanities and Digital Technologies programme. Prior to moving to Hong Kong, he was Associate Professor of East Asian Studies in the College of Liberal Studies at Seoul National University. He received my BA and MA education in Asian Studies at the University of British Columbia and PhD in East Asian Languages and Civilizations at Harvard University.",
    profilePic: JavierChaPic,
    website: "https://javiercha.com/",
    twitter: null,
    linkedin: "https://www.linkedin.com/in/javiercha512/",
    blog: "https://javiercha.com/blog/",
    googleScholar:
      "https://scholar.google.com/citations?user=jWGH7sQAAAAJ&hl=en",
    institutionName: "The University of Hong Kong",
    institutionLogo: JavierCharInst,
    totalEnrolled: randomIntBetween(1000, 10000),
    totalReviews: randomIntBetween(100, 1000),
  },
];

type Tabs = "KnowledgeKeys" | "Apps";

export default function ProfessorProfilePage() {
  const [activeTab, setActiveTab] = useState<Tabs>("KnowledgeKeys");

  const { id: slug } = useParams();

  const profDetail = ProfessorList.find((p) => slug == p.id);

  return (
    <>
      <title>{KF_TITLE + profDetail?.name + " - Profile"}</title>
      <div className="mt-12 flex">
        <div className="w-2/3 rounded-2xl border-2 border-border bg-sidebar">
          <div className="px-3 py-10 md:px-10">
            <div className="mb-8">
              <h1 className="text-sm font-semibold">INSTRUCTOR</h1>
              <h1 className="text-2xl font-semibold text-primary">
                {profDetail?.name}
              </h1>
              <h1 className="text-sm font-semibold">{profDetail?.headline}</h1>
            </div>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-primary">About</h2>
              <>
                <p className="text-sm text-body">{profDetail?.about}</p>
              </>
            </section>

            <section>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={profDetail?.institutionLogo!}
                  alt={profDetail?.institutionName!}
                  height={40}
                />
                <h1 className="text-sm font-semibold text-primary">
                  {profDetail?.institutionName}
                </h1>
              </div>
            </section>

            <div className="mt-8 flex gap-8">
              <div>
                <h1 className="mb-2 text-sm font-semibold">TOTAL ENROLLED</h1>
                <p className="text-right text-lg font-semibold">
                  {profDetail?.totalEnrolled}
                </p>
              </div>
              <div>
                <h1 className="mb-2 text-sm font-semibold">TOTAL REVIEWS</h1>
                <p className="text-right text-lg font-semibold">
                  {profDetail?.totalReviews}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-grow justify-center">
          <section className="">
            <div className="flex w-full flex-col items-center gap-2">
              <Image
                src={profDetail?.profilePic!}
                width={200}
                height={200}
                alt="Chatbot Profile Image"
                className="rounded-full border-4 border-border"
              />
              <div className="mt-6 flex w-[200px] flex-col gap-2">
                <Link
                  href={profDetail?.website || "#"}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary"
                >
                  <Image src={WebsiteLogo} alt="website-logo" />
                  <p>Website</p>
                </Link>

                <Link
                  href={profDetail?.twitter || "#"}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary"
                >
                  <Image src={TwitterLogo} alt="website-logo" />
                  <p>Twitter</p>
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary"
                >
                  <Image src={FacebookLogo} alt="website-logo" />
                  <p>Facebook</p>
                </Link>
                <Link
                  href={profDetail?.linkedin || "#"}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary"
                >
                  <Image src={LinkedinLogo} alt="website-logo" />
                  <p>Linkedin</p>
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-bold text-primary"
                >
                  <Image src={YoutubeLogo} alt="website-logo" />
                  <p>Youtube</p>
                </Link>
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
            {/* {(() => {
              switch (activeTab) {
                case "KnowledgeKeys":
                  return <KnowledgeAssets />;
                case "Apps":
                  return <Apps />;
                default:
                  return null;
              }
            })()} */}
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
