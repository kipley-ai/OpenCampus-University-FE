export const GET_CHATBOX_HISTORY = ["chatbox-history"];
export const GET_CHATBOX_SESSION = ["chatbox-session"];
export const GET_NFT_DETAIL = ["nft-detail"];

export const KIP_TOKEN_DECIMAL = 1e18;
export const DEFAULT_COVER_IMAGE =
  "https://knowledgefi-assets-test.kip.pro/cover_image/nft/202402/19/default_cover_4mmsj6msas.jpeg";

export const KF_TITLE =
  process.env.NEXT_PUBLIC_ENV_DEV === "1"
    ? "OC University Beta - "
    : "Open Campus University - ";

export enum ONBOARDING_FLOW {
  NORMAL = "1",
  KOL = "2",
}

export const SUBDOMAINS = ["yat-siu", "yat-siu-beta"];

export const CHATBOT_APP = "Chat With KB";
export const QUIZ_APP = "Semantic Quiz Generation";
export const VALID_APPS = [CHATBOT_APP, QUIZ_APP];

export const CHATBOT_PLUGIN_ID = "c49f872e-82c9-4733-8e31-e21f764f75bf";
export const QUIZAPP_PLUGIN_ID = "fea23ba8-4352-49a0-8871-a206248971ce";

export const TWITTER_ITEM_TYPE = "twitter_id_external";

export const FIRESIDE_CHAT_ID = "883f98d5-7b3b-4f09-8518-69c954e4cd10";

export const CREATOR_PATHS = ["/knowledge/create", "/nft"];
export const CREATOR_ROLES = ["CREATOR", "SUPERADMIN"];
