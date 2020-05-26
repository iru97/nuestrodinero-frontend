import {
  PoderAdjudicador,
  poderAdjudicadorVacio,
} from "./poder-adjudicador.model";
import { OfertasRecibidas } from "./ofertas-recibidas.model";
import { Adjudicatarios } from "./adjudicatarios.model";
import { ValoresOfertas } from "./valores-ofertas.model";
export interface Contenido {
  poderAdjudicador: PoderAdjudicador;
  detalle: string[];
  descripcionLicitacion: string[];
  ofertasRecibidas: OfertasRecibidas[];
  adjudicatarios: Adjudicatarios[];
  valorOferta: ValoresOfertas[];
  fechaAnuncio: string;
}

export const contenidoVacio = (): Contenido => ({
  poderAdjudicador: poderAdjudicadorVacio(),
  detalle: [],
  descripcionLicitacion: [],
  ofertasRecibidas: [],
  adjudicatarios: [],
  valorOferta: [],
  fechaAnuncio: "",
});
