import React, { ReactElement } from "react";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Movie, MovieCredits, SimilarMovies, Images } from "../helpers/types";
import styles from "./Movie.module.css";
import PersonCardView from "./PersonCard.view";

const MovieView: React.FC<{
	movie: Movie | undefined;
	credits: MovieCredits | undefined;
	similar: SimilarMovies | undefined;
	images: Images | undefined;
	header: JSX.Element;
}> = ({ movie, credits, similar, images, header }): ReactElement => {
	if (movie === undefined) return <div>Loading...</div>;

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
		<div className={styles.movieView}>
			{header}
			{overview}
			{cast}
			{suggestions}
		</div>
	);
};

export default MovieView;
