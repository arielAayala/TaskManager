export interface INotas {
	idNota: number;
	fechaCreacionNota: string;
	idUsuarioCreador: number;
	comentarioNota: string;
	anexosNotas: AnexoNota[];
}

interface AnexoNota {
	idNotaAnexo: number;
	urlNotaAnexo: string;
	idNota: number;
}
