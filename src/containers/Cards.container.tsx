import { Movie } from "../helpers/types";
import { ReactElement } from "react";
import CardView from "../views/Card.view";
import replacementImage from "../assets/question-solid.svg";

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
						voteAverage={movie?.vote_average ?? 0}
						key={movie?.id}
					/>
				);
			})}
		</>
	);
};

export default CardsContainer;