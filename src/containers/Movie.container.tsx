import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieView from "../views/Movie.view";
import axios from "axios";

interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: null | object;
	budget: number;
	genres: Array<{ id: number; name: string }>;
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: Array<{
		name: string;
		id: number;
		logo_path: string | null;
		origin_country: string;
	}>;
	production_countries: Array<{ iso_3166_1: string; name: string }>;
	release_date: string;
	revenue: number;
	runtime: number | null;
	spoken_languages: Array<{ iso_639_1: string; name: string }>;
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

const MovieContainer = (): ReactElement => {
	const { movieId } = useParams();

	const [movie, setMovie] = useState<Movie>();

	useEffect(() => {
		if (movieId === undefined) return;

		void (async () => {
			try {
				const data = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US`,
				);
				if (data.status !== 200) throw new Error();

				setMovie(data.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<MovieView movie={movie} />
		</>
	);
};

export default MovieContainer;
