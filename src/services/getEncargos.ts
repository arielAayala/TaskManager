export default async function getEncargos() {
	const res = await fetch("http://localhost/managerBackend/Encargos.php", {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("error al obtener las tareas");

	return res.json();
}
