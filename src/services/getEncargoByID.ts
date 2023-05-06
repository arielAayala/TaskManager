export default async function getEncargoByID(idEncargo: string) {
	const res = await fetch(
		`http://192.168.1.10/managerBackend/Encargos.php/?idEncargo=${idEncargo}`,
		{
			cache: "no-store",
		}
	);

	if (!res.ok) {
		throw new Error("error base");
	}

	return res.json();
}
