import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";

const PrivateRoutes = () => {
	const accessToken = localStorage.getItem("accessToken");

	return (
		<>
			<Navbar />
			{accessToken ? <Outlet /> : <Navigate to="/auth/login" />}
		</>
	);
};

export default PrivateRoutes;
