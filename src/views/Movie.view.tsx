import React, { ReactElement } from "react";

const MovieView: React.FC<{ movieId: string }> = ({ movieId }): ReactElement => {
	return <div>Movie id: {movieId}</div>;
};

export default MovieView;
