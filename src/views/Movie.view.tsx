import React, { ReactElement } from "react";
import { Movie, MovieCredits, SimilarMovies } from "../helpers/types";

const MovieView: React.FC<{
	movie: Movie | undefined;
	credits: MovieCredits | undefined;
	similar: SimilarMovies | undefined;
}> = ({ movie, credits, similar }): ReactElement => {
	if (movie === undefined) return <div>Loading...</div>;

	const image =
		movie.backdrop_path !== null ? (
			<img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt="" />
		) : null;

	return <div>{image}</div>;
};

export default MovieView;
