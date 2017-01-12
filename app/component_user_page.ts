import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';
import { PubSub } from './pubSub';

@Component({
    selector: 'userPage',
    templateUrl: './app/template/component_user_page.html'
})


export class componentUserPage implements OnInit {

    dataUserInfo;
    totalSum = 0;
    selectedPayNow = false;
    language;
    htmlElement;
    maxSelect;


    @ViewChild('div') div: ElementRef;


    listSelected = {

        likes   : { checked : false, value : 10 },
        coments : { checked : false, value : 20 },
        select  : { checked : false, value : 30 }
    }


    constructor(
        private dataService: DataService,
        private dataServiceLanguage : DataServiceLanguage,
        private cdr:ChangeDetectorRef
    ){}

    ngOnInit(){

        var that = this,
            target = this.div.nativeElement.parentElement;

        while( true ) {

            if( target.tagName === 'HTML' ) {

                this.htmlElement = target;
                break
            }

            target = target.parentElement;
        }

        this.language = this.dataService.language;
        this.allLIst = this.dataService.dataUsersPhotos.getAllList();
        this.items = this.dataService.getData();
        this.dataUserInfo = this.dataService.getDataUserInfo();
        this.infoPosts = this.dataUserInfo.info;
        this.maxSelect = this.allLIst.length;

        PubSub.subscribe('closePaNow', this.closePayNow.bind(this) );
        PubSub.subscribe('language', this.changeLanguages.bind(this) );
        PubSub.subscribe('changeSum', this.addTotalSum.bind(this) );
    }

    addTotalSum( sum ) {

        this.totalSum += sum;
    }


    changeLanguages( key ) {

        this.language = key;
        this.htmlElement.lang = this.language;
    }

    selectAll() {

        var count = 0,
            result = 0,
            storageSum = [];

        if( this.listSelected.select.checked ) {

            for ( var key in this.listSelected ) {

                if ( key !== 'select' && this.listSelected[key].checked ) {

                    result = this.func( key, +this.listSelected[key].value, +this.listSelected.select.value, true );
                    count++;

                    storageSum.push( result );
                }
            }

            if ( count === 0 ) {

                for ( var key in this.listSelected ) {

                    if ( key !== 'select' ) {

                        this.func( key, 0, +this.listSelected.select.value, true );
                    }
                }

                this.totalSum = 0;
            }

            else {

                this.totalSum = storageSum.reduce(function( sum, item ) {

                    return sum + item;
                }, 0);
            }
        }

        else
            if( !this.listSelected.select.checked ) {

                for ( var key in this.listSelected ) {

                    if ( key !== 'select' ) {

                        this.func( null );
                    }
                }

                this.totalSum = 0;
            }
    }

    addSelect() {

        if( this.listSelected.select.checked ) this.selectAll();
    }

    f( event ) {

        var target = event.currentTarget,
            role = event.currentTarget.dataset.role,
            count = 0;

        this.listSelected[role].checked = target.checked;
    }

    checkValue ( event ) {

        var target = event.currentTarget;
        var key = event.currentTarget.dataset.role;

        if( !isNaN( +target.value ) ) {

            target.value = +target.value;

            this.checkMaxValue( target );
        }

        else {

            this.listSelected[key].value = this.listSelected[key].value.replace( /\D/g, '');
            target.value = this.listSelected[key].value;

            this.checkMaxValue( target );
        }
    }

    checkMaxValue( target ) {
        // debugger
        var value = target.value;

        if ( target.dataset.role === 'select' ) {

            if ( value < 0 ) target.value = 0;
            if ( value > this.maxSelect ) target.value = this.maxSelect;
        }
    }

    loadPhotos(){

        this.dataService.addData();
    }

    showPayNow(){

        if( this.totalSum > 0 ) this.selectedPayNow = true;
    }


    closePayNow() {

        this.selectedPayNow = false;
    }

    getTotalSum(){
        debugger
        var total = 0;

        this.items.forEach(function( item ) {

            if( item.checked ) {

                if( item.likes ) total += +item.likes.total;
                if( item.coments ) total += +item.coments.total;

            }
        });

        this.totalSum = total;
    }

    replaceState( event ) {

        var target = event.currentTarget;

        if( event.target.tagName === 'INPUT' ) return;

        target.classList.toggle('label_active');

        var input = target.querySelector('input[type="checkbox"]');
        input.checked = !input.checked

        input.dispatchEvent(new Event('change'));

    }

    func( key, val, quantity, checked ){

        var total = 0;

        if ( key ) {

            for (var i = 0; i < quantity; i++ ) {

                if( this.allLIst[i][key] ) {

                    this.allLIst[i][key].total = val;
                    this.allLIst[i].checked = checked;

                    total += val;

                }

            }

            PubSub.publish('newValue');
        }

        if ( !key ) {

            this.allLIst.every(function( item ) {

                if( item.checked ) item.checked = false;

                return true;

                else return false;
            });
        }

        return total;
    }


}