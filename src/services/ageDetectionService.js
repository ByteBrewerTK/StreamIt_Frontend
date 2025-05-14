export const detectAge = async (imageFile, email, confirmationToken = "") => {
	const formData = new FormData();
	formData.append("image", imageFile);

	const response = await fetch(
		`${
			import.meta.env.VITE_API_URL
		}/detection/detect-age/${confirmationToken}`,
		{
			method: "POST",
			body: formData,
		}
	);

	if (!response.ok) {
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

	return await response.json();
};
