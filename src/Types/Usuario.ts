import { Dispatch, SetStateAction } from "react";
export interface Usuario {
	idUsuario: number;
	setIdUsuario: Dispatch<SetStateAction<number>>;
	idPsicopedagogo: number;
	setIdPsicopedagogo: Dispatch<SetStateAction<number>>;
	fotoPsicopedagogo: string;
	setFotoPsicopedagogo: Dispatch<SetStateAction<string>>;
}
