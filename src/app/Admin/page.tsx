"use client";
import FormAdmin from "@/components/formAdmin/formAdmin";
import React from "react";
import style from "./admin.module.css";
import { useContextLogin } from "@/context/contextLogin";
import { redirect } from "next/navigation";

function Admin() {
	const { idUsuario } = useContextLogin();

	if (idUsuario >= 1) {
		redirect("/Encargos");
	}

	return (
		<div className={style.container}>
			<FormAdmin></FormAdmin>
		</div>
	);
}

export default Admin;
