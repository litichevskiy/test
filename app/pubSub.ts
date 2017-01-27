type CallbackFunction = (...args: any[]) => void;

export class PubSub {

    private storage : any = {};

    subscribe( eventName: any, func: any ) {

        if ( !this.storage.hasOwnProperty( eventName ) ){
            this.storage[eventName] = [];
        }
        this.storage[eventName].push( func );
    }

    publish( eventName: any, data: any ) {

        ( this.storage[eventName] || [] ).forEach(function(func : CallbackFunction){
            func(data)
        });
    }

    unSubscribe( eventName: any, func: any ) {

        var index = this.storage[eventName].indexOf( func );

        if ( index > -1 ) {

            this.storage[eventName].splice( index, 1  )
        }
    }
}