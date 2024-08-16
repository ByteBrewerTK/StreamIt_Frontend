import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setData] = useState({});

	const setUserData = (data) => {
		setData(data);
	};

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
