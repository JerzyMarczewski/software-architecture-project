import { FormEvent, ReactElement } from "react";
import styles from "./login.module.css";

const LoginView: React.FC<{
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	onChangeEnteredEmail: (email: string) => void;
	onChangeEnteredPassword: (email: string) => void;
	onRegister: () => void;
	isRegister: boolean;
	email: string;
	password: string;
}> = ({
	onSubmit,
	onChangeEnteredEmail,
	onChangeEnteredPassword,
	onRegister,
	isRegister,
	email,
	password,
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
				<button className={styles["register-btn"]} type="button" onClick={onRegister}>
					{isRegister ? `Don't have account? Register` : "Have an account? Log in"}
				</button>
				<button className={styles["submit-btn"]} type="submit">
					{isRegister ? "Log in" : "Register"}
				</button>
			</form>
		</div>
	);
};

export default LoginView;
