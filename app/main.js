"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
var data_service_1 = require('./data.service');
var data_service_2 = require('./data.service');
// const platform = platformBrowserDynamic();
// platform.bootstrapModule(AppModule);
function main(d) {
    // debugger
    var _data = new data_service_2.Data();
    _data.items = d;
    platform_browser_dynamic_1.platformBrowserDynamic([{ provide: '_data.items', useValue: _data }, data_service_1.DataService]).bootstrapModule(app_module_1.AppModule);
}
exports.main = main;
