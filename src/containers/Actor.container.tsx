import { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { Actor } from "../helpers/types";
import ActorView from "../views/Actor.view";

const MovieContainer = (): ReactElement => {
	const { actorId } = useParams();

	const [actor, setActor] = useState<Actor>();

	useEffect(() => {
		if (actorId === undefined) return;

		void (async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/person/${actorId}?api_key=c84516f8b4384b587d79549a2ae95883&language=en-US`,
				);
				if (response.status !== 200) throw new Error();

				setActor(response.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return <ActorView actor={actor} />;
};

export default MovieContainer;
