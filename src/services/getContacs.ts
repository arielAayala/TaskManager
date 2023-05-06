export default async function getContacs(idPsicopedagogo: string) {
	const res = await fetch(
		`http://192.168.1.10/managerBackend/Contacto.php?idPsicopedagogo=${idPsicopedagogo}`,
		{ cache: "no-store" }
	);
	if (!res.ok) {
		throw new Error("Error");
	}
	return res.json();
}
