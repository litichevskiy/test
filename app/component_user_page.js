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
var data_service_language_1 = require('./data.service.language');
var pubSub_1 = require('./pubSub');
var componentUserPage = (function () {
    function componentUserPage(dataService, dataServiceLanguage, cdr) {
        this.dataService = dataService;
        this.dataServiceLanguage = dataServiceLanguage;
        this.cdr = cdr;
        this.dataMoreFollowers = this.dataService.dataMoreFollowers;
        this.allLIst = this.dataService.dataUsersPhotos.getAllList();
        this.language = this.dataServiceLanguage.languageDefault;
        this.dataUserInfo = this.dataService.getDataUserInfo();
        this.infoPosts = this.dataUserInfo.info;
        this.items = this.dataService.getData();
        this.max_select = this.allLIst.length;
        this.selectedPayNow = false;
        this.htmlElement;
        this.listSelected = this.dataService.selectPhotosAndVideos;
        this.isBlur = false;
        this.listNavbar = ['home', 'support'];
    }
    componentUserPage.prototype.ngOnInit = function () {
        var target = this.div.nativeElement.parentElement;
        while (true) {
            if (target.tagName === 'HTML') {
                this.htmlElement = target;
                break;
            }
            target = target.parentElement;
        }
        this.getMaxNumber('photo', 'max_likes');
        this.getMaxNumber('views', 'max_views');
        this.htmlElement.lang = this.language;
        pubSub_1.PubSub.subscribe('closePaNow', this.closePayNow.bind(this));
        pubSub_1.PubSub.subscribe('language', this.setLanguage.bind(this));
    };
    componentUserPage.prototype.getMaxNumber = function (key, vars) {
        var that = this;
        this.allLIst.every(function (item) {
            if (item[key]) {
                that[vars] = item.ranges[item.ranges.length - 1].vmax;
                return false;
            }
            return true;
        });
    };
    componentUserPage.prototype.setLanguage = function (key) {
        this.language = key;
        this.htmlElement.lang = this.language;
    };
    componentUserPage.prototype.unCheckedAll = function () {
        this.allLIst.forEach(function (item) {
            item.checked = false;
        });
    };
    componentUserPage.prototype.selectAll = function (target) {
        if (target.tagName === 'INPUT')
            return;
        var likes = +this.listSelected.likes.value, views = +this.listSelected.views.value, quantity = +this.listSelected.select.value;
        if (this.listSelected.select.checked) {
            this.unCheckedAll();
            if (this.listSelected.likes.checked && this.listSelected.views.checked) {
                this.selectViewsAndLikes(likes, views, quantity, true);
            }
            else if (this.listSelected.views.checked) {
                this.selectViews(views, this.allLIst.length - 1, quantity);
            }
            else if (this.listSelected.likes.checked) {
                this.selectLikes(likes, quantity);
            }
            else
                this.selectViewsAndLikes(0, 0, quantity, true);
        }
        else {
            this.selectViewsAndLikes(0, 0, quantity, false);
        }
        pubSub_1.PubSub.publish('newValue');
    };
    componentUserPage.prototype.selectLikes = function (likes, quantity) {
        var total = 0;
        for (var i = 0; i < quantity; i++) {
            this.allLIst[i].likes.total = likes;
            this.allLIst[i].checked = true;
            total += likes;
        }
        this.dataService.totalSum = total;
    };
    componentUserPage.prototype.selectViews = function (views, quantity, pictures) {
        var total = 0, videos = [];
        for (var i = 0; i < quantity; i++) {
            if (this.allLIst[i].video)
                videos.push(this.allLIst[i]);
        }
        videos.every(function (item, i) {
            if (i === pictures)
                return false;
            item.views.total = views;
            item.checked = true;
            total += views;
            return true;
        });
        this.dataService.totalSum = total;
    };
    componentUserPage.prototype.selectViewsAndLikes = function (likes, views, quantity, checked) {
        var total = 0;
        for (var i = 0; i < quantity; i++) {
            if (this.allLIst[i].video) {
                this.allLIst[i].likes.total = likes;
                this.allLIst[i].views.total = views;
                this.allLIst[i].checked = checked;
                total += likes + views;
                continue;
            }
            if (this.allLIst[i].photo) {
                this.allLIst[i].likes.total = likes;
                this.allLIst[i].checked = checked;
                total += views;
            }
        }
        this.dataService.totalSum = total;
    };
    componentUserPage.prototype.addSelect = function () {
        if (this.listSelected.select.checked)
            this.selectAll();
    };
    componentUserPage.prototype.changeStateChecked = function (event) {
        var target = event.currentTarget, role = event.currentTarget.dataset.role;
        this.listSelected[role].checked = target.checked;
    };
    componentUserPage.prototype.checkValue = function (event) {
        var target = event.currentTarget;
        var key = event.currentTarget.dataset.role;
        if (!isNaN(+target.value)) {
            var cash = target.value = +target.value;
            var check = this.checkMaxAndMinValue(target, 'max_' + key);
            if (cash !== check) {
                this.listSelected[key].value = check;
            }
        }
        else {
            this.listSelected[key].value = this.listSelected[key].value.replace(/\D/g, '');
            target.value = this.listSelected[key].value;
            this.checkMaxValue(target);
        }
    };
    componentUserPage.prototype.checkMaxAndMinValue = function (target, key) {
        var value = +target.value;
        if (this[key]) {
            if (value > this[key])
                value = target.value = this[key];
            else if (value < 0)
                value = target.value = 0;
        }
        return value;
    };
    componentUserPage.prototype.loadPhotos = function () {
        this.dataService.addData();
    };
    componentUserPage.prototype.showPayNow = function () {
        if (this.dataService.totalSum > 0) {
            if (this.dataService.listPayNow.length > 1) {
                this.selectedPayNow = true;
                this.isBlur = true;
            }
            else
                this.dataService.payNow();
        }
    };
    componentUserPage.prototype.closePayNow = function () {
        this.selectedPayNow = false;
        this.isBlur = false;
    };
    componentUserPage.prototype.getTotalSum = function () {
        var total = 0;
        this.items.forEach(function (item) {
            if (item.checked) {
                if (item.likes)
                    total += +item.likes.total;
                if (item.views)
                    total += +item.views.total;
            }
        });
        total += +this.dataMoreFollowers.Followers.total;
        this.dataService.totalSum = total;
    };
    componentUserPage.prototype.replaceState = function (event) {
        var target = event.currentTarget;
        if (event.target.tagName === 'INPUT')
            return;
        var input = target.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change'));
    };
    __decorate([
        core_1.ViewChild('div'), 
        __metadata('design:type', core_1.ElementRef)
    ], componentUserPage.prototype, "div", void 0);
    componentUserPage = __decorate([
        core_1.Component({
            selector: 'userPage',
            templateUrl: './app/template/component_user_page.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, data_service_language_1.DataServiceLanguage, core_1.ChangeDetectorRef])
    ], componentUserPage);
    return componentUserPage;
}());
exports.componentUserPage = componentUserPage;
