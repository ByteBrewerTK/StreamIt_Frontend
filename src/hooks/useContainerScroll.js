import { useEffect, useState } from "react";

function useContainerScroll(ref) {
	const [lastScrollY, setLastScrollY] = useState(0);
	const [navbarVisible, setNavbarVisible] = useState(true);

	useEffect(() => {
		const divElement = ref.current;

		if (divElement) {
			const handleScroll = () => {
				const currentScrollY = divElement.scrollTop;

				if (currentScrollY > lastScrollY) {
					// Scrolling down
					setNavbarVisible(false);
				} else {
					// Scrolling up
					setNavbarVisible(true);
				}

				setLastScrollY(currentScrollY);
			};

			divElement.addEventListener("scroll", handleScroll);

			return () => {
				divElement.removeEventListener("scroll", handleScroll);
			};
		}
	}, [lastScrollY, ref]);

	return navbarVisible;
}

export default useContainerScroll;
