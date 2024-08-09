import { useState } from "react";
import { createContext } from "react";
import apiInstance from "../apis/apiInstance.js";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

	const fetchData = async (data) => {
		try {
			const response = await apiInstance.post("/user/login", data);
			setUserData(response.data.data);

			const auth = await apiInstance.post("user/refresh-token", data);

			const {accessToken,refreshToken} = auth.data.data;
			

			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("accessToken", accessToken);

			console.log("accessToken : ", accessToken);
			console.log("refreshToken : ", refreshToken);
		} catch (error) {
			console.log("Error fetching data : ", error);
		}
	};

	return (
		<UserContext.Provider value={{ userData, fetchData }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
