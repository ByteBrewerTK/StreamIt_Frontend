export const registerUserError = (statusCode) => {
	let error = "";
	switch (statusCode) {
		case 409: {
			error = "User already exists";
			break;
		}
		case 422: {
			error = "Email domain is not allowed";
			break;
		}
		case 403: {
			error = "User exist - Email not verified";
			break;
		}
		case 400: {
			error = "All fields are required";
			break;
		}
		default: {
			error = "Something went wrong";
			break;
		}
	}
	return error;
};

export const loginUserError = (statusCode) => {
	let error = "";
	switch (statusCode) {
		case 400: {
			error = "All fields are required";
			break;
		}
		case 404: {
			error = "User not found";
			break;
		}
		case 403: {
			error = "Email not verified";
			break;
		}
		case 401: {
			error = "Incorrect password";
			break;
		}
		case 422: {
			error = "Email domain is not allowed";
			break;
		}

		default: {
			error = "Something went wrong";
			break;
		}
	}
	return error;
};
