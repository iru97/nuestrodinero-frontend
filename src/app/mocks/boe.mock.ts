import { FORMALIZACION_CONTRATOS } from "../core";

export interface BoeAPiModel {
  sumario: Sumario;
}

export interface Sumario {
  diario: Diario[];
  meta: Meta[];
}

export interface Meta {}

export interface Diario {
  $: { nbo: string };
  seccion: Seccion[];
}

export interface Seccion {
  $: SeccionAttr;
  departamento: Departamento[];
}

export interface SeccionAttr {
  num: string;
  nombre: string;
}

export interface Departamento {
  $: { nombre: string; etq: string };
  item: DepartamentoItem[];
  epigrafe?: any;
}

export interface DepartamentoItem {
  $: {
    id: string;
  };
  titulo: string[];
}

export const boeMock: BoeAPiModel = {
  sumario: {
    diario: [
      {
        $: { nbo: "132" },
        seccion: [
          {
            $: {
              num: "5A",
              nombre: "V. Anuncios. - A. Contratación del Sector Público",
            },
            departamento: [
              {
                $: { nombre: "MINISTERIO A", etq: "" },
                item: [
                  {
                    $: { id: "BOE-B-2020-13442" },
                    titulo: [FORMALIZACION_CONTRATOS],
                  },
                ],
              },
              {
                $: { nombre: "MINISTERIO B", etq: "" },
                item: [
                  {
                    $: { id: "BOE-B-2020-13444" },
                    titulo: ["licitacion"],
                  },
                  {
                    $: { id: "BOE-B-2020-13445" },
                    titulo: [FORMALIZACION_CONTRATOS],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    meta: [],
  },
};
