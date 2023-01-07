import React, { ReactElement } from "react";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Movie, MovieCredits, SimilarMovies, Images } from "../helpers/types";
import styles from "./Movie.module.css";

const MovieView: React.FC<{
	movie: Movie | undefined;
	credits: MovieCredits | undefined;
	similar: SimilarMovies | undefined;
	images: Images | undefined;
	header: JSX.Element;
	overview: JSX.Element;
	cast: JSX.Element;
	suggestions: JSX.Element;
}> = ({ movie, credits, similar, images, header, overview, cast, suggestions }): ReactElement => {
	if (movie === undefined) return <div>Loading...</div>;

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
