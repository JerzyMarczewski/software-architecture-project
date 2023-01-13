import React, { ReactElement } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
import heartIcon from "../assets/heart-solid.svg";

const CardView: React.FC<{
	id: number;
	poster: string;
	title: string;
	releaseDate: string;
	voteAverage: number;
	onAddFavorite: (
		id: number,
		poster: string,
		releaseDate: string,
		title: string,
		voteAverage: number,
	) => void;
}> = ({ id, poster, releaseDate, title, voteAverage, onAddFavorite }): ReactElement => {
	return (
		<div className={styles.container}>
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
			<button
				onClick={() => {
					onAddFavorite(id, poster, releaseDate, title, voteAverage);
				}}
				title="Add to favorite"
				className={styles["card-button"]}
				type="button"
			>
				<img src={heartIcon} alt="Heart" />
			</button>
		</div>
	);
};

export default CardView;
