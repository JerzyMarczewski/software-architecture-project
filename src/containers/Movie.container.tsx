import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieView from "../views/Movie.view";
import axios from "axios";

import {Movie} from "../helpers/types"

const MovieContainer = (): ReactElement => {
	const { movieId } = useParams();

	const [movie, setMovie] = useState<Movie>();

	useEffect(() => {
		if (movieId === undefined) return;

		void (async () => {
			try {
				const data = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US`,
				);
				if (data.status !== 200) throw new Error();

				setMovie(data.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<MovieView movie={movie} />
		</>
	);
};

export default MovieContainer;
