const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_DATA = "userData";
const USER_SETTINGS = "userSettings";

// Add expiry time handling
export const saveTokens = (accessToken, refreshToken) => {
	try {
		localStorage.setItem(TOKEN_KEY, accessToken);
		localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
		return true;
	} catch (error) {
		console.error("Error saving tokens:", error);
		return false;
	}
};

// Add error handling for token getters
export const getAccessToken = () => {
	try {
		return localStorage.getItem(TOKEN_KEY);
	} catch (error) {
		console.error("Error getting access token:", error);
		return null;
	}
};

export const getRefreshToken = () => {
	try {
		return localStorage.getItem(REFRESH_TOKEN_KEY);
	} catch (error) {
		console.error("Error getting refresh token:", error);
		return null;
	}
};

// Add try-catch for token removal
export const removeTokens = () => {
	try {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		return true;
	} catch (error) {
		console.error("Error removing tokens:", error);
		return false;
	}
};

export const removeUserData = () => {
	localStorage.removeItem(USER_DATA);
};

export const getUserData = () => {
	try {
		const userString = localStorage.getItem(USER_DATA);
		return userString ? JSON.parse(userString) : null;
	} catch (error) {
		console.error("Error getting user data:", error);
		return null;
	}
};

// Add validation and error handling for saving
export const saveUserData = (user) => {
	try {
		if (!user) {
			throw new Error("User data cannot be null or undefined");
		}
		localStorage.setItem(USER_DATA, JSON.stringify(user));
		return true;
	} catch (error) {
		console.error("Error saving user data:", error);
		return false;
	}
};

export const getUserSetting = () => {
	try {
		const userString = localStorage.getItem(USER_SETTINGS);
		return userString ? JSON.parse(userString) : null;
	} catch (error) {
		console.error("Error getting user data:", error);
		return null;
	}
};

export const setUserSettings = (settings) => {
	try {
		if (!settings) {
			throw new Error("User data cannot be null or undefined");
		}
		localStorage.setItem(USER_SETTINGS, JSON.stringify(settings));
		return true;
	} catch (error) {
		console.error("Error saving user data:", error);
		return false;
	}
};
