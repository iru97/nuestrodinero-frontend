"use strict";
exports.__esModule = true;
var contracting_authority_model_1 = require("../contracting-authority/contracting-authority.model");
exports.emptyContent = function () { return ({
    contractingAuthority: contracting_authority_model_1.emptyContractingAuthority(),
    details: [],
    sellingDescription: [],
    offersReceived: [],
    sellers: [],
    offerValues: [],
    date: ''
}); };
