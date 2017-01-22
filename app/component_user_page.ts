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
        private cdr:ChangeDetectorRef
    ){

        this.dataMoreFollowers = this.dataService.dataMoreFollowers;
        this.allLIst = this.dataService.dataUsersPhotos.getAllList();
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


        PubSub.subscribe('closePaNow', this.closePayNow.bind(this) );
        PubSub.subscribe('language', this.setLanguage.bind(this) );
    }


    getMaxNumber( key, vars ) {

        var that = this;

        this.allLIst.every(function( item ) {

            if( item[ key ] ) {

                that[ vars ] = item.ranges[ item.ranges.length - 1 ].vmax;
                return false;
            }

            return true;
        });
    }

    setLanguage( key ) {

        this.language = key;
        this.htmlElement.lang = this.language;
    }


    unCheckedAll() {

        this.allLIst.forEach(function( item ) {

            item.checked = false;
        })
    }


    selectAll( target ) {

        if ( target.tagName === 'INPUT' ) return;

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

        PubSub.publish('newValue');
    }

    selectLikes( likes, quantity ) {

        var total = 0;

        for (var i = 0; i < quantity; i++ ) {

            this.allLIst[i].likes.total = likes;
            this.allLIst[i].checked = true;

            total += likes;
        }

        this.dataService.totalSum = total;
    }

    selectViews( views, quantity, pictures ){

        var total = 0,
            videos = [];

        for ( var i = 0; i < quantity; i++ ) {

            if( this.allLIst[i].video ) videos.push( this.allLIst[i] );
        }

        videos.every(function( item, i ) {

            if ( i === pictures ) return false;

            item.views.total = views;
            item.checked = true;

            total += views;

            return true;
        });

        this.dataService.totalSum = total;
    }

    selectViewsAndLikes( likes, views, quantity, checked ) {

        var total = 0;

        for (var i = 0; i < quantity; i++ ) {

            if( this.allLIst[i].video ) {

                this.allLIst[i].likes.total = likes;
                this.allLIst[i].views.total = views;
                this.allLIst[i].checked = checked;

                total += likes + views;
                continue
            }

            if( this.allLIst[i].photo ) {

                this.allLIst[i].likes.total = likes;
                this.allLIst[i].checked = checked;

                total += views;
            }

        }

        this.dataService.totalSum = total;
    }


    addSelect() {

        if( this.listSelected.select.checked ) this.selectAll();
    }

    changeStateChecked( event ) {

        var target = event.currentTarget,
            role = event.currentTarget.dataset.role;

        this.listSelected[role].checked = target.checked;
    }

    checkValue ( event ) {

        var target = event.currentTarget;
        var key = event.currentTarget.dataset.role;

        if( !isNaN( +target.value ) ) {

            var cash = target.value = +target.value;

            var check = this.checkMaxAndMinValue( target, 'max_' + key );

            if ( cash !== check ) {

                this.listSelected[key].value = check;
            }
        }

        else {

            this.listSelected[key].value = this.listSelected[key].value.replace( /\D/g, '');
            target.value = this.listSelected[key].value;

            this.checkMaxValue( target );
        }
    }

    checkMaxAndMinValue( target, key ) {

        var value = +target.value;

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

    replaceState( event ) {

        var target = event.currentTarget;

        if( event.target.tagName === 'INPUT' ) return;

        var input = target.querySelector('input[type="checkbox"]');
        input.checked = !input.checked

        input.dispatchEvent(new Event('change'));

    }
}