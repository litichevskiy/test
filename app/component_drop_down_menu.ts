import { Component } from '@angular/core';
import { PubSub } from './pubSub';
import { DataServiceLanguage } from './data.service.language';

@Component({
    selector: 'componentDropDownMenu',
    templateUrl: './app/template/component_drop_down_menu.html'
})

export class componentDropDownMenu {

    items = [];
    language;


    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private pubSub : PubSub
    ){
        this.items = dataServiceLanguage.languagesList;
    }


    replaceLang( event: any ){

        this.language = event.target.innerHTML;
        this.pubSub.publish('newLang', this.language );
    }

}