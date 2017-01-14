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
var data_service_language_1 = require('./data.service.language');
var data_service_1 = require('./data.service');
var componentPageSupport = (function () {
    function componentPageSupport(dataServiceLanguage, dataService) {
        this.dataServiceLanguage = dataServiceLanguage;
        this.dataService = dataService;
    }
    ;
    componentPageSupport.prototype.checkValue = function (event) {
        var target = event.target, currentTarget = event.currentTarget, firstName, lastName, email, content;
        if (target.tagName === 'BUTTON') {
            firstName = currentTarget.querySelector('.first_name');
            lastName = currentTarget.querySelector('.last_name');
            content = currentTarget.querySelector('.user_mesage');
            email = currentTarget.querySelector('.user_email');
            if (email.value && content.value) {
                if (firstName.value || lastName.value) {
                    this.dataService.messageSupport({
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        content: content.value
                    });
                    this.checkLength([firstName, lastName, content, email], true);
                }
            }
            else {
                this.checkLength([firstName, lastName, content, email], null);
            }
        }
    };
    componentPageSupport.prototype.checkLength = function (list, key) {
        if (!key) {
            list.forEach(function (item) {
                if (item.value.length === 0) {
                    item.classList.add('inputError');
                }
            });
        }
        else {
            list.forEach(function (item) {
                item.classList.remove('inputError');
                item.value = '';
            });
        }
    };
    componentPageSupport = __decorate([
        core_1.Component({
            selector: 'support',
            templateUrl: './app/template/component_page_support.html'
        }), 
        __metadata('design:paramtypes', [data_service_language_1.DataServiceLanguage, data_service_1.DataService])
    ], componentPageSupport);
    return componentPageSupport;
}());
exports.componentPageSupport = componentPageSupport;
