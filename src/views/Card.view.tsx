import { UpcomingMovie } from "../helpers/types";
import React, { ReactElement } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

const CardView: React.FC<{ movie: UpcomingMovie }> = ({ movie }): ReactElement => {
	return (
		<Link to={`/movies/${movie.id}`}>
			<div className={styles.card}>
				<img
					className={styles["card-img"]}
					src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
				/>
				<div className={styles["card-body"]}>
					<div>{movie.release_date.slice(0, 4)}</div>
					<h3>{movie.title}</h3>
				</div>
			</div>
		</Link>
	);
};

export default CardView;
