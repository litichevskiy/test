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
var pubSub_1 = require('./pubSub');
var componentPageSupport = (function () {
    function componentPageSupport(dataService) {
        this.dataService = dataService;
        this.dataLang = {
            firstName: {
                'ru': 'имя',
                'en': 'first name'
            },
            lastName: {
                'ru': 'фамилия',
                'en': 'last name'
            },
            E_mailAddress: {
                'ru': 'почта',
                'en': 'e-mail address'
            },
            textTextArea: {
                'ru': 'текст сообщения',
                'en': 'Your Suggestions Here!'
            },
            textButton: {
                'ru': 'отправить',
                'en': 'send suggestion'
            }
        };
    }
    componentPageSupport.prototype.ngOnInit = function () {
        this.language = this.dataService.language;
        this.firstName = this.dataLang.firstName[this.language];
        this.lastName = this.dataLang.lastName[this.language];
        this.E_mailAddress = this.dataLang.E_mailAddress[this.language];
        this.textTextArea = this.dataLang.textTextArea[this.language];
        this.textButton = this.dataLang.textButton[this.language];
        pubSub_1.PubSub.subscribe('language', this.changeLanguages.bind(this));
    };
    componentPageSupport.prototype.changeLanguages = function (key) {
        this.language = key;
        this.firstName = this.dataLang.firstName[key];
        this.lastName = this.dataLang.lastName[key];
        this.E_mailAddress = this.dataLang.E_mailAddress[key];
        this.textTextArea = this.dataLang.textTextArea[key];
        this.textButton = this.dataLang.textButton[key];
    };
    componentPageSupport = __decorate([
        core_1.Component({
            selector: 'support',
            templateUrl: './app/template/component_page_support.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], componentPageSupport);
    return componentPageSupport;
}());
exports.componentPageSupport = componentPageSupport;
