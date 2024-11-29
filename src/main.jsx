import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/userContext.jsx";
import ChatProvider from "./contexts/chatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<ChatProvider>
				<Router>
					<App />
				</Router>
			</ChatProvider>
		</UserProvider>
	</React.StrictMode>
);
