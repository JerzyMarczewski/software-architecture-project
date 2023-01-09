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
	const { getSession } = useContext(AuthContext);

	const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		let response: AuthResponse;

		if (enteredEmail.length === 0 || enteredPassword.length === 0) {
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
			if (response.error !== null) {
				throw new Error("Something went wrong!");
			}

			getSession();
			navigate("/");
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	const registerHandler = (): void => {
		setIsRegister((prevState) => !prevState);
		console.log(!isRegister);
	};

	const changeEnteredEmailHandler = (email: string): void => {
		setEnteredEmail(email);
	};

	const changeEnteredPasswordHandler = (password: string): void => {
		setEnteredPassword(password);
	};

	const changeEnteredRepeatedPassword = (password: string): void => {
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
