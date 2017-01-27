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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var serverAPI_1 = require('./serverAPI');
var Data = (function () {
    function Data() {
    }
    return Data;
}());
exports.Data = Data;
var DataService = (function () {
    function DataService(_data, serverAPI) {
        this._data = _data;
        this.serverAPI = serverAPI;
        this.data = [];
        this._from = 0;
        this.quantity = 12;
        this.list = [];
        this.totalSum = 0;
        this.profileIsOpen = false;
        this.id = '123 123 123';
        this.listPayNow = [
            { pathToPhoto: 'app/img/logo_2_checkout.png', content: 'DESCRIPTION_METHOD_OF_PAYMENT', url: '/pay/checkout' },
            { pathToPhoto: 'app/img/sprypay_logo.png', content: 'DESCRIPTION_METHOD_OF_PAYMENT', url: '/pay/sprypay' },
            { pathToPhoto: 'app/img/sprypay_logo.png', content: 'DESCRIPTION_METHOD_OF_PAYMENT', url: '/pay/sprypay' }
        ];
        this.dataMoreFollowers = {
            checked: true,
            Followers: { name: 'MORE_FOLLOWERS', total: 0 },
            settings: { currentValue: 0 },
            ranges: [
                { min: 0, max: 1, vmin: 0, vmax: 0 },
                { min: 1, max: 500, vmin: 100, vmax: 1000 },
                { min: 501, max: 550, vmin: 1000, vmax: 5000 },
                { min: 551, max: 650, vmin: 5000, vmax: 10000 },
                { min: 651, max: 700, vmin: 10000, vmax: 25000 },
                { min: 701, max: 1000, vmin: 25000, vmax: 50000 }
            ]
        };
        this.selectPhotosAndVideos = {
            likes: { checked: false, value: 300 },
            views: { checked: false, value: 700 },
            select: { checked: false, value: 7 }
        };
        this.dataUserInfo = {
            user: { pathToPhoto: 'app/img/user_photo.jpg', name: 'Vasiliy' },
            info: [
                { name: 'posts', value: 100 },
                { name: 'followers', value: 200 },
                { name: 'following', value: 300 }
            ]
        };
        this.createListPhotos();
    }
    DataService.prototype.createListPhotos = function () {
        this.list = this._data.items;
        for (var i = 0; i < 1000; i++) {
            this.list.push({
                id: this.list.length,
                url: { path: '/app/img/bg_0.png' },
                likes: { name: 'likes', total: 0 },
                data: { likes: '+100', coments: '+300' },
                settings: { currentValue: 198 },
                checked: false,
                photo: true,
                ranges: [
                    { min: 0, max: 1, vmin: 0, vmax: 0 },
                    { min: 1, max: 500, vmin: 100, vmax: 1000 },
                    { min: 501, max: 550, vmin: 1000, vmax: 5000 },
                    { min: 551, max: 650, vmin: 5000, vmax: 10000 },
                    { min: 651, max: 700, vmin: 10000, vmax: 25000 },
                    { min: 701, max: 1000, vmin: 25000, vmax: 50000 }
                ]
            });
        }
    };
    DataService.prototype.getList = function (from, quantity) {
        if (from >= this.list.length)
            return;
        var data = this.list.slice(from, quantity);
        return data;
    };
    DataService.prototype.getAllList = function () {
        return this.list;
    };
    DataService.prototype.getData = function () {
        var list = this.getList(this._from, this.quantity), that = this;
        list.forEach(function (item) {
            that.data.push(item);
        });
        return this.data;
    };
    DataService.prototype.getDataUserInfo = function () {
        return this.dataUserInfo;
    };
    DataService.prototype.logOn = function (val) {
        this.profileIsOpen = true;
        this.serverAPI.logOn(val);
    };
    DataService.prototype.payNow = function (url) {
        var data = this.getSelectedPhotos();
        this.serverAPI.payNow(data, url);
    };
    DataService.prototype.messageSupport = function (data) {
        this.serverAPI.messageSupport(data);
    };
    DataService.prototype.addData = function () {
        this._from = this.quantity;
        this.quantity = this.quantity + 12;
        var list = this.getList(this._from, this.quantity), that = this;
        list.forEach(function (item) {
            that.data.push(item);
        });
        return this.data;
    };
    DataService.prototype.getSelectedPhotos = function () {
        var list = this.getAllList(), result = [], check = false;
        list.forEach(function (item) {
            if (item.checked) {
                if (item.likes) {
                    if (+item.likes.total > 0)
                        check = true;
                }
                if (item.views) {
                    if (+item.views.total > 0)
                        check = true;
                }
                if (check)
                    check = false, result.push(item);
            }
        });
        if (this.dataMoreFollowers) {
            if (this.dataMoreFollowers.Followers.total > 0)
                result.push(this.dataMoreFollowers);
        }
        return result;
    };
    DataService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject("_data.items")), 
        __metadata('design:paramtypes', [Data, serverAPI_1.ServerAPI])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
