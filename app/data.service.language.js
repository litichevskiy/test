"use strict";
var pubSub_1 = require('./pubSub');
var DataServiceLanguage = (function () {
    function DataServiceLanguage() {
        this.lang = 'en';
        this.languages = {
            ru: {
                TotalSum: '',
                PayNow: '',
                Pay: 'Оплатить',
                SelectPicturesFirst: 'Выбрать последние',
                SelectPicturesLast: 'изображений',
                AddLikesFirst: '', Добавить: на, выбранные: фото, ',: AddLikesLast, 'лайков': ,
                AddComentsFirst: 'Добавить на выбранные фото',
                AddComentsLAst: 'комментариев',
                LoadMore: '',
                Posts: 'публикаций',
                Followers: 'подписчиков',
                Following: 'подписки'
            },
            en: {
                TotalSum: 'totalSum',
                PayNow: 'Pay now',
                Pay: 'pay',
                SelectPicturesFirst: 'Select last',
                SelectPicturesLast: 'pictures',
                AddLikesFirst: 'Add to your selected photos',
                AddLikesLast: 'likes',
                AddComentsFirst: 'Add to your selected photos',
                AddComentsLAst: 'coments',
                LoadMore: 'Load more', б: Posts, 'posts': ,
                Followers: 'followers',
                Following: 'following'
            }
        };
        this.init = function (that) {
            pubSub_1.PubSub.subscribe('language', that.changeLang.bind(that));
        }(this);
    }
    DataServiceLanguage.prototype.changeLang = function (key) {
        this.lang = key;
    };
    DataServiceLanguage.prototype.GetText = function (key) {
        return this.languages[this.lang][key];
    };
    return DataServiceLanguage;
}());
exports.DataServiceLanguage = DataServiceLanguage;
