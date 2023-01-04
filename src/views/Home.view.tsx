import React, { ReactElement } from "react";
import { UpcomingMovie } from "../helpers/types";

const HomeView: React.FC<{
	upcomingMovies: UpcomingMovie[];
	popularMovies: UpcomingMovie[];
	topRatedMovies: UpcomingMovie[];
}> = ({ upcomingMovies, popularMovies, topRatedMovies }): ReactElement => {
	if (upcomingMovies.length === 0 || popularMovies.length === 0 || topRatedMovies.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{upcomingMovies.map((movie) => (
				<div key={movie.id}>{movie.title}</div>
			))}
		</div>
	);
};

export default HomeView;
