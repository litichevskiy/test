import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';
import { PubSub } from './pubSub';

@Component({
    selector: 'userPage',
    templateUrl: './app/template/component_user_page.html'
})


export class componentUserPage implements OnInit {

    constructor(
        private dataService: DataService,
        private dataServiceLanguage : DataServiceLanguage,
        private cdr:ChangeDetectorRef,
        private pubSub : PubSub
    ){

        this.dataMoreFollowers = this.dataService.dataMoreFollowers;
        this.allLIst = this.dataService.getAllList();
        this.language = this.dataServiceLanguage.languageDefault;
        this.dataUserInfo = this.dataService.getDataUserInfo();
        this.infoPosts = this.dataUserInfo.info;
        this.items = this.dataService.getData();
        this.max_select = this.allLIst.length;
        this.selectedPayNow = false;
        this.htmlElement;
        this.listSelected = this.dataService.selectPhotosAndVideos;
        this.isBlur = false;
        this.listNavbar = ['home', 'support'];
    }


    @ViewChild('div') div: ElementRef;


    ngOnInit(){

        var target = this.div.nativeElement.parentElement;

        while( true ) {

            if( target.tagName === 'HTML' ) {

                this.htmlElement = target;
                break
            }

            target = target.parentElement;
        }

        this.getMaxNumber( 'photo', 'max_likes' );
        this.getMaxNumber( 'views', 'max_views' );

        this.htmlElement.lang = this.language;


        this.pubSub.subscribe('closePaNow', this.closePayNow.bind(this) );
        this.pubSub.subscribe('language', this.setLanguage.bind(this) );
    }


    getMaxNumber( key: any, vars: any ) {

        var that = this;

        this.allLIst.every(function( item ) {

            if( item[ key ] ) {

                that[ vars ] = item.ranges[ item.ranges.length - 1 ].vmax;
                return false;
            }

            return true;
        });
    }

    setLanguage( key: any ) {

        this.language = key;
        this.htmlElement.lang = this.language;
    }


    unCheckedAll() {

        this.allLIst.forEach(function( item ) {

            item.checked = false;
        });
    }


    selectAll( target: any ) {

        if( target ) {

            if ( target.tagName === 'INPUT' ) return;
        }

        var likes = +this.listSelected.likes.value,
            views = +this.listSelected.views.value,
            quantity = +this.listSelected.select.value;

        if ( this.listSelected.select.checked ) {

            this.unCheckedAll();

            if( this.listSelected.likes.checked && this.listSelected.views.checked ) {

                this.selectViewsAndLikes( likes, views, quantity, true );
            }

            else
                if ( this.listSelected.views.checked ) {

                    this.selectViews( views, this.allLIst.length -1, quantity );
                }
                else
                    if ( this.listSelected.likes.checked ) {

                        this.selectLikes( likes, quantity );
                    }
                    else this.selectViewsAndLikes( 0, 0, quantity, true );
        }

        else {

            this.selectViewsAndLikes( 0, 0, quantity, false );
        }

        this.pubSub.publish('newValue');
    }

    selectLikes( likes: any, quantity: any ) {

        var total = 0, data;

        for (var i = 0; i < quantity; i++ ) {

            data = this.allLIst[i];

            data.likes.total = likes;
            data.checked = true;

            total += likes;
        }

        this.dataService.totalSum = total;
    }

    selectViews( views: any, quantity: any, pictures: any ){

        var total = 0,
            videos = [];

        for ( var i = 0; i < quantity; i++ ) {

            if( this.allLIst[i].video ) videos.push( this.allLIst[i] );
        }

        videos.every(function( item, counter ) {

            if ( counter === pictures ) return false; // pictures = quantity

            item.views.total = views;
            item.checked = true;

            total += views;

            return true;
        });

        this.dataService.totalSum = total;
    }

    selectViewsAndLikes( likes: any, views: any, quantity: any, checked: any ) {

        var total = 0, data;

        for( var i = 0; i < quantity; i++ ) {

            data = this.allLIst[i];

            if( data.views ) {

                data.views.total = views;
                data.checked = checked;
                total += views;
            }

            if( data.likes ) {

                data.likes.total = likes;
                data.checked = checked;
                total += views;
            }
        }

        this.dataService.totalSum = total;
    }


    checkSelect() {

        if( this.listSelected.select.checked ) this.selectAll();
    }

    changeStateChecked( event: any ) {

        var target = event.currentTarget,
            role = event.currentTarget.dataset.role;

        this.listSelected[role].checked = target.checked;
    }

    checkValue ( event: any ) {

        var target = event.currentTarget;
        var key = event.currentTarget.dataset.role;

        if( !isNaN( +target.value ) ) {

            var cashValue = +target.value;

            var check = this.checkMaxAndMinValue( cashValue, 'max_' + key );

            if ( cashValue !== check ) {

                this.listSelected[key].value = check;
            }
        }

        else {

            this.listSelected[key].value = this.listSelected[key].value.replace( /\D/g, '');
            target.value = this.listSelected[key].value;

            this.checkMaxAndMinValue( +target.value, 'max_' + key );
        }
    }

    checkMaxAndMinValue( value: any, key: any ) {

        if( this[key] ) {

            if ( value > this[ key ] ) value = target.value = this[ key ];
            else
                if ( value < 0 ) value = target.value = 0;
        }

        return value;
    }

    loadPhotos(){

        this.dataService.addData();
    }

    showPayNow() {

        if( this.dataService.totalSum > 0 ) {

            if( this.dataService.listPayNow.length > 1 ) {

                this.selectedPayNow = true;
                this.isBlur = true;
            }

            else this.dataService.payNow();
        }
    }


    closePayNow() {

        this.selectedPayNow = false;
        this.isBlur = false;
    }

    getTotalSum(){

        var total = 0;

        this.items.forEach(function( item ) {

            if( item.checked ) {

                if( item.likes ) total += +item.likes.total;
                if( item.views ) total += +item.views.total;

            }
        });

        total += +this.dataMoreFollowers.Followers.total;

        this.dataService.totalSum = total;
    }

    replaceState( event: any ) {

        var target = event.currentTarget;

        if( event.target.tagName === 'INPUT' ) return;

        var input = target.querySelector('input[type="checkbox"]');
        input.checked = !input.checked

        input.dispatchEvent(new Event('change'));
    }
}