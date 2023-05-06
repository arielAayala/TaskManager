export default async function getPsicopedagogoById(idPsicopedagogo: string) {
	const res = await fetch(
		`http://192.168.1.10/managerBackend/psicopedagogos.php?idPsicopedagogo=${idPsicopedagogo}`,
		{ cache: "no-store" }
	);
	if (!res.ok) {
		throw new Error("Error en la base de datos");
	}
	return res.json();
}
