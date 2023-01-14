import { supabase } from "../helpers/supabaseClient";

export const addToFavoritesHandler = async (
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
