import { ReactElement } from "react";
import { Movie } from "../helpers/types";
import CardsContainer from "../containers/Cards.container";
import styles from "./favorite.module.css";

const FavoriteMoviesView: React.FC<{ movies: Array<Partial<Movie>> }> = ({
	movies,
}): ReactElement => {
	return (
		<div className={styles.container}>
			<h1>Your favorite movies</h1>
			<div className={styles.grid}>
				<CardsContainer movies={movies} />
			</div>
		</div>
	);
};

export default FavoriteMoviesView;
