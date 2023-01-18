import { FormEvent, ReactElement, useContext, useState } from "react";
import LoginView from "../views/Login.view";
import { supabase } from "../helpers/supabaseClient";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";
import RegisterView from "../views/Register.view";
import { FavoriteMoviesContext } from "../context/favorite-movies-context";

const AuthenticationContainer = (): ReactElement => {
	const navigate = useNavigate();
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [isRegister, setIsRegister] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const { getSession } = useContext(AuthContext);
	const { refetch } = useContext(FavoriteMoviesContext);

	const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

		if (!emailRegExp.test(enteredEmail)) {
			setErrorMessage("Invalid email address");
			return;
		}

		if (enteredPassword.length < 8) {
			setEnteredPassword("");
			setRepeatedPassword("");
			setErrorMessage("Password is too short. At least 8 characters!");
			return;
		}

		if (!isRegister && enteredPassword !== repeatedPassword) {
			setEnteredPassword("");
			setRepeatedPassword("");
			setErrorMessage("Passwords are different!");
			return;
		}

		if (enteredEmail.length === 0 || enteredPassword.length === 0) {
			return;
		}

		if (isRegister) {
			await onLogin();
		} else {
			await onRegister();
		}
	};

	const onLogin = async (): Promise<void> => {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: enteredEmail,
				password: enteredPassword,
			});

			setEnteredEmail("");
			setEnteredPassword("");
			setRepeatedPassword("");
			setErrorMessage("");
			if (error !== null) {
				throw new Error("Incorrect email or password!");
			}

			refetch();
			getSession();
			navigate("/");
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			}
		}
	};

	const onRegister = async (): Promise<void> => {
		try {
			const { error } = await supabase.auth.signUp({
				email: enteredEmail,
				password: enteredPassword,
			});

			if (error !== null) {
				throw new Error("Something went wrong!");
			}

			confirm(
				"Check your email and wait up to 5 minutes to verify email and then login after confirmation your email",
			);

			setIsRegister(true);
			setErrorMessage("");
			setEnteredEmail("");
			setEnteredPassword("");
			setRepeatedPassword("");
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			}
		}
	};

	const registerHandler = (): void => {
		setIsRegister((prevState) => !prevState);
	};

	const changeEnteredEmailHandler = (email: string): void => {
		setErrorMessage("");
		setEnteredEmail(email);
	};

	const changeEnteredPasswordHandler = (password: string): void => {
		setErrorMessage("");
		setEnteredPassword(password);
	};

	const changeEnteredRepeatedPassword = (password: string): void => {
		setErrorMessage("");
		setRepeatedPassword(password);
	};

	return (
		<>
			{isRegister ? (
				<LoginView
					email={enteredEmail}
					password={enteredPassword}
					onChangeEnteredEmail={changeEnteredEmailHandler}
					onChangeEnteredPassword={changeEnteredPasswordHandler}
					errorMessage={errorMessage}
					onRegister={registerHandler}
					onSubmit={(event) => {
						void (async () => {
							await onSubmit(event);
						})();
					}}
				/>
			) : (
				<RegisterView
					email={enteredEmail}
					password={enteredPassword}
					repeatedPassword={repeatedPassword}
					errorMessage={errorMessage}
					onChangeEnteredEmail={changeEnteredEmailHandler}
					onChangeEnteredPassword={changeEnteredPasswordHandler}
					onChangeRepeatedPassword={changeEnteredRepeatedPassword}
					onRegister={registerHandler}
					onSubmit={(event) => {
						void (async () => {
							await onSubmit(event);
						})();
					}}
				/>
			)}
		</>
	);
};

export default AuthenticationContainer;
