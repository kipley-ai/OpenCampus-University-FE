"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ICreditDeductionParams } from "../interfaces";

const address = localStorage.getItem("address");

export const useCreditDeduction = () => {
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
  return useQuery({
    queryKey: [],
    queryFn: () =>
      axios.post(
        "/api/credit/balance",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        }
      ),
  });
};
