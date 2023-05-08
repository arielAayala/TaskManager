export default async function login(email: string, password: string) {
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
