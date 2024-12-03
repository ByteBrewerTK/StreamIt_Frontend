export const checkContinuosSender = (messages, index) => {
	const currentMessage = messages[index];
	const nextMessage = messages[index + 1];

	if (!currentMessage) return false; // No current message
	if (!nextMessage) return true; // No next message
	return currentMessage.sender._id !== nextMessage.sender._id; // Check sender continuity
};

export const messageTimeFormat = (time) => {
	const date = new Date(time); // Convert MongoDB time to a Date object
	let hours = date.getHours(); // Get hours
	const minutes = date.getMinutes(); // Get minutes
	const amPm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

	hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time, handle 0 as 12
	const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero to minutes

	return `${hours}:${formattedMinutes} ${amPm}`;
};

export const messageDateFormat = (mongoDate) => {
	const date = new Date(mongoDate);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);

	// Remove the time part for accurate comparison
	today.setHours(0, 0, 0, 0);
	yesterday.setHours(0, 0, 0, 0);

	if (date >= today) {
		return "Today";
	} else if (date >= yesterday) {
		return "Yesterday";
	} else {
		const dayOfWeek = new Intl.DateTimeFormat("en-US", {
			weekday: "long",
		}).format(date);
		if (date < yesterday) {
			const todayMinusTwo = new Date();
			todayMinusTwo.setDate(today.getDate() - 2);
			if (date >= todayMinusTwo) return dayOfWeek; // Day name for before yesterday
		}

		// Format as DD/MM/YYYY for older dates
		return new Intl.DateTimeFormat("en-US", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}).format(date);
	}
};
const areDatesEqualByDay = (date1, date2) => {
	const d1 = new Date(date1);
	const d2 = new Date(date2);

	// Normalize both dates to midnight (remove the time component)
	d1.setHours(0, 0, 0, 0);
	d2.setHours(0, 0, 0, 0);

	// Compare year, month, and day
	return d1.getTime() === d2.getTime();
};
export const checkSameDayMessage = (messages, index) => {
	if (!messages) return true;
	if (messages?.length - 1 <= 0) return true;
	if (!messages[index - 1]) return false;

	if (
		!areDatesEqualByDay(
			messages[index].createdAt,
			messages[index - 1].createdAt
		)
	)
		return false;
	return true;
};
