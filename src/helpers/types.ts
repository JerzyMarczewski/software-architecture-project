export interface UpcomingMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: string;
	vote_average: number;
	vote_count: number;
	genres: string[];
}

export interface Movie {
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

export interface Actor {
	birthday: string | null;
	known_for_department: string;
	deathday: null | string;
	id: number;
	name: string;
	also_known_as: string[];
	gender: number;
	biography: string;
	popularity: number;
	place_of_birth: string | null;
	profile_path: string | null;
	adult: boolean;
	imdb_id: string;
	homepage: null | string;
}

export interface CastMember {
	adult: boolean;
	gender: number | null;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface CrewMember {
	adult: boolean;
	gender: number | null;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
	department: string;
	job: string;
}

export interface MovieCredits {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}

export interface SimilarMovies {
	page: number;
	results: Array<{
		poster_path: string | null;
		adult: boolean;
		overview: string;
		release_date: string;
		genre_ids: number[];
		id: number;
		original_title: string;
		original_language: string;
		title: string;
		backdrop_path: string | null;
		popularity: number;
		vote_count: number;
		video: boolean;
		vote_average: number;
	}>;
	total_pages: number;
	total_results: number;
}

export interface Images {
	id: number;
	backdrops: Array<{
		aspect_ratio: number;
		file_path: string;
		height: number;
		iso_639_1: null | string;
		vote_average: number;
		vote_count: number;
		width: number;
	}>;
	posters: Array<{
		aspect_ratio: number;
		file_path: string;
		height: number;
		iso_639_1: string | null;
		vote_average: number;
		vote_count: number;
		width: number;
	}>;
}

export type Section = "top_rated" | "popular" | "upcoming";

export type Status = "loading" | "error" | "ok";
