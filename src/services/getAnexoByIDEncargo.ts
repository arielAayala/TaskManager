export default async function getAnexoByIDEncargo(idEncargo: string) {
	const res = await fetch(
		`http://localhost/managerBackend/Anexos.php?idEncargo=${idEncargo}`,
		{ cache: "no-store" }
	);
	if (!res.ok) {
		throw new Error("Error");
	}
	return res.json();
}
