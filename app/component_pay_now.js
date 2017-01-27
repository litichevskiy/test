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
var data_service_language_1 = require('./data.service.language');
var data_service_1 = require('./data.service');
var ComponentPayNow = (function () {
    function ComponentPayNow(dataServiceLanguage, dataService, pubSub) {
        this.dataServiceLanguage = dataServiceLanguage;
        this.dataService = dataService;
        this.pubSub = pubSub;
        this.listPayMethod = this.dataService.listPayNow;
    }
    ComponentPayNow.prototype.closePayNow = function (event) {
        var target = event.target;
        if (target.classList.contains('closeBlock') ||
            target.classList.contains('container_payment_method')) {
            this.pubSub.publish('closePaNow');
        }
    };
    ComponentPayNow = __decorate([
        core_1.Component({
            selector: 'ComponentPayNow',
            templateUrl: 'app/template/component_pay_now.html'
        }), 
        __metadata('design:paramtypes', [data_service_language_1.DataServiceLanguage, data_service_1.DataService, pubSub_1.PubSub])
    ], ComponentPayNow);
    return ComponentPayNow;
}());
exports.ComponentPayNow = ComponentPayNow;
