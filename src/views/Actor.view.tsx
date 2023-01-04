import { ReactElement } from "react";
import { Actor } from "../helpers/types";

const ActorView: React.FC<{ actor: Actor | undefined }> = ({ actor }): ReactElement => {
	if (actor === undefined) return <div>Loading...</div>;

	return <div>Movie id: {actor.name}</div>;
};

export default ActorView;
