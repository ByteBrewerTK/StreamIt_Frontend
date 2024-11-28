import axios from "axios";
import {
	getAccessToken,
	getRefreshToken,
	removeTokens,
	removeUserData,
	saveTokens,
} from "./authServices";

const baseUrl = import.meta.env.VITE_API_URL;

export const apiRequest = async (url, method = "GET", data = {}, signal) => {
	const redirect_url =
		location.pathname === "/"
			? "/"
			: `/auth/login?redirect_url=${location.href}`;
	try {
		const accessToken = getAccessToken();

		let headers = {
			Authorization: `Bearer ${accessToken}`,
		};

		if (data instanceof FormData) {
			headers["Content-Type"] = "multipart/form-data";
		} else {
			headers["Content-Type"] = "application/json";
		}

		const response = await axios({
			url: `${baseUrl}${url}`,
			method,
			headers,
			data,
			signal, // Pass signal for cancellation
		});

		return response.data;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log("Request canceled:", error.message);
			return; // Exit gracefully on cancel
		}

		// Handle unauthorized errors and refresh token flow
		if (error.response?.status === 401) {
			const refreshToken = getRefreshToken();
			if (refreshToken) {
				try {
					const { data } = await axios.post(
						`${baseUrl}/user/refresh-token`,
						{ refreshToken }
					);

					const tokens = data.data;
					saveTokens(tokens.accessToken, tokens.refreshToken);

					return apiRequest(url, method, data, signal); // Retry request with updated token
				} catch (err) {
					removeTokens();
					removeUserData();
					location.href = redirect_url;
				}
			} else {
				removeTokens();
				removeUserData();
				location.href = redirect_url;
			}
		}

		// Log other errors
		console.error("API error:", error);
		throw error;
	}
};

export const apiInstance = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

export const toggleLikeApi = async (entityType, entityId) => {
	try {
		const result = await apiRequest(
			`/like/toggle/${entityType}/${entityId}`,
			"PATCH"
		);

		return result;
	} catch (error) {
		console.log("Error while like : ", error);
	}
};

export const toggleSubscription = async (
	isSubscribing,
	setSubscribing,
	ownerDetails
) => {
	if (isSubscribing) return;

	try {
		setSubscribing(true);
		const response = await apiRequest(
			`/subscriptions/channel/${ownerDetails?._id}`,
			"PATCH"
		);
		if (response.statusCode === 200) {
			const { subscribersCount, isSubscribed } = ownerDetails;

			ownerDetails.isSubscribed = !isSubscribed;
			ownerDetails.subscribersCount = !isSubscribed
				? subscribersCount + 1
				: subscribersCount - 1;
		}
		return ownerDetails;
	} catch (error) {
		console.log("Error while subscribing : ", error);
	} finally {
		setSubscribing(false);
	}
};
