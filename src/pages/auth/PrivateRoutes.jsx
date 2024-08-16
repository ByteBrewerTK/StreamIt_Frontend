import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import SideNavbar from "../../components/shared/SideNavbar";

const PrivateRoutes = () => {
	const accessToken = localStorage.getItem("accessToken");

	const [isVisible, setVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlNavbar = () => {
		if (typeof window !== undefined) {
			if (window.scrollY > lastScrollY) {
				setVisible(false);
			} else {
				setVisible(true);
			}
			setLastScrollY(window.scrollY);
		}
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			window.addEventListener("scroll", controlNavbar);

			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<main className="flex flex-col h-full overflow-x-hidden overflow-y-auto md:flex-col md:flex sm:overflow-hidden bg-secondary">
			<div
				className={` ${
					!isVisible
						? "-translate-y-full overflow-hidden duration-500"
						: ""
				}  transition-all duration-300 w-full  sm:transition-none sm:translate-y-0 overflow-hidden md:relative  `}
			>
				<Navbar />
			</div>

			<section className="flex flex-1 overflow-auto sm:overflow-hidden">
				<SideNavbar />
				{accessToken ? <Outlet /> : <Navigate to="/auth/login" />}
			</section>
		</main>
	);
};

export default PrivateRoutes;
