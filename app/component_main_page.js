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
var pubSub_1 = require('./pubSub');
var data_service_1 = require('./data.service');
var componentMainPage = (function () {
    function componentMainPage(dataService) {
        this.dataService = dataService;
        this.dataLang = {
            mainHeader: {
                'ru': 'Лучший способ для набора популярности в Instagram',
                'en': 'The best way for instagram popularity'
            },
            header: {
                'ru': 'Мгновенно с 100% гарантией безопасности',
                'en': 'Instantly 100% safe'
            },
            userName: {
                'ru': 'имя профиля',
                'en': 'Enter your profile name'
            },
            getStart: {
                'ru': 'начать',
                'en': 'Get popular'
            }
        };
    }
    ;
    componentMainPage.prototype.ngOnInit = function () {
        this.language = this.dataService.language;
        this.mainHeader = this.dataLang.mainHeader[this.language];
        this.header = this.dataLang.header[this.language];
        this.userName = this.dataLang.userName[this.language];
        this.getStart = this.dataLang.getStart[this.language];
        pubSub_1.PubSub.subscribe('language', this.changeLanguages.bind(this));
    };
    componentMainPage.prototype.changeLanguages = function (key) {
        this.language = key;
        this.mainHeader = this.dataLang.mainHeader[key];
        this.header = this.dataLang.header[key];
        this.userName = this.dataLang.userName[key];
        this.getStart = this.dataLang.getStart[key];
    };
    componentMainPage = __decorate([
        core_1.Component({
            selector: 'mainPage',
            templateUrl: './app/template/component_main_page.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], componentMainPage);
    return componentMainPage;
}());
exports.componentMainPage = componentMainPage;
