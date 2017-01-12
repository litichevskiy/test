import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    infoPosts;
    Pay_now;
    Pay;
    selectPictures_first;
    selectPictures_last;
    addLikes_first;
    addLikes_last;
    addComents_first;
    addComents_last;
    htmlElement;


    @ViewChild('div') div: ElementRef;



    dataLangPayNow = {

        'ru' : 'к оплате',
        'en' : 'pay now'

    };

    dataLangPay = {

        'ru' : 'оплатить',
        'en' : 'pay'

    };

    dataLangInfo = {

        posts : {
            'ru' : 'публикаций',
            'en' : 'posts'
        },

        followers : {
            'ru' : 'подписчиков',
            'en' : 'followers'
        },

        following : {
            'ru' : 'подписки',
            'en' : 'following'
        }
    };

    dataLangSelected = {

        selectPictures : {
            'en' : {
                first : 'Select last',
                last : 'pictures'
            },

            'ru' : {
                first : 'Выбрать последние',
                last : 'изображений'
            }
        },

        addLikes : {
            'en' : {
                first : 'Add to your selected photos',
                last : 'likes'
            },

            'ru' : {
                first : 'Добавить на выбранные фото',
                last : 'лайков'
            }
        },

        addComents : {
            'en' : {
                first : 'Add to your selected photos',
                last : 'coments'
            },

            'ru' : {
                first : 'Добавить на выбранные фото',
                last : 'комментариев'
            }
        }

    };


    listSelected = {

        likes   : { checked : false, value : 10 },
        coments : { checked : false, value : 20 },
        select  : { checked : false, value : 30 },
    }


    constructor(private dataService: DataService, private dataServiceLanguage : DataServiceLanguage ){};

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

        this.infoPosts = this.infoPosts.map(function( item ) {

            item.content = that.dataLangInfo[item.name][that.language];
            return item;
        });

        this.selectPictures_first = this.dataLangSelected.selectPictures[this.language].first;
        this.selectPictures_last = this.dataLangSelected.selectPictures[this.language].last;

        this.addLikes_first = this.dataLangSelected.addLikes[this.language].first;
        this.addLikes_last = this.dataLangSelected.addLikes[this.language].last;

        this.addComents_first = this.dataLangSelected.addComents[this.language].first;
        this.addComents_last = this.dataLangSelected.addComents[this.language].last;

        this.Pay_now = this.dataLangPayNow[this.language];
        this.Pay = this.dataLangPay[this.language];

        PubSub.subscribe('closePaNow', this.closePayNow.bind(this) );
        PubSub.subscribe('language', this.changeLanguages.bind(this) );
    }

    changeLanguages( key ) {

        var that = this;
        this.language = key;

        this.htmlElement.lang = this.language;

        this.infoPosts = this.infoPosts.map(function( item ) {

            item.content = that.dataLangInfo[item.name][key];
            return item;
        });

        this.Pay_now = this.dataLangPayNow[key];
        this.Pay = this.dataLangPay[key];

        this.selectPictures_first = this.dataLangSelected.selectPictures[key].first;
        this.selectPictures_last = this.dataLangSelected.selectPictures[key].last;

        this.addLikes_first = this.dataLangSelected.addLikes[key].first;
        this.addLikes_last = this.dataLangSelected.addLikes[key].last;

        this.addComents_first = this.dataLangSelected.addComents[key].first;
        this.addComents_last = this.dataLangSelected.addComents[key].last;
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
        }

        else {

            this.listSelected[key].value = this.listSelected[key].value.replace( /\D/g, '');
            target.value = this.listSelected[key].value;

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