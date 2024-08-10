import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./pages/auth/PrivateRoutes";

// Lazy load the component
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const FeedsPage = lazy(() => import("./pages/FeedsPage"));
const RegistrationPage = lazy(() => import("./pages/auth/RegistrationPage"));
const PasswordResetPage = lazy(() => import("./pages/auth/PasswordResetPage"));
const CreateNewPassword = lazy(() => import("./pages/auth/CreateNewPassword"));
const VerifyOTP = lazy(() => import("./pages/auth/VerifyOTP"));
const WatchVideo = lazy(() => import("./pages/WatchVideo"));

function App() {
	return (
		<div className="h-[calc(100dvh)] w-full font-poppins overflow-hidden">
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/auth/login" element={<LoginPage />} />
					<Route
						path="/auth/sign-up"
						element={<RegistrationPage />}
					/>
					<Route
						path="/auth/reset-password"
						element={<PasswordResetPage />}
					/>
					<Route path="/auth/verify-otp" element={<VerifyOTP />} />
					<Route
						path="/auth/new-password"
						element={<CreateNewPassword />}
					/>

					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<FeedsPage />} />
						<Route path="/watch" element={<WatchVideo />} />
					</Route>
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
