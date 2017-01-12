import { Component } from '@angular/core';
import { PubSub } from './pubSub';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';

@Component({
    selector: 'mainPage',
    templateUrl: './app/template/component_main_page.html'
})

export class componentMainPage {

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){};

    checkValue( event ) {

        var target = event.target,
            currentTarget = event.currentTarget,
            input , value;

        if ( target.tagName === 'BUTTON' ) {

            input = currentTarget.querySelector('input[type="text"]');

            if ( input.value.length > 0 ) {

                this.dataService.func( input.value );
                input.value = '';

                if ( input.classList.contains('inputError') ) {

                    input.classList.remove('inputError')
                }
            }

            else {

              input.classList.add('inputError')
            }
        }
    }

}