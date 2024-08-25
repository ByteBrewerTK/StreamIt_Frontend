import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const useNavVisible = () =>{
    const { setNavVisible } = useOutletContext();
    useEffect(() => {
		
		setNavVisible(false);

		return () => {
			setNavVisible(true);
		};
	}, []);
}

export default useNavVisible;