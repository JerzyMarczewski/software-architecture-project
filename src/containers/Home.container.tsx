import { ReactElement, useEffect, useState } from "react";
import HomeView from "../views/Home.view";
import axios from "axios";
import { UpcomingMovie } from "../helpers/types";

const HomeContainer = (): ReactElement => {
	const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
	const [popularMovies, setPopularMovies] = useState<UpcomingMovie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<UpcomingMovie[]>([]);

	const getUpcomingMovies = async (type: "top_rated" | "popular" | "upcoming"): Promise<void> => {
		const { VITE_API_KEY } = import.meta.env;

		// 'https://api.themoviedb.org/3/movie/top_rated?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US&page=1'

		// https://api.themoviedb.org/3/movie/popular?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US&page=1

		// https://api.themoviedb.org/3/genre/movie/list?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${type}?api_key=${
					VITE_API_KEY as string
				}&language=en-US&page=1`,
			);

			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			if (type === "upcoming") {
				setUpcomingMovies(response.data.results);
			}
			if (type === "popular") {
				setPopularMovies(response.data.results);
			}
			if (type === "top_rated") {
				setTopRatedMovies(response.data.results);
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	};

	useEffect(() => {
		void (async () => {
			await getUpcomingMovies("popular");
			await getUpcomingMovies("upcoming");
			await getUpcomingMovies("top_rated");
		})();
	}, []);

	return (
		<HomeView
			upcomingMovies={upcomingMovies}
			popularMovies={popularMovies}
			topRatedMovies={topRatedMovies}
		/>
	);
};

export default HomeContainer;
