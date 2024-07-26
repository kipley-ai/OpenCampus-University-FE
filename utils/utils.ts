import axios from "axios";
import { ChatbotData } from "@/lib/types";
import {
  STUDY_COMPANION_PLUGIN_ID,
  QUIZ_PLUGIN_ID,
  BOOK_SUMMARIZER_PLUGIN_ID,
  DIGITAL_TWIN_PLUGIN_ID,
  RESEARCH_ASSISTANT_PLUGIN_ID,
  TEACHING_ASSISTANT_PLUGIN_ID,
} from "./constants";

export function hashUUIDToInteger(uuid: string) {
  let s = uuid.replaceAll("-", "");
  return BigInt(parseInt(s, 16));
}

export function hashUUIDToIntegerV2(uuid: string) {
  let s = uuid.replaceAll("-", "");
  let s1 = "";
  for (let i = 0; i < s.length; i++) {
    s1 += s[i].charCodeAt(0);
  }
  return parseInt(s1.substring(0, 8) + s1.substring(s1.length - 8));
}

export function generateRandomDigitInteger() {
  const min = Math.pow(10, 15);
  const max = Math.pow(10, 16) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const uploadFile = async (file: any, callback: any) => {
  try {
    const newFile = new FormData();
    newFile.append("input-file-upload", file);
    newFile.append("file-dir", "cover_image/nft");

    const response = await axios.post("/api/upload/s3/asset", newFile);

    if (response.status === 200) {
      const data = response.data;
      callback(data.link);
      return data;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const noMoreThanCharacters = (number: number) =>
  "no more than " + number + " characters";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const chatbotSlug = (chatbot: any) => {
  return `${chatbot.name
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "")}-${chatbot.chatbot_id}`;
};

export const chatbotIdFromSlug = (slug: string) => {
  return slug.slice(-36);
};

export const handleAppUrl = (bot: ChatbotData) => {
  switch (bot.plugin_id) {
    case DIGITAL_TWIN_PLUGIN_ID:
      return `/chatbot/` + chatbotSlug(bot);
    case QUIZ_PLUGIN_ID:
      return `/quiz-app/` + bot.chatbot_id;
    case STUDY_COMPANION_PLUGIN_ID:
      return `/study-companion/` + bot.chatbot_id;
    case BOOK_SUMMARIZER_PLUGIN_ID:
      return `/book-summarizer/` + bot.chatbot_id;
    case RESEARCH_ASSISTANT_PLUGIN_ID:
      return `/research-assistant/` + bot.chatbot_id;
    case TEACHING_ASSISTANT_PLUGIN_ID:
      return `/teaching-assistant/` + bot.chatbot_id;
    default:
      return `/chatbot/` + chatbotSlug(bot);
  }
};

export const handleAppUrlWithoutSlug = (bot: ChatbotData) => {
  switch (bot.plugin_id) {
    case DIGITAL_TWIN_PLUGIN_ID:
      return `/chatbot/` + bot.chatbot_id;
    case QUIZ_PLUGIN_ID:
      return `/quiz-app/` + bot.chatbot_id;
    case STUDY_COMPANION_PLUGIN_ID:
      return `/study-companion/` + bot.chatbot_id;
    case BOOK_SUMMARIZER_PLUGIN_ID:
      return `/book-summarizer/` + bot.chatbot_id;
    case RESEARCH_ASSISTANT_PLUGIN_ID:
      return `/research-assistant/` + bot.chatbot_id;
    case TEACHING_ASSISTANT_PLUGIN_ID:
      return `/teaching-assistant/` + bot.chatbot_id;
    default:
      return `/chatbot/` + bot.chatbot_id;
  }
};

export const parseJWT = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export const isTokenExpired = (token: string) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = parseJWT(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const compareStringsIgnoreCase = (a?: string, b?: string) => {
  return a?.toLowerCase() === b?.toLowerCase();
};
