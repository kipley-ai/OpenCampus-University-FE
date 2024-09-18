"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ICreditDeductionParams } from "../interfaces";

import { useAppProvider } from "@/providers/app-provider";

export const useCreditDeduction = () => {
  const { session } = useAppProvider();
  const { address } = session;

  return useMutation({
    mutationFn: (params: ICreditDeductionParams) =>
      axios.post("/api/credit/use-app", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useCreditBalance = () => {
  const { session } = useAppProvider();
  const { address } = session;

  return useQuery({
    queryKey: ["credit-balance"],
    queryFn: () =>
      axios.post(
        "/api/credit/balance",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};
