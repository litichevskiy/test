import { Component, Input } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';


@Component({
    selector: 'componentUserMessage',
    templateUrl: 'app/template/component_user_message.html'
})


export class componentUserMessage {

    constructor(private dataServiceLanguage : DataServiceLanguage){}

    @Input() text: any;
}

// component_user_message