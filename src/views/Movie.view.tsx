import React, { ReactElement } from "react";
import { Movie } from "../helpers/types";

const MovieView: React.FC<{ movie: Movie | undefined }> = ({ movie }): ReactElement => {
	if (movie === undefined) return <div>Loading...</div>;

	return <div>Movie id: {movie.title}</div>;
};

export default MovieView;
