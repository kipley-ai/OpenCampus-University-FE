"use client";

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

export const useCreateKBAndMintNFT = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: ICreateKBAndNFTParams) =>
      axios.post("/api/kb/create", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useMintNFT = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: { kb_id: string }) =>
      axios.post("/api/kb/mint_nft", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useMintNFTStatus = (kbId: string, isNftMinted: boolean) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["mint-nft-status", kbId],
    queryFn: () =>
      axios.post(
        "/api/kb/mint-nft-status",
        { kb_id: kbId },
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    enabled: !isNftMinted,
    refetchInterval: 3000,
  });
};

export const useUpdateKB = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: IKBAddItem) =>
      axios.post("/api/kb/update_kb", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useDeleteKBItem = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: { kb_id: string; items_name: IKBDeleteItem[] }) =>
      axios.post("/api/kb/delete-item", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useKBItem = (
  params: IKBItem,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["kb-item", params.page],
    queryFn: () =>
      axios.post<KBItemResponse>("/api/kb/item", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    placeholderData: placeholderData,
  });
};

export const useKBDetail = (params: IKBDetail) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["kb-detail", params.kb_id],
    queryFn: () =>
      axios.post("/api/kb/detail", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled: !!params.kb_id,
  });
};

export const useScrapeTwitter = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: { username: string }) =>
      axios.post("/api/kb/scrape_twitter", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useScrapeTwitterStatus = (params: { username: string }) => {
  const { session: { address } } = useAppProvider();
  
  return useQuery({
    queryKey: ["scrape-twitter-status", params.username],
    queryFn: () =>
      axios.post<{
        status: "in progress" | "failed" | "success" | "processing";
        msg: string;
        data: any;
      }>("/api/kb/scrape_twitter_status", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled: !!params.username,
    select: (data) => data.data,
  });
};

export const useCheckLink = () => {
  const { session: { address } } = useAppProvider();
  
  return useMutation({
    mutationFn: (params: { type: string, url: string }) =>
      axios.post("/api/kb/check-link", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
}