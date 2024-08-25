import { useState } from "react";
import { createContext } from "react";
import { getUserData, saveUserData } from "../services/authServices";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const user = getUserData();
	const [userData, setData] = useState(user);

	const setUserData = (data) => {
		saveUserData(data);
		setData(data);
	};

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
