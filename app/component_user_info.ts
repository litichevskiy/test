import { Component, Input, OnInit } from '@angular/core';
import { PubSub } from './pubSub';


@Component({
    selector: 'ComponentUserInfo',
    templateUrl: 'app/template/component_user_info.html'
})

export class ComponentUserInfo implements OnInit{

    @Input() language : any;

    mainHeader;
    header;
    items = [];

    dataLang = {

        mainHeader : {

            'ru' : 'Для получения подписчиков нужно открыть доступ к Вашей странице',
            'en' : 'For subscribers need to open access to your page'
        },

        header : {

            'ru' : 'как это сделать ',
            'en' : 'how to do it '
        },

        list : {

            'ru' : [

                'Войдите на страницу своего профиля.',
                'Нажмите на "Редактировать профиль"',
                'Снимите галочку "Публикации закрыты".',
                'незабудьте нажать "готово" после вышеописанных настроек.'
            ],

            'en' : [

                'Sign in to your profile page.',
                'Click on "Edit Profile".',
                'Uncheck "Publications are closed."',
                'do not forget to click "ready" after the above settings.'
            ]
        }
    }

    ngOnInit() {


        PubSub.subscribe('language', this.changeLanguages.bind(this) );

        this.mainHeader = this.dataLang.mainHeader[this.language];
        this.header = this.dataLang.header[this.language];

        this.items = this.dataLang.list[this.language].map(function(item){
            return item;
        });
    }


    changeLanguages( key ) {

        this.language = key;

        this.mainHeader = this.dataLang.mainHeader[key];
        this.header = this.dataLang.header[key];

        this.items = this.dataLang.list[key].map(function(item){
            return item;
        });
    }

}
