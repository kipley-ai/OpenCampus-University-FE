"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { IClaimSignatureRequest, IUpdateUserParams } from "../interfaces";
import axios from "axios";
import { IPaginate } from "../interfaces";
import { EarningReportResponse, UserDetailResponse } from "@/lib/types";

import { useAppProvider } from "@/providers/app-provider";

export const useProfpic = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["user", "profpic", address],
    queryFn: () =>
      axios.post<UserDetailResponse>(
        "/api/user/detail",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    select: (data) => data.data.data.profile_image,
  });
};

export const useUpdateProfpic = () => {
  const queryClient = useQueryClient();

  const {
    session: { address },
  } = useAppProvider();

  return useMutation({
    mutationFn: (profilePicture: string) =>
      axios.post(
        "/api/user/update",
        { profile_image: profilePicture },
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profpic"] });
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (params: any) => axios.post("/api/user/create", params),
  });
};

export const useDepositHistory = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["deposit", params.page],
    queryFn: () =>
      axios.post("/api/user/deposit", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useWithdrawHistory = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["withdraw", params.page],
    queryFn: () =>
      axios.post("/api/user/withdraw", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useUpdateUserAPI = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useMutation({
    mutationFn: (params: IUpdateUserParams) =>
      axios.post("/api/user/update", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useEarningReport = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["earning", params.page],
    queryFn: () =>
      axios.post<EarningReportResponse>("/api/user/earning", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    select: (data) => data.data.data,
  });
};

export const useCreditUsage = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["credit", params.page],
    queryFn: () =>
      axios.post("/api/user/credit", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useUserDetail = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["user-detail"],
    queryFn: () =>
      axios.post(
        "/api/user/detail",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    enabled: !!address,
  });
};

export const useCreatorOverview = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["creator-overview"],
    queryFn: () =>
      axios.post(
        "/api/user/creator_overview",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useIsWhitelisted = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["is-whitelisted"],
    queryFn: () =>
      axios.post(
        "/api/onboarding/is-whitelisted",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useAddRecharge = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useMutation({
    mutationFn: (params: { tx_id: string }) =>
      axios.post("/api/user/add-recharge", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useRechargeStatus = (params: any) => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["recharge-status"],
    queryFn: () =>
      axios.post(
        "/api/user/recharge-status",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    refetchInterval: 3000,
    enabled: params.willRefetch,
  });
};

export const useTotalReferral = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useQuery({
    queryKey: ["user", "total", "referral"],
    queryFn: () =>
      axios.post<{
        referral_count: number;
      }>(
        "/api/user/total_ref",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    select: (data) => data.data,
  });
};

export const useGetClaimIncomeSignature = () => {
  const {
    session: { address },
  } = useAppProvider();

  return useMutation({
    mutationFn: (params: IClaimSignatureRequest) =>
      axios.post("/api/user/claim-income", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};
