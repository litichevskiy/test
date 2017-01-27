import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ServerAPI {

    constructor( private http: Http ){}

    payNow( data: any, url: any ) {
        debugger
        // data = JSON.stringify( data );

        console.log( 'SERVER_API-- :' , data );
    }

    logOn( data: any ) {

       console.log( 'SERVER_API-- :' , data );
    }

    messageSupport( data: any ) {

        console.log( 'SERVER_API-- :' , data );
    }
}