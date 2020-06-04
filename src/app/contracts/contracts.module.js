"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var shared_1 = require("./shared");
var components_1 = require("./components");
var contracts_routing_module_1 = require("./contracts-routing.module");
var total_cost_pipe_1 = require("./pipes/total-cost.pipe");
var ContractsModule = /** @class */ (function () {
    function ContractsModule() {
    }
    ContractsModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(components_1.CONTRACT_COMPONENTS, shared_1.CONTRACTS_SHARED_COMPONENTS, [
                total_cost_pipe_1.TotalCostPipe,
            ]),
            imports: [shared_module_1.SharedModule, contracts_routing_module_1.ContractsRoutingModule]
        })
    ], ContractsModule);
    return ContractsModule;
}());
exports.ContractsModule = ContractsModule;
