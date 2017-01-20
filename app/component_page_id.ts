import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';
import { Component } from '@angular/core';

@Component({
    selector: 'componentPageId',
    templateUrl: 'app/template/component_page_id.html'
})

export class componentPageId {

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){}

}