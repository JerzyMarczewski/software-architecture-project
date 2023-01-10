import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from "react";
import HomeView from "../views/Home.view";
import axios from "axios";
import { UpcomingMovie, Section, Status } from "../helpers/types";
import styles from "../views/home.module.css";
import CardView from "../views/Card.view";

const HomeContainer = (): ReactElement => {
	const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
	const [popularMovies, setPopularMovies] = useState<UpcomingMovie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<UpcomingMovie[]>([]);
	const [searchMovies, setSearchMovies] = useState<UpcomingMovie[]>([]);
	const [enteredText, setEnteredText] = useState("");
	const [section, setSection] = useState<Section>("upcoming");
	const [status, setStatus] = useState<Status>("loading");
	const [selectedSection, setSelectedSection] = useState<JSX.Element>();

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

			setSection("search");
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
		setSection(sectionName);
	};

	useEffect(() => {
		void (async () => {
			await getUpcomingMovies("popular");
			await getUpcomingMovies("upcoming");
			await getUpcomingMovies("top_rated");
		})();
	}, []);

	const upcomingMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Upcoming movies</h2>
			<div className={styles.grid}>
				{upcomingMovies.map((movie) => (
					<CardView
						id={movie.id}
						poster={movie.poster_path}
						releaseDate={movie.release_date}
						title={movie.title}
						voteAverage={movie.vote_average}
						key={movie.id}
					/>
				))}
			</div>
		</section>
	);

	const searchMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Search movies</h2>
			<div className={styles.grid}>
				{searchMovies.map((movie) => (
					<CardView
						id={movie.id}
						poster={movie.poster_path}
						releaseDate={movie.release_date}
						title={movie.title}
						voteAverage={movie.vote_average}
						key={movie.id}
					/>
				))}
			</div>
		</section>
	);

	const popularMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Popular movies</h2>
			<div className={styles.grid}>
				{popularMovies.map((movie) => (
					<CardView
						id={movie.id}
						poster={movie.poster_path}
						releaseDate={movie.release_date}
						title={movie.title}
						voteAverage={movie.vote_average}
						key={movie.id}
					/>
				))}
			</div>
		</section>
	);

	const topRatedMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Top rated movies</h2>
			<div className={styles.grid}>
				{topRatedMovies.map((movie) => (
					<CardView
						id={movie.id}
						poster={movie.poster_path}
						releaseDate={movie.release_date}
						title={movie.title}
						voteAverage={movie.vote_average}
						key={movie.id}
					/>
				))}
			</div>
		</section>
	);

	const onChangeSelectedSection = (): void => {
		if (section === "upcoming") {
			setSelectedSection(upcomingMoviesSection);
		}
		if (section === "popular") {
			setSelectedSection(popularMoviesSection);
		}
		if (section === "top_rated") {
			setSelectedSection(topRatedMoviesSection);
		}
		if (section === "search") {
			setSelectedSection(searchMoviesSection);
		}
	};

	useEffect(() => {
		onChangeSelectedSection();
	}, [section, status]);

	return (
		<>
			{status === "loading" && <p className={styles.message}>Loading...</p>}
			{status === "error" && <p className={styles.error}>Something went wrong</p>}
			{status === "ok" && (
				<HomeView
					popularMovies={popularMovies}
					onEnteredText={onEnteredText}
					searchedMovies={searchMovies}
					selectedSection={selectedSection}
					onSubmit={(event) => {
						void (async () => {
							await onSubmit(event);
						})();
					}}
					onChangeSection={changeSectionHandler}
					section={section}
					status={status}
				/>
			)}
		</>
	);
};

export default HomeContainer;
