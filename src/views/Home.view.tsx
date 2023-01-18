import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import { Section, Status, heroImage } from "../helpers/types";
import styles from "./home.module.css";
import arrow from "../assets/arrow-down-solid.svg";

export const MOVIE_DB_IMAGE_URL = {
	small: "https://image.tmdb.org/t/p/w185",
	medium: "https://image.tmdb.org/t/p/w300",
	large: "https://image.tmdb.org/t/p/w1280",
	original: "https://image.tmdb.org/t/p/original",
};

const HomeView: React.FC<{
	heroImage: heroImage;
	page: number;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onEnteredText: (event: ChangeEvent<HTMLInputElement>) => void;
	onChangeSection: (section: Section) => void;
	section: Section;
	status: Status;
	selectedSection: JSX.Element | undefined;
	onNextPage: () => void;
	onPreviousPage: () => void;
}> = ({
	status,
	onSubmit,
	onEnteredText,
	onChangeSection,
	onNextPage,
	onPreviousPage,
	selectedSection,
	heroImage,
	page,
}): ReactElement => {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles["hero-container"]}>
					<h1>Let&apos;s find your movie</h1>
					<h2>{heroImage.title}</h2>
				</div>
				<img
					className={styles["hero-image"]}
					src={`https://image.tmdb.org/t/p/original${heroImage.backdropPath}`}
				/>
				<div className={styles["arrow-down"]}>
					<img src={arrow} alt="Arrow down" />
				</div>
			</header>
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					type="text"
					onChange={onEnteredText}
					placeholder="Search..."
					className={styles.input}
				/>
				<button type="submit" className={styles["submit-button"]}>
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
