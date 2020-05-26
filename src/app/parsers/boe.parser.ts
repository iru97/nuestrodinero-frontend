import { BOE, defaultBOEVacio } from '../models';
import {
  BoeAPiModel,
  Diario,
  Seccion,
  DepartamentoItem,
} from '../mocks/boe.mock';
import { FORMALIZACION_CONTRATOS } from '../core';

export const boeParser = (input: BoeAPiModel): BOE => {
  let defaultBoe: BOE = defaultBOEVacio();
  if (!input) {
    return defaultBoe;
  }

  if (!input.sumario) {
    return defaultBoe;
  }

  // input.sumario.diario[0].seccion[0].departamento[0].item[0].$.id
  const sectionTarget: string = '5A';
  const diariosList: Diario[] = input.sumario.diario;

  let sections5A = diariosList.reduce((acc: Seccion[], prev: Diario) => {
    return acc.concat(prev.seccion.filter((s) => s.$.num === sectionTarget));
  }, []);

  let departamentoItems: DepartamentoItem[] = sections5A.reduce(
    (acc: DepartamentoItem[], curr: Seccion) => {
      return curr.departamento.reduce(
        (accItems: DepartamentoItem[], currdep) => {
          return accItems.concat(currdep.item);
        },
        []
      );
    },
    []
  );

  let ids: string[] = departamentoItems.reduce((acc: string[], curr) => {
    if (curr.titulo[0].indexOf(FORMALIZACION_CONTRATOS) != -1) {
      return acc.concat(curr.$.id);
    }

    return acc;
  }, []);

  defaultBoe.idAnuncio = [...ids];
  return defaultBoe;
};
