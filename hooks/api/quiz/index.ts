import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";
import { ICreateQuizParams } from "../interfaces";

export const useCreateQuizAPI = () => {
  const { address } = useAccount();

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
  const { address } = useAccount();

  return useQuery({
    queryKey: ["quiz", "plugin"],
    queryFn: () =>
      axios.post(
        "/api/plugin/list",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
}