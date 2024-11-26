import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import SideNavbar from "../../components/shared/SideNavbar";
import BottomNavMenu from "../../components/shared/BottomNavMenu";
import CreatePanel from "../../components/video/CreatePanel";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccessToken, saveTokens } from "../../services/authServices";
import Loader from "../../components/ui/loader/Loader";
import ProgressBar from "../../components/ui/ProgressBar";

const PrivateRoutes = () => {
	const [localAccessToken, setLocalAccessToken] = useState(getAccessToken());
	const [isTokenLoaded, setIsTokenLoaded] = useState(false);
	const [uploadProgressActive, setUploadProgressActive] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const location = useLocation();

	const [isVisible, setVisible] = useState(true);
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [createPanelOpen, setCreatePanelOpen] = useState(false);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const accessToken = queryParams.get("accessToken");
		const refreshToken = queryParams.get("refreshToken");

		if (accessToken && refreshToken) {
			saveTokens(accessToken, refreshToken);
			setLocalAccessToken(accessToken);
			window.history.replaceState({}, document.title, "/");
		}

		setIsTokenLoaded(true);
	}, [location]);

	const handleCreatePanelOpen = (state = false) => {
		setCreatePanelOpen(state);
	};

	const setNavVisible = (state) => {
		setVisible(state);
	};

	const sidebarHandler = () => {
		setSidebarOpen((prev) => !prev);
	};

	// Only render main content if the token is loaded
	if (!isTokenLoaded) {
		return (
			<div className="grid size-full place-items-center bg-primary">
				<span className="size-[70px]">
					<Loader />
				</span>
			</div>
		);
	}

	return (
		<div className="w-full h-[100dvh] overflow-hidden relative z-50">
			<main className="relative flex flex-col h-full overflow-hidden md:flex-col md:flex sm:overflow-hidden bg-secondary">
				{uploadProgressActive && (
					<ProgressBar uploadProgress={uploadProgress} />
				)}
				<div
					className={`z-50 transition-all duration-500 w-full sm:transition-none sm:translate-y-0 md:relative ${
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
					{localAccessToken ? (
						<Outlet
							context={{ setNavVisible, setUploadProgressActive }}
						/>
					) : (
						<Navigate to="/auth/login" />
					)}
				</section>
				<div
					className={`absolute z-[50] w-full transition duration-500 bg-secondary md:bg-transparent p-4 md:p-0 overflow-x-hidden overflow-y-auto m-auto h-[calc(100%-3rem)] scrollbar-hide md:h-[calc(100%-4rem)] md:bottom-0 ${
						createPanelOpen ? "h-full " : "h-0 hidden"
					}`}
				>
					<CreatePanel
						handleCreatePanelOpen={handleCreatePanelOpen}
						setUploadProgressActive={setUploadProgressActive}
						setUploadProgress={setUploadProgress}
					/>
				</div>

				<BottomNavMenu
					handleCreatePanelOpen={handleCreatePanelOpen}
					createPanelOpen={createPanelOpen}
				/>
			</main>
		</div>
	);
};

export default PrivateRoutes;
