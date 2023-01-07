import { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ActorContainer from "./containers/Actor.container";
import HomeContainer from "./containers/Home.container";
import MovieContainer from "./containers/Movie.container";
import LoginContainer from "./containers/Login.container";

function App(): ReactElement {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomeContainer />} />
					<Route path="/movies/:movieId" element={<MovieContainer />} />
					<Route path="/actors/:actorId" element={<ActorContainer />} />
					<Route path="/sign-in" element={<LoginContainer />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
