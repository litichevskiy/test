// import { OnInit } from '@angular/core';
import { PubSub } from './pubSub';


export class DataServiceLanguage {

    languageDefault = 'ru';
    listLanguages = ['ru','en'];

    languages = {

        ru : {

            PayNow : 'К оплате',
            Pay : 'Оплатить',
            SelectPicturesFirst : 'Выбрать последние',
            SelectPicturesLast : 'изображений',
            AddLikesFirst : 'Добавить на выбранные фото',
            AddLikesLast : 'лайков',
            AddComentsFirst : 'Добавить на выбранные фото',
            AddComentsLast : 'комментариев',
            LoadMore : 'Еще',
            Posts : 'публикаций',
            Followers : 'подписчиков',
            Following : 'подписки',
            comments : 'комметариев',
            likes : 'лайков',
            ru : 'ru',
            en : 'en',
            language : 'ru',
            Support : 'поддержка',
            Home : 'домой',
            MainHeader : 'Лучший способ для набора популярности в Instagram',
            Header : 'Мгновенно с 100% гарантией безопасности',
            UserName : 'имя профиля',
            GetStart : 'начать',
            MainHeaderUserInfo : 'Для получения подписчиков нужно открыть доступ к Вашей странице',
            HeaderUserInfo : 'как это сделать ',
            UserInfoStep_1 : 'Войдите на страницу своего профиля.',
            UserInfoStep_2 : 'Нажмите на "Редактировать профиль"',
            UserInfoStep_3 : 'Снимите галочку "Публикации закрыты".',
            UserInfoStep_4 : 'незабудьте нажать "готово" после вышеописанных настроек.',
            FirstName : 'имя',
            LastName : 'фамилия',
            E_mailAddress : 'почта',
            TextTextArea : 'текст сообщения',
            TextButton : 'отправить',
            ChooseTheMethodOfPayment : 'Выберите способ оплаты',
            DescriptionMethodOfPayment : 'Электронные деньги, Карты, интернет-банки, Наличные, СМС-платежи',
            MoreFollowers : 'Больше подписчиков'

        },

        en : {

            PayNow : 'Pay now',
            Pay : 'To pay',
            SelectPicturesFirst : 'Select last',
            SelectPicturesLast : 'pictures',
            AddLikesFirst : 'Add to your selected photos',
            AddLikesLast : 'likes',
            AddComentsFirst : 'Add to your selected photos',
            AddComentsLast : 'comments',
            LoadMore : 'Load more',
            Posts : 'posts',
            Followers : 'followers',
            Following : 'following',
            comments : 'comments',
            likes : 'likes',
            ru : 'ru',
            en : 'en',
            language : 'en',
            Support : 'support',
            Home : 'home',
            MainHeader : 'The best way for instagram popularity',
            Header : 'Instantly 100% safe',
            UserName : 'Enter your profile name',
            GetStart : 'Get popular',
            MainHeaderUserInfo : 'For subscribers need to open access to your page',
            HeaderUserInfo : 'how to do it ',
            UserInfoStep_1 : 'Sign in to your profile page.',
            UserInfoStep_2 : 'Click on "Edit Profile".Uncheck "Publications are closed."',
            UserInfoStep_3 : 'Uncheck "Publications are closed."',
            UserInfoStep_4 : 'do not forget to click "ready" after the above settings.',
            FirstName : 'first name',
            LastName : 'last name',
            E_mailAddress : 'e-mail address',
            TextTextArea : 'Your Suggestions Here!',
            TextButton : 'send suggestion',
            ChooseTheMethodOfPayment : 'ChooseThe method of payment',
            DescriptionMethodOfPayment : 'Accept, Credit Cards, PayPal and Debit Cards',
            MoreFollowers : 'More followers'
        }

    };


    init : function( that ) {

        PubSub.subscribe('newLang', that.setLanguage.bind( that ) );

    }( this )


    setLanguage( key ) {

        this.languageDefault = key;

        PubSub.publish('language', this.languageDefault );
    }

    GetText( key ){

        return this.languages[this.languageDefault][key];
    }
}