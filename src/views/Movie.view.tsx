import React, { ReactElement } from "react";
import { Movie, MovieCredits, SimilarMovies } from "../helpers/types";

const MovieView: React.FC<{
	movie: Movie | undefined;
	credits: MovieCredits | undefined;
	similar: SimilarMovies | undefined;
}> = ({ movie, credits, similar }): ReactElement => {
	if (movie === undefined) return <div>Loading...</div>;

	const image: JSX.Element | null =
		movie.backdrop_path !== null ? (
			<img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt="" />
		) : null;

	const director: string =
		credits?.crew.find((person) => person.job === "Director")?.name ?? "unknown";
	const writer: string = credits?.crew.find((person) => person.job === "Writer")?.name ?? "unknown";
	const genres: string = Object.keys(movie.genres)
		.map((key: number | string) => movie.genres[key as number].name)
		.join(", ");
	const production: string = Object.keys(movie?.production_countries)
		.map((key: number | string) => movie.production_countries[key as number].name)
		.join(", ");
	const release: string = movie?.release_date ?? "unknown";

	const cast = credits?.cast.map((character) => (
		<div key={character.cast_id}>
			{character.profile_path !== null ? (
				<img src={`https://image.tmdb.org/t/p/w300${character.profile_path}`} alt="" />
			) : null}

			<p>{character.name}</p>
			<p>{character.character}</p>
		</div>
	));

	const info = (
		<div>
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
	);

	return (
		<div>
			{image}
			<p>{movie.overview}</p>
			{info}
			{cast}
		</div>
	);
};

export default MovieView;
