"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
var app_server_module_1 = require("./app/app.server.module");
exports.AppServerModule = app_server_module_1.AppServerModule;
var platform_server_1 = require("@angular/platform-server");
exports.renderModule = platform_server_1.renderModule;
exports.renderModuleFactory = platform_server_1.renderModuleFactory;
