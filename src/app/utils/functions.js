"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var util_1 = require("util");
exports.extractorIndices = function (collection, values) {
    var indices = [];
    var charsToRemove = /[\.\d\):]/g;
    if (!collection || !values) {
        return indices;
    }
    collection.forEach(function (item, index) {
        item = exports.normalizeString(item.trim(), charsToRemove);
        var valorIndex = values.indexOf(item);
        // rellenar con -1 los elemenos que no esten presentes
        var acc = index;
        while (valorIndex > indices.length) {
            indices.push({
                valorIndex: -1,
                collectionIndex: acc
            });
            acc++;
        }
        indices.push({
            valorIndex: valorIndex,
            collectionIndex: acc
        });
    });
    // rellenar con -1 los elemenos que falten
    var acc = indices.length;
    while (indices.length < values.length) {
        indices.push({
            valorIndex: -1,
            collectionIndex: acc
        });
        acc++;
    }
    return indices;
};
exports.normalizeString = function (str, simbolos) {
    var substr = str.replace(simbolos, '');
    return substr.trim();
};
exports.indexStorageReducer = function (collection, index) {
    if (!collection || index < 0) {
        return -1;
    }
    return collection.reduce(function (acc, curr) {
        if (acc != -1) {
            return acc;
        }
        return curr.valorIndex == index ? curr.collectionIndex : -1;
    }, -1);
};
exports.getValorSeguro = function (collection, indice) {
    var _a;
    if (!collection || indice < 0) {
        return '';
    }
    return _a = collection[indice], (_a !== null && _a !== void 0 ? _a : '');
};
exports.replaceCommaWithDots = function (str) {
    return str ? +str.replace(',', '.') : 0;
};
exports.doRecursion = function (contenido, itemCreator) {
    var total = [];
    if (contenido.dt &&
        contenido.dt.length &&
        typeof contenido.dd[0] === 'string') {
        total.push(itemCreator(contenido));
        return total;
    }
    for (var _i = 0, _a = contenido.dd; _i < _a.length; _i++) {
        var iterator = _a[_i];
        var element = iterator.dl[0];
        total = __spreadArrays(total, exports.doRecursion(element, itemCreator));
    }
    return total;
};
exports.direccionBuilder = function (collection, content) {
    if (!collection || !collection.length) {
        return '';
    }
    var direccionIndex = collection[0], localidadIndex = collection[1], provinciaIndex = collection[2], cpIndex = collection[3], paisIndex = collection[4];
    var calle = exports.getValorSeguro(content.dd, direccionIndex);
    var loc = exports.getValorSeguro(content.dd, localidadIndex);
    var prov = exports.getValorSeguro(content.dd, provinciaIndex);
    var cp = exports.getValorSeguro(content.dd, cpIndex);
    var pais = exports.getValorSeguro(content.dd, paisIndex);
    return (calle + " " + loc + " " + prov + " " + cp + " " + pais).trim();
};
// this function is used if we have more items in IndexStorage than items inside DLContent
// in order to place empty strings in the DLContent where we have -1 in the IndexStorage
exports.adjustIndex = function (_a, indices) {
    var dd = _a.dd, dt = _a.dt;
    var localContent = {
        dt: [],
        dd: []
    };
    if (!indices) {
        return localContent;
    }
    indices.forEach(function (item) {
        if (item.valorIndex != -1) {
            localContent.dd.push(dd.shift());
            localContent.dt.push(dt.shift());
        }
        else {
            localContent.dd.push('');
            localContent.dt.push('');
        }
    });
    return localContent;
};
/*
 * If countUndefined is false we count the properties that has value != undefined
 * If countUndefined is true we count the properties that has value == undefined || value != undefined or || value isEmptyArray
 */
exports.numberOfFieldsWithValue = function (o, countUndefined) {
    var counter = 0;
    for (var key in o) {
        var item = o[key];
        if (isObject(item)) {
            if (countUndefined) {
                if (util_1.isArray(item) && item.length == 0) {
                    counter++;
                }
                else {
                    counter += exports.numberOfFieldsWithValue(item, countUndefined);
                }
            }
            else {
                counter += exports.numberOfFieldsWithValue(item, countUndefined);
            }
        }
        else {
            counter += countUndefined ? 1 : item ? 1 : 0;
        }
    }
    return counter;
};
function isObject(o) {
    return typeof o === 'object';
}
