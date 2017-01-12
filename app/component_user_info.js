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
var ComponentUserInfo = (function () {
    function ComponentUserInfo() {
        this.items = [];
        this.dataLang = {
            mainHeader: {
                'ru': 'Для получения подписчиков нужно открыть доступ к Вашей странице',
                'en': 'For subscribers need to open access to your page'
            },
            header: {
                'ru': 'как это сделать ',
                'en': 'how to do it '
            },
            list: {
                'ru': [
                    'Войдите на страницу своего профиля.',
                    'Нажмите на "Редактировать профиль"',
                    'Снимите галочку "Публикации закрыты".',
                    'незабудьте нажать "готово" после вышеописанных настроек.'
                ],
                'en': [
                    'Sign in to your profile page.',
                    'Click on "Edit Profile".',
                    'Uncheck "Publications are closed."',
                    'do not forget to click "ready" after the above settings.'
                ]
            }
        };
    }
    ComponentUserInfo.prototype.ngOnInit = function () {
        pubSub_1.PubSub.subscribe('language', this.changeLanguages.bind(this));
        this.mainHeader = this.dataLang.mainHeader[this.language];
        this.header = this.dataLang.header[this.language];
        this.items = this.dataLang.list[this.language].map(function (item) {
            return item;
        });
    };
    ComponentUserInfo.prototype.changeLanguages = function (key) {
        this.language = key;
        this.mainHeader = this.dataLang.mainHeader[key];
        this.header = this.dataLang.header[key];
        this.items = this.dataLang.list[key].map(function (item) {
            return item;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentUserInfo.prototype, "language", void 0);
    ComponentUserInfo = __decorate([
        core_1.Component({
            selector: 'ComponentUserInfo',
            templateUrl: 'app/template/component_user_info.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentUserInfo);
    return ComponentUserInfo;
}());
exports.ComponentUserInfo = ComponentUserInfo;
