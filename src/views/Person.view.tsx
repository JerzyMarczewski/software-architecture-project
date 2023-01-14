import { ReactElement } from "react";

import styles from "./Person.module.css";

const PersonView: React.FC<{
	isLoaded: boolean;
	header: JSX.Element;
	biography: JSX.Element;
	credits: JSX.Element;
}> = ({ isLoaded, header, biography, credits }): ReactElement => {
	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div className={styles.personView}>
			{header}
			{biography}
			{credits}
		</div>
	);
};

export default PersonView;
