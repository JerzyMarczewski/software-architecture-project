import { Movie } from "../helpers/types";
import { ReactElement } from "react";
import CardView from "../views/Card.view";
import replacementImage from "../assets/question-solid.svg";
import { supabase } from "../helpers/supabaseClient";

const CardsContainer: React.FC<{ movies: Array<Partial<Movie>> }> = ({ movies }): ReactElement => {
	if (movies === undefined) {
		return <></>;
	}

	const addToFavoritesHandler = async (
		id: number,
		poster: string,
		releaseDate: string,
		title: string,
		voteAverage: number,
	): Promise<void> => {
		try {
			const userId = (await supabase.auth.getUser())?.data.user?.id;
			const shortenPosterPath = poster.split("w300").at(-1);

			const { error } = await supabase.from("movie").insert({
				id,
				poster_path: shortenPosterPath,
				release_date: releaseDate,
				title,
				vote_average: voteAverage,
				userId,
			});

			if (error !== null) {
				throw new Error(error.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

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
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onAddFavorite={addToFavoritesHandler}
					/>
				);
			})}
		</>
	);
};

export default CardsContainer;
