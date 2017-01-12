import { Component, Input } from '@angular/core';
import {PubSub} from './pubSub';


@Component({
    selector: 'ComponentPayNow',
    templateUrl: 'app/template/component_pay_now.html'
})

export class ComponentPayNow {

    @Input() totalSum : any;

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