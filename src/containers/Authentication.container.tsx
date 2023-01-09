import { FormEvent, ReactElement, useContext, useState } from "react";
import LoginView from "../views/Login.view";
import { supabase } from "../helpers/supabaseClient";
import { AuthResponse } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";
import RegisterView from "../views/Register.view";

const AuthenticationContainer = (): ReactElement => {
	const navigate = useNavigate();
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [isRegister, setIsRegister] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const { getSession } = useContext(AuthContext);

	const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

		let response: AuthResponse;

		if (enteredEmail.length === 0 || enteredPassword.length === 0) {
			return;
		}

		if (!emailRegExp.test(enteredEmail)) {
			setErrorMessage("Invalid email address");
			return;
		}

		if (!isRegister && enteredPassword !== repeatedPassword) {
			setEnteredPassword("");
			setRepeatedPassword("");
			setErrorMessage("Passwords are different!");
			return;
		}

		if (!isRegister && enteredPassword.length < 8) {
			setEnteredPassword("");
			setRepeatedPassword("");
			setErrorMessage("Password is too short. At least 8 characters!");
			return;
		}

		try {
			if (isRegister) {
				response = await supabase.auth.signInWithPassword({
					email: enteredEmail,
					password: enteredPassword,
				});
			} else {
				response = await supabase.auth.signUp({
					email: enteredEmail,
					password: enteredPassword,
				});
			}

			setEnteredEmail("");
			setEnteredPassword("");
			setRepeatedPassword("");
			setErrorMessage("");
			if (response.error !== null) {
				if (isRegister) {
					throw new Error("Incorrect email or password!");
				} else {
					throw new Error("Something went wrong!");
				}
			}

			getSession();
			navigate("/");
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
