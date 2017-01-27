import { Component, Input } from '@angular/core';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';
import { PubSub } from './pubSub';

@Component({
    selector: 'componentProcessForPayment',
    templateUrl: './app/template/component_process_for_payment.html'
})

export class componentProcessForPayment {

    @Input() item : any;

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService,
        private pubSub : PubSub
    ){}

    payNow() {

        this.dataService.payNow( this.item.url );
        this.pubSub.publish('closePaNow');
    }
}