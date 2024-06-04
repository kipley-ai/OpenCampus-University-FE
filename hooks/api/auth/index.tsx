import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { IUpdateUserParams } from "../interfaces";
import axios from "axios";
import { IPaginate } from "../interfaces";
import { EarningReportResponse, UserDetailResponse } from "@/lib/types";

export const useGetToken = (code: string | null) => {
  return useQuery({
    queryKey: ["user", "token", "get"],
    queryFn: () => axios.post<any>("/api/auth/token/get", { code }),
  });
};

export const useSendUserInfo = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (user: any) =>
      axios.post(
        "/api/auth/send-info",
        { user },
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useCheckToken = (token: string | null) => {
  return useQuery({
    queryKey: ["user", "token", "check"],
    queryFn: () => axios.post("/api/auth/token/check", { token }),
  });
};
