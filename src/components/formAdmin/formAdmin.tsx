"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./formAdmin.module.css";
import { useContextLogin } from "@/context/contextLogin";
import { useRouter } from "next/navigation";
import loginAdmin from "@/services/loginAdmin";

interface Input {
	email: string;
	password: string;
}

function FormAdmin() {
	const { setIdUsuario } = useContextLogin();

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
			const loginData = await loginAdmin(input.email, input.password);

			if (loginData == 200) {
				router.push("/Admin/NuevoPsicopedagogo");
				setIdUsuario(1);
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
				<h4 className={style.loginTitle}>
					Iniciar Sesión como administrador en DevTics
				</h4>
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

export default FormAdmin;
