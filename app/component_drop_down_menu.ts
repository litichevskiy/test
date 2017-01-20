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


    constructor( private dataServiceLanguage : DataServiceLanguage ){
        this.items = dataServiceLanguage.listLanguages;
    }


    replaceLang( event ){
        debugger
        this.language = event.target.innerHTML;
        PubSub.publish('newLang', this.language );
    }

}