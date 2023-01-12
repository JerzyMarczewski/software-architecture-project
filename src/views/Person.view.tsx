import { ReactElement } from "react";
import { Person } from "../helpers/types";

const PersonView: React.FC<{ actor: Person | undefined }> = ({ actor }): ReactElement => {
	if (actor === undefined) return <div>Loading...</div>;

	return <div>Movie id: {actor.name}</div>;
};

export default PersonView;
