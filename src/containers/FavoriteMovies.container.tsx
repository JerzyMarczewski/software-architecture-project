import { ReactElement, useContext } from "react";
import FavoriteMoviesView from "../views/FavoriteMovies.view";
import { FavoriteMoviesContext } from "../context/favorite-movies-context";

const FavoriteMoviesContainer = (): ReactElement => {
	const { movies } = useContext(FavoriteMoviesContext);

	window.scrollTo(0, 0);

	return <FavoriteMoviesView movies={movies} />;
};

export default FavoriteMoviesContainer;
