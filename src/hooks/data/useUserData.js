import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import { saveUserData } from "../../services/authServices";

const useUserData = () => {
	const [userDataError, setError] = useState(null);
	const [userData, setUserData] = useState(null);
	const [userDataLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiRequest("/user/current-user");
				setUserData(response.data);
				saveUserData(response.data);
			} catch (error) {
				setError(error);
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return { userData, userDataError, userDataLoading };
};

export default useUserData;
