import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetToken = (code: string | null) => {
  return useQuery({
    queryKey: ["user", "token", "get"],
    queryFn: () => axios.post<any>("/api/auth/token/get", { code }),
  });
};

export const useCheckToken = (token: string | null) => {
  return useQuery({
    queryKey: ["user", "token", "check"],
    queryFn: () => axios.post("/api/auth/token/check", { token }),
  });
};
