"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { LeaderboardResponse } from "@/lib/types";

const address = localStorage.getItem("address");

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      axios.post<LeaderboardResponse>(
        "/api/leaderboard",
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
