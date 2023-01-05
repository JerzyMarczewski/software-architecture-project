import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import { UpcomingMovie } from "../helpers/types";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

export const MOVIE_DB_IMAGE_URL = {
	small: "https://image.tmdb.org/t/p/w185",
	medium: "https://image.tmdb.org/t/p/w300",
	large: "https://image.tmdb.org/t/p/w1280",
	original: "https://image.tmdb.org/t/p/original",
};

const HomeView: React.FC<{
	upcomingMovies: UpcomingMovie[];
	popularMovies: UpcomingMovie[];
	topRatedMovies: UpcomingMovie[];
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onEnteredText: (event: ChangeEvent<HTMLInputElement>) => void;
	searchedMovies: UpcomingMovie[];
}> = ({
	upcomingMovies,
	popularMovies,
	topRatedMovies,
	onSubmit,
	onEnteredText,
	searchedMovies,
}): ReactElement => {
	if (upcomingMovies.length === 0 || popularMovies.length === 0 || topRatedMovies.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>Let&apos;s find your movie or tv series</h1>
				<img
					className={styles.hero}
					src={`https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path}`}
				/>
				<div className={styles.backdrop}></div>
			</header>
			<form onSubmit={onSubmit} className={styles.form}>
				<input type="text" onChange={onEnteredText} className={styles.input} />
				<button type="submit" className={styles.button}>
					Search
				</button>
			</form>
			<div className={styles.main}>
				{searchedMovies.length === 0 ? (
					<section>
						<h2 className={styles["section-header"]}>Upcoming movies</h2>
						<div className={styles.cards}>
							{upcomingMovies.map((movie) => (
								<Link to={`/movies/${movie.id}`} key={movie.id}>
									<div className={styles.card}>
										<img
											className={styles["card-img"]}
											src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
										/>
										<div className={styles["card-body"]}>
											<div>{movie.release_date.slice(0, 4)}</div>
											<h3>{movie.title}</h3>
										</div>
									</div>
								</Link>
							))}
						</div>
					</section>
				) : (
					<section>
						<h2 className={styles["section-header"]}>Search movies</h2>
						<div className={styles.cards}>
							{searchedMovies.map((movie) => (
								<Link to={`/movies/${movie.id}`} key={movie.id}>
									<div className={styles.card}>
										<img
											className={styles["card-img"]}
											src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
										/>
										<div className={styles["card-body"]}>
											<div>{movie.release_date.slice(0, 4)}</div>
											<h3>{movie.title}</h3>
										</div>
									</div>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
};

export default HomeView;
