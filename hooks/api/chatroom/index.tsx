"use client";

import { IChatroomParams, IChatroomHistoryParams } from "../interfaces";
import { useAccount } from "wagmi";
import { useMutation, useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { GET_CHATBOX_SESSION, GET_CHATBOX_HISTORY } from "@/utils/constants";
import { ChatbotDataListResponse, ChatbotDetailResponse } from "@/lib/types";

import { useAppProvider } from "@/providers/app-provider";

export const useChatRoomChatbotId = (params: IChatroomParams) => {
  const { session: { address } } = useAppProvider();

  return useQuery({
    queryKey: ["get-chatroom-chatbot", params.room_id],
    queryFn: () =>
      axios.post("/api/chatroom/chatbot", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useChatRoomChatHistory = (params: IChatroomHistoryParams) => {
  const { session: { address } } = useAppProvider();

  return useQuery({
    queryKey: ["get-chatroom-history", params.session_id],
    queryFn: () =>
      axios.post("/api/chatroom/chat_history", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useChatRoomChatSession = (params: IChatroomParams) => {
  const { session: { address } } = useAppProvider();

  return useQuery({
    queryKey: ["get-chatroom-session", params.room_id],
    queryFn: () =>
      axios.post("/api/chatroom/get_session", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useChatbotDetailQueries = (params: string[]) => {
  const { session: { address } } = useAppProvider();

  return useQueries({
    queries: params.map((chatbot_id) => {
      return {
        queryKey: ["chatbot", chatbot_id],
        queryFn: () =>
          axios.post<ChatbotDetailResponse>(
            "/api/chatbot/detail",
            { chatbot_id: chatbot_id },
            {
              headers: {
                "x-kf-user-id": address,
              },
            },
          ),
        enabled: !!chatbot_id,
      };
    }),
  });
};

export const useGetChatRoomDetail = (params: IChatroomParams) => {
  const { session: { address } } = useAppProvider();

  return useQuery({
    queryKey: ["get-chatroom-detail", params.room_id],
    queryFn: () =>
      axios.post("/api/chatroom/detail", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetSharedChatRoom = (params: any) => {
  const { session } = useAppProvider();
  const { address } = session;

  return useQuery({
    queryKey: ["chatbot", "share_chat", params.room_id],
    queryFn: () =>
      axios.post("/api/chatroom/share_chat", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    refetchOnWindowFocus: false,
  });
};
