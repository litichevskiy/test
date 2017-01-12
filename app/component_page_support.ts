import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { PubSub } from './pubSub';

@Component({
    selector: 'support',
    templateUrl: './app/template/component_page_support.html'
})


export class componentPageSupport implements OnInit {

    language;

    firstName;
    lastName;
    E_mailAddress;
    textTextArea;
    textButton;

    dataLang = {

        firstName : {
            'ru' : 'имя',
            'en' 'first name'
        },

        lastName : {
            'ru' : 'фамилия',
            'en' 'last name'
        },

        E_mailAddress : {
            'ru' : 'почта',
            'en' : 'e-mail address'
        },

        textTextArea : {
            'ru' : 'текст сообщения',
            'en' : 'Your Suggestions Here!'
        },

        textButton : {
            'ru' : 'отправить',
            'en' : 'send suggestion'
        }
    }

    constructor(private dataService: DataService){}

    ngOnInit() {

        this.language = this.dataService.language;
        this.firstName = this.dataLang.firstName[this.language];
        this.lastName = this.dataLang.lastName[this.language];
        this.E_mailAddress = this.dataLang.E_mailAddress[this.language];
        this.textTextArea = this.dataLang.textTextArea[this.language];
        this.textButton = this.dataLang.textButton[this.language];

        PubSub.subscribe('language', this.changeLanguages.bind(this) );
    }

    changeLanguages( key ) {

        this.language = key;

        this.firstName = this.dataLang.firstName[key];
        this.lastName = this.dataLang.lastName[key];
        this.E_mailAddress = this.dataLang.E_mailAddress[key];
        this.textTextArea = this.dataLang.textTextArea[key];
        this.textButton = this.dataLang.textButton[key];
    }
}