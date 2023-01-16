import { ReactElement, useContext } from "react";
import FavoriteMoviesView from "../views/FavoriteMovies.view";
import { FavoriteMoviesContext } from "../context/favorite-movies-context";

const FavoriteMoviesContainer = (): ReactElement => {
	const { movies } = useContext(FavoriteMoviesContext);

	// const getFavoriteMovies = async (): Promise<void> => {
	// 	setStatus("loading");

	// 	try {
	// 		const userId = (await supabase.auth.getUser())?.data.user?.id;

	// 		const { data, error, statusText } = await supabase
	// 			.from("movie")
	// 			.select()
	// 			.eq("userId", userId);

	// 		if (error !== null) {
	// 			setStatus("error");
	// 			throw new Error(statusText);
	// 		}

	// 		setStatus("ok");
	// 		setFavoriteMovies(data);
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			alert(error.message);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	void (async () => {
	// 		await getFavoriteMovies();
	// 	})();
	// }, []);

	return <FavoriteMoviesView movies={movies} />;
};

export default FavoriteMoviesContainer;
