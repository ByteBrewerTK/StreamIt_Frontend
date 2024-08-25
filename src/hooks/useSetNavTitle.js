import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const useSetNavTitle = (title) => {
	const [navTitle, setNavTitle] = useState();
    const {pathname} = useLocation()
	useEffect(() => {
		const setHeaderTitle = () => {
			setNavTitle(title);
		};
		setHeaderTitle(title);
	}, [pathname]);
    return {navTitle}
};

export default useSetNavTitle;
