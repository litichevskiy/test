import {PubSub} from './pubSub';

export class DataService{

    from = 0;
    quantity = 12;

    private dataUsersPhotos : function () {

        var list = [],
            count = 0;

        (function(){

            for( let i = 0; i < 1000; i++ ){

                list.push({

                    url      : { path : '/app/img/bg_0.png' },
                    likes    : { name : 'likes' , total : 0 },
                    coments  : { name : 'comments', total : 0  },
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

    dataMoreFollowers = {

        Followers  : { name : 'MoreFollowers', total : 0  },
        // data     : { likes : '+100', coments : '+300' },
        settings : { min : 0, max : 1000 , currentValue : 198 },
        checked  : true,
        ranges   : [

            {  min: 0, max: 1, vmin: 0, vmax: 0 },
            {  min: 1, max: 500, vmin: 100, vmax: 1000 },
            {  min: 501, max: 550, vmin: 1000, vmax: 5000 },
            {  min: 551, max: 650, vmin: 5000, vmax: 10000 },
            {  min: 651, max: 700, vmin: 10000, vmax: 25000 },
            {  min: 701, max: 1000, vmin: 25000, vmax: 50000 }
        ];
    }

    language = 'en';

    private dataUserInfo = {

        user : { pathToPhoto : 'app/img/user_photo.jpg', name : 'Vasiliy'},
        info : [ {name : 'posts', value : 100 }, { name : 'followers', value : 200 }, { name :'following', value : 300 }  ]
    }

    private data = [];
    // private data:[];

    getData() {

        // return this.data;
        var list = this.dataUsersPhotos.getList( this.from, this.quantity ),
            that = this;

        list.forEach(function(item){

            that.data.push( item );
        });

        return this.data;
    }

    getDataUserInfo(): Phone[] {

        return this.dataUserInfo;
    }

    getDataNavBar(): Phone[] {

        return this.dataNavBar;
    }

    func( val ) {
        console.log( 'DataService------', val )
    }

    getSum(sum){

        console.log('DataService------',sum)
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

    logData (data){

        console.log('service', data )
    }

    setLanguage( key ) {

        this.language = key;

        // PubSub.publish('language', this.language );
    }

    init : function( that ){

        PubSub.subscribe('payNow', that.getSum.bind( that ) );
        // PubSub.subscribe('newLang', that.setLanguage.bind( that ) );

    }(this);
}