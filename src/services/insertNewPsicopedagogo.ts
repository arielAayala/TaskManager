export default async function insertNewPsicopedagogo(
	nombre: string,
	dni: string,
	nacimiento: string
) {
	const res = await fetch(
		"http://localhost/managerBackend/Psicopedagogos.php",
		{
			method: "POST",
			body: JSON.stringify({
				nombrePsicopedagogo: nombre,
				dniPsicopedagogo: dni,
				nacimientoPsicopedagogo: nacimiento,
			}),
		}
	);

	if (!res.ok) {
		throw new Error("Ocurrio un Error");
	}

	return res.status;
}
