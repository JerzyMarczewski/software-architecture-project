import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from "react";
import HomeView from "../views/Home.view";
import axios from "axios";
import { UpcomingMovie, Section, Status } from "../helpers/types";

const HomeContainer = (): ReactElement => {
	const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
	const [popularMovies, setPopularMovies] = useState<UpcomingMovie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<UpcomingMovie[]>([]);
	const [searchMovies, setSearchMovies] = useState<UpcomingMovie[]>([]);
	const [enteredText, setEnteredText] = useState("");
	const [section, setSection] = useState<Section>("upcoming");
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<Status>("loading");

	const getUpcomingMovies = async (type: Section): Promise<void> => {
		const { VITE_API_KEY } = import.meta.env;
		setStatus("loading");

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${type}?api_key=${
					VITE_API_KEY as string
				}&language=en-US&page=1`,
			);

			if (response.status !== 200) {
				setStatus("error");
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
			setStatus("ok");
		} catch (error) {
			setStatus("error");
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setStatus("loading");
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
				setStatus("error");
				throw new Error("Something went wrong!");
			}

			setSearchMovies(response.data.results);
			setStatus("ok");
		} catch (error) {
			setStatus("error");
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	const onEnteredText = (event: ChangeEvent<HTMLInputElement>): void => {
		setEnteredText((event.target as HTMLInputElement).value);
	};

	const changeSectionHandler = (sectionName: Section): void => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 300);

		setSection(sectionName);
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
			isLoading={isLoading}
			onSubmit={(event) => {
				void (async () => {
					await onSubmit(event);
				})();
			}}
			onChangeSection={changeSectionHandler}
			section={section}
			status={status}
		/>
	);
};

export default HomeContainer;
