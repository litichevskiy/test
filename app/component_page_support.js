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
        this.MAX_LENGTH_MESSAGE = 250;
        this.REG_EXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
        this.container;
        this.email;
        this.content;
        this.userName;
        this.errorEmail = false;
        this.errorMessage = false;
        this.errorEmailText = 'ERROR_MAIL';
        this.errorMessageText = 'ERROR_MESSAGE';
        this.text;
        this.message = false;
        this.messageSupport = 'MESSAGE_SUPPORT';
        this.isBlur = false;
        this.listNavbar = ['HOME'];
    }
    ;
    componentPageSupport.prototype.ngOnInit = function () {
        this.container = this.div.nativeElement;
        this.email = this.container.querySelector('.user_email');
        this.content = this.container.querySelector('.user_mesage');
        this.userName = this.container.querySelector('.user_name');
    };
    componentPageSupport.prototype.checkUserEmail = function (val) {
        var result = this.REG_EXP.test(val);
        if (result)
            return result;
        else
            return false;
    };
    componentPageSupport.prototype.checkUserMessage = function (val) {
        if (val.length > 0 && val.length < this.MAX_LENGTH_MESSAGE)
            return true;
        else
            return false;
    };
    componentPageSupport.prototype.checkValue = function (event) {
        var email = this.checkUserEmail(this.email.value), content = this.checkUserMessage(this.content.value);
        if (email && content) {
            this.dataService.messageSupport({
                firstName: this.userName.value,
                email: this.email.value,
                content: this.content.value
            });
            this.clearInput([this.userName, this.email, this.content]);
            this.isBlur = this.message = true;
            this.removeMessage();
            if (this.errorEmail || this.errorMessage) {
                this.errorMessage = this.errorEmail = false;
            }
        }
        else if (!email) {
            this.text = this.errorEmailText;
            this.errorEmail = true;
        }
        if (!content) {
            this.text = this.errorMessageText;
            this.errorMessage = true;
        }
    };
    componentPageSupport.prototype.clearInput = function (list) {
        list.forEach(function (item) {
            item.value = '';
        });
    };
    componentPageSupport.prototype.removeMessage = function () {
        var that = this;
        setTimeout(function () {
            that.isBlur = that.message = false;
        }, this.CLEAR_MESSAGE);
    };
    __decorate([
        core_1.ViewChild('div'), 
        __metadata('design:type', core_1.ElementRef)
    ], componentPageSupport.prototype, "div", void 0);
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
