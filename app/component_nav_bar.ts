import { Component, Input } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';

@Component({
    selector: 'ComponentNavBar',
    templateUrl: 'app/template/component_nav_bar.html'
})

export class ComponentNavBar {

    @Input() list: any;

    constructor(private dataServiceLanguage : DataServiceLanguage ){}

}