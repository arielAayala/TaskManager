"use client";
import { useRouter } from "next/navigation";
import React from "react";

function userProfile() {
	const router = useRouter();
	const logeado = true;

	if (!logeado) {
		router.push("/login");
	}

	return <h1>Perfil</h1>;
}

export default userProfile;
