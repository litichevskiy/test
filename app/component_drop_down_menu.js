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
var componentDropDownMenu = (function () {
    function componentDropDownMenu() {
        this.items = ['ru', 'en'];
    }
    componentDropDownMenu.prototype.replaceLang = function (event) {
        this.language = event.target.innerHTML;
        pubSub_1.PubSub.publish('newLang', this.language);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], componentDropDownMenu.prototype, "language", void 0);
    componentDropDownMenu = __decorate([
        core_1.Component({
            selector: 'componentDropDownMenu',
            templateUrl: './app/template/component_drop_down_menu.html'
        }), 
        __metadata('design:paramtypes', [])
    ], componentDropDownMenu);
    return componentDropDownMenu;
}());
exports.componentDropDownMenu = componentDropDownMenu;
