import React, { ReactElement } from "react";
import { Movie, MovieCredits, SimilarMovies } from "../helpers/types";
import styles from "./Movie.module.css";
import PersonCardView from "./PersonCard.view";

const MovieView: React.FC<{
	movie: Movie | undefined;
	credits: MovieCredits | undefined;
	similar: SimilarMovies | undefined;
}> = ({ movie, credits, similar }): ReactElement => {
	if (movie === undefined) return <div>Loading...</div>;

	const image: JSX.Element | null =
		movie.poster_path !== null ? (
			<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
		) : null;

	const director: string =
		credits?.crew.find((person) => person.job === "Director")?.name ?? "unknown";

	const writer: string =
		credits?.crew
			.filter((person) => person.department === "Writing" && person.job === "Story")
			.map((person) => person.name)
			.join(", ") ?? "unknown";

	const genres: string = Object.keys(movie.genres)
		.map((key: number | string) => movie.genres[key as number].name)
		.join(", ");

	const production: string = Object.keys(movie?.production_countries)
		.map((key: number | string) => movie.production_countries[key as number].name)
		.join(", ");

	const release: string = movie?.release_date ?? "unknown";

	const header = (
		<div className={styles.header}>
			{image}
			<div className={styles.infoAndTitle}>
				<h1>{movie.title}</h1>
				<div className={styles.infoContainer}>
					<div>Director</div>
					<div>{director}</div>
					<div>Writer</div>
					<div>{writer}</div>
					<div>Genre</div>
					<div>{genres}</div>
					<div>Production</div>
					<div>{production}</div>
					<div>Release</div>
					<div>{release}</div>
				</div>
			</div>
		</div>
	);

	const overview = (
		<div className={styles.overviewContainer}>
			<h3>Overview:</h3>
			<div className={styles.overview}>{movie.overview}</div>
		</div>
	);

	const cast = (
		<div className={styles.castContainer}>
			<h3>Cast:</h3>
			<div className={styles.cast}>
				{credits?.cast.map((person) => (
					<PersonCardView key={person.cast_id} person={person} />
				))}
			</div>
		</div>
	);

	const suggestions = similar?.results.map((suggestion) => (
		<div key={suggestion.id}>
			{suggestion.poster_path !== null ? (
				<img src={`https://image.tmdb.org/t/p/w200${suggestion.poster_path}`} alt="" />
			) : null}
			<p>{suggestion.vote_average.toFixed(1)}</p>
			<p>{suggestion.title}</p>
		</div>
	));

	return (
		<div className={styles.movieView}>
			{header}
			{overview}
			{cast}
			{suggestions}
		</div>
	);
};

export default MovieView;
