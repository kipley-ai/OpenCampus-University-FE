"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";
import { ICreateKBAndNFTParams, IKBDetail, IKBItem } from "../interfaces";
import { KBItemResponse } from "@/lib/types";

const address = localStorage.getItem("address");

export const useDefaultValue = (params: {key:string}) => {
	return useQuery({
		queryKey: ["default-value", params.key],
		queryFn: () =>
			axios.post("/api/default_value", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};