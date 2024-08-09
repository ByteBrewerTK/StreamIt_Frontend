import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const accessToken = localStorage.getItem("accessToken");

	return accessToken ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
