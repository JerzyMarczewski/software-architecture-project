import { ReactElement, createContext, useEffect, useState } from "react";
import { Movie } from "../helpers/types";
import { supabase } from "../helpers/supabaseClient";

interface IFavoriteMoviesContext {
	movies: Array<Partial<Movie>>;
	setMovies: (movies: Array<Partial<Movie>>) => void;
	refetch: () => void;
}

export const FavoriteMoviesContext = createContext<IFavoriteMoviesContext>({
	movies: [],
	setMovies: (movies: Array<Partial<Movie>>) => {},
	refetch: () => {},
});

const FavoriteMoviesProvider: React.FC<{ children: JSX.Element }> = ({
	children,
}): ReactElement => {
	const [movies, setMovies] = useState<Array<Partial<Movie>>>([]);

	const getFavoriteMovies = async (): Promise<void> => {
		try {
			const userId = (await supabase.auth.getUser())?.data.user?.id;

			if (userId === undefined) {
				return;
			}

			const { data, error, statusText } = await supabase
				.from("movie")
				.select()
				.eq("userId", userId);

			if (error !== null) {
				// setStatus("error");
				throw new Error(statusText);
			}

			// setStatus("ok");
			setMovies(data);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	const refetch = async (): Promise<void> => {
		await getFavoriteMovies();
	};

	useEffect(() => {
		void (async () => {
			await getFavoriteMovies();
		})();
	}, []);

	const value = {
		movies,
		setMovies,
		refetch,
	};

	return <FavoriteMoviesContext.Provider value={value}>{children}</FavoriteMoviesContext.Provider>;
};

export default FavoriteMoviesProvider;
