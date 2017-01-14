import { Component } from '@angular/core';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';

@Component({
    selector: 'componentProcessForPayment',
    templateUrl: './app/template/component_process_for_payment.html'
})

export class componentProcessForPayment {

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){}

    payNow() {

        this.dataService.payNow();
    }
}