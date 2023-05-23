"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./login.module.css";
import { useContextLogin } from "@/context/contextLogin";
import { useRouter } from "next/navigation";
import login from "@/services/login";
import { IUsuario } from "@/Types/IUsuario";

interface Input {
	email: string;
	password: string;
}

function LoginForm() {
	const { setIdUsuario, setIdPsicopedagogo, setFotoPsicopedagogo } =
		useContextLogin();

	const [alert, setAlert] = useState({
		hide: true,
		message: "",
	});

	const router = useRouter();

	const [input, setInput] = useState<Input>({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const loginData = login(input.email, input.password);
			const data = await loginData;
			if ((await data).length > 0) {
				setIdUsuario(data[0].idUsuario);
				setIdPsicopedagogo(data[0].idPsicopedagogo);
				setFotoPsicopedagogo(data[0].fotoPsicopedagogo);
				router.push("/Encargos");
			} else {
				setAlert({
					hide: false,
					message: "No existe ese usuario",
				});
			}
		} catch (error: any) {
			setAlert({
				hide: false,
				message: error.message,
			});
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
					required
				/>
				<input
					className={style.loginInput}
					type="text"
					name="password"
					placeholder="Contraseña"
					onChange={handleChange}
					required
				/>
				<div
					className={style.alert}
					style={alert.hide ? { display: "none" } : { display: "contents" }}
				>
					{alert.message}
				</div>
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
