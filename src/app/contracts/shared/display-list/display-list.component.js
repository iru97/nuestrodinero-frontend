"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DisplayListComponent = /** @class */ (function () {
    function DisplayListComponent() {
        this.items = [];
        this.title = '';
    }
    DisplayListComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], DisplayListComponent.prototype, "items");
    __decorate([
        core_1.Input()
    ], DisplayListComponent.prototype, "title");
    DisplayListComponent = __decorate([
        core_1.Component({
            selector: 'app-display-list',
            templateUrl: './display-list.component.html',
            styleUrls: ['./display-list.component.scss']
        })
    ], DisplayListComponent);
    return DisplayListComponent;
}());
exports.DisplayListComponent = DisplayListComponent;
