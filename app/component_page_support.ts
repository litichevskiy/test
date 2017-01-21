import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';

@Component({
    selector: 'support',
    templateUrl: './app/template/component_page_support.html'
})


export class componentPageSupport implements OnInit{

    MAX_LENGTH_MESSAGE = 255;
    REG_EXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;


    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){
        this.container;
        this.email;
        this.content;
        this.userName;
        this.errorEmail = false;
        this.errorMessage = false;
        this.errorEmailText = 'ERROR_MAIL';
        this.errorMessageText = 'ERROR_MESSAGE';
        this.text;
        this.message = false;
        this.messageSupport = 'MESSAGE_SUPPORT';
        this.isBlur = false;
        this.listNavbar = ['HOME'];
    };

    @ViewChild('div') div: ElementRef;

    ngOnInit() {

        this.container = this.div.nativeElement;
        this.email = this.container.querySelector('.user_email');
        this.content = this.container.querySelector('.user_mesage');
        this.userName = this.container.querySelector('.user_name');
    }

    checkUserEmail( val ) {

        var result = this.REG_EXP.test( val );

        if ( result ) return result;
        else return false;
    }

    checkUserMessage( val ) {

        if( val.length > 0 && val.length < this.MAX_LENGTH_MESSAGE ) return true;
        else return false;
    }

    checkValue( event ) {

        var email = this.checkUserEmail( this.email.value ),
            content = this.checkUserMessage( this.content.value );

        if( email && content ) {

            this.dataService.messageSupport({

                firstName : this.userName.value,
                email     : this.email.value,
                content   : this.content.value
            });

            this.clearInput( [this.userName, this.email, this.content] );
            this.isBlur = this.message = true;

            this.removeMessage();

            if ( this.errorEmail || this.errorMessage ) {

                this.errorMessage = this.errorEmail = false;
            }

        }

        else
            if ( !email ) {

                this.text = this.errorEmailText;
                this.errorEmail = true;
            }

            if ( !content ) {

                this.text = this.errorMessageText;
                this.errorMessage = true;
            }
    }

    clearInput( list ) {

        list.forEach(function(  item) {

            item.value = '';
        });
    }

    removeMessage() {

        var that = this;

        setTimeout(function(){

            that.isBlur = that.message = false;

        }, this.CLEAR_MESSAGE );
    }

}