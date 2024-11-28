import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import SideNavbar from "../../components/shared/SideNavbar";
import BottomNavMenu from "../../components/shared/BottomNavMenu";
import CreatePanel from "../../components/video/CreatePanel";
import { useState, useEffect } from "react";
import { getAccessToken, saveTokens } from "../../services/authServices";
import Loader from "../../components/ui/loader/Loader";
import ProgressBar from "../../components/ui/ProgressBar";

const PrivateRoutes = () => {
	const [localAccessToken, setLocalAccessToken] = useState(getAccessToken());
	const [isTokenLoaded, setIsTokenLoaded] = useState(false);
	const [uploadProgressActive, setUploadProgressActive] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isVisible, setVisible] = useState(true);
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [createPanelOpen, setCreatePanelOpen] = useState(false);

	const redirect_url =
		location.pathname === "/"
			? "/auth/login"
			: `/auth/login?redirect_url=${location.href}`;

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
	}, []);

	if (!isTokenLoaded) {
		return (
			<div className="grid size-full place-items-center bg-primary">
				<Loader size={70} />
			</div>
		);
	}

	if (!localAccessToken) {
		window.location.href = redirect_url;
		return null;
	}

	return (
		<div className="w-full h-[100dvh] overflow-hidden relative z-50">
			<main className="relative flex flex-col h-full overflow-hidden bg-secondary">
				{uploadProgressActive && (
					<ProgressBar uploadProgress={uploadProgress} />
				)}

				<div
					className={`z-50 w-full transition-all ${
						!isVisible ? "fixed -translate-y-full" : ""
					}`}
				>
					<Navbar
						sidebarHandler={() => setSidebarOpen((prev) => !prev)}
						handleCreatePanelOpen={setCreatePanelOpen}
						createPanelOpen={createPanelOpen}
					/>
				</div>

				<section className="flex overflow-hidden size-full">
					<SideNavbar isSidebarOpen={isSidebarOpen} />
					<Outlet
						context={{
							setNavVisible: setVisible,
							setUploadProgressActive,
						}}
					/>
				</section>

				{createPanelOpen && (
					<div className="absolute z-[50] w-full h-full bg-secondary overflow-auto p-4">
						<CreatePanel
							handleCreatePanelOpen={setCreatePanelOpen}
							setUploadProgressActive={setUploadProgressActive}
							setUploadProgress={setUploadProgress}
						/>
					</div>
				)}

				<BottomNavMenu handleCreatePanelOpen={setCreatePanelOpen} />
			</main>
		</div>
	);
};

export default PrivateRoutes;
