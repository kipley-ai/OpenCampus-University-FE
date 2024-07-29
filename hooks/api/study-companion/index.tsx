"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { IChatBoxParams, IChatBoxHistoryParams } from "../interfaces";
import useWebSocket from "react-use-websocket";
// import { useAuthorizer } from "@authorizerdev/authorizer-react";
import { useAccount } from "wagmi";
import {
  chatPayloadSchema,
  ChatPayload,
  ChatRoomPayload,
  LastMessagePayload,
  LastChatRoomMessagePayload,
} from "./schema";
import axios from "axios";

import { useAppProvider } from "@/providers/app-provider";

export const useChatboxWS = (socketUrl: string) => {
  const { sendMessage, lastJsonMessage, readyState } =
    useWebSocket<LastMessagePayload>(socketUrl);

  const sendValidatedMessage = (message: ChatPayload) => {
    try {
      sendMessage(JSON.stringify(message));
    } catch (error) {
      console.error("Validation failed", error);
    }
  };

  return { sendValidatedMessage, lastJsonMessage, readyState };
};

export const useChatHistory = (params: any) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: [
      "study-companion",
      "chat-history",
      params.chatbot_id,
      params.dialog_id,
    ],
    queryFn: () =>
      axios.post("/api/study-companion/chat-history", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled: !!params.chatbot_id && !!params.dialog_id,
  });
};

export const useDeleteChatHistory = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useMutation({
    mutationFn: (params: IChatBoxHistoryParams) =>
      axios.post("/api/chatbox/delete_chat_history", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetInitialSuggestedQuestions = (
  params: any,
  isFetching: boolean,
) => {
  const { session } = useAppProvider();
  const { address } = session;

  return useQuery({
    queryKey: ["chatbot", params.chatbot_id, "initial_suggestion"],
    queryFn: () =>
      axios.post("/api/chatbot/get_initial_suggested_questions", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled: isFetching,
    refetchInterval: 2000,
  });
};
