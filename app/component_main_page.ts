import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';

@Component({
    selector: 'mainPage',
    templateUrl: './app/template/component_main_page.html'
})

export class componentMainPage implements OnInit{

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){
        this.errorUser = false;
        this.UserError = 'USER_ERROR';
        this.input;
    };

    @ViewChild('div') div: ElementRef;

    ngOnInit() {

        this.input = this.div.nativeElement.querySelector('input[type="text"]');
    }

    checkValue( event ) {

        var value = this.input.value;

        if( value === '' ) this.errorUser = true;

        else {

            this.dataService.logOn( value );

            if( this.errorUser ) this.errorUser = false;
        }

    }

}