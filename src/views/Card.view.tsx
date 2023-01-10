import React, { ReactElement } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

const CardView: React.FC<{
	id: number;
	poster: string;
	title: string;
	releaseDate: string;
	voteAverage: number;
}> = ({ id, poster, releaseDate, title, voteAverage }): ReactElement => {
	return (
		<Link to={`/movies/${id}`}>
			<div className={styles.card}>
				<img className={styles["card-img"]} src={poster} />
				<div className={styles["card-body"]}>
					<h3>{title}</h3>
					<p>{releaseDate.slice(0, 4)}</p>
					<p>{voteAverage}/10</p>
				</div>
			</div>
		</Link>
	);
};

export default CardView;
