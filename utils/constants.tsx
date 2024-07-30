export const GET_CHATBOX_HISTORY = ["chatbox-history"];
export const GET_CHATBOX_SESSION = ["chatbox-session"];
export const GET_NFT_DETAIL = ["nft-detail"];

export const KIP_TOKEN_DECIMAL = 1e18;
export const DEFAULT_COVER_IMAGE =
  "https://knowledgefi-assets-test.kip.pro/cover_image/nft/202402/19/default_cover_4mmsj6msas.jpeg";

export const KF_TITLE =
  process.env.NEXT_PUBLIC_ENV_DEV === "1"
    ? "OCU Beta - "
    : "OCU - ";

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
export const VALID_APPS = [CHATBOT_APP, QUIZ_APP, BOOK_SUMMARIZER_APP, DIGITAL_TWIN_APP, RESEARCH_ASSISTANT_APP, TEACHING_ASSISTANT_APP];

export const STUDY_COMPANION_PLUGIN_ID = "7096b271-98b3-43a4-9cc8-b1c90a97e046";
export const QUIZ_PLUGIN_ID = "fea23ba8-4352-49a0-8871-a206248971ce";
export const BOOK_SUMMARIZER_PLUGIN_ID = "7c905722-97b1-4b73-9c88-05986a8306a7";
export const DIGITAL_TWIN_PLUGIN_ID = "c49f872e-82c9-4733-8e31-e21f764f75bf";
export const RESEARCH_ASSISTANT_PLUGIN_ID = "dc92eef1-4767-4554-8a94-8847a319eb7a";
export const TEACHING_ASSISTANT_PLUGIN_ID = "2f912102-2e9f-49f7-ba97-aec9e5da749c";

export const TWITTER_ITEM_TYPE = "twitter_id_external";

export const FIRESIDE_CHAT_ID = "883f98d5-7b3b-4f09-8518-69c954e4cd10";

export const CREATOR_PATHS = ["/knowledge/create", "/nft"];
export const CREATOR_ROLES = ["CREATOR", "SUPERADMIN"];
