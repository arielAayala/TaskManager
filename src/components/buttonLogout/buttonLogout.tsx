"use client";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import React from "react";

function ButtonLogout() {
	const { setIdUsuario, setIdPsicopedagogo, setFotoPsicopedagogo } =
		useContextLogin();

	const handleCerrarSesion = () => {
		setIdUsuario(-1);
		setFotoPsicopedagogo("");
		setIdPsicopedagogo(-1);
		redirect("/login");
	};

	return <button onClick={handleCerrarSesion}>Cerrar Sesión</button>;
}

export default ButtonLogout;
