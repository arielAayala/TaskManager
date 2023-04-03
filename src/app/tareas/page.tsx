"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Tareas() {
	const router = useRouter();
	const logeado = true;

	if (!logeado) {
		router.push("/login");
	}

	return <h1>Tareas</h1>;
}

export default Tareas;
