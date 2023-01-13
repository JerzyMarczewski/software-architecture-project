import React, { ReactElement } from "react";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Movie.module.css";

const MovieView: React.FC<{
	isLoaded: boolean;
	header: JSX.Element;
	overview: JSX.Element;
	cast: JSX.Element;
	suggestions: JSX.Element;
}> = ({ isLoaded, header, overview, cast, suggestions }): ReactElement => {
	if (!isLoaded) return <div>Loading...</div>;

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
