import { Component, Input } from '@angular/core';
import { PubSub } from './pubSub';

@Component({
    selector: 'componentDropDownMenu',
    templateUrl: './app/template/component_drop_down_menu.html'
})

export class componentDropDownMenu {

    items = ['ru','en'];

    @Input() language : any;

    replaceLang( event ){

        this.language = event.target.innerHTML;
        PubSub.publish('newLang', this.language );
    }

}