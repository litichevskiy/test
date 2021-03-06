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
    function componentUserPage(dataService, dataServiceLanguage) {
        this.dataService = dataService;
        this.dataServiceLanguage = dataServiceLanguage;
        this.totalSum = 0;
        this.selectedPayNow = false;
        this.dataLangPayNow = {
            'ru': 'к оплате',
            'en': 'pay now'
        };
        this.dataLangPay = {
            'ru': 'оплатить',
            'en': 'pay'
        };
        this.dataLangInfo = {
            posts: {
                'ru': 'публикаций',
                'en': 'posts'
            },
            followers: {
                'ru': 'подписчиков',
                'en': 'followers'
            },
            following: {
                'ru': 'подписки',
                'en': 'following'
            }
        };
        this.dataLangSelected = {
            selectPictures: {
                'en': {
                    first: 'Select last',
                    last: 'pictures'
                },
                'ru': {
                    first: 'Выбрать последние',
                    last: 'изображений'
                }
            },
            addLikes: {
                'en': {
                    first: 'Add to your selected photos',
                    last: 'likes'
                },
                'ru': {
                    first: 'Добавить на выбранные фото',
                    last: 'лайков'
                }
            },
            addComents: {
                'en': {
                    first: 'Add to your selected photos',
                    last: 'coments'
                },
                'ru': {
                    first: 'Добавить на выбранные фото',
                    last: 'комментариев'
                }
            }
        };
        this.listSelected = {
            likes: { checked: false, value: 10 },
            coments: { checked: false, value: 20 },
            select: { checked: false, value: 30 },
        };
    }
    ;
    componentUserPage.prototype.ngOnInit = function () {
        var that = this, target = this.div.nativeElement.parentElement;
        while (true) {
            if (target.tagName === 'HTML') {
                this.htmlElement = target;
                break;
            }
            target = target.parentElement;
        }
        this.language = this.dataService.language;
        this.allLIst = this.dataService.dataUsersPhotos.getAllList();
        this.items = this.dataService.getData();
        this.dataUserInfo = this.dataService.getDataUserInfo();
        this.infoPosts = this.dataUserInfo.info;
        this.infoPosts = this.infoPosts.map(function (item) {
            item.content = that.dataLangInfo[item.name][that.language];
            return item;
        });
        this.selectPictures_first = this.dataLangSelected.selectPictures[this.language].first;
        this.selectPictures_last = this.dataLangSelected.selectPictures[this.language].last;
        this.addLikes_first = this.dataLangSelected.addLikes[this.language].first;
        this.addLikes_last = this.dataLangSelected.addLikes[this.language].last;
        this.addComents_first = this.dataLangSelected.addComents[this.language].first;
        this.addComents_last = this.dataLangSelected.addComents[this.language].last;
        this.Pay_now = this.dataLangPayNow[this.language];
        this.Pay = this.dataLangPay[this.language];
        pubSub_1.PubSub.subscribe('closePaNow', this.closePayNow.bind(this));
        pubSub_1.PubSub.subscribe('language', this.changeLanguages.bind(this));
    };
    componentUserPage.prototype.changeLanguages = function (key) {
        var that = this;
        this.language = key;
        this.htmlElement.lang = this.language;
        this.infoPosts = this.infoPosts.map(function (item) {
            item.content = that.dataLangInfo[item.name][key];
            return item;
        });
        this.Pay_now = this.dataLangPayNow[key];
        this.Pay = this.dataLangPay[key];
        this.selectPictures_first = this.dataLangSelected.selectPictures[key].first;
        this.selectPictures_last = this.dataLangSelected.selectPictures[key].last;
        this.addLikes_first = this.dataLangSelected.addLikes[key].first;
        this.addLikes_last = this.dataLangSelected.addLikes[key].last;
        this.addComents_first = this.dataLangSelected.addComents[key].first;
        this.addComents_last = this.dataLangSelected.addComents[key].last;
    };
    componentUserPage.prototype.selectAll = function () {
        var count = 0, result = 0, storageSum = [];
        if (this.listSelected.select.checked) {
            for (var key in this.listSelected) {
                if (key !== 'select' && this.listSelected[key].checked) {
                    result = this.func(key, +this.listSelected[key].value, +this.listSelected.select.value, true);
                    count++;
                    storageSum.push(result);
                }
            }
            if (count === 0) {
                for (var key in this.listSelected) {
                    if (key !== 'select') {
                        this.func(key, 0, +this.listSelected.select.value, true);
                    }
                }
                this.totalSum = 0;
            }
            else {
                this.totalSum = storageSum.reduce(function (sum, item) {
                    return sum + item;
                }, 0);
            }
        }
        else if (!this.listSelected.select.checked) {
            for (var key in this.listSelected) {
                if (key !== 'select') {
                    this.func(null);
                }
            }
            this.totalSum = 0;
        }
    };
    componentUserPage.prototype.addSelect = function () {
        if (this.listSelected.select.checked)
            this.selectAll();
    };
    componentUserPage.prototype.f = function (event) {
        var target = event.currentTarget, role = event.currentTarget.dataset.role, count = 0;
        this.listSelected[role].checked = target.checked;
    };
    componentUserPage.prototype.checkValue = function (event) {
        var target = event.currentTarget;
        var key = event.currentTarget.dataset.role;
        if (!isNaN(+target.value)) {
            target.value = +target.value;
        }
        else {
            this.listSelected[key].value = this.listSelected[key].value.replace(/\D/g, '');
            target.value = this.listSelected[key].value;
        }
    };
    componentUserPage.prototype.loadPhotos = function () {
        this.dataService.addData();
    };
    componentUserPage.prototype.showPayNow = function () {
        if (this.totalSum > 0)
            this.selectedPayNow = true;
    };
    componentUserPage.prototype.closePayNow = function () {
        this.selectedPayNow = false;
    };
    componentUserPage.prototype.getTotalSum = function () {
        var total = 0;
        this.items.forEach(function (item) {
            if (item.checked) {
                if (item.likes)
                    total += +item.likes.total;
                if (item.coments)
                    total += +item.coments.total;
            }
        });
        this.totalSum = total;
    };
    componentUserPage.prototype.replaceState = function (event) {
        var target = event.currentTarget;
        if (event.target.tagName === 'INPUT')
            return;
        target.classList.toggle('label_active');
        var input = target.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change'));
    };
    componentUserPage.prototype.func = function (key, val, quantity, checked) {
        var total = 0;
        if (key) {
            for (var i = 0; i < quantity; i++) {
                if (this.allLIst[i][key]) {
                    this.allLIst[i][key].total = val;
                    this.allLIst[i].checked = checked;
                    total += val;
                }
            }
            pubSub_1.PubSub.publish('newValue');
        }
        if (!key) {
            this.allLIst.every(function (item) {
                if (item.checked)
                    item.checked = false;
                return true;
                return false;
            });
        }
        return total;
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
        __metadata('design:paramtypes', [data_service_1.DataService, data_service_language_1.DataServiceLanguage])
    ], componentUserPage);
    return componentUserPage;
}());
exports.componentUserPage = componentUserPage;
