import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./pages/auth/PrivateRoutes";
import VerificationSuccess from "./pages/auth/VerificationSuccess";
import ResendVerificationMail from "./pages/auth/ResendVerificationMail";
import Loader from "./components/ui/loader/Loader";
import { Toaster, toast } from "react-hot-toast";
import DesktopSecurityPage from "./pages/desktop/settings/DesktopSecurityPage";
import DesktopGeneralSettings from "./pages/desktop/settings/DesktopGeneralSettings";
import DesktopNotificationSetting from "./pages/desktop/settings/DesktopNotificationSetting";
import About from "./pages/channel/About";
import LikedVideosPage from "./pages/LikedVideosPage";
import UserVideosPage from "./pages/desktop/UserVideosPage";
import UserPlaylist from "./pages/UserPlaylist";

// Lazy load the component
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const FeedsPage = lazy(() => import("./pages/FeedsPage"));
const RegistrationPage = lazy(() => import("./pages/auth/RegistrationPage"));
const PasswordResetPage = lazy(() => import("./pages/auth/PasswordResetPage"));
const CreateNewPassword = lazy(() => import("./pages/auth/CreateNewPassword"));
const VerifyOTP = lazy(() => import("./pages/auth/VerifyOTP"));
const WatchVideo = lazy(() => import("./pages/WatchVideo"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const SubscriptionsPage = lazy(() => import("./pages/SubscriptionsPage"));
const SubscriptionsListPage = lazy(() =>
	import("./pages/SubscriptionsListPage")
);
const NotFound = lazy(() => import("./pages/error/NotFound"));
const Account = lazy(() => import("./pages/settings/Account"));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const ChannelPage = lazy(() => import("./pages/channel/ChannelPage"));
const GeneralSettingsPage = lazy(() =>
	import("./pages/settings/GeneralSettingsPage")
);
const SecurityPage = lazy(() => import("./pages/settings/SecurityPage"));
const DesktopAccounts = lazy(() =>
	import("./pages/desktop/settings/DesktopAccounts")
);
const DesktopSettingsPage = lazy(() =>
	import("./pages/settings/DesktopSettingsPage")
);

function App() {
	useEffect(() => {
		toast("App in development—please ignore bugs and issues.", {
			icon: "😊",
		});
	}, []);
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />

			<div className="h-[calc(100dvh)] w-full font-poppins overflow-hidden">
				<Suspense
					fallback={
						<div className="grid w-full h-full place-items-center bg-secondary">
							{" "}
							<span className=" size-14">
								<Loader />
							</span>
						</div>
					}
				>
					<Routes>
						<Route path="auth">
							<Route path="login" element={<LoginPage />} />
							<Route
								path="sign-up"
								element={<RegistrationPage />}
							/>
							<Route
								path="reset-password"
								element={<PasswordResetPage />}
							/>
							<Route path="verify-otp" element={<VerifyOTP />} />
							<Route
								path="new-password"
								element={<CreateNewPassword />}
							/>
							<Route
								path="confirm/:token"
								element={<VerificationSuccess />}
							/>
							<Route
								path="resend/confirm/:email"
								element={<ResendVerificationMail />}
							/>
							<Route path="*" element={<NotFound />} />
						</Route>

						<Route element={<PrivateRoutes />}>
							<Route path="/" element={<FeedsPage />} />
							<Route path="/watch" element={<WatchVideo />} />
							<Route path="user">
								<Route
									path=":username"
									element={<ChannelPage />}
								/>
								<Route
									path="profile"
									element={<UserProfilePage />}
								/>
								<Route
									path="playlists"
									element={<UserPlaylist />}
								/>
								<Route
									path="videos"
									element={<UserVideosPage />}
								/>
								<Route
									path="liked-videos"
									element={<LikedVideosPage />}
								/>
								<Route
									path="subscriptions"
									element={<SubscriptionsPage />}
								/>
								<Route
									path="subscriptions/list"
									element={<SubscriptionsListPage />}
								/>
								<Route
									path="settings"
									element={<SettingsPage />}
								>
									<Route path="" element={<Settings />} />
									<Route
										path="account"
										element={<Account />}
									/>
									<Route
										path="general"
										element={<GeneralSettingsPage />}
									/>
									<Route
										path="security"
										element={<SecurityPage />}
									/>
									<Route
										path="desktop"
										element={<DesktopSettingsPage />}
									>
										<Route
											path="security"
											element={<DesktopSecurityPage />}
										/>
										<Route
											path="account"
											element={<DesktopAccounts />}
										/>
										<Route
											path="general"
											element={<DesktopGeneralSettings />}
										/>
										<Route
											path="notifications"
											element={
												<DesktopNotificationSetting />
											}
										/>
										<Route
											path="about"
											element={<About />}
										/>
									</Route>
								</Route>
								<Route path="*" element={<NotFound />} />
							</Route>
							<Route path="*" element={<NotFound />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</div>
		</>
	);
}

export default App;
