import { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ActorContainer from "./containers/Actor.container";
import HomeContainer from "./containers/Home.container";
import MovieContainer from "./containers/Movie.container";
import AuthenticationContainer from "./containers/Authentication.container";
import NavigationContainer from "./containers/Navigation.container";

function App(): ReactElement {
	return (
		<div className="App">
			<BrowserRouter>
				<NavigationContainer />
				<Routes>
					<Route path="/" element={<HomeContainer />} />
					<Route path="/movies/:movieId" element={<MovieContainer />} />
					<Route path="/actors/:actorId" element={<ActorContainer />} />
					<Route path="/sign-in" element={<AuthenticationContainer />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
