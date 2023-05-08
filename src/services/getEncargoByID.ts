export default async function getEncargoByID(idEncargo: string) {
	const res = await fetch(
		`http://localhost/managerBackend/Encargos.php/?idEncargo=${idEncargo}`,
		{
			cache: "no-store",
		}
	);

	if (!res.ok) {
		throw new Error("error base");
	}

	return res.json();
}
