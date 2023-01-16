import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthContextProvider from "./context/auth-context";
import FavoriteMoviesProvider from "./context/favorite-movies-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthContextProvider>
			<FavoriteMoviesProvider>
				<App />
			</FavoriteMoviesProvider>
		</AuthContextProvider>
	</React.StrictMode>,
);
