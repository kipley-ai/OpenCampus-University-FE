"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSuperAdmin = (address?: string) => {
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
    enabled: !!address,
  });
};
