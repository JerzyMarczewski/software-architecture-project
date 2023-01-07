import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieView from "../views/Movie.view";
import axios from "axios";

import styles from "../views/Movie.module.css";

import { Movie, MovieCredits, SimilarMovies } from "../helpers/types";
import PersonCardView from "../views/PersonCard.view";

const MovieContainer = (): ReactElement => {
	const { movieId } = useParams();

	const [isLoaded, setIsLoaded] = useState<Boolean>(false);
	const [movie, setMovie] = useState<Movie>();
	const [credits, setCredits] = useState<MovieCredits>();
	const [similar, setSimilar] = useState<SimilarMovies>();
	// const [images, setImages] = useState<Images>();

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

				// const imagesResponse = await axios.get(
				// 	`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${
				// 		VITE_API_KEY as string
				// 	}&language=en-US`,
				// );
				// if (imagesResponse.status !== 200) throw new Error();
				// console.log(imagesResponse.data);
				// setImages(imagesResponse.data);

				setIsLoaded(true);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const image =
		movie?.poster_path !== undefined ? (
			<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path as string}`} alt="" />
		) : null;

	const director: string =
		credits?.crew.find((person) => person.job === "Director")?.name ?? "unknown";

	const writer: string =
		credits?.crew
			.filter((person) => person.department === "Writing" && person.job === "Story")
			.map((person) => person.name)
			.join(", ") ?? "unknown";

	const genres: string =
		movie !== undefined
			? Object.keys(movie?.genres)
					.map((key: number | string) => movie.genres[key as number].name)
					.join(", ")
			: "";

	const production: string =
		movie !== undefined
			? Object.keys(movie?.production_countries)
					.map((key: number | string) => movie.production_countries[key as number].name)
					.join(", ")
			: "";

	const release: string = movie?.release_date ?? "unknown";

	const header = (
		<div className={styles.header}>
			{image}
			<div className={styles.infoAndTitle}>
				<h1>{movie?.title}</h1>
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
			<div className={styles.overview}>{movie?.overview}</div>
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

	const suggestions = (
		<div className={styles.suggestions}>
			<h3>You may also like:</h3>
			{similar?.results.map((suggestion) => (
				<div key={suggestion.id}>
					{suggestion.poster_path !== null ? (
						<img src={`https://image.tmdb.org/t/p/w200${suggestion.poster_path}`} alt="" />
					) : null}
					<p>{suggestion.vote_average.toFixed(1)}</p>
					<p>{suggestion.title}</p>
				</div>
			))}
		</div>
	);

	return (
		<>
			<MovieView
				isLoaded={isLoaded}
				header={header}
				overview={overview}
				cast={cast}
				suggestions={suggestions}
			/>
		</>
	);
};

export default MovieContainer;
