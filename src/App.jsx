import { Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import { Route } from "react-router-dom";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import VerifyOTP from "./pages/auth/VerifyOTP";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
// import AuthTemplate from "./pages/auth/AuthTemplate";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./pages/auth/PrivateRoutes";



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
				<Route
					path="/auth/new-password"
					element={<CreateNewPassword/>}
				/>

				<Route element= {<PrivateRoutes/>}>
					<Route path="/user/dashboard" element = {<HomePage/>}/>

				</Route>
				{/* <Route path="*" element={}/> */}

				{/* Protected Routes */}

				{/* <Route path="/user/dashboard" element={
					<PrivateRoutes/>
				}/> */}
			</Routes>
		</div>
	);
}

export default App;
