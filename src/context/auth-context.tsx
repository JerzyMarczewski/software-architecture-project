import { createContext, useEffect, useState } from "react";
import { supabase } from "../helpers/supabaseClient";
import { Session } from "@supabase/supabase-js";

interface IAuthContext {
	session: Session | null | undefined;
	getSession: () => void;
}

export const AuthContext = createContext<IAuthContext>({
	session: null,
	getSession: () => {},
});

const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const [session, setSession] = useState<Session | null>();

	const getSession = async (): Promise<void> => {
		try {
			const { data, error } = await supabase.auth.getSession();

			if (error != null) {
				throw new Error("Something went wrong");
			}

			setSession(data.session);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};

	useEffect(() => {
		void (async () => {
			await getSession();
		})();
	}, []);

	const value = {
		session,
		getSession,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
