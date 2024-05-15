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
  tone: string;
  personality: string;
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
}

export interface IUpdateUserParams {
  profile_image: string;
}

export interface IChatbotExplore {
  page: number;
  page_size: number;
  explore_name: string;
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
