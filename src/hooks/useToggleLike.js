import { apiRequest } from "../services/api";

const useToggleLike = async (entityType, entityId) => {
	try {
		const result = await apiRequest(
			`/like/toggle/${entityType}/${entityId}`,"PATCH"
		);
	} catch (error) {
		console.log("Error while like : ", error);
	}
};

export default useToggleLike;
