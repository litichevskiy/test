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
var core_1 = require('@angular/core');
var data_service_1 = require('./data.service');
var data_service_language_1 = require('./data.service.language');
var componentMainPage = (function () {
    function componentMainPage(dataServiceLanguage, dataService) {
        this.dataServiceLanguage = dataServiceLanguage;
        this.dataService = dataService;
    }
    ;
    componentMainPage.prototype.checkValue = function (event) {
        var target = event.target, currentTarget = event.currentTarget, input, value;
        if (target.tagName === 'BUTTON') {
            input = currentTarget.querySelector('input[type="text"]');
            if (input.value.length > 0) {
                this.dataService.func(input.value);
                input.value = '';
                if (input.classList.contains('inputError')) {
                    input.classList.remove('inputError');
                }
            }
            else {
                input.classList.add('inputError');
            }
        }
    };
    componentMainPage = __decorate([
        core_1.Component({
            selector: 'mainPage',
            templateUrl: './app/template/component_main_page.html'
        }), 
        __metadata('design:paramtypes', [data_service_language_1.DataServiceLanguage, data_service_1.DataService])
    ], componentMainPage);
    return componentMainPage;
}());
exports.componentMainPage = componentMainPage;
