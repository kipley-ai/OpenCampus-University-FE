import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";
import { ICreateQuizParams } from "../interfaces";

export const useCreateQuizAPI = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (params: ICreateQuizParams) =>
      axios.post("/api/quiz/create", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};
