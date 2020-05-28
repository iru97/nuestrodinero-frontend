import {
  Metadata,
  emptyMetadata,
} from '../contracts/components/contract/metadata.model';

export const metadataParser = (boeResponse: any): Metadata => {
  if (!boeResponse) {
    return emptyMetadata();
  }

  const safeBoe = safeAccess(boeResponse);

  const department = getValue(safeBoe.departamento[0]._);
  const diaryNumber = getValue(+safeBoe.diario_numero[0]);
  const identifier = getValue(safeBoe.identificador[0]);
  const date = getValue(dateFormat(safeBoe.fecha_publicacion[0]), Date);

  const seccion = getValue(safeBoe.seccion[0]);
  const subSeccion = getValue(safeBoe.subseccion[0]);
  const title = getValue(safeBoe.titulo[0]);
  const pdfUrl = getValue(safeBoe.url_pdf[0]);

  return {
    department,
    date,
    identifier,
    diaryNumber,
    section: `${seccion}${subSeccion}`,
    title,
    pdfUrl,
  };
};

const dateFormat = (aaaammdd: string): Date => {
  const aaaa = +aaaammdd.substring(0, 4);
  const mm = +aaaammdd.substring(4, 6) - 1;
  const dd = +aaaammdd.substr(6);

  return new Date(aaaa, mm, dd);
};

const safeAccess = (obj): any => {
  return new Proxy(obj, {
    get: function (target, name) {
      const result = target[name];
      if (!!result) {
        return result instanceof Object ? safeAccess(result) : result;
      }
      return safeAccess({});
    },
  });
};

const getValue = (obj, type?: any): any => {
  switch (typeof obj) {
    case 'string':
      return obj ? obj : '';
    case 'number':
      return obj ? obj : 0;
    case 'object':
      if (type) return obj ? obj : new Date();
      return '';
    default:
      return '';
  }
};
