import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import { useState } from "react";
import SideNavbar from "../../components/shared/SideNavbar";
import BottomNavMenu from "../../components/shared/BottomNavMenu";
import CreatePanel from "../../components/video/CreatePanel";

const PrivateRoutes = () => {
	const accessToken = localStorage.getItem("accessToken");

	const [isVisible, setVisible] = useState(true);
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [createPanelOpen, setCreatePanelOpen] = useState(false);

	const toggleCreatePanel = () => {
		setCreatePanelOpen((prev) => !prev);
	};
	const setNavVisible = (state) => {
		setVisible(state);
	};
	const sidebarHandler = () => {
		setSidebarOpen((prev) => !prev);
	};

	return (
		<div className="w-full h-[100dvh] overflow-hidden relative  z-50">
			<main className="relative flex flex-col h-full overflow-hidden md:flex-col md:flex sm:overflow-hidden bg-secondary">
				<div
					className={`z-50 transition-all duration-500 w-full  sm:transition-none sm:translate-y-0 md:relative ${
						!isVisible ? "-translate-y-full duration-500 fixed" : ""
					}`}
				>
					<Navbar sidebarHandler={sidebarHandler} />
				</div>

				<section className="flex overflow-hidden size-full">
					<SideNavbar isSidebarOpen={isSidebarOpen} />
					{accessToken ? (
						<Outlet context={{ setNavVisible }} />
					) : (
						<Navigate to="/auth/login" />
					)}
				</section>
				<BottomNavMenu
					toggleCreatePanel={toggleCreatePanel}
					createPanelOpen={createPanelOpen}
				/>
				<div
					className={`${
						!createPanelOpen ? "translate-y-full " : ""
					} absolute z-10 w-full h-[calc(100%-3rem)] transition duration-500 bg-secondary p-4 overflow-hidden md:hidden`}
				>
					<CreatePanel />
				</div>
			</main>
		</div>
	);
};

export default PrivateRoutes;
