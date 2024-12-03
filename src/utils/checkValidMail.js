export const checkValidMail = (email) => {
	if (!email) return false;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email) && email.length <= 30;
};
