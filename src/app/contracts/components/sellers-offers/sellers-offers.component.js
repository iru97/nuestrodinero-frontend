"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var SellersOffersComponent = /** @class */ (function () {
    function SellersOffersComponent() {
        this.offersReceived = [];
        this.sellers = [];
        this.offerValues = [];
    }
    SellersOffersComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], SellersOffersComponent.prototype, "offersReceived");
    __decorate([
        core_1.Input()
    ], SellersOffersComponent.prototype, "sellers");
    __decorate([
        core_1.Input()
    ], SellersOffersComponent.prototype, "offerValues");
    SellersOffersComponent = __decorate([
        core_1.Component({
            selector: 'app-sellers-offers',
            templateUrl: './sellers-offers.component.html',
            styleUrls: ['./sellers-offers.component.scss']
        })
    ], SellersOffersComponent);
    return SellersOffersComponent;
}());
exports.SellersOffersComponent = SellersOffersComponent;
