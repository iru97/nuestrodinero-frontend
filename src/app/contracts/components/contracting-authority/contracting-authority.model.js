"use strict";
exports.__esModule = true;
var core_1 = require("../../../core");
var utils_1 = require("../../../utils");
exports.emptyContractingAuthority = function () { return ({
    name: '',
    nif: '',
    address: '',
    phone: '',
    email: '',
    web: '',
    type: '',
    activity: ''
}); };
exports.authorityTypeCreator = function (valortipoPoder) {
    var valores = [core_1.TIPO, core_1.ACTIVIDAD];
    var indices = utils_1.extractorIndices(valortipoPoder.dt, valores);
    var tipoIndex = utils_1.indexStorageReducer(indices, 0);
    var actividadIndex = utils_1.indexStorageReducer(indices, 1);
    return {
        type: utils_1.getValorSeguro(valortipoPoder.dd, tipoIndex),
        activity: utils_1.getValorSeguro(valortipoPoder.dd, actividadIndex)
    };
};
exports.contractingAuthorityCreator = function (valorContractingAuthority) {
    var valores = [
        core_1.NOMBRE,
        core_1.NIF,
        core_1.DIRECCION,
        core_1.LOCALIDAD,
        core_1.PROVINCIA,
        core_1.CP,
        core_1.PAIS,
        core_1.TELEFONO,
        core_1.EMAIL,
        core_1.WEB,
    ];
    var indices = utils_1.extractorIndices(valorContractingAuthority.dt, valores);
    if (valorContractingAuthority.dt.length < indices.length) {
        valorContractingAuthority = utils_1.adjustIndex(valorContractingAuthority, indices);
    }
    var nombreIndex = utils_1.indexStorageReducer(indices, 0);
    var nifIndex = utils_1.indexStorageReducer(indices, 1);
    var direccionIndex = utils_1.indexStorageReducer(indices, 2);
    var localidadIndex = utils_1.indexStorageReducer(indices, 3);
    var provinciaIndex = utils_1.indexStorageReducer(indices, 4);
    var cpIndex = utils_1.indexStorageReducer(indices, 5);
    var paisIndex = utils_1.indexStorageReducer(indices, 6);
    var telfIndex = utils_1.indexStorageReducer(indices, 7);
    var mailIndex = utils_1.indexStorageReducer(indices, 8);
    var webIndex = utils_1.indexStorageReducer(indices, 9);
    var address = utils_1.direccionBuilder([direccionIndex, localidadIndex, provinciaIndex, cpIndex, paisIndex], valorContractingAuthority);
    return {
        name: utils_1.getValorSeguro(valorContractingAuthority.dd, nombreIndex),
        nif: utils_1.getValorSeguro(valorContractingAuthority.dd, nifIndex),
        address: address,
        phone: utils_1.getValorSeguro(valorContractingAuthority.dd, telfIndex),
        email: utils_1.getValorSeguro(valorContractingAuthority.dd, mailIndex),
        web: utils_1.getValorSeguro(valorContractingAuthority.dd, webIndex)
    };
};
