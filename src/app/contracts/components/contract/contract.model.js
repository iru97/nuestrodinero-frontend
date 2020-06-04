"use strict";
exports.__esModule = true;
var metadata_model_1 = require("./metadata.model");
var content_model_1 = require("./content.model");
exports.emptyContract = function () { return ({
    metadata: metadata_model_1.emptyMetadata(),
    content: content_model_1.emptyContent()
}); };
