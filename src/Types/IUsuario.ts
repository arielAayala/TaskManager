import { Dispatch, SetStateAction } from "react";
export interface IUsuario {
	idUsuario: number;
	setIdUsuario: Dispatch<SetStateAction<number>>;
	idPsicopedagogo: number;
	setIdPsicopedagogo: Dispatch<SetStateAction<number>>;
	fotoPsicopedagogo: string;
	setFotoPsicopedagogo: Dispatch<SetStateAction<string>>;
}

export interface IUsuarioResponsable {
	idUsuario: number;
	nombrePsicopedagogo: string;
}
