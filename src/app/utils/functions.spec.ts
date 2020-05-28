import {
  extractorIndices,
  normalizeString,
  indexStorageReducer,
  getValorSeguro,
  adjustIndex,
  direccionBuilder,
  replaceCommaWithDots,
  doRecursion,
} from './functions';
import {
  NOMBRE,
  NIF,
  DIRECCION,
  LOCALIDAD,
  PROVINCIA,
  CP,
  PAIS,
  TELEFONO,
  EMAIL,
  WEB,
} from '../core/const.api.model';
import { indexesStorage } from '../models/utils.models';
import { DD, DLContent } from '../mocks';
import {
  OffersReceived,
  offersReceivedCreator,
} from '../contracts/components/sellers-offers/offersReceivedmodel';

describe('utils specs', () => {
  describe('extractor de indices specs', () => {
    const undefinedCollection: string[] = undefined;
    const emtpyCollection: string[] = [];
    const collection: string[] = ['A', 'B', 'C', 'D'];
    const addressValues = [
      NOMBRE,
      NIF,
      DIRECCION,
      LOCALIDAD,
      PROVINCIA,
      CP,
      PAIS,
      TELEFONO,
      EMAIL,
      WEB,
    ];

    it('should return empty array if any collection its undefined', () => {
      const valorEsperado = [];
      const resultado: indexesStorage[] = extractorIndices(
        undefinedCollection,
        undefinedCollection
      );
      expect(valorEsperado).toStrictEqual(resultado);
    });

    it('should return an IndexStorage array with the matching values', () => {
      const valores: string[] = ['B', 'C'];
      const valorEsperado: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: -1,
        },
        {
          collectionIndex: 1,
          valorIndex: 0,
        },
        {
          collectionIndex: 2,
          valorIndex: 1,
        },
        {
          collectionIndex: 3,
          valorIndex: -1,
        },
      ];
      const resultado = extractorIndices(collection, valores);
      expect(valorEsperado).toStrictEqual(resultado);
    });

    it('arrays should be different if no values are matched', () => {
      const valores: string[] = ['B', 'C'];
      const valorEsperado: indexesStorage[] = [
        { collectionIndex: 1, valorIndex: 0 },
      ];
      const resultado = extractorIndices(collection, valores);
      expect(valorEsperado).not.toStrictEqual(resultado);
    });

    it('should return an array of indexValue -1 for every non-matching value', () => {
      const valores: string[] = ['X', 'F'];
      const valorEsperado: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: -1,
        },
        {
          collectionIndex: 1,
          valorIndex: -1,
        },
        {
          collectionIndex: 2,
          valorIndex: -1,
        },
        {
          collectionIndex: 3,
          valorIndex: -1,
        },
      ];
      const resultado = extractorIndices(collection, valores);
      expect(valorEsperado).toStrictEqual(resultado);
    });

    it('should return an IndexStorage array with the matching values', () => {
      const collection = [
        '1.1) Nombre: ',
        '1.2) Número de identificación fiscal: ',
        '1.3) Dirección: ',
        '1.4) Localidad: ',
        '1.5) Provincia: ',
        '1.6) Código postal: ',
        '1.7) País: ',
        '1.8) Código NUTS: ',
        '1.11) Correo electrónico: ',
        '1.13) Dirección del perfil de comprador: ',
      ];

      const addressExpectedResult: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: 0,
        },
        {
          collectionIndex: 1,
          valorIndex: 1,
        },
        {
          collectionIndex: 2,
          valorIndex: 2,
        },
        {
          collectionIndex: 3,
          valorIndex: 3,
        },
        {
          collectionIndex: 4,
          valorIndex: 4,
        },
        {
          collectionIndex: 5,
          valorIndex: 5,
        },
        {
          collectionIndex: 6,
          valorIndex: 6,
        },
        {
          collectionIndex: 7,
          valorIndex: -1,
        },
        {
          collectionIndex: 8,
          valorIndex: 8,
        },
        {
          collectionIndex: 9,
          valorIndex: -1,
        },
      ];

      const indices = extractorIndices(collection, addressValues);

      expect(indices).toStrictEqual(addressExpectedResult);
    });

    it('should return an array of the same size', () => {
      const collection = [
        '1.1) Nombre: ',
        '1.2) Número de identificación fiscal: ',
        '1.7) País: ',
      ];

      const valorEsperado: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: 0,
        },
        {
          collectionIndex: 1,
          valorIndex: 1,
        },
        {
          collectionIndex: 2,
          valorIndex: -1,
        },
        {
          collectionIndex: 3,
          valorIndex: -1,
        },
        {
          collectionIndex: 4,
          valorIndex: -1,
        },
        {
          collectionIndex: 5,
          valorIndex: -1,
        },
        {
          collectionIndex: 6,
          valorIndex: 6,
        },
        {
          collectionIndex: 7,
          valorIndex: -1,
        },
        {
          collectionIndex: 8,
          valorIndex: -1,
        },
        {
          collectionIndex: 9,
          valorIndex: -1,
        },
      ];

      const indices = extractorIndices(collection, addressValues);

      expect(indices).toStrictEqual(valorEsperado);
    });
  });

  describe('normalizeString specs', () => {
    it('should return a string without spaces and punctuation', () => {
      let charsToRemove = /[\.\d\):]/g;

      const inputA = '1. texto: ';
      const inputB = '1.2) texto: ';
      const valorEsperado = 'texto';

      const resultadoA = normalizeString(inputA, charsToRemove);
      const resultadoB = normalizeString(inputB, charsToRemove);

      expect(resultadoA).toEqual(valorEsperado);
      expect(resultadoB).toEqual(valorEsperado);
    });
  });

  describe('index storage reducer specs', () => {
    it('should return -1 if the elemtn isnt found', () => {
      const collection: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: 1,
        },
        {
          collectionIndex: 1,
          valorIndex: 2,
        },
        {
          collectionIndex: 2,
          valorIndex: 3,
        },
      ];
      const valorEsperado = -1;
      const valorRecibido = indexStorageReducer(collection, 4);
      expect(valorRecibido).toEqual(valorEsperado);
    });

    it('should return the corresponding index', () => {
      const collection: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: 1,
        },
        {
          collectionIndex: 1,
          valorIndex: 2,
        },
        {
          collectionIndex: 2,
          valorIndex: 3,
        },
      ];
      const indexValue = 3;
      const expectedCollectionindex = 2;
      const valorRecibido = indexStorageReducer(collection, indexValue);
      expect(valorRecibido).toEqual(expectedCollectionindex);
    });

    it('should return -1 if the index is < 0 or the collection its undefined', () => {
      const collection: indexesStorage[] = [
        {
          collectionIndex: 0,
          valorIndex: 1,
        },
        {
          collectionIndex: 1,
          valorIndex: 2,
        },
        {
          collectionIndex: 2,
          valorIndex: 3,
        },
      ];
      const valorEsperado = -1;
      const valorRecibidoA = indexStorageReducer(undefined, 2);
      const valorRecibidoB = indexStorageReducer(collection, -1);
      expect(valorRecibidoA).toEqual(valorEsperado);
      expect(valorRecibidoB).toEqual(valorEsperado);
    });
  });

  describe('getSafeValues specs', () => {
    it('should return empty string if index is less than 0 or collection is undefined', () => {
      // Arrange
      const collection: DD = [];
      const expectedResult = '';
      // Act
      const receivedResultA = getValorSeguro(collection, -1);
      const receivedResultB = getValorSeguro(undefined, -1);
      // Assert
      expect(receivedResultA).toEqual(expectedResult);
      expect(receivedResultB).toEqual(expectedResult);
    });

    it('should return empty string if the index its not contained in the collection', () => {
      // Arrange
      const collection: DD = [];
      const expectedResult = '';
      // Act
      const receivedResultA = getValorSeguro(collection, 2);
      // Assert
      expect(receivedResultA).toEqual(expectedResult);
    });

    it('should return empty string if the collection contains undefined', () => {
      // Arrange
      const collection: DD = [undefined];
      const expectedResult = '';
      // Act
      const receivedResultA = getValorSeguro(collection, 0);
      // Assert
      expect(receivedResultA).toEqual(expectedResult);
    });

    it('should return the content as string of the given collection', () => {
      // Arrange
      const collection: DD = ['value'];
      const expectedResult = 'value';
      // Act
      const receivedResultA = getValorSeguro(collection, 0);
      // Assert
      expect(receivedResultA).toEqual(expectedResult);
    });

    it('should return emtpy string if the index its out of range', () => {
      // Arrange
      const collection: DD = ['value'];
      const expectedResult = '';
      // Act
      const receivedResultA = getValorSeguro(collection, 2);
      // Assert
      expect(receivedResultA).toEqual(expectedResult);
    });
  });

  describe('adjust index specs', () => {
    const indexesUndefined: indexesStorage[] = undefined;
    const indexesEmpty: indexesStorage[] = [];
    const indexesOne: indexesStorage[] = [
      {
        collectionIndex: 2,
        valorIndex: -1,
      },
    ];
    const indexesTwo: indexesStorage[] = [
      {
        collectionIndex: 0,
        valorIndex: -1,
      },
      {
        collectionIndex: 1,
        valorIndex: -1,
      },
    ];

    const dlContent: DLContent = {
      dt: [],
      dd: [],
    };

    it('should return dlContent of the same length than indexStorage (undefined)', () => {
      // Arrange
      const expectedResult: DLContent = {
        dt: [],
        dd: [],
      };
      // Act
      const receivedResult: DLContent = adjustIndex(
        dlContent,
        indexesUndefined
      );
      // Assert
      expect(receivedResult.dd).toHaveLength(0);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
    it('should return dlContent of the same length than indexStorage (0 values)', () => {
      // Arrange
      const expectedResult: DLContent = {
        dt: [],
        dd: [],
      };
      // Act
      const receivedResult: DLContent = adjustIndex(dlContent, indexesEmpty);
      // Assert
      expect(receivedResult.dd.length).toEqual(indexesEmpty.length);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
    it('should return dlContent of the same length than indexStorage (1 value)', () => {
      // Arrange
      const expectedResult: DLContent = {
        dt: [''],
        dd: [''],
      };
      // Act
      const receivedResult: DLContent = adjustIndex(dlContent, indexesOne);
      // Assert
      expect(receivedResult.dd.length).toEqual(indexesOne.length);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
    it('should return dlContent of the same length than indexStorage (2 values)', () => {
      // Arrange
      const expectedResult: DLContent = {
        dt: ['', ''],
        dd: ['', ''],
      };
      // Act
      const receivedResult: DLContent = adjustIndex(dlContent, indexesTwo);

      // Assert
      expect(receivedResult.dd.length).toEqual(indexesTwo.length);
      expect(receivedResult).toStrictEqual(expectedResult);
    });
  });

  describe('directionBuilder specs', () => {
    const collectionUndefined: number[] = undefined;
    const collectionEmpty: number[] = [];
    const collection: number[] = [0, 1, 2];
    const content: DLContent = {
      dt: ['street', 'city', 'country'],
      dd: ['Av 1', 'Madrid', 'Spain'],
    };
    it('should return empty string if collection is undefined', () => {
      // Arrange
      const expectedResult: string = '';
      // Act
      const receivedResult: string = direccionBuilder(
        collectionUndefined,
        content
      );
      // Assert
      expect(receivedResult).toEqual(expectedResult);
    });
    it('should return empty string if collection is empty', () => {
      // Arrange
      const expectedResult: string = '';
      // Act
      const receivedResult: string = direccionBuilder(collectionEmpty, content);
      // Assert
      expect(receivedResult).toEqual(expectedResult);
    });

    it('should merge the address values of DLContent', () => {
      // Arrange
      const expectedResult: string = 'Av 1 Madrid Spain';
      // Act
      const receivedResult: string = direccionBuilder(collection, content);
      // Assert
      expect(receivedResult).toEqual(expectedResult);
    });
  });

  describe('replace comma with dots specs', () => {
    it('should return 0 if the argument is undefined', () => {
      // Arrange
      const str: string = undefined;
      const expectedResult = 0;
      // Act
      const givenResult: number = replaceCommaWithDots(str);
      // Assert
      expect(givenResult).toEqual(expectedResult);
    });
    it('should return the string parsed as number with decimals', () => {
      // Arrange
      const str: string = '22,15';
      const expectedResult = 22.15;
      // Act
      const givenResult: number = replaceCommaWithDots(str);
      // Assert
      expect(givenResult).toEqual(expectedResult);
    });
    it('should return the string parsed as number without decimals', () => {
      // Arrange
      const str: string = '10';
      const expectedResult = 10;
      // Act
      const givenResult: number = replaceCommaWithDots(str);
      // Assert
      expect(givenResult).toEqual(expectedResult);
    });
  });

  describe('doRecursion specs', () => {
    const mocked: DLContent = {
      dd: [
        {
          dl: [
            {
              dd: ['1'],
              dt: ['11.1.1) Número de ofertas recibidas: '],
            },
          ],
        },
        {
          dl: [
            {
              dd: ['1'],
              dt: ['11.2.1) Número de ofertas recibidas: '],
            },
          ],
        },
      ],
      dt: ['11.1) Contrato 2020C1AJ0189: ', '11.2) Contrato 2020C1AJ0189: '],
    };

    it('shoudl map the nested values recursively', () => {
      const expectedResult: OffersReceived[] = [
        {
          totalOffers: 1,
          text: 'Número de ofertas recibidas',
        },
        {
          totalOffers: 1,
          text: 'Número de ofertas recibidas',
        },
      ];

      const givenResult: OffersReceived[] = doRecursion(
        mocked,
        offersReceivedCreator
      );

      expect(givenResult).toStrictEqual(expectedResult);
    });
  });
});
