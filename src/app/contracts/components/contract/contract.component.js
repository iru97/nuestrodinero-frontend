"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var utils_1 = require("src/app/utils");
var ContractComponent = /** @class */ (function () {
    function ContractComponent() {
    }
    ContractComponent.prototype.ngOnInit = function () {
        this.porcentaje = this.calculateContractScore(this.contract);
    };
    ContractComponent.prototype.calculateContractScore = function (item) {
        var total = utils_1.numberOfFieldsWithValue(item, true);
        var value = utils_1.numberOfFieldsWithValue(item, false);
        return Math.round((value * 100) / total);
    };
    ContractComponent.prototype.viewPdf = function () {
        window.open("https://boe.es" + this.contract.metadata.pdfUrl, '_blank');
    };
    __decorate([
        core_1.Input()
    ], ContractComponent.prototype, "contract");
    ContractComponent = __decorate([
        core_1.Component({
            selector: 'app-contract',
            templateUrl: './contract.component.html',
            styleUrls: ['./contract.component.scss']
        })
    ], ContractComponent);
    return ContractComponent;
}());
exports.ContractComponent = ContractComponent;
