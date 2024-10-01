export interface IChatBoxParams {
  page_num: number;
  page_size: number;
  user_id?: string | undefined;
  app_id: string;
  session_id?: string | undefined | null;
  request_url?: string;
}

export interface IChatBoxHistoryParams {
  user_id?: string;
  app_id: string;
  session_id?: string | undefined | null;
  request_url?: string;
}

export interface ICreateChatbotParams {
  profile_image: string;
  name: string;
  tone?: string;
  personality?: string;
  sft_id: string;
  kb_id: string;
  price_per_query: number;
  category_id: string | undefined;
  description: string;
  // instruction: string;
  // example_conversation: string;
  plugin_id: string | undefined;
}

export interface ICreateKBAndNFTParams {
  type: string;
  kb_data?: any[];
  username?: string;
  name: string;
  description: string;
  contract_address: string;
  wallet_address: string;
  supply: string;
  category: string;
  token_symbol: string;
  price_per_query: number;
  query_royalties: number;
  token_amount: number;
  url: string;
  profile_image: string;
  youtube_url: string | undefined | null;
  medium_url: string | undefined | null;
}

// Used by hooks/api/nft/index.ts
export interface INFTDetailParams {
  sft_id: string;
}

export interface IChatbotDetailParams {
  chatbot_id: string;
}

export interface IUpdateChatbotParams {
  chatbot_id: string;
  name: string;
  description: string;
  profile_image: string;
  tone: string;
  personality: string;
  price_per_query: number;
  category_id: string;
}

export interface IPaginate {
  page?: number;
  page_size?: number;
  sort_by?: string;
}

export interface IKBItem extends IPaginate {
  kb_id: string;
}

export interface IKBDetail {
  kb_id: string;
}

export interface IKBDetail {
  kb_id: string;
}

export interface ICreditDeductionParams {
  answer: string;
  chatbot_id: string;
  question: string;
  session_id: string;
}

// Used by hooks/api/chatbot/index.tsx
export interface IChatbotList {
  page: number;
  page_size: number;
  sort_by: string;
  sft_id?: string | undefined | null;
  explore_name?: string | undefined | null;
}

// Used by hooks/api/nft/index.ts
export interface INftList {
  page: number;
  page_size: number;
  sort_by: string;
  chatbot_id?: string | undefined | null;
  sft_id?: string | undefined | null;
}

export interface IUpdateUserParams {
  profile_image?: string | undefined | null;
  username?: string;
  twitter_link?: string;
}

export interface IChatbotExplore {
  page: number;
  page_size: number;
  explore_id: string;
  category_id?: string | undefined | null;
}

export interface IChatroomParams {
  room_id: string;
}

export interface IChatroomHistoryParams {
  user_id?: string;
  session_id?: string | undefined | null;
  page_num: number;
  page_size: number;
}

export interface ICreateQuizParams {
  name: string;
  kb_id: string;
  profile_image: string;
  sft_id: string;
  price_per_query: number;
  meta_data: string | undefined;
  description: string;
  plugin_id: string | undefined;
}

export interface IGenerateQuiz {
  chatbot_id: string;
  topic: string;
}

export interface IGetLasGeneratedQuiz {
  chatbot_id: string;
}

export interface IGetQuiz {
  chatbot_id: string;
  session_id: string;
}

export interface PluginConfig {
  require: string;
  param_name: string;
  type: string;
  default_value: string | string[];
  values?: string[];
  name: string;
  description: string;
}

export interface PluginMetaData {
  plugin_id: string;
  plugin_name: string;
  plugin_type: string;
  plugin_template: string;
  suggest_question: string[];
  plugin_config: PluginConfig[];
}

export interface Plugin {
  plugin_id: string;
  title: string;
  meta_data: PluginMetaData;
  created: string;
  description: string;
  is_deleted: number;
}

export interface PluginResponse {
  data: {
    plugin_data: Plugin[];
    plugin_count: number;
  };
}

export interface IKBAddItem {
  kb_id: string;
  kb_data: any | null;
  type: string;
  username: string | null;
  medium_url: string | null;
  youtube_url: string | null;
}

export interface IKBDeleteItem {
  filename: string;
  type: string;
}

export interface IClaimSignatureRequest {
  kb_id?: string;
  chatbot_id?: string;
  claimed_id: number;
  income_amount: number;
  type: "chatbot" | "kb";
}

export interface IUpdateCourseParams {
  uuid: string;
  title: string;
  created_by: string;
  level: string;
  published: number;
  create: number;
  user_id: string;
  subtitle: string;
  outline: string;
  language: string;
  description: string;
  taught: string;
  course_for: string[];
  course_instructors: string[];
  course_goals: any[]; // Need to be checked to be more specific
  duration: number;
  course_reqs: any[]; // Need to be checked to be more specific
  category_id: number;
  subcategory_id: number;
  cover_image: string;
  cover_video: string;
  price: string;
  data_status: number;
}

export interface IFetchCourseParams {
  uuid: string;
}

export interface ICourseIndexParams {
  uuid: string;
  created_by: string;
  data_status: number;
  published: number;
  user_id: string;
}

export interface IUpdateSectionParams {
  uuid: string;
  course_uuid: string;
  duration: number;
  create: number;
  created_by: string;
  title: string;
  goals: string[];
  published: number;
  sort: number;
  data_status: number;
  description: string;
}

export interface IFetchSectionParams {
  uuid: string;
}

export interface ISectionIndexParams {
  created_by: string;
  data_status: number;
  published: number;
  course_uuid: string;
}

export interface IUpdateLessonsParams {
  uuid: string;
  course_uuid: string;
  duration: number;
  section_uuid: string;
  create: number;
  created_by: string;
  title: string;
  goals: string[];
  published: number;
  sort: number;
  description: string;
  type: string;
  type_data: string[];
  data_status: number;
  resources: string[];
}

export interface IFetchLessonsParams {
  uuid: string;
}

export interface ILessonsIndexParams {
  created_by: string;
  data_status: number;
  published: number;
  course_uuid: string;
  section_uuid: string;
}

export interface IUpdateFilesParams {
  uuid: string;
  user_id: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_extension: string;
  file_path: string;
  s3_url: string;
  s3_service: string;
  data_status: number;
  create: number;
  created_by: string;
  type: string;
}

export interface IFetchFilesParams {
  uuid: string;
}

export interface IFilesIndexParams {
  created_by: string;
  data_status: number;
  user_id: string;
  file_url: string;
}
