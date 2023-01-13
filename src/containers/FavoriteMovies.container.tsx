import { ReactElement, useEffect, useState } from "react";
import { supabase } from "../helpers/supabaseClient";
import { Movie } from "../helpers/types";
import FavoriteMoviesView from "../views/FavoriteMovies.view";

const FavoriteMoviesContainer = (): ReactElement => {
	const [favoriteMovies, setFavoriteMovies] = useState<Array<Partial<Movie>>>([]);

	const getFavoriteMovies = async (): Promise<void> => {
		try {
			const userId = (await supabase.auth.getUser())?.data.user?.id;

			const { data, error, statusText } = await supabase
				.from("movie")
				.select()
				.eq("userId", userId);

			if (error !== null) {
				throw new Error(statusText);
			}

			setFavoriteMovies(data);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	useEffect(() => {
		void (async () => {
			await getFavoriteMovies();
		})();
	}, []);

	return <FavoriteMoviesView movies={favoriteMovies} />;
};

export default FavoriteMoviesContainer;
