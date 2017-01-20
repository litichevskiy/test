import { Component, Input } from  '@angular/core';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';


@Component({
    selector: 'componentError',
    templateUrl: './app/template/component_error.html'
})


export class componentError{

    @Input() text: any;

    constructor(
        private dataService: DataService,
        private dataServiceLanguage : DataServiceLanguage
    ){}
}