export interface INotas {
	idNota: number;
	comentarioNota: string;
	fechaCreacionNota: string;
	idUsuarioCreador: string;
	nombreCreador: string;
	fotoCreador: string;
	idNuevoResponsable: string;
	nombreNuevoResponsable: string;
	fotoNuevoResponsable: string;
	notasAnexo: Anexo[];
}

interface Anexo {
	nombreNotaAnexo: string;
	idNotaAnexo: number;
	urlNotaAnexo: string;
}
