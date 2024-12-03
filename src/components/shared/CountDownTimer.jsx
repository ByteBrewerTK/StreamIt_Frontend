import { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, setResendTime }) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		if (timeLeft <= 0) {
			setResendTime(0);
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft]);

	return (
		<div className="countdown-timer">
			<span className="text-sm text-red">Retry after {timeLeft} sec</span>
		</div>
	);
};

export default CountdownTimer;
