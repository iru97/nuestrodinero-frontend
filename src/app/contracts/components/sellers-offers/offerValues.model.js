"use strict";
exports.__esModule = true;
var utils_1 = require("../../../utils");
var core_1 = require("../../../core");
exports.emptyOfferValue = function () { return ({
    text: '',
    cost: 0
}); };
exports.offerValueCreator = function (contenido) {
    if (!contenido) {
        return exports.emptyOfferValue();
    }
    var value = {
        cost: utils_1.replaceCommaWithDots(utils_1.normalizeString(contenido.dd[0], core_1.dotsCharsAndSpacesRegexp)),
        text: utils_1.normalizeString(contenido.dt[0], core_1.enumeracionDeListasRegexp)
    };
    return value;
};
