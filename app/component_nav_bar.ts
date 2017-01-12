import { Component, Input } from '@angular/core';
import { PubSub } from './pubSub';

@Component({
    selector: 'ComponentNavBar',
    templateUrl: 'app/template/component_nav_bar.html'
})

export class ComponentNavBar implements OnInit {

    dataLang = {

        'ru' : ['главная', 'поддержка'],
        'en' : ['home', 'support']
    }

    items = [];

    @Input() language : language;

    ngOnInit () {

        this.changeLang( this.language )

        PubSub.subscribe( 'language', this.changeLang.bind( this ) );
    }

    changeLang( key ) {

        this.items = this.dataLang[key];
    }

}