"use client";
import ButtonLogout from "@/components/buttonLogout/buttonLogout";
import FormNewPsicopedagogo from "@/components/formNewPsicopedagogo/formNewPsicopedagogo";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";
import React from "react";

function NuevoPsicopedagogo() {
	const { idUsuario } = useContextLogin();

	if (idUsuario != 1) {
		redirect("/login");
	}

	return (
		<div>
			<ButtonLogout></ButtonLogout>
			<h1>Nuevo Psicopedagogo</h1>
			<FormNewPsicopedagogo></FormNewPsicopedagogo>
		</div>
	);
}

export default NuevoPsicopedagogo;
