import { FormEvent, ReactElement } from "react";
import styles from "./login.module.css";

const LoginView: React.FC<{
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onChangeEnteredEmail: (email: string) => void;
	onChangeEnteredPassword: (password: string) => void;
	onRegister: () => void;
	email: string;
	password: string;
	errorMessage: string;
}> = ({
	onSubmit,
	onChangeEnteredEmail,
	onChangeEnteredPassword,
	onRegister,
	email,
	password,
	errorMessage,
}): ReactElement => {
	return (
		<div className={styles.container}>
			<form onSubmit={onSubmit} className={styles.form}>
				<label htmlFor="email">Email</label>
				<input
					value={email}
					onChange={(event) => {
						onChangeEnteredEmail(event.target.value);
					}}
					type="text"
					id="email"
				/>
				<label htmlFor="password">Password</label>
				<input
					value={password}
					onChange={(event) => {
						onChangeEnteredPassword(event.target.value);
					}}
					type="password"
					id="password"
				/>
				<p>{errorMessage}</p>
				<button className={styles["register-btn"]} type="button" onClick={onRegister}>
					Don&apos;t have account? Register
				</button>
				<button className={styles["submit-btn"]} type="submit">
					Log in
				</button>
			</form>
		</div>
	);
};

export default LoginView;
