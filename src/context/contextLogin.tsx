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
}

const ContextLogin = createContext<IUsuario>({
	idUsuario: -1,
	setIdUsuario: (): number => -1,
});

export default function ProviderContextLogin({ children }: { children: any }) {
	const [idUsuario, setIdUsuario] = useState(-1);

	return (
		<ContextLogin.Provider
			value={{
				idUsuario,
				setIdUsuario,
			}}
		>
			{children}
		</ContextLogin.Provider>
	);
}

export const useContextLogin = () => useContext(ContextLogin);
