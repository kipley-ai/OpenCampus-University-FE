"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const address = localStorage.getItem("address");

export const useSuperAdmin = () => {
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
