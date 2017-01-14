import { PubSub } from './pubSub';

export class DataService{

    from = 0;
    quantity = 12;

    private dataUsersPhotos : function () {

        var list = [],
            count = 0;

        (function(){

            for( let i = 0; i < 1000; i++ ){

                if( i >= 3 && i <= 5 ) {

                    list.push({

                        url      : { path : '/app/img/bg_0.png' },
                        likes    : { name : 'likes' , total : 0 },
                        views    : { name : 'views', total : 0  },
                        data     : { likes : '+100', coments : '+300' },
                        settings : { min : 0, max : 1000 , currentValue : 198 },
                        checked  : false,
                        video : true,
                        ranges   : [

                            {  min: 0, max: 1, vmin: 0, vmax: 0 },
                            {  min: 1, max: 500, vmin: 100, vmax: 1000 },
                            {  min: 501, max: 550, vmin: 1000, vmax: 5000 },
                            {  min: 551, max: 650, vmin: 5000, vmax: 10000 },
                            {  min: 651, max: 700, vmin: 10000, vmax: 25000 },
                            {  min: 701, max: 1000, vmin: 25000, vmax: 50000 }
                        ];

                    });

                } else {


                    list.push({

                        url      : { path : '/app/img/bg_0.png' },
                        likes    : { name : 'likes' , total : 0 },
                        // coments  : { name : 'comments', total : 0  },
                        data     : { likes : '+100', coments : '+300' },
                        settings : { min : 0, max : 1000 , currentValue : 198 },
                        checked  : false,
                        photo    : true,
                        ranges   : [

                            {  min: 0, max: 1, vmin: 0, vmax: 0 },
                            {  min: 1, max: 500, vmin: 100, vmax: 1000 },
                            {  min: 501, max: 550, vmin: 1000, vmax: 5000 },
                            {  min: 551, max: 650, vmin: 5000, vmax: 10000 },
                            {  min: 651, max: 700, vmin: 10000, vmax: 25000 },
                            {  min: 701, max: 1000, vmin: 25000, vmax: 50000 }
                        ];

                    });
                }
            }

        })()

        return {

            getList : function( from, quantity ) {

                if ( from >= list.length ) return;

                var data = list.slice( from, quantity );

                return data;
            }

            getAllList : function(){
                return list;
            }

        }
    }()


    totalSum = 0;


    dataMoreFollowers = {

        checked   : true,
        Followers : { name : 'MoreFollowers', total : 0 },
        settings  : { min : 0, max : 1000 , currentValue : 0 },
        ranges    : [

            {  min: 0, max: 1, vmin: 0, vmax: 0 },
            {  min: 1, max: 500, vmin: 100, vmax: 1000 },
            {  min: 501, max: 550, vmin: 1000, vmax: 5000 },
            {  min: 551, max: 650, vmin: 5000, vmax: 10000 },
            {  min: 651, max: 700, vmin: 10000, vmax: 25000 },
            {  min: 701, max: 1000, vmin: 25000, vmax: 50000 }
        ]
    }


    selectPhotosAndVideos = {

        likes   : { checked : false, value : 300 },
        views   : { checked : false, value : 700 },
        select  : { checked : false, value : 7 }
    }


    private dataUserInfo = {

        user : { pathToPhoto : 'app/img/user_photo.jpg', name : 'Vasiliy' },
        info : [

            { name : 'posts', value : 100 },
            { name : 'followers', value : 200 },
            { name : 'following', value : 300 }
        ]
    }


    private data = [];


    getData() {

        var list = this.dataUsersPhotos.getList( this.from, this.quantity ),
            that = this;

        list.forEach(function(item){

            that.data.push( item );
        });

        return this.data;
    }


    getDataUserInfo() {

        return this.dataUserInfo;
    }


    logOn( val ) {

        console.log( 'DataService------', val );
    }


    payNow() {

       console.log( 'DataService------', this.totalSum );
    }


    messageSupport( data ) {

        console.log( 'DataService------', data );
    }


    addData(){

        this.from = this.quantity;
        this.quantity = this.quantity + 12;

        var list = this.dataUsersPhotos.getList( this.from, this.quantity ),
            that = this;

        list.forEach(function(item){

            that.data.push( item );
        });

        return this.data;

    }
}