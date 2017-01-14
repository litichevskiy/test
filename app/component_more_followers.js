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
var componentMoreFollowers = (function () {
    function componentMoreFollowers(dataServiceLanguage, dataService) {
        this.dataServiceLanguage = dataServiceLanguage;
        this.dataService = dataService;
        this.getTotalSum = new core_1.EventEmitter();
        this.data = dataService.dataMoreFollowers;
    }
    componentMoreFollowers.prototype.onChanged = function () {
        this.getTotalSum.emit();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], componentMoreFollowers.prototype, "getTotalSum", void 0);
    componentMoreFollowers = __decorate([
        core_1.Component({
            selector: 'componentMoreFollowers',
            templateUrl: './app/template/component_more_followers.html'
        }), 
        __metadata('design:paramtypes', [data_service_language_1.DataServiceLanguage, data_service_1.DataService])
    ], componentMoreFollowers);
    return componentMoreFollowers;
}());
exports.componentMoreFollowers = componentMoreFollowers;
