import { apiInstance } from "../services/api";

const useToggleLike = async (entityType, entityId) => {
	try {
		const result = await apiInstance.patch(
			`/like/toggle/${entityType}/${entityId}`
		);
	} catch (error) {
		console.log("Error while like : ", error);
	}
};

export default useToggleLike;
