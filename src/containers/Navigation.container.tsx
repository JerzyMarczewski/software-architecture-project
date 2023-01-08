import { ReactElement, useContext } from "react";
import NavigationView from "../views/Navigation.view";
import { AuthContext } from "../context/auth-context";
import { supabase } from "../helpers/supabaseClient";

const NavigationContainer = (): ReactElement => {
	const { session, getSession } = useContext(AuthContext);

	const logoutHandler = async (): Promise<void> => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error != null) {
				throw new Error("Something went wrong!");
			}
			getSession();
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	return (
		<NavigationView
			session={session}
			onLogout={() => {
				void (async () => {
					await logoutHandler();
				})();
			}}
		/>
	);
};

export default NavigationContainer;
