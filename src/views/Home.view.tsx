import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import { Section, Status, UpcomingMovie } from "../helpers/types";
import styles from "./home.module.css";
import arrow from "../assets/arrow-down-solid.svg";

export const MOVIE_DB_IMAGE_URL = {
	small: "https://image.tmdb.org/t/p/w185",
	medium: "https://image.tmdb.org/t/p/w300",
	large: "https://image.tmdb.org/t/p/w1280",
	original: "https://image.tmdb.org/t/p/original",
};

const HomeView: React.FC<{
	popularMovies: UpcomingMovie[];
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onEnteredText: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeSection: (section: Section) => void;
	searchedMovies: UpcomingMovie[];
	section: Section;
	status: Status;
	selectedSection: JSX.Element | undefined;
}> = ({
	popularMovies,
	status,
	onSubmit,
	onEnteredText,
	onChangeSection,
	selectedSection,
}): ReactElement => {
	if (status === "loading") {
		return <div className={styles.message}>Loading...</div>;
	}

	if (status === "error") {
		return <div className={styles.error}>Something went wrong! Try later!</div>;
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>Let&apos;s find your movie or tv series</h1>
					<h2>{popularMovies[0].title}</h2>
				</div>
				<img
					className={styles["hero-image"]}
					src={`https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path}`}
				/>
				<div className={styles.backdrop}></div>

				<div className={styles.scroll}>
					<img src={arrow} alt="Scroll down" />
				</div>
			</header>
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					type="text"
					onChange={onEnteredText}
					placeholder="Search..."
					className={styles.input}
				/>
				<button type="submit" className={styles.button}>
					Search
				</button>
			</form>
			<div className={styles["button-container"]}>
				<button
					type="button"
					onClick={() => {
						onChangeSection("upcoming");
					}}
				>
					Upcoming
				</button>
				<button
					type="button"
					onClick={() => {
						onChangeSection("popular");
					}}
				>
					Popular
				</button>
				<button
					type="button"
					onClick={() => {
						onChangeSection("top_rated");
					}}
				>
					Top rated
				</button>
			</div>
			<div className={styles.main}>{selectedSection}</div>
		</div>
	);
};

export default HomeView;
