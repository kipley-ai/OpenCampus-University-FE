import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { LeaderboardResponse } from "@/lib/types";

export const useGetLeaderboard = () => {
    const { address } = useAccount();
  
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