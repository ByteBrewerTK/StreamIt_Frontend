import axios from "axios";
import { getAccessToken, getRefreshToken, removeTokens } from "./authServices";

const baseUrl = import.meta.env.VITE_API_URL;

export const apiRequest = async (url, method = "GET", data = null) => {
	try {
		const accessToken = getAccessToken();

		const headers = {
			Authorization: `Bearer ${accessToken}`,
		};

		const response = await axios({
			url: `${baseUrl}${url}`,
			method,
			headers,
			data,
		});

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const refreshToken = getRefreshToken();

			try {
				if (refreshToken) {
					const data = await axios.post(
						`${baseUrl}/auth/refresh-token`,
						refreshToken
					);

					console.log(data);
				} else {
					removeTokens();
					window.location.href("/auth/login");
				}
			} catch (error) {
				removeTokens();
				window.location.href = "/auth/login";
			}
		} else {
			throw error;
		}
	}
};

export const apiInstance = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

export const toggleLikeApi = async (entityType, entityId) => {
	try {
		const result = await apiInstance.patch(
			`/like/toggle/${entityType}/${entityId}`
		);
		console.log(result);
	} catch (error) {
		console.log("Error while like : ", error);
	}
};