"use client";

import { useState, useContext, createContext } from "react";
import { IUsuario } from "@/Types/IUsuario";

const ContextLogin = createContext<IUsuario>({
	idUsuario: -1,
	setIdUsuario: (): number => -1,
	idPsicopedagogo: -1,
	setIdPsicopedagogo: (): number => -1,
	fotoPsicopedagogo: "",
	setFotoPsicopedagogo: (): string => "",
});

export default function ProviderContextLogin({ children }: { children: any }) {
	const [idUsuario, setIdUsuario] = useState(-1);
	const [idPsicopedagogo, setIdPsicopedagogo] = useState(-1);
	const [fotoPsicopedagogo, setFotoPsicopedagogo] = useState("");

	return (
		<ContextLogin.Provider
			value={{
				idUsuario,
				setIdUsuario,
				idPsicopedagogo,
				setIdPsicopedagogo,
				fotoPsicopedagogo,
				setFotoPsicopedagogo,
			}}
		>
			{children}
		</ContextLogin.Provider>
	);
}

export const useContextLogin = () => useContext(ContextLogin);
