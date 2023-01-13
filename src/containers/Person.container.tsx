import { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { Person } from "../helpers/types";
// import PersonView from "../views/Person.view";
import styles from "../views/Person.module.css";
import unknownProfileImage from "../assets/unknown-profile.png";

const MovieContainer = (): ReactElement => {
	const { personId } = useParams();

	const [person, setPerson] = useState<Person>();

	useEffect(() => {
		if (personId === undefined) return;

		void (async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/person/${personId}?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US`,
				);
				if (response.status !== 200) throw new Error();

				setPerson(response.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	// const image =
	// 	person?.profile_path !== undefined ? (
	// 		<img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="profile image" />
	// 	) : (
	// 		<img src={unknownProfileImage} alt="profile image not found" />
	// 	);

	const getImage = (): JSX.Element => {
		if (person === undefined)
			return <img src={unknownProfileImage} alt="profile image not found" />;
		else if (person.profile_path === null)
			return <img src={unknownProfileImage} alt="profile image not found" />;

		return (
			<img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="profile image" />
		);
	};

	const header = (
		<div className={styles.header}>
			{getImage()}
			<div className={styles.infoAndTitle}>
				<h1 className={styles.name}>{person?.name}</h1>
				<div className={styles.infoGrid}>
					<h3>Birthday</h3>
					<p>{person?.birthday ?? "N/A"}</p>
					<h3>Deathday</h3>
					<p>{person?.deathday ?? "N/A"}</p>
					<h3>Place of birth</h3>
					<p>{person?.place_of_birth ?? "N/A"}</p>
					<h3>Department</h3>
					<p>{person?.known_for_department ?? "N/A"}</p>
				</div>
			</div>
		</div>
	);

	const biography = (
		<div className={styles.biography}>
			<h1>Biography:</h1>
			<p>{person?.biography}</p>
		</div>
	);

	return header;
	// return <ActorView actor={person} />;
};

export default MovieContainer;
