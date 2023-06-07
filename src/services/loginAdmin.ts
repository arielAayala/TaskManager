export default async function loginAdmin(correo: string, pass: string) {
	const res = await fetch("http://localhost/managerBackend/Admin.php", {
		method: "POST",
		body: JSON.stringify({
			correoUsuario: correo,
			contrasenaUsuario: pass,
		}),
	});
	if (!res.ok) {
		throw new Error("Ocurrio un error al ingresar como admin");
	}
	return res.status;
}
