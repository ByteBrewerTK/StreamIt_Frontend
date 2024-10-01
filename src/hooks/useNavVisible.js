import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const useNavVisible = (state = false) => {
	const { setNavVisible } = useOutletContext();
	useEffect(() => {
		setNavVisible(state);

		return () => {
			setNavVisible(!state);
		};
	}, []);
};

export default useNavVisible;
