"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { INFTDetailParams, INftList } from "../interfaces";
import { NftData, NftDataListResponse, NftDetailResponse } from "@/lib/types";

import { useAppProvider } from "@/providers/app-provider";

export const useNFTList = (
  params: INftList,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const appId = process.env.APP_ID;

  return useQuery({
    queryKey: ["nfts", params.page],
    queryFn: () => axios.post<NftDataListResponse>("/api/nft/list", params),
    placeholderData: placeholderData,
  });
};

export const useNftDetail = (params: INFTDetailParams) => {
  const { session: { address } } = useAppProvider();

  return useQuery({
    queryKey: ["nft", address, params.sft_id],
    queryFn: () =>
      axios.post<NftDetailResponse>("/api/nft/detail", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    enabled: !!params.sft_id,
  });
};

export const useMyNFTs = (
  params: INftList,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { session: { address } } = useAppProvider();

  return useQuery({
    queryKey: ["my-nfts", params.page],
    queryFn: () =>
      axios.post<NftDataListResponse>("/api/nft/my_nft", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    placeholderData: placeholderData,
  });
};
