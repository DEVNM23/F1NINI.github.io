import { useEffect, useState } from "react";

import type { MessageInitial, MessageUpdate } from "@/types/message.type";

import { env } from "@/env";

type Props = {
	handleInitial: (data: MessageInitial) => void;
	handleUpdate: (data: MessageUpdate) => void;
};

export const useSocket = ({ handleInitial, handleUpdate }: Props) => {
	const [connected, setConnected] = useState<boolean>(false);

	useEffect(() => {
		// Use the API URL endpoint for SSE
		const apiUrl = env.NEXT_PUBLIC_LIVE_URL || "https://api.f1-dash.com";
		const sseUrl = `${apiUrl}/api/sse`;

		console.log("🔌 Connecting to SSE endpoint:", sseUrl);

		try {
			const sse = new EventSource(sseUrl, { withCredentials: false });

			sse.onerror = (error) => {
				console.error("❌ SSE connection error:", error);
				setConnected(false);
			};

			sse.onopen = () => {
				console.log("✅ SSE connected successfully");
				setConnected(true);
			};

			sse.addEventListener("initial", (message) => {
				try {
					handleInitial(JSON.parse(message.data));
				} catch (e) {
					console.error("Error parsing initial message:", e);
				}
			});

			sse.addEventListener("update", (message) => {
				try {
					handleUpdate(JSON.parse(message.data));
				} catch (e) {
					console.error("Error parsing update message:", e);
				}
			});

			return () => {
				console.log("🔌 Closing SSE connection");
				sse.close();
			};
		} catch (error) {
			console.error("Failed to create EventSource:", error);
			setConnected(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { connected };
};
