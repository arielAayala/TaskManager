export default async function getPsicopedagogoByID(idPsicopedagogo: string) {
	const res = await fetch(
		`http://localhost/managerBackend/psicopedagogos.php?idPsicopedagogo=${idPsicopedagogo}`,
		{ cache: "no-store" }
	);
	if (!res.ok) {
		throw new Error("Error en la base de datos");
	}
	return res.json();
}
