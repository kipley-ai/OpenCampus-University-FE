"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useAppProvider } from "@/providers/app-provider";

export const useSuperAdmin = () => {
  const { session } = useAppProvider();
  const { address } = session;

  return useQuery({
    queryKey: ["access"],
    queryFn: () =>
      axios.post(
        "/api/access",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};
