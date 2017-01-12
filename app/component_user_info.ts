import { DataServiceLanguage } from './data.service.language';
import { Component } from '@angular/core';
import { PubSub } from './pubSub';


@Component({
    selector: 'ComponentUserInfo',
    templateUrl: 'app/template/component_user_info.html'
})

export class ComponentUserInfo {

    constructor( private dataServiceLanguage : DataServiceLanguage ){};

}
