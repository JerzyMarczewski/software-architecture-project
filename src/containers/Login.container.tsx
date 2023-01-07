import { FormEvent, ReactElement, useState } from "react";
import LoginView from "../views/Login.view";
import { supabase } from "../helpers/supabaseClient";
import { AuthResponse } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

const LoginContainer = (): ReactElement => {
	const navigate = useNavigate();
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [isRegister, setIsRegister] = useState(true);

	const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		let response: AuthResponse;
		console.log(isRegister);

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
			console.log("object");
			setEnteredEmail("");
			setEnteredPassword("");
			if (response.error !== null) {
				throw new Error("Something went wrong!");
			}
			navigate("/");
			console.log(response.data);
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

	return (
		<LoginView
			email={enteredEmail}
			password={enteredPassword}
			isRegister={isRegister}
			onChangeEnteredEmail={changeEnteredEmailHandler}
			onChangeEnteredPassword={changeEnteredPasswordHandler}
			onRegister={registerHandler}
			onSubmit={(event) => {
				void (async () => {
					await onSubmit(event);
				})();
			}}
		/>
	);
};

export default LoginContainer;
