const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_DATA = "userData";

// save tokens to localStorage
export const saveTokens = (accessToken, refreshToken) => {
	localStorage.setItem(TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// get access token from localStorage
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

// get refresh token from localStorage
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

// remove token from localStorage
export const removeTokens = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const removeUserData = () => {
	localStorage.removeItem(USER_DATA);
};

export const getUserData = () => {
	const userString = localStorage.getItem(USER_DATA);
	return JSON.parse(userString) ;
};

export const saveUserData = (user) => {
    localStorage.setItem(USER_DATA, JSON.stringify(user));
};
