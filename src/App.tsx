import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ActorPage from "./views/ActorPage";
import Home from "./views/Home";
import MoviePage from "./views/MoviePage";

function App(): ReactElement {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movies/:movieId" element={<MoviePage />} />
					<Route path="/actors/:actorId" element={<ActorPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
