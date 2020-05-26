export interface Metadatos {
  identificador: string;

  departamento: string;
  numDiario: number;
  fecha: Date;
  titulo: string;
  seccion: string;
  pdfUrl: string;
}

export const metadatosVacios = (): Metadatos => ({
  departamento: "",
  fecha: undefined,
  identificador: "",
  numDiario: 0,
  seccion: "",
  titulo: "",
  pdfUrl: "",
});
