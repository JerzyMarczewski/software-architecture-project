import { FormEvent, ReactElement } from "react";
import styles from "./login.module.css";

const RegisterView: React.FC<{
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onChangeEnteredEmail: (email: string) => void;
	onChangeEnteredPassword: (password: string) => void;
	onRegister: () => void;
	onChangeRepeatedPassword: (password: string) => void;
	email: string;
	password: string;
	repeatedPassword: string;
	errorMessage: string;
}> = ({
	onSubmit,
	onChangeEnteredEmail,
	onChangeEnteredPassword,
	onChangeRepeatedPassword,
	onRegister,
	email,
	password,
	repeatedPassword,
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
				<label htmlFor="repeat-password">Repeat password</label>
				<input
					value={repeatedPassword}
					onChange={(event) => {
						onChangeRepeatedPassword(event.target.value);
					}}
					type="password"
					id="repeat-password"
				/>
				<p>{errorMessage}</p>
				<button className={styles["register-btn"]} type="button" onClick={onRegister}>
					Have an account? Log in
				</button>
				<button className={styles["submit-btn"]} type="submit">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterView;
