"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var environment_1 = require("src/environments/environment");
var common_1 = require("@angular/common");
var ContractsComponent = /** @class */ (function () {
    function ContractsComponent(boeService, title, meta, platformId) {
        this.boeService = boeService;
        this.title = title;
        this.meta = meta;
        this.isLoading = true;
        this.contractsCollection = [];
        this.isBrowser = common_1.isPlatformBrowser(platformId);
    }
    ContractsComponent.prototype.ngOnInit = function () {
        this.initMetatags();
        if (this.isBrowser) {
            var today = this.getDateFormat();
            this.loadingSubscription = this.boeService
                .getAds(today)
                .subscribe(this.initObserver());
        }
    };
    ContractsComponent.prototype.initMetatags = function () {
        this.title.setTitle('Contratos públicos');
        this.meta.addTags([
            {
                name: 'twitter:card',
                content: 'summary'
            },
            {
                name: 'og:title',
                content: 'Contratos públicos'
            },
            {
                name: 'og:description',
                content: 'Queremos mostrar cuánto dinero público va destinado a las empresas y por qué.'
            },
            {
                name: 'og:url',
                content: '/contratos'
            },
            {
                name: 'og:image',
                content: environment_1.environment.serverUrl + "/assets/images/nuestrodinero_icon.png"
            },
        ]);
    };
    ContractsComponent.prototype.initObserver = function () {
        return {
            next: this.handleNext.bind(this),
            complete: this.handleOnComplete.bind(this)
        };
    };
    ContractsComponent.prototype.handleNext = function (contracts) {
        this.contractsCollection = __spreadArrays(contracts);
    };
    ContractsComponent.prototype.handleOnComplete = function () {
        this.isLoading = false;
    };
    ContractsComponent.prototype.getDateFormat = function () {
        var isoDateTime = new Date().toISOString();
        var tIndex = isoDateTime.indexOf('T');
        var isoDate = isoDateTime.substring(0, tIndex);
        return isoDate.replace(/-/g, '');
    };
    ContractsComponent.prototype.ngOnDestroy = function () {
        if (this.loadingSubscription)
            this.loadingSubscription.unsubscribe();
    };
    ContractsComponent = __decorate([
        core_1.Component({
            selector: 'app-contracts',
            templateUrl: './contracts.component.html',
            styleUrls: ['./contracts.component.scss']
        }),
        __param(3, core_1.Inject(core_1.PLATFORM_ID))
    ], ContractsComponent);
    return ContractsComponent;
}());
exports.ContractsComponent = ContractsComponent;
