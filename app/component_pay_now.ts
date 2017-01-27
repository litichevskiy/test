import { Component } from '@angular/core';
import { PubSub } from './pubSub';
import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';


@Component({
    selector: 'ComponentPayNow',
    templateUrl: 'app/template/component_pay_now.html'
})

export class ComponentPayNow  {

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService,
        private pubSub : PubSub
    ){
        this.listPayMethod = this.dataService.listPayNow;
    }

    closePayNow( event: any ){

        var target = event.target;

        if( target.classList.contains('closeBlock') ||
            target.classList.contains('container_payment_method') )
        {

            this.pubSub.publish('closePaNow');
        }
    }
}