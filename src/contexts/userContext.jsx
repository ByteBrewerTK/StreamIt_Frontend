import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({});

	const setData = (data)=>{
		setUserData(data)
	}

	return (
		<UserContext.Provider value={{ userData, setData }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
