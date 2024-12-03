export const validateFullName = (name) => {
	const minLength = 3;
	const maxLength = 20;
	const namePattern = /^[a-zA-Z\s]+$/;

	if (
		name.length < minLength ||
		name.length > maxLength ||
		!namePattern.test(name)
	) {
		return false;
	}

	return true;
};
