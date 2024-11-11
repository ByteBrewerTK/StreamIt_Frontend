import { useEffect } from "react";
import { useState } from "react";
import { apiRequest } from "../../services/api";
import { setUserSettings } from "../../services/authServices";

const useGetSettings = () => {
	const [settingsData, setSettingsData] = useState(null);
	const [settingsError, setSettingsError] = useState("");
	const [settingsLoading, setSettingsLoading] = useState(true);

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const response = await apiRequest("/settings");
				if (response?.data) {
					setSettingsData(response.data);
					setUserSettings(response.data);
				}
			} catch (error) {
				setSettingsError("Error occurred");
				console.log(
					"Error occurred while fetching settings, error : ",
					error
				);
			} finally {
				setSettingsLoading(false);
			}
		};
		fetchSettings();
	}, []);

	return { settingsData, settingsError, settingsLoading };
};

export default useGetSettings;
