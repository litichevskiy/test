import { Component, OnInit } from '@angular/core';
import { PubSub } from './pubSub';
import { DataService } from './data.service';

@Component({
    selector: 'mainPage',
    templateUrl: './app/template/component_main_page.html'
})

export class componentMainPage implements OnInit{

    language;
    mainHeader;
    header;
    userName;
    getStart;

    dataLang = {

        mainHeader : {
            'ru' : 'Лучший способ для набора популярности в Instagram',
            'en' : 'The best way for instagram popularity'
        },

        header : {
            'ru' : 'Мгновенно с 100% гарантией безопасности',
            'en' : 'Instantly 100% safe'
        },

        userName : {
            'ru' : 'имя профиля',
            'en' : 'Enter your profile name'
        },

        getStart : {
            'ru' : 'начать',
            'en' : 'Get popular'
        }
    }

    constructor(private dataService: DataService){};

    ngOnInit() {

        this.language = this.dataService.language;

        this.mainHeader = this.dataLang.mainHeader[this.language];
        this.header = this.dataLang.header[this.language];
        this.userName = this.dataLang.userName[this.language];
        this.getStart = this.dataLang.getStart[this.language];

        PubSub.subscribe('language', this.changeLanguages.bind(this) );
    }


    changeLanguages( key ) {

        this.language = key;

        this.mainHeader = this.dataLang.mainHeader[key];
        this.header = this.dataLang.header[key];
        this.userName = this.dataLang.userName[key];
        this.getStart = this.dataLang.getStart[key];
    }
}