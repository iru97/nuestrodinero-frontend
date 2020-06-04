"use strict";
exports.__esModule = true;
var core_1 = require("../../../core");
var utils_1 = require("../../../utils");
exports.emptySeller = function () { return ({
    address: '',
    nif: '',
    name: ''
}); };
exports.sellerCreator = function (contenido) {
    if (!contenido) {
        return exports.emptySeller();
    }
    var valores = [core_1.NOMBRE, core_1.NIF, core_1.DIRECCION, core_1.LOCALIDAD, core_1.PROVINCIA, core_1.CP, core_1.PAIS];
    var indices = utils_1.extractorIndices(contenido.dt, valores);
    //ajustar indices -> si valorAdjudicatarios.length < indices.length, hay que meter un str vacio por cada -1 que haya en indices, en su posicion correspondiente
    if (contenido.dt.length < indices.length) {
        contenido = utils_1.adjustIndex(contenido, indices);
    }
    var nombreIndex = utils_1.indexStorageReducer(indices, 0);
    var nifIndex = utils_1.indexStorageReducer(indices, 1);
    var direccionIndex = utils_1.indexStorageReducer(indices, 2);
    var localidadIndex = utils_1.indexStorageReducer(indices, 3);
    var provinciaIndex = utils_1.indexStorageReducer(indices, 4);
    var cpIndex = utils_1.indexStorageReducer(indices, 5);
    var paisIndex = utils_1.indexStorageReducer(indices, 6);
    var address = utils_1.direccionBuilder([direccionIndex, localidadIndex, provinciaIndex, cpIndex, paisIndex], contenido);
    return {
        name: utils_1.getValorSeguro(contenido.dd, nombreIndex),
        nif: utils_1.getValorSeguro(contenido.dd, nifIndex),
        address: address
    };
};
