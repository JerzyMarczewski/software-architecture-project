import { Movie } from "../helpers/types";
import { ReactElement } from "react";
import CardView from "../views/Card.view";
import replacementImage from "../assets/question-solid.svg";
import { addToFavoritesHandler } from "../utils/utils";

const CardsContainer: React.FC<{ movies: Array<Partial<Movie>> }> = ({ movies }): ReactElement => {
	if (movies === undefined) {
		return <></>;
	}

	return (
		<>
			{movies.map((movie) => {
				let poster: string;

				if (movie?.poster_path === null) {
					poster = replacementImage;
				} else {
					poster = `https://image.tmdb.org/t/p/w300${movie?.poster_path ?? ""}`;
				}

				return (
					<CardView
						id={movie?.id ?? -1}
						poster={poster}
						releaseDate={movie?.release_date ?? ""}
						title={movie?.title ?? ""}
						voteAverage={+(movie?.vote_average?.toFixed(1) ?? "")}
						key={movie?.id}
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onAddFavorite={addToFavoritesHandler}
					/>
				);
			})}
		</>
	);
};

export default CardsContainer;
