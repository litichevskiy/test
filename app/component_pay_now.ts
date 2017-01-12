import { Component, Input } from '@angular/core';
import { PubSub } from './pubSub';
import { DataServiceLanguage } from './data.service.language';


@Component({
    selector: 'ComponentPayNow',
    templateUrl: 'app/template/component_pay_now.html'
})

export class ComponentPayNow {

    @Input() totalSum : any;

    constructor( private dataServiceLanguage : DataServiceLanguage ){};

    closePayNow( event ){

        var target = event.target;

        if( target.classList.contains('closeBlock') ||
            target.classList.contains('container_payment_method') )
        {

            PubSub.publish('closePaNow');
        }
    }

    payNow() {

        PubSub.publish('payNow', this.totalSum );
    }
}