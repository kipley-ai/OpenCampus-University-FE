"use client";

import { GET_CHATBOX_SESSION, GET_CHATBOX_HISTORY } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IChatBoxParams, IChatBoxHistoryParams } from "../interfaces";
import useWebSocket from "react-use-websocket";
// import { useAuthorizer } from "@authorizerdev/authorizer-react";
import { useAccount } from "wagmi";
import { chatPayloadSchema, ChatPayload, ChatRoomPayload, LastMessagePayload, LastChatRoomMessagePayload } from "./schema";
import axios from "axios";

import { useAppProvider } from "@/providers/app-provider";

export const useChatSession = (params: IChatBoxParams) => {
	const { session: { address } } = useAppProvider();

	return useQuery(
		{
			queryKey: [
				...GET_CHATBOX_SESSION,
				address,
				params.user_id,
				params.app_id,
			],
			queryFn: () =>
				axios.post("/api/chatbox/chat_session", params, {
					headers: {
						"x-kf-user-id": address,
					},
				}),
		}
		// {
		//   enabled: !!params.request_url,
		// }
	);
};

export const useChatboxWS = (socketUrl: string) => {
	const { sendMessage, lastJsonMessage, readyState } =
		useWebSocket<LastMessagePayload>(socketUrl);

	const sendValidatedMessage = (message: ChatPayload) => {
		try {
			// chatPayloadSchema.parse(message);

			sendMessage(JSON.stringify(message));
		} catch (error) {
			console.error("Validation failed", error);
		}
	};

	return { sendValidatedMessage, lastJsonMessage, readyState };
};

export const useChatroomWS = (socketUrl: string) => {
	const { sendMessage, lastJsonMessage, readyState } =
		useWebSocket<LastChatRoomMessagePayload>(socketUrl);

	const sendValidatedMessage = (message: ChatRoomPayload) => {
		try {
			// chatPayloadSchema.parse(message);

			sendMessage(JSON.stringify(message));
		} catch (error) {
			console.error("Validation failed", error);
		}
	};

	return { sendValidatedMessage, lastJsonMessage, readyState };
};

export const useChatHistory = (params: IChatBoxParams) => {
	const { session: { address } } = useAppProvider();

	return useQuery({
		queryKey: [...GET_CHATBOX_HISTORY, params.session_id],
		queryFn: () =>
			axios.post("/api/chatbox/chat_history", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};

export const useDeleteChatHistory = () => {
	const { session: { address } } = useAppProvider();

	return useMutation({
		mutationFn: (params: IChatBoxHistoryParams) =>
			axios.post("/api/chatbox/delete_chat_history", params, {
				headers: {
					"x-kf-user-id": address,
				},
			}),
	});
};
