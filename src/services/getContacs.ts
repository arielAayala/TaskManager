export default async function getContacs(idPsicopedagogo: string) {
	const res = await fetch(
		`http://localhost/managerBackend/Contacto.php?idPsicopedagogo=${idPsicopedagogo}`,
		{ cache: "no-store" }
	);
	if (!res.ok) {
		throw new Error("Error");
	}
	return res.json();
}
