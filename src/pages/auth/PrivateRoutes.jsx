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

	const handleCreatePanelOpen = (state = false) => {
		setCreatePanelOpen(state);
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
					<Navbar
						sidebarHandler={sidebarHandler}
						handleCreatePanelOpen={handleCreatePanelOpen}
						createPanelOpen={createPanelOpen}
					/>
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
					handleCreatePanelOpen={handleCreatePanelOpen}
					createPanelOpen={createPanelOpen}
				/>
				<div
					className={`${
						createPanelOpen ? "h-full " : "h-0 hidden"
					} absolute z-[50] w-full h-[calc(100%-2.5rem)] md:h-[calc(100%-4rem)] bottom-[2.5rem] transition duration-500 bg-secondary md:bg-transparent p-4 md:p-0 overflow-hidden m-auto md:bottom-0`}
				>
					<CreatePanel
						handleCreatePanelOpen={handleCreatePanelOpen}
					/>
				</div>
			</main>
		</div>
	);
};

export default PrivateRoutes;
