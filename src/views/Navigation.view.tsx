import { ReactElement } from "react";
import styles from "./navigation.module.css";
import { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const NavigationView: React.FC<{ session: Session | null | undefined; onLogout: () => void }> = ({
	session,
	onLogout,
}): ReactElement => {
	return (
		<nav className={styles.container}>
			<Link to="/" className={styles.logo}>
				Movie searcher
			</Link>
			<div>
				{session === null && (
					<Link className={styles["login-button"]} to="/sign-in">
						Login
					</Link>
				)}
				{session !== null && (
					<button type="button" className={styles["logout-button"]} onClick={onLogout}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavigationView;
