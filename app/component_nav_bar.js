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
var ComponentNavBar = (function () {
    function ComponentNavBar() {
        this.dataLang = {
            'ru': ['главная', 'поддержка'],
            'en': ['home', 'support']
        };
        this.items = [];
    }
    ComponentNavBar.prototype.ngOnInit = function () {
        this.changeLang(this.language);
        pubSub_1.PubSub.subscribe('language', this.changeLang.bind(this));
    };
    ComponentNavBar.prototype.changeLang = function (key) {
        this.items = this.dataLang[key];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentNavBar.prototype, "language", void 0);
    ComponentNavBar = __decorate([
        core_1.Component({
            selector: 'ComponentNavBar',
            templateUrl: 'app/template/component_nav_bar.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentNavBar);
    return ComponentNavBar;
}());
exports.ComponentNavBar = ComponentNavBar;
