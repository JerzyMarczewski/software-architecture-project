import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieView from "../views/Movie.view";
import axios from "axios";

import styles from "../views/Movie.module.css";

import { Movie, MovieCredits } from "../helpers/types";
import PersonCardView from "../views/PersonCard.view";
import { Link } from "react-router-dom";
import CardsContainer from "./Cards.container";

const MovieContainer = (): ReactElement => {
	const { movieId } = useParams();

	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [movie, setMovie] = useState<Movie>();
	const [credits, setCredits] = useState<MovieCredits>();
	const [similar, setSimilar] = useState<Array<Partial<Movie>>>();
	// const [images, setImages] = useState<Images>();
	const [showFullCast, setShowFullCast] = useState<boolean>(false);
	const [showFullSuggestions, setShowFullSuggestions] = useState<boolean>(false);

	useEffect(() => {
		if (movieId === undefined) return;

		window.scrollTo(0, 0);
		setIsLoaded(false);
		setShowFullCast(false);
		setShowFullSuggestions(false);

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
				setSimilar(similarResponse.data.results);

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
	}, [movieId]);

	const image =
		movie?.poster_path !== undefined ? (
			<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path as string}`} alt="" />
		) : null;

	const director = (): JSX.Element => {
		const result = credits?.crew.find((person) => person.job === "Director");

		if (result === undefined) return <div>N/A</div>;

		return (
			<div className={styles.writer}>
				<Link key={result.id} to={`/people/${result.id}`}>
					{result.name},
				</Link>
			</div>
		);
	};

	const writer = (): JSX.Element => {
		const usedIds: number[] = [];
		const result = credits?.crew.filter((person) => {
			const filtered =
				person.department === "Writing" &&
				(person.job === "Writer" || person.job === "Story" || person.job === "Screenplay");

			if (usedIds.includes(person.id)) return false;

			usedIds.push(person.id);
			return filtered;
		});

		if (result === undefined || result?.length === 0)
			return <div className={styles.writer}>N/A</div>;
		else
			return (
				<div className={styles.writer}>
					{result.map((person) => (
						<Link key={person.id} to={`/people/${person.id}`}>
							{person.name},
						</Link>
					))}
				</div>
			);
	};

	const genres: string =
		movie !== undefined
			? Object.keys(movie?.genres)
					.map((key: number | string) => movie.genres[key as number].name)
					.join(", ")
			: "N/A";

	const production: string =
		movie !== undefined
			? Object.keys(movie?.production_countries)
					.map((key: number | string) => movie.production_countries[key as number].name)
					.join(", ")
			: "N/A";

	const release: string = movie?.release_date ?? "N/A";

	const overview = (
		<div className={styles.overviewContainer}>
			<h3>Overview:</h3>
			<div className={styles.overview}>{movie?.overview}</div>
		</div>
	);

	const header = (
		<div className={styles.header}>
			{image}
			<div className={styles.infoAndTitle}>
				<h1>{movie?.title}</h1>
				<div className={styles.infoContainer}>
					<div>Director</div>
					<div>{director()}</div>
					<div>Writer</div>
					<div>{writer()}</div>
					<div>Genre</div>
					<div>{genres}</div>
					<div>Production</div>
					<div>{production}</div>
					<div>Release</div>
					<div>{release}</div>
				</div>
				{overview}
			</div>
		</div>
	);

	const showMoreCastButton =
		credits !== undefined
			? credits?.cast?.length > 6
				? showFullCast
					? "show less"
					: "show more"
				: null
			: null;

	const cast = (
		<div className={styles.castContainer}>
			<h3>Cast:</h3>
			<div className={styles.cast}>
				{showFullCast
					? credits?.cast.map((person) => <PersonCardView key={person.cast_id} person={person} />)
					: credits?.cast
							.slice(0, 6)
							.map((person) => <PersonCardView key={person.cast_id} person={person} />)}
			</div>
			<p
				className={styles.showMore}
				onClick={() => {
					setShowFullCast(!showFullCast);
				}}
			>
				{showMoreCastButton}
			</p>
		</div>
	);

	const suggestions = (
		<div className={styles.suggestions}>
			<h3>You may also like:</h3>
			<div className={styles.grid}>
				{similar !== undefined ? (
					<CardsContainer movies={similar?.slice(0, showFullSuggestions ? -2 : 4)} />
				) : null}
			</div>
			<p
				className={styles.showMore} // change
				onClick={() => {
					setShowFullSuggestions(!showFullSuggestions);
				}}
			>
				{showFullSuggestions ? "show less" : "show more"}
			</p>
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
