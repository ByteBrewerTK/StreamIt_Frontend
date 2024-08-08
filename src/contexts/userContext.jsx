import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import apiInstance from "../apis/apiInstance.js";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);

	const apiUrl = import.meta.env.VITE_API_URL;

	const fetchData = async (data) => {
		try {
			const response = await apiInstance.post("/user/login", data);
			setUserData(response.data.data);

			const refreshToken = response.data.data.refreshToken;

			localStorage.setItem("refreshToken", refreshToken);
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
