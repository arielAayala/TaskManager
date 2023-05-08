export default async function getPsicopedagogos() {
	const res = await fetch(
		"http://localhost/managerBackend/psicopedagogos.php",
		{ cache: "no-store" }
	);
	if (!res.ok) throw new Error("Problema al acceder a la base de datos");
	return res.json();
}
