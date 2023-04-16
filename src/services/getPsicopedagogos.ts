import { Psicopedagogo } from "@/components/psicopedagogos/models/psicopedagogo.models";

export const getPsicopedagogos = (): Promise<Psicopedagogo[]> => {
	const url = "http://localhost/managerBackend/usuarios.php";
	return fetch(url)
		.then((response) => response.json())
		.then((data) => data);
};
