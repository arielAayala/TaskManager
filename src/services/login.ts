export default async function login(email: string, password: string) {
	if (email.length === 0 && password.length === 0) {
		throw new Error("Los campos no pueden estar vacios");
	}

	const res = await fetch("http://localhost/managerBackend/Usuarios.php", {
		method: "POST",
		body: JSON.stringify({
			correoUsuario: email,
			contrasenaUsuario: password,
		}),
	});

	if (!res.ok) {
		throw new Error("Error al ingresar");
	}

	return res.json();
}
