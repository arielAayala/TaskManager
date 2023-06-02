export default async function insertNotasAnexoByIdNota(
	idNota: number,
	notaAnexo: File
) {
	let formData = new FormData();
	formData.append("file", notaAnexo);
	console.log(notaAnexo);
	const res = await fetch(
		`http://localhost/managerBackend/AnexosNotas.php?idNota=${idNota}`,
		{
			body: formData,
			method: "POST",
		}
	);

	if (!res.ok) throw new Error("Error al cargar los archivos");

	return res.status;
}
