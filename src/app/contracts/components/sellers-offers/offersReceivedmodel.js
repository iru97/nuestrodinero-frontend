"use strict";
exports.__esModule = true;
var utils_1 = require("../../../utils");
var core_1 = require("../../../core");
exports.emptyOffersReceived = function () { return ({
    text: '',
    totalOffers: 0
}); };
exports.offersReceivedCreator = function (contenido) {
    if (!contenido) {
        return exports.emptyOffersReceived();
    }
    var value = {
        totalOffers: +utils_1.normalizeString(contenido.dd[0], /[\.]/g),
        text: utils_1.normalizeString(contenido.dt[0], core_1.enumeracionDeListasRegexp)
    };
    return value;
};
