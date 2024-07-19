"use client";

import axios from "axios";
import { useAccount } from "wagmi";
import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  IGenerateQuiz,
  IGetLasGeneratedQuiz,
  IGetQuiz,
  ICreateQuizParams,
  PluginResponse,
  Plugin,
} from "../interfaces";

import { useAppProvider } from "@/providers/app-provider";

export const useGenerateQuizAPI = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: IGenerateQuiz) =>
      axios.post("/api/quiz_app/generate", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetLastGeneratedQuiz = (params: IGetLasGeneratedQuiz) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["chatbot", params.chatbot_id],
    queryFn: () =>
      axios.post("/api/quiz_app/get_last_generated", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetQuiz = (params: IGetQuiz) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["session", params.session_id],
    queryFn: () =>
      axios.post("/api/quiz_app/get_quiz", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useCreateQuizAPI = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: ICreateQuizParams) =>
      axios.post("/api/chatbot/create", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetPlugin = () => {
  const { session: { address } } = useAppProvider();
  
  return useQuery<Plugin[]>({
    queryKey: ["quiz", "plugin"],
    queryFn: () =>
      axios
        .post<PluginResponse>(
          "/api/plugin/list",
          {},
          {
            headers: {
              "x-kf-user-id": address,
            },
          },
        )
        .then((res) => res.data.data.plugin_data),
  });
};

export const useUpdateQuizAPI = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: ICreateQuizParams) =>
      axios.post("/api/chatbot/edit", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useAnswerQuiz = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: any) =>
      axios.post("/api/quiz_app/answer", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetSharedQuizId = (params: any) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["shared_chat", params.chatbot_id],
    queryFn: () =>
      axios.post("/api/quiz_app/get_id_share", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useShareQuiz = (params: any) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["quiz-share", params.share_id],
    queryFn: () =>
      axios.post("/api/quiz_app/share", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useUpdateSharedQuiz = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: any) =>
      axios.post("/api/quiz_app/update_share", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetSuggestedTopics = (params: any, enabled: boolean) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["quiz", params.chatbot_id, "suggested_topics"],
    queryFn: () =>
      axios.post("/api/quiz_app/get_suggested_topics", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled,
    refetchInterval: 2000,
  });
};
