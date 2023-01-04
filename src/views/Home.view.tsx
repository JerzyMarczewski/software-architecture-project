import React, { ReactElement } from "react";
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
}> = ({ upcomingMovies, popularMovies, topRatedMovies }): ReactElement => {
	if (upcomingMovies.length === 0 || popularMovies.length === 0 || topRatedMovies.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>The first online streaming movie search engine</h1>
			</header>
			<div className={styles.main}>
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
									<h2>{movie.title}</h2>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeView;
