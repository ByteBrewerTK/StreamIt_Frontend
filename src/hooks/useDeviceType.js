import { useState, useEffect } from "react";

const useDeviceType = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkDevice();

		window.addEventListener("resize", checkDevice);

		return () => {
			window.removeEventListener("resize", checkDevice);
		};
	}, []);
	return isMobile ? "Mobile" : "Desktop";
};
export default useDeviceType;
