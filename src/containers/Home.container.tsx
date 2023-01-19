import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from "react";
import HomeView from "../views/Home.view";
import axios from "axios";
import { Movie, Section, Status, heroImage } from "../helpers/types";
import styles from "../views/home.module.css";
import BeatLoader from "react-spinners/BeatLoader";
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
	const [page, setPage] = useState(1);

	const getMovies = async (type: Section): Promise<void> => {
		const { VITE_API_KEY } = import.meta.env;

		if (VITE_API_KEY === null) {
			return;
		}
		setStatus("loading");

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${type}?api_key=${
					VITE_API_KEY as string
				}&language=en-US&page=${page}`,
			);

			if (response.status !== 200) {
				setStatus("error");
				throw new Error(response.statusText);
			}

			window.scrollTo(0, 0);
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
		setPage(1);

		await getSearchMovies();
	};

	const getSearchMovies = async (): Promise<void> => {
		const { VITE_API_KEY } = import.meta.env;

		if (VITE_API_KEY === null) {
			return;
		}

		if (enteredText.length === 0) {
			setSearchMovies([]);
			return;
		}

		setStatus("loading");

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?api_key=${
					VITE_API_KEY as string
				}&language=en-US&page=${page}&query=${enteredText}`,
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

	const nextPageHandler = (): void => {
		setPage((prevState) => prevState + 1);
	};

	const previousPageHandler = (): void => {
		if (page === 1) {
			return;
		}
		setPage((prevState) => prevState - 1);
	};

	const onEnteredText = (event: ChangeEvent<HTMLInputElement>): void => {
		setEnteredText((event.target as HTMLInputElement).value);
	};

	const changeSectionHandler = (sectionName: Section): void => {
		setPage(1);
		setSection(sectionName);
		setEnteredText("");
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
			await getMovies("popular");
			await getMovies("upcoming");
			await getMovies("top_rated");
		})();
		if (section === "search") {
			void (async () => {
				await getSearchMovies();
			})();
		}
	}, [page]);

	useEffect(() => {
		onHeroImage();
	}, [popularMovies]);

	const upcomingMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Upcoming movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={upcomingMovies} />
			</div>
			<div className={styles["button-container"]}>
				{page !== 1 && (
					<button className={styles["prev-button"]} onClick={previousPageHandler}>
						Prev page
					</button>
				)}
				<span className={styles["page-number"]}>{page}</span>
				<button className={styles["next-button"]} onClick={nextPageHandler}>
					Next page
				</button>
			</div>
		</section>
	);

	const searchMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Search movies</h2>
			<div className={styles.grid}>
				{searchMovies.length === 0 ? (
					<p className={styles["search-message"]}>Movie not found!</p>
				) : (
					<CardsContainer movies={searchMovies} />
				)}
			</div>
			{searchMovies.length !== 0 && page !== 1 && (
				<div className={styles["button-container"]}>
					<button className={styles["prev-button"]} onClick={previousPageHandler}>
						Prev page
					</button>
					<span className={styles["page-number"]}>{page}</span>
					<button onClick={nextPageHandler}>Next page</button>
				</div>
			)}
			{searchMovies.length !== 0 && page === 1 && (
				<div className={styles["button-container"]}>
					<div></div>
					<span>{page}</span>
					<button className={styles["next-button"]} onClick={nextPageHandler}>
						Next page
					</button>
				</div>
			)}
		</section>
	);

	const popularMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Popular movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={popularMovies} />
			</div>
			<div className={styles["button-container"]}>
				{page !== 1 && (
					<button className={styles["prev-button"]} onClick={previousPageHandler}>
						Prev page
					</button>
				)}
				<span className={styles["page-number"]}>{page}</span>
				<button className={styles["next-button"]} onClick={nextPageHandler}>
					Next page
				</button>
			</div>
		</section>
	);

	const topRatedMoviesSection = (
		<section>
			<h2 className={styles["section-header"]}>Top rated movies</h2>
			<div className={styles.grid}>
				<CardsContainer movies={topRatedMovies} />
			</div>
			<div className={styles["button-container"]}>
				{page !== 1 && (
					<button className={styles["prev-button"]} onClick={previousPageHandler}>
						Prev page
					</button>
				)}
				<span className={styles["page-number"]}>{page}</span>
				<button className={styles["next-button"]} onClick={nextPageHandler}>
					Next page
				</button>
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
			{status === "loading" && (
				<p className={styles.message}>
					<BeatLoader
						color="#fff"
						loading={status === "loading"}
						size={65}
						aria-label="Loading Spinner"
					/>
				</p>
			)}
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
					onNextPage={nextPageHandler}
					onPreviousPage={previousPageHandler}
					page={page}
				/>
			)}
		</>
	);
};

export default HomeContainer;
