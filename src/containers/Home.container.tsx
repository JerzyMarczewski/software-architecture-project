import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from "react";
import HomeView from "../views/Home.view";
import axios from "axios";
import { Movie, Section, Status, heroImage } from "../helpers/types";
import styles from "../views/home.module.css";
import CardsContainer from "./Cards.container";

const HomeContainer = (): ReactElement => {
	const [upcomingMovies, setUpcomingMovies] = useState<Array<Partial<Movie>>>([]);
	const [popularMovies, setPopularMovies] = useState<Array<Partial<Movie>>>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<Array<Partial<Movie>>>([]);
	const [searchMovies, setSearchMovies] = useState<Array<Partial<Movie>>>([]);
	const [enteredText, setEnteredText] = useState("");
	const [section, setSection] = useState<Section>("upcoming");
	const [status, setStatus] = useState<Status>("loading");
	const [selectedSection, setSelectedSection] = useState<JSX.Element>();
	const [heroImage, setHeroImage] = useState<heroImage>({
		title: "",
		backdropPath: "",
	});

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

	const onHeroImage = (): void => {
		const filteredMovies = popularMovies.filter((movie) => movie.backdrop_path);

		const randomIndex = Math.floor(Math.random() * filteredMovies.length);

		setHeroImage({
			title: filteredMovies.at(randomIndex)?.title ?? "",
			backdropPath: filteredMovies.at(randomIndex)?.backdrop_path ?? "",
		});
	};

	useEffect(() => {
		void (async () => {
			await getUpcomingMovies("popular");
			await getUpcomingMovies("upcoming");
			await getUpcomingMovies("top_rated");
		})();
	}, []);

	useEffect(() => {
		onHeroImage();
	}, [popularMovies]);

	const upcomingMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Upcoming movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={upcomingMovies} />
			</div>
		</section>
	);

	const searchMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Search movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={searchMovies} />
			</div>
		</section>
	);

	const popularMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Popular movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={popularMovies} />
			</div>
		</section>
	);

	const topRatedMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Top rated movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={topRatedMovies} />
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
					heroImage={heroImage}
					onEnteredText={onEnteredText}
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
