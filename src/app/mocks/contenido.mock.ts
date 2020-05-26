// ApiModels
// DT es un array de texto siempre | es el valor
// DL es un array que contiene un objeto {DD,DT} | es como el subnivel..
// DD es un array de texto o de un objeto {DL} | es el enunciado
export interface DLContainer {
  dl: DLContent[];
}

export interface DLContent {
  dd: DD;
  dt: DT;
}

export type DT = Array<string>;
export type DD = Array<DLContainer | string>;
export type DL = Array<DLContent>;

export const contenidoMock: DL = [
  {
    dd: [
      {
        dl: [
          {
            dd: [
              "Subsecretaría de Cultura y Deporte.",
              "S2800239B.",
              "Pz del Rey, 1.",
              "Madrid.",
              "Madrid.",
              "28004.",
              "España.",
              "ES300.",
              "subsecretaria.mcd@cultura.gob.es",
              "https://contrataciondelestado.es/wps/poc?uri=deeplink:perfilContratante&idBp=WtO%2BR37ZBriiEJrVRqloyA%3D%3D",
            ],
            dt: [
              "1.1) Nombre: ",
              "1.2) Número de identificación fiscal: ",
              "1.3) Dirección: ",
              "1.4) Localidad: ",
              "1.5) Provincia: ",
              "1.6) Código postal: ",
              "1.7) País: ",
              "1.8) Código NUTS: ",
              "1.11) Correo electrónico: ",
              "1.13) Dirección del perfil de comprador: ",
            ],
          },
        ],
      },
      {
        dl: [
          {
            dd: ["Administración General del Estado.", "Cultura."],
            dt: ["2.1) Tipo: ", "2.2) Actividad principal ejercida: "],
          },
        ],
      },
      "30213100 (Ordenadores portátiles).",
      "ES300.",
      "Suministro de ordenadores portátiles a distintas unidades del Ministerio de Cultura y Deporte para facilitar modalidades de trabajo no presencial derivados de la pandemia internacional ocasionada por el COVID-19.",
      "Negociado sin publicidad acelerado.",
      {
        dl: [
          {
            dd: ["19 de marzo de 2020.", "19 de marzo de 2020."],
            dt: [
              "10.1) Contrato 2020C1AJ0189: ",
              "10.2) Contrato 2020C1AJ0189: ",
            ],
          },
        ],
      },
      {
        dl: [
          {
            dd: [
              {
                dl: [
                  {
                    dd: ["1."],
                    dt: ["11.1.1) Número de ofertas recibidas: "],
                  },
                ],
              },
              {
                dl: [
                  {
                    dd: ["1."],
                    dt: ["11.2.1) Número de ofertas recibidas: "],
                  },
                ],
              },
            ],
            dt: [
              "11.1) Contrato 2020C1AJ0189: ",
              "11.2) Contrato 2020C1AJ0189: ",
            ],
          },
        ],
      },
      {
        dl: [
          {
            dd: [
              {
                dl: [
                  {
                    dd: [
                      "AERONAVAL DE CONSTRUCCIONES E INSTALACIONES, S.A.,.",
                      "A28526275.",
                      "España.",
                    ],
                    dt: [
                      "12.1.1) Nombre: ",
                      "12.1.2) Número de identificación fiscal: ",
                      "12.1.7) País: ",
                    ],
                  },
                ],
              },
              {
                dl: [
                  {
                    dd: ["COMPUSOF, S.A.,.", "A28793917.", "España."],
                    dt: [
                      "12.2.1) Nombre: ",
                      "12.2.2) Número de identificación fiscal: ",
                      "12.2.7) País: ",
                    ],
                  },
                ],
              },
            ],
            dt: [
              "12.1) Contrato 2020C1AJ0189: ",
              "12.2) Contrato 2020C1AJ0189: ",
            ],
          },
        ],
      },
      {
        dl: [
          {
            dd: [
              {
                dl: [
                  {
                    dd: ["33.235,20 euros."],
                    dt: ["13.1.1) Valor de la oferta seleccionada: "],
                  },
                ],
              },
              {
                dl: [
                  {
                    dd: ["12.780,00 euros."],
                    dt: ["13.2.1) Valor de la oferta seleccionada:"],
                  },
                ],
              },
            ],
            dt: [
              "13.1) Contrato 2020C1AJ0189: ",
              "13.2) Contrato 2020C1AJ0189: ",
            ],
          },
        ],
      },
      "27 de abril de 2020.",
    ],
    dt: [
      "1. Poder adjudicador: ",
      "2. Tipo de poder adjudicador y principal actividad ejercida:",
      "4. Códigos CPV:",
      "5. Lugar principal de entrega de los suministros:",
      "6. Descripción de la licitación:",
      "7. Tipo de procedimiento de adjudicación: ",
      "10. Fecha de adjudicación: ",
      "11. Ofertas recibidas: ",
      "12. Adjudicatarios: ",
      "13. Valor de las ofertas: ",
      "18. Fecha de envío del anuncio: ",
    ],
  },
];

export const contenidoMock2: DL = [
  {
    dt: [
      "1. Poder adjudicador: ",
      "2. Lugar principal de ejecución:",
      "3. Descripción de la licitación:",
      "4. Ofertas recibidas: ",
      "5. Adjudicatarios: ",
      "6. Valor de las ofertas: ",
    ],
    dd: [
      {
        dl: [
          {
            dt: [
              "1.1) Nombre: ",
              "1.2) Número de identificación fiscal: ",
              "1.3) Dirección: ",
              "1.4) Localidad: ",
              "1.5) Provincia: ",
              "1.6) Código postal: ",
              "1.7) País: ",
              "1.8) Código NUTS: ",
              "1.9) Teléfono: ",
              "1.10) Fax: ",
              "1.11) Correo electrónico: ",
              "1.13) Dirección del perfil de comprador: ",
            ],
            dd: [
              "Jefatura de Asuntos Económicos del Mando de Personal.",
              "S2830086A.",
              "C/ Prim 6-8 (desp. 2E24).",
              "Madrid.",
              "Madrid.",
              "28004.",
              "España.",
              "ES300.",
              "917802666.",
              "917803659.",
              "contratacion_maper@et.mde.es",
              "https://contrataciondelestado.es/wps/poc?uri=deeplink:perfilContratante&idBp=7MDaP9D8ICM%3D",
            ],
          },
        ],
      },
      "ES612.",
      'Concesión del servicio de restauración, bares y cafeterías en la RMASD. "La Cortadura" de Cádiz (CPV: 55300000).',
      { dl: [{ dt: ["4.1) Número de ofertas recibidas: "], dd: ["2."] }] },
      {
        dl: [
          {
            dt: [
              "5.1) Nombre: ",
              "5.2) Número de identificación fiscal: ",
              "5.7) País: ",
            ],
            dd: ["GARCIA RODRIGUEZ 2006 S.L.", "B72157316.", "España."],
          },
        ],
      },
      {
        dl: [
          {
            dt: ["6.1) Valor de la oferta seleccionada: "],
            dd: ["0,00 euros."],
          },
        ],
      },
    ],
  },
];
