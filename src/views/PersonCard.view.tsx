import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { CastMember } from "../helpers/types";
import styles from "./PersonCard.module.css";

const PersonCardView: React.FC<{
	person: CastMember;
}> = ({ person }): ReactElement => {
	return (
		<Link to={`/actors/${person.id}`} className={styles.personCard}>
			{person.profile_path !== null ? (
				<img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt="" />
			) : (
				<div className={styles.blankImage}></div>
			)}

			<div className={styles.text}>
				<h2>{person.name}</h2>
				<p>{person.character}</p>
			</div>
		</Link>
	);
};

export default PersonCardView;
