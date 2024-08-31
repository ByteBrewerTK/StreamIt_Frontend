import { apiRequest } from "./api";

export const createPlaylist = async (privacyOption, playlistTitle) => {
	const data = { name: playlistTitle };
	return await apiRequest(`/playlist/${privacyOption}`, "POST", data);
};

export const addVideoToPlaylist = async (playlistId, videoId) => {
	return await apiRequest(`/playlist/${playlistId}/${videoId}`, "PATCH");
};
