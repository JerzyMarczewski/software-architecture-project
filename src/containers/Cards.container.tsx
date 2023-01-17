import { Movie } from "../helpers/types";
import { ReactElement, useContext } from "react";
import CardView from "../views/Card.view";
import replacementImage from "../assets/question-solid.svg";
// import { addToFavoritesHandler } from "../utils/utils";
import { FavoriteMoviesContext } from "../context/favorite-movies-context";
import { supabase } from "../helpers/supabaseClient";

const CardsContainer: React.FC<{ movies: Array<Partial<Movie>> }> = ({ movies }): ReactElement => {
	const { refetch, movies: favoriteMovies } = useContext(FavoriteMoviesContext);

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

			const movieFound = favoriteMovies.find((movie) => movie.id === id);

			if (userId === undefined) {
				alert("Please log in!");
				return;
			}

			if (movieFound !== undefined) {
				const { error } = await supabase.from("movie").delete().eq("id", id);

				if (error !== null) {
					throw new Error(error.message);
				}

				refetch();
				return;
			}

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

			refetch();
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	if (movies === undefined) {
		return <></>;
	}

	return (
		<>
			{movies.map((movie) => {
				let poster: string;
				const isFavorite = favoriteMovies.find((mov) => mov.id === movie.id);

				const classes: string = !(isFavorite == null) ? "red-bg" : "";

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
						classes={classes}
					/>
				);
			})}
		</>
	);
};

export default CardsContainer;
