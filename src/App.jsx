import { Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import { Route } from "react-router-dom";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import VerifyOTP from "./pages/auth/VerifyOTP";

function App() {
	return (
		<div className="h-[calc(100dvh)] w-screen font-poppins">
			{/* <RegistrationPage /> */}
			{/* <LoginPage /> */}

			<Routes>
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/auth/sign-up" element={<RegistrationPage />} />
				<Route
					path="/auth/reset-password"
					element={<PasswordResetPage/>}
				/>
				<Route
					path="/auth/verify-otp"
					element={<VerifyOTP/>}
				/>
				{/* <Route path="*" element={}/> */}
			</Routes>
		</div>
	);
}

export default App;
