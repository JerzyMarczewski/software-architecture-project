import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { CastMember } from "../helpers/types";
import styles from "./PersonCard.module.css";
import uknownProfile from "../assets/unknown-profile.png";

const PersonCardView: React.FC<{
	person: CastMember;
}> = ({ person }): ReactElement => {
	return (
		<Link to={`/people/${person.id}`} className={styles.personCard}>
			{person.profile_path !== null ? (
				<img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt="profile photo" />
			) : (
				<img src={uknownProfile} alt="profile photo" />
			)}

			<div className={styles.text}>
				<h2>{person.name}</h2>
				<p>{person.character}</p>
			</div>
		</Link>
	);
};

export default PersonCardView;
