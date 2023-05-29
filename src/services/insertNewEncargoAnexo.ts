export default async function insertNewEncargoAnexo(
	idEncargo: number,
	encargoAnexo: any
) {
	let formData = new FormData();
	formData.append("file", encargoAnexo);
	const res = await fetch(
		`http://localhost/managerBackend/AnexosEncargos.php?idEncargo=${idEncargo}`,
		{
			body: formData,
			method: "POST",
		}
	);
	if (!res.ok) throw new Error("Hubo un error al subir los archivos");
	return res.status;
}
