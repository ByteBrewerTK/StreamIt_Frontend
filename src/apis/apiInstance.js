import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export default instance
