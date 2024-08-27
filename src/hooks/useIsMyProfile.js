import { useEffect } from "react";
import { getUserData } from "../services/authServices";
import { useState } from "react";

const useIsMyProfile = (username) => {
	const [isMyProfile, setIsMyProfile] = useState(false);
	const userData = getUserData();
	useEffect(() => {
		setIsMyProfile(userData.username === username);
	}, [username]);
	return isMyProfile;
};

export default useIsMyProfile;
