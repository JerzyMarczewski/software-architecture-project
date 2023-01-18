import { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { Person, PersonMovieCredits } from "../helpers/types";
import PersonView from "../views/Person.view";
import styles from "../views/Person.module.css";
import unknownProfileImage from "../assets/unknown-profile.png";
import unknownMovieImage from "../assets/question-solid.svg";
import { Link } from "react-router-dom";

const MovieContainer = (): ReactElement => {
	const { personId } = useParams();

	const [person, setPerson] = useState<Person>();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [personMovieCredits, setPersonMovieCredits] = useState<PersonMovieCredits>();
	const [showAllCredits, setShowAllCredits] = useState<boolean>(false);

	useEffect(() => {
		if (personId === undefined) return;

		setIsLoaded(false);
		setShowAllCredits(false);

		void (async () => {
			try {
				const personResponse = await axios.get(
					`https://api.themoviedb.org/3/person/${personId}?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US`,
				);
				if (personResponse.status !== 200) throw new Error();
				setPerson(personResponse.data);

				const creditsResponse = await axios.get(
					`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US`,
				);
				if (creditsResponse.status !== 200) throw new Error();

				setPersonMovieCredits(creditsResponse.data);

				setIsLoaded(true);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [personId]);

	const getImage = (): JSX.Element => {
		if (person === undefined)
			return <img src={unknownProfileImage} alt="profile image not found" />;
		else if (person.profile_path === null)
			return <img src={unknownProfileImage} alt="profile image not found" />;

		return (
			<img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="profile image" />
		);
	};

	const getCreditImage = (path: string | null): JSX.Element => {
		if (path === undefined) return <img src={unknownMovieImage} alt="credit image not found" />;
		else if (path === null) return <img src={unknownMovieImage} alt="credit image not found" />;

		return <img src={`https://image.tmdb.org/t/p/w200${path}`} alt="credit image" />;
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
					<p>{person?.deathday == null ? "-" : "N/A"}</p>
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

	const credits = (
		<div className={styles.credits}>
			<h1>Credits:</h1>
			<div className={styles.creditList}>
				{personMovieCredits?.cast
					.sort((a, b) => Number(b.release_date.slice(0, 4)) - Number(a.release_date.slice(0, 4)))
					.slice(0, showAllCredits ? -2 : 5)
					.map((credit) => (
						<Link key={credit.credit_id} to={`/movies/${credit.id}`}>
							{getCreditImage(credit?.poster_path)}
							<div className={styles.titleAndRole}>
								<h5>{credit.title !== "" ? credit.title : "N/A"}</h5>
								<p>{credit.character !== "" ? credit.character : "N/A"}</p>
							</div>
							<div className={styles.whitespace}></div>
							<div className={styles.year}>{credit.release_date.slice(0, 4)}</div>
						</Link>
					))}
			</div>
			<p
				className={styles.showAll}
				onClick={() => {
					setShowAllCredits(!showAllCredits);
				}}
			>
				{showAllCredits ? "show less" : "show all"}
			</p>
		</div>
	);

	return <PersonView isLoaded={isLoaded} header={header} biography={biography} credits={credits} />;
};

export default MovieContainer;
