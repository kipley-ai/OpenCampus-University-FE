"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TaskListResponse } from "@/lib/types";
import { useAccount } from "wagmi";

const address = localStorage.getItem("address");

export const useTaskList = (
  params: {
    page: number;
    page_size: number;
    sort_by: string;
  },
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  return useQuery({
    queryKey: ["task", "list", params.page, params.page_size, params.sort_by],
    queryFn: () =>
      axios.post<TaskListResponse>("/api/task/list", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    placeholderData: keepPreviousData,
    select: (data) => data.data.data,
  });
};

export const useTakeTask = () => {
  return useMutation({
    mutationFn: (params: { task_id: string }) =>
      axios.post("/api/task/take", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useCompleteTask = () => {
  return useMutation({
    mutationFn: (params: { taken_id: string | null }) =>
      axios.post("/api/task/complete", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useTaskBasePoint = () => {
  return useQuery({
    queryKey: ["task-base-point"],
    queryFn: () =>
      axios.post(
        "/api/task/base-point",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};
