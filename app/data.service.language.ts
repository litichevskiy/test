import { PubSub } from './pubSub';


export class DataServiceLanguage {

    languageDefault = 'en';
    listLanguages = ['ru','en'];

    languages = {

        ru : {

            PAYNOW : 'К оплате',
            PAY : 'Оплатить',
            SELECTPICTURESFIRST : 'Выбрать последние',
            SELECTPICTURESLAST : 'изображений',
            ADDLIKESFIRST : 'Добавить на выбранные фото',
            ADDLIKESLAST : 'лайков',
            ADDVIDEOFIRST : 'Добавить на выбранные видео',
            ADDVIDEOLAST : 'просмотров',
            LOADMORE : 'Еще',
            POSTS : 'публикаций',
            FOLLOWERS : 'подписчиков',
            FOLLOWING : 'подписки',
            VIEWS : 'просмотров',
            LIKES : 'лайков',
            RU : 'ru',
            EN : 'en',
            LANGUAGE : 'ru',
            SUPPORT : 'поддержка',
            HOME : 'домой',
            MAINHEADER : 'Лучший способ для набора популярности в Instagram',
            HEADER : 'Мгновенно с 100% гарантией безопасности',
            USERNAME : 'имя профиля',
            GETSTART : 'начать',
            MAINHEADERUSERINFO : 'Для получения подписчиков нужно открыть доступ к Вашей странице',
            HEADERUSERINFO : 'как это сделать ',
            USERINFOSTEP_1 : 'Войдите на страницу своего профиля.',
            USERINFOSTEP_2 : 'Нажмите на "Редактировать профиль"',
            USERINFOSTEP_3 : 'Снимите галочку "Публикации закрыты".',
            USERINFOSTEP_4 : 'незабудьте нажать "готово" после вышеописанных настроек.',
            FIRSTNAME : 'имя',
            LASTNAME : 'фамилия',
            E_MAILADDRESS : 'почта',
            TEXTTEXTAREA : 'текст сообщения',
            TEXTBUTTON : 'отправить',
            CHOOSETHEMETHODOFPAYMENT : 'Выберите способ оплаты',
            DESCRIPTIONMETHODOFPAYMENT : 'Электронные деньги, Карты, интернет-банки, Наличные, СМС-платежи',
            MOREFOLLOWERS : 'Больше подписчиков'

        },

        en : {

            PAYNOW : 'Pay now',
            PAY : 'To pay',
            SELECTPICTURESFIRST : 'Select last',
            SELECTPICTURESLAST : 'pictures',
            ADDLIKESFIRST : 'Add to your selected photos',
            ADDLIKESLAST : 'likes',
            ADDVIDEOFIRST : 'Add to your selected videos',
            ADDVIDEOLAST : 'views',
            LOADMORE : 'Load more',
            POSTS : 'posts',
            FOLLOWERS : 'followers',
            FOLLOWING : 'following',
            VIEWS : 'views',
            LIKES : 'likes',
            RU : 'ru',
            EN : 'en',
            LANGUAGE : 'en',
            SUPPORT : 'support',
            HOME : 'home',
            MAINHEADER : 'The best way for instagram popularity',
            HEADER : 'Instantly 100% safe',
            USERNAME : 'Enter your profile name',
            GETSTART : 'Get popular',
            MAINHEADERUSERINFO : 'For subscribers need to open access to your page',
            HEADERUSERINFO : 'how to do it ',
            USERINFOSTEP_1 : 'Sign in to your profile page.',
            USERINFOSTEP_2 : 'Click on "Edit Profile".Uncheck "Publications are closed."',
            USERINFOSTEP_3 : 'Uncheck "Publications are closed."',
            USERINFOSTEP_4 : 'do not forget to click "ready" after the above settings.',
            FIRSTNAME : 'first name',
            LASTNAME : 'last name',
            E_MAILADDRESS : 'e-mail address',
            TEXTTEXTAREA : 'Your Suggestions Here!',
            TEXTBUTTON : 'send suggestion',
            CHOOSETHEMETHODOFPAYMENT : 'ChooseThe method of payment',
            DESCRIPTIONMETHODOFPAYMENT : 'Accept, Credit Cards, PayPal and Debit Cards',
            MOREFOLLOWERS : 'More followers'
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

        return this.languages[this.languageDefault][key.toUpperCase()];
    }
}