"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./login.module.css";
import { useContextLogin } from "@/context/contextLogin";
import { useRouter } from "next/navigation";
import login from "@/services/login";
import { Usuario } from "@/Types/Usuario";

interface Input {
	email: string;
	password: string;
}

function LoginForm() {
	const { setIdUsuario, setIdPsicopedagogo, setFotoPsicopedagogo } =
		useContextLogin();

	const router = useRouter();

	const [input, setInput] = useState<Input>({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const loginData = login(input.email, input.password);
		const data = await loginData;
		if ((await data).length > 0) {
			setIdUsuario(data[0].idUsuario);
			setIdPsicopedagogo(data[0].idPsicopedagogo);
			setFotoPsicopedagogo(data[0].fotoPsicopedagogo);
			router.push("/tareas");
		} else {
			console.log("error");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((previos) => {
			return { ...previos, [e.target.name]: e.target.value };
		});
	};

	return (
		<>
			<form
				className={style.loginForm}
				onSubmit={handleSubmit}
			>
				<h4 className={style.loginTitle}>Iniciar Sesión en DevTics</h4>
				<input
					className={style.loginInput}
					type="text"
					name="email"
					placeholder="Correo@devtics.com"
					onChange={handleChange}
				/>
				<input
					className={style.loginInput}
					type="text"
					name="password"
					placeholder="Contraseña"
					onChange={handleChange}
				/>
				<button
					type="submit"
					className={style.loginButton}
				>
					Ingresar
				</button>
			</form>
		</>
	);
}

export default LoginForm;
