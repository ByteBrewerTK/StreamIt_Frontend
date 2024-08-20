import axios from "axios";
import {
	getAccessToken,
	getRefreshToken,
	removeTokens,
	removeUserData,
	saveTokens,
} from "./authServices";

const baseUrl = import.meta.env.VITE_API_URL;

export const apiRequest = async (
	url,
	method = "GET",
	data = null,
	source = {}
) => {
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
			cancelToken: source.token,
		});

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const refreshToken = getRefreshToken();

			try {
				if (refreshToken) {
					const { data } = await axios.post(
						`${baseUrl}/user/refresh-token`,
						{ refreshToken: refreshToken }
					);

					const tokens = data.data;
					saveTokens(tokens.accessToken, tokens.refreshToken);

					const updatedAccessToken = getAccessToken();

					const headers = {
						Authorization: `Bearer ${updatedAccessToken}`,
					};

					const response = await axios({
						url: `${baseUrl}${url}`,
						method,
						headers,
						data,
						cancelToken: source.token,
					});

					return response.data;
				} else {
					removeTokens();
					removeUserData();
					window.location.href("/auth/login");
				}
			} catch (error) {
				console.log("unauthorized : ", error);
				removeTokens();
				removeUserData()
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
		const result = await apiRequest(
			`/like/toggle/${entityType}/${entityId}`,
			"PATCH"
		);
		
		return result;
	} catch (error) {
		console.log("Error while like : ", error);
	}
};
