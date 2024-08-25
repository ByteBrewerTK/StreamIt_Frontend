import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./pages/auth/PrivateRoutes";
import VerificationSuccess from "./pages/auth/VerificationSuccess";
import ResendVerificationMail from "./pages/auth/ResendVerificationMail";
import Loader from "./components/ui/loader/Loader";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import NotFound from "./pages/error/NotFound";
import Account from "./pages/settings/Account";
import Settings from "./pages/settings/Settings";

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
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage"));

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
									path="profile"
									element={<UserProfilePage />}
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
									></Route>
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
