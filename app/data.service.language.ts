import { OnInit } from '@angular/core';
import { PubSub } from './pubSub';


export class DataServiceLanguage {

    lang = 'en';

    languages = {

        ru : {

            TotalSum : '',
            PayNow : '',
            Pay : 'Оплатить',
            SelectPicturesFirst : 'Выбрать последние',
            SelectPicturesLast : 'изображений',
            AddLikesFirst : ''Добавить на выбранные фото',
            AddLikesLast : 'лайков',
            AddComentsFirst : 'Добавить на выбранные фото',
            AddComentsLAst : 'комментариев',
            LoadMore : '',
            Posts : 'публикаций',
            Followers : 'подписчиков',
            Following : 'подписки'

        },

        en : {

            TotalSum : 'totalSum',
            PayNow : 'Pay now',
            Pay : 'pay',
            SelectPicturesFirst : 'Select last',
            SelectPicturesLast : 'pictures',
            AddLikesFirst : 'Add to your selected photos',
            AddLikesLast : 'likes',
            AddComentsFirst : 'Add to your selected photos',
            AddComentsLAst : 'coments',
            LoadMore : 'Load more'б
            Posts : 'posts',
            Followers : 'followers',
            Following : 'following'
        }

    };


    init : function( that ) {

        PubSub.subscribe('language', that.changeLang.bind(that) );

    }( this )


    changeLang( key ) {
        this.lang = key;
    }

    GetText( key ){

        return this.languages[this.lang][key];
    }
}