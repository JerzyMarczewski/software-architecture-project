import { ReactElement } from "react";
import { useParams } from "react-router";
import MovieView from "../views/Movie.view";

const MovieContainer = (): ReactElement => {
	const { movieId } = useParams();

	return (
		<>
			<MovieView movieId={movieId ?? ""} />
		</>
	);
};

export default MovieContainer;
