"use client";

import {
	useState,
	Dispatch,
	SetStateAction,
	useContext,
	createContext,
} from "react";

interface IUsuario {
	idUsuario: number;
	setIdUsuario: Dispatch<SetStateAction<number>>;
	idPsicopedagogo: number;
	setIdPsicopedagogo: Dispatch<SetStateAction<number>>;
	nombrePsicopedagogo: string;
	setNombrePsicopedagogo: Dispatch<SetStateAction<string>>;
	dniPsicopedagogo: number;
	setDniPsicopedagogo: Dispatch<SetStateAction<number>>;
	nacimientoPsicopedagogo: string;
	setNacimientoPsicopedagogo: Dispatch<SetStateAction<string>>;
	fotoPsicopedagogo: string;
	setFotoPsicopedagogo: Dispatch<SetStateAction<string>>;
}

const ContextLogin = createContext<IUsuario>({
	idUsuario: -1,
	setIdUsuario: (): number => -1,
	idPsicopedagogo: -1,
	setIdPsicopedagogo: (): number => -1,
	nombrePsicopedagogo: "",
	setNombrePsicopedagogo: (): string => "",
	dniPsicopedagogo: 0,
	setDniPsicopedagogo: (): number => 0,
	nacimientoPsicopedagogo: "",
	setNacimientoPsicopedagogo: (): string => "",
	fotoPsicopedagogo: "",
	setFotoPsicopedagogo: (): string => "",
});

export default function ProviderContextLogin({ children }: { children: any }) {
	const [idUsuario, setIdUsuario] = useState(-1);
	const [idPsicopedagogo, setIdPsicopedagogo] = useState(-1);
	const [nombrePsicopedagogo, setNombrePsicopedagogo] = useState("");
	const [dniPsicopedagogo, setDniPsicopedagogo] = useState(0);
	const [nacimientoPsicopedagogo, setNacimientoPsicopedagogo] = useState("");
	const [fotoPsicopedagogo, setFotoPsicopedagogo] = useState("");

	return (
		<ContextLogin.Provider
			value={{
				idUsuario,
				setIdUsuario,
				idPsicopedagogo,
				setIdPsicopedagogo,
				dniPsicopedagogo,
				setDniPsicopedagogo,
				nombrePsicopedagogo,
				setNombrePsicopedagogo,
				nacimientoPsicopedagogo,
				setNacimientoPsicopedagogo,
				fotoPsicopedagogo,
				setFotoPsicopedagogo,
			}}
		>
			{children}
		</ContextLogin.Provider>
	);
}

export const useContextLogin = () => useContext(ContextLogin);
