import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import {
  ICreateKBAndNFTParams,
  IKBAddItem,
  IKBDetail,
  IKBItem,
  IKBDeleteItem,
} from "../interfaces";
import { KBItemResponse } from "@/lib/types";
import { useSession } from "next-auth/react";

import { useAppProvider } from "@/providers/app-provider";

export const useSummarize = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useMutation({
    mutationFn: (params: any) =>
      axios.post("/api/book-summarizer/summarize", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useGetSummary = (params: any) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: [
      "book-summarizer",
      "summary",
      params.chatbot_id,
      params.dialog_id,
    ],
    queryFn: () =>
      axios.post("/api/book-summarizer/get-summary", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    refetchInterval: 5000,
  });
};
