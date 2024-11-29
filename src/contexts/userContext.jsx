import { useState } from "react";
import { createContext } from "react";
import { getUserData } from "../services/authServices";
import { useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const userInfo = getUserData();

		if (!userInfo) {
			location.href = "/";
		}
		setUserData(userInfo);
	}, []);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
