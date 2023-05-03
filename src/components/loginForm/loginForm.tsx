"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import style from "./login.module.css";
import { useContextLogin } from "@/context/contextLogin";
import { useRouter } from "next/navigation";

interface Input {
	email: string;
	password: string;
}

function LoginForm() {
	const {
		setIdUsuario,
		setIdPsicopedagogo,
		setDniPsicopedagogo,
		setNombrePsicopedagogo,
		setNacimientoPsicopedagogo,
		setFotoPsicopedagogo,
	} = useContextLogin();

	const router = useRouter();

	const [input, setInput] = useState<Input>({
		email: "",
		password: "",
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch("http://localhost/managerBackend/Usuarios.php", {
			method: "POST",
			body: JSON.stringify({
				correoUsuario: input.email,
				contrasenaUsuario: input.password,
			}),
		})
			.then((res) => res.json())
			.catch((error) => console.error("error " + error))
			.then((data) => {
				if (data.length > 0) {
					console.log("correctamente logueado");
					setIdUsuario(data[0].idUsuario);
					setIdPsicopedagogo(data[0].idPsicopedagogo);
					setDniPsicopedagogo(data[0].dniPsicopedagogo);
					setNombrePsicopedagogo(data[0].nombrePsicopedagogo);
					setNacimientoPsicopedagogo(data[0].nacimientoPsicopedagogo);
					setFotoPsicopedagogo(data[0].fotoPsicopedagogo);
					router.push("/tareas");
				} else {
					console.log("error al ingresar la contraseña o email");
				}
			});
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
