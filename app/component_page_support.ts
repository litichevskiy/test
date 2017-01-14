import { Component } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';

@Component({
    selector: 'support',
    templateUrl: './app/template/component_page_support.html'
})


export class componentPageSupport {

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){};

    checkValue( event ) {

        var target = event.target,
            currentTarget = event.currentTarget,
            firstName, lastName, email, content;

        if ( target.tagName === 'BUTTON' ) {

            firstName = currentTarget.querySelector('.first_name');
            lastName = currentTarget.querySelector('.last_name');
            content = currentTarget.querySelector('.user_mesage');
            email = currentTarget.querySelector('.user_email');

            if ( email.value && content.value ) {

                if ( firstName.value || lastName.value ) {

                    this.dataService.messageSupport({

                        firstName : firstName.value,
                        lastName  : lastName.value,
                        email     : email.value,
                        content   : content.value
                    });

                    this.checkLength( [firstName, lastName, content, email], true );
                }
            }

            else {

                this.checkLength( [firstName, lastName, content, email], null );
            }

        }
    }

    checkLength( list, key ) {

        if ( !key ) {

            list.forEach( function( item ) {

                if( item.value.length === 0 ) {

                    item.classList.add('inputError')
                }

            });
        }

        else {

            list.forEach( function( item ) {

                item.classList.remove('inputError');
                item.value = '';

            });
        }
    }

}