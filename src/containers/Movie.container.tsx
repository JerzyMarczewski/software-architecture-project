import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieView from "../views/Movie.view";
import axios from "axios";

import { Movie, MovieCredits, SimilarMovies } from "../helpers/types";

const MovieContainer = (): ReactElement => {
	const { movieId } = useParams();

	const [movie, setMovie] = useState<Movie>();
	const [credits, setCredits] = useState<MovieCredits>();
	const [similar, setSimilar] = useState<SimilarMovies>();

	useEffect(() => {
		if (movieId === undefined) return;

		void (async () => {
			const { VITE_API_KEY } = import.meta.env;
			if (VITE_API_KEY === undefined) throw new Error("No API key");
			try {
				const movieResponse = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}?api_key=${
						VITE_API_KEY as string
					}&language=en-US`,
				);
				if (movieResponse.status !== 200) throw new Error();
				setMovie(movieResponse.data);

				const creditsResponse = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
						VITE_API_KEY as string
					}&language=en-US`,
				);
				if (creditsResponse.status !== 200) throw new Error();
				setCredits(creditsResponse.data);

				const similarResponse = await axios.get(
					`
					https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${
						VITE_API_KEY as string
					}&language=en-US&page=1`,
				);
				if (similarResponse.status !== 200) throw new Error();
				setSimilar(similarResponse.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<MovieView movie={movie} credits={credits} similar={similar} />
		</>
	);
};

export default MovieContainer;
