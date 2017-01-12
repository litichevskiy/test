"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var data_service_language_1 = require('./data.service.language');
var core_1 = require('@angular/core');
var ComponentNavBar = (function () {
    function ComponentNavBar(dataServiceLanguage) {
        this.dataServiceLanguage = dataServiceLanguage;
    }
    ComponentNavBar = __decorate([
        core_1.Component({
            selector: 'ComponentNavBar',
            templateUrl: 'app/template/component_nav_bar.html'
        }), 
        __metadata('design:paramtypes', [data_service_language_1.DataServiceLanguage])
    ], ComponentNavBar);
    return ComponentNavBar;
}());
exports.ComponentNavBar = ComponentNavBar;
