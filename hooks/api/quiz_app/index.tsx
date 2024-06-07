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

const address = localStorage.getItem("address");

export const useGenerateQuizAPI = () => {
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
  return useMutation({
    mutationFn: (params: ICreateQuizParams) =>
      axios.post("/api/chatbot/edit", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};
