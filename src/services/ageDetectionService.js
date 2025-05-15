import { apiRequest } from "./api";

export const detectAge = async (imageFile, email, confirmationToken = "") => {
	const formData = new FormData();
	formData.append("image", imageFile);

	let response;

	if (!email && !confirmationToken) {
		response = await apiRequest(`/detection/update-age`, "POST", formData);
	} else {
		response = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/detection/detect-age/${confirmationToken}`,
			{
				method: "POST",
				body: formData,
			}
		);
	}

	if (!response.statusCode === 200) {
		console.log(response);
		if (response.status === 404) {
			alert("User not found");
			window.location.href = `/auth/resend/confirm/${email}`;
		}
		if (response.status === 403) {
			alert("Invalid Request");
			window.location.href = "/auth/sign-up";
		}
		if (response.status === 400) {
			alert("Invalid Token, resend the verification email");
			window.location.href = `/auth/resend/confirm/${email}`;
		}
		throw new Error("Failed to detect age, please retry");
	}

	return await response;
};
