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
var common_1 = require("@angular/common");
var components_1 = require("./components");
var card_1 = require("@angular/material/card");
var list_1 = require("@angular/material/list");
var icon_1 = require("@angular/material/icon");
var flex_layout_1 = require("@angular/flex-layout");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var toolbar_1 = require("@angular/material/toolbar");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var SHARED_MODULES = [
    common_1.CommonModule,
    flex_layout_1.FlexLayoutModule,
    card_1.MatCardModule,
    button_1.MatButtonModule,
    divider_1.MatDividerModule,
    list_1.MatListModule,
    toolbar_1.MatToolbarModule,
    icon_1.MatIconModule,
    progress_spinner_1.MatProgressSpinnerModule,
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: __spreadArrays(components_1.SHARED_COMPONENTS),
            imports: __spreadArrays(SHARED_MODULES),
            exports: __spreadArrays(components_1.SHARED_COMPONENTS, SHARED_MODULES)
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
