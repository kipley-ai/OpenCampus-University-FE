import ArtHumanitiesCat from "public/images/course-categories/art-humanities.jpg";
import BusinessCat from "public/images/course-categories/business.jpg";
import ComputerSciCat from "public/images/course-categories/compuster-science.jpg";
import DataSciCat from "public/images/course-categories/data-science.jpg";
import HealtchCat from "public/images/course-categories/health.jpg";
import InformationTechCat from "public/images/course-categories/information-technology.jpg";
import MarketingCat from "public/images/course-categories/marketing.jpg";
import MatLogicCat from "public/images/course-categories/math-logic.jpg";
import PersDevCat from "public/images/course-categories/personal-development.jpg";
import PhysEngCat from "public/images/course-categories/physical-engineering.jpg";
import SocSciCat from "public/images/course-categories/social-science.jpg";

export const GET_CHATBOX_HISTORY = ["chatbox-history"];
export const GET_CHATBOX_SESSION = ["chatbox-session"];
export const GET_NFT_DETAIL = ["nft-detail"];

export const KIP_TOKEN_DECIMAL = 1e18;
export const DEFAULT_COVER_IMAGE =
  "https://knowledgefi-assets-test.kip.pro/cover_image/nft/202402/19/default_cover_4mmsj6msas.jpeg";

export const KF_TITLE =
  process.env.NEXT_PUBLIC_ENV_DEV === "1" ? "OCU Beta - " : "OCU - ";

export enum ONBOARDING_FLOW {
  NORMAL = "1",
  KOL = "2",
}

export const SUBDOMAINS = ["yat-siu", "yat-siu-beta"];

export const CHATBOT_APP = "Study Companion";
export const QUIZ_APP = "Semantic Quiz Generation";
export const BOOK_SUMMARIZER_APP = "Book Summarizer";
export const DIGITAL_TWIN_APP = "Chat With KB";
export const RESEARCH_ASSISTANT_APP = "Research Assistant";
export const TEACHING_ASSISTANT_APP = "Teaching Assistant";
export const VALID_APPS = [
  CHATBOT_APP,
  QUIZ_APP,
  BOOK_SUMMARIZER_APP,
  DIGITAL_TWIN_APP,
  RESEARCH_ASSISTANT_APP,
  TEACHING_ASSISTANT_APP,
];

export const STUDY_COMPANION_PLUGIN_ID = "7096b271-98b3-43a4-9cc8-b1c90a97e046";
export const QUIZ_PLUGIN_ID = "fea23ba8-4352-49a0-8871-a206248971ce";
export const BOOK_SUMMARIZER_PLUGIN_ID = "7c905722-97b1-4b73-9c88-05986a8306a7";
export const DIGITAL_TWIN_PLUGIN_ID = "c49f872e-82c9-4733-8e31-e21f764f75bf";
export const RESEARCH_ASSISTANT_PLUGIN_ID =
  "dc92eef1-4767-4554-8a94-8847a319eb7a";
export const TEACHING_ASSISTANT_PLUGIN_ID =
  "2f912102-2e9f-49f7-ba97-aec9e5da749c";

export const TWITTER_ITEM_TYPE = "twitter_id_external";

export const FIRESIDE_CHAT_ID = "883f98d5-7b3b-4f09-8518-69c954e4cd10";

export const CREATOR_PATHS = ["/knowledge/create", "/nft"];
export const CREATOR_ROLES = ["CREATOR", "SUPERADMIN"];

export const CourseCategories = [
  {
    name: "Business",
    image: BusinessCat,
  },
  {
    name: "Information Technology",
    image: InformationTechCat,
  },
  {
    name: "Data Science",
    image: DataSciCat,
  },
  {
    name: "Social Science",
    image: SocSciCat,
  },
  {
    name: "Arts and Humanities",
    image: ArtHumanitiesCat,
  },
  {
    name: "Math and Logic",
    image: MatLogicCat,
  },
  {
    name: "Personal Development",
    image: PersDevCat,
  },
  {
    name: "Marketing",
    image: MarketingCat,
  },
  {
    name: "Computer Science",
    image: ComputerSciCat,
  },
  {
    name: "Health",
    image: HealtchCat,
  },
  {
    name: "Physical and Engineering",
    image: PhysEngCat,
  },
];

export const courses = [
  {
    id: 1,
    image: "/images/applications-image-01.jpg",
    category: "Business",
    title: "MBA in a Box: Business Lessons from a CEO",
    duration: "30 minutes",
    lessons: 12,
  },
  {
    id: 2,
    image: "/images/applications-image-02.jpg",
    category: "Marketing",
    title: "Instagram Marketing Course: From 0-10K Followers",
    duration: "30 minutes",
    lessons: 12,
  },
  {
    id: 3,
    image: "/images/applications-image-03.jpg",
    category: "Development",
    title: "Learn to Build Mobile Apps from Scratch",
    duration: "30 minutes",
    lessons: 12,
  },
  {
    id: 4,
    image: "/images/applications-image-04.jpg",
    category: "Design",
    title: "User Experience (UX): The Ultimate Guide",
    duration: "30 minutes",
    lessons: 12,
  },
  {
    id: 5,
    image: "/images/applications-image-05.jpg",
    category: "Development",
    title: "100 Days of Code: The Complete Class",
    duration: "30 minutes",
    lessons: 12,
  },
];
