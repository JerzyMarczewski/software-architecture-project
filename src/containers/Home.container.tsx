import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from "react";
import HomeView from "../views/Home.view";
import axios from "axios";
import { UpcomingMovie } from "../helpers/types";

const HomeContainer = (): ReactElement => {
	const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
	const [popularMovies, setPopularMovies] = useState<UpcomingMovie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<UpcomingMovie[]>([]);
	const [searchMovies, setSearchMovies] = useState<UpcomingMovie[]>([]);
	const [enteredText, setEnteredText] = useState("");

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

	const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const { VITE_API_KEY } = import.meta.env;

		if (enteredText.length === 0) {
			setSearchMovies([]);
			return;
		}

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?api_key=${
					VITE_API_KEY as string
				}&language=en-US&page=1&query=${enteredText}`,
			);

			if (response.status !== 200) {
				throw new Error("Something went wrong!");
			}

			setSearchMovies(response.data.results);
			// console.log(response);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	const onEnteredText = (event: ChangeEvent<HTMLInputElement>): void => {
		setEnteredText((event.target as HTMLInputElement).value);
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
			onEnteredText={onEnteredText}
			searchedMovies={searchMovies}
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onSubmit={onSubmit}
		/>
	);
};

export default HomeContainer;
