import { DataServiceLanguage } from './data.service.language';
import { Component } from '@angular/core';
import { PubSub } from './pubSub';

@Component({
    selector: 'ComponentNavBar',
    templateUrl: 'app/template/component_nav_bar.html'
})

export class ComponentNavBar implements OnInit {

    constructor(private dataServiceLanguage : DataServiceLanguage ){}

}