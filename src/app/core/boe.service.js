"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var BoeService = /** @class */ (function () {
    function BoeService(http) {
        this.http = http;
        this.url = environment_1.environment.serverUrl;
    }
    BoeService.prototype.getAds = function (date) {
        return this.http
            .get(this.url + "/api/boe?id=BOE-S-" + date)
            .pipe(operators_1.catchError(this.adErrHandler));
    };
    BoeService.prototype.adErrHandler = function (err) {
        console.warn('BoeService warning -> ', err);
        return rxjs_1.of([]);
    };
    BoeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BoeService);
    return BoeService;
}());
exports.BoeService = BoeService;
