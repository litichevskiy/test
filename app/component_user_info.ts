import { DataServiceLanguage } from './data.service.language';
import { Component } from '@angular/core';


@Component({
    selector: 'ComponentUserInfo',
    templateUrl: 'app/template/component_user_info.html'
})

export class ComponentUserInfo {

    constructor( private dataServiceLanguage : DataServiceLanguage ){};

}
