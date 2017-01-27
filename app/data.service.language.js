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
var pubSub_1 = require('./pubSub');
var core_1 = require("@angular/core");
var DataServiceLanguage = (function () {
    function DataServiceLanguage(pubSub) {
        this.pubSub = pubSub;
        this.languages = {
            ru: {
                PAY_NOW: 'К оплате',
                PAY: 'Оплатить',
                SELECT_PICTURES_FIRST: 'Выбрать последние',
                SELECT_PICTURES_LAST: 'изображений',
                ADD_LIKES_FIRST: 'Добавить на выбранные фото',
                ADD_LIKES_LAST: 'лайков',
                ADD_VIDEO_FIRST: 'Добавить на выбранные видео',
                ADD_VIDEO_LAST: 'просмотров',
                LOAD_MORE: 'Еще',
                POSTS: 'публикаций',
                FOLLOWERS: 'подписчиков',
                FOLLOWING: 'подписки',
                VIEWS: 'просмотров',
                LIKES: 'лайков',
                RU: 'ru',
                EN: 'en',
                LANGUAGE: 'ru',
                SUPPORT: 'Поддержка',
                HOME: 'Домой',
                MAIN_HEADER: 'Лучший способ для набора популярности в Instagram',
                HEADER: 'Мгновенно с 100% гарантией безопасности',
                USER_NAME: 'имя профиля',
                GET_START: 'начать',
                MAIN_HEADER_USER_INFO: 'Для получения подписчиков нужно открыть доступ к Вашей странице',
                HEADER_USER_INFO: 'как это сделать ',
                USER_INFO_STEP_1: 'Войдите на страницу своего профиля.',
                USER_INFO_STEP_2: 'Нажмите на "Редактировать профиль"',
                USER_INFO_STEP_3: 'Снимите галочку "Публикации закрыты".',
                USER_INFO_STEP_4: 'незабудьте нажать "готово" после вышеописанных настроек.',
                NAME: 'имя',
                E_MAIL_ADDRESS: 'почта',
                TEXT_TEXTAREA: 'текст сообщения',
                TEXT_BUTTON: 'отправить',
                CHOOSE_THE_METHOD_OF_PAYMENT: 'Выберите способ оплаты',
                DESCRIPTION_METHOD_OF_PAYMENT: 'Электронные деньги, Карты, интернет-банки, Наличные, СМС-платежи',
                MORE_FOLLOWERS: 'Больше подписчиков',
                THANK_ORDER_ID: 'СПАСИБО ЗА ВАШ ЗАКАЗ',
                ORDER: 'ЗАКАЗ',
                RETURN_TO_THE_WEBSITE: 'Вернуться на сайт',
                CONTENT_PAGE_ID: '',
                ERROR_MAIL: 'введите корректный адрес почты',
                ERROR_MESSAGE: 'введите текст сообщения "до 255 символов"',
                USER_ERROR: 'введите имя',
                MESSAGE_SUPPORT: 'мы свяжемся с Вами в ближайшее время'
            },
            en: {
                PAY_NOW: 'Pay now',
                PAY: 'To pay',
                SELECT_PICTURES_FIRST: 'Select last',
                SELECT_PICTURES_LAST: 'pictures',
                ADD_LIKES_FIRST: 'Add to your selected photos',
                ADD_LIKES_LAST: 'likes',
                ADD_VIDEO_FIRST: 'Add to your selected videos',
                ADD_VIDEO_LAST: 'views',
                LOAD_MORE: 'Load more',
                POSTS: 'posts',
                FOLLOWERS: 'followers',
                FOLLOWING: 'following',
                VIEWS: 'views',
                LIKES: 'likes',
                RU: 'ru',
                EN: 'en',
                LANGUAGE: 'en',
                SUPPORT: 'Support',
                HOME: 'Home',
                MAIN_HEADER: 'The best way for instagram popularity',
                HEADER: 'Instantly 100% safe',
                USER_NAME: 'Enter your profile name',
                GET_START: 'Get popular',
                MAIN_HEADER_USER_INFO: 'For subscribers need to open access to your page',
                HEADER_USER_INFO: 'how to do it ',
                USER_INFO_STEP_1: 'Sign in to your profile page.',
                USER_INFO_STEP_2: 'Click on "Edit Profile".Uncheck "Publications are closed."',
                USER_INFO_STEP_3: 'Uncheck "Publications are closed."',
                USER_INFO_STEP_4: 'do not forget to click "ready" after the above settings.',
                NAME: 'Name',
                E_MAIL_ADDRESS: 'E-Mail',
                TEXT_TEXTAREA: 'Your message',
                TEXT_BUTTON: 'Send',
                CHOOSE_THE_METHOD_OF_PAYMENT: 'ChooseThe method of payment',
                DESCRIPTION_METHOD_OF_PAYMENT: 'Credit Cards, PayPal and Debit Cards',
                MORE_FOLLOWERS: 'More followers',
                THANK_ORDER_ID: 'THANK YOU FOR TOUR ORDER',
                ORDER: 'ORDER ID',
                RETURN_TO_THE_WEBSITE: 'Return to the website',
                CONTENT_PAGE_ID: 'On average it takes 10 minutes execute an order, but it can take up to several hourse. If your order is not completed in 24 hours, please contact us by email: info@cccc.com',
                ERROR_MAIL: 'enter a valid address',
                ERROR_MESSAGE: 'write the message, "255 characters"',
                USER_ERROR: 'enter your name',
                MESSAGE_SUPPORT: 'We will contact You shortly'
            }
        };
        this.init();
        this.languageDefault = 'en';
        this.languagesList = ['ru', 'en'];
    }
    DataServiceLanguage.prototype.init = function () {
        this.pubSub.subscribe('newLang', this.setLanguage.bind(this));
    };
    DataServiceLanguage.prototype.setLanguage = function (key) {
        this.languageDefault = key;
        this.pubSub.publish('language', this.languageDefault);
    };
    DataServiceLanguage.prototype.GetText = function (key) {
        return this.languages[this.languageDefault][key.toUpperCase()];
    };
    DataServiceLanguage = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [pubSub_1.PubSub])
    ], DataServiceLanguage);
    return DataServiceLanguage;
}());
exports.DataServiceLanguage = DataServiceLanguage;
