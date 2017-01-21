import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, ngOnInit } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';
import { PubSub } from './pubSub';

@Component({
    selector: 'ComponentInputRange',
    templateUrl: 'app/template/component_input_range.html'
})

export class ComponentInputRange implements ngOnInit {

    COLOR_DEFAULT = 'rgb(221,224,225)';
    COLORS_ELECT = 'rgb(37,197,204)';

    @Input() item: item;
    @Input() video: video;
    @Input() ranges: ranges;
    @Input() checked: checked;
    @Input() settings: settings;
    @Output() onChanged = new EventEmitter<number>();
    @ViewChild('input') input: ElementRef;


    constructor( private dataServiceLanguage : DataServiceLanguage){

        this.inputRange;
        this.maxSum;
        this.minSum = 0;
    };


    ngOnInit() {

        PubSub.subscribe( 'newValue', this.replaceInputRangeValue.bind(this) );

        this.inputRange = this.input.nativeElement;
        this.inputRange.value = this.settings.currentValue;
        this.maxSum = this.ranges[this.ranges.length-1].vmax;

        if( !this.checked ){

            this.item.total = this.getValue(this.inputRange.value);
            this.changeProgres();
        }

        else

            if( this.checked ){

                this.replaceInputRangeValue();
                this.changeProgres(true);
            }
    }


    change() {

        var that = this;

        setTimeout(function(){

            that.onChanged.emit();

        },1)
    }


    changeProgres ( bol ){

        var val = this.inputRange.value / 1000;

        this.inputRange.style.backgroundImage = '-webkit-gradient('+
            'linear, left top, right top,'+
            'color-stop('+val+', '+this.COLORS_ELECT+' ),' +
            'color-stop('+val+', '+this.COLOR_DEFAULT+')' +
        ')';

        this.setValue( bol );

    }


    checkDataEventInput( event ) {

        if ( !isNaN( +this.item.total ) ) {

            if ( +this.item.total > this.maxSum ) {

                event.target.value = this.item.total = '+' + this.maxSum;

                this.replaceInputRangeValue();
            }

            else{

                this.replaceInputRangeValue();
                event.target.value = this.item.total = '+' + +this.item.total;
            }
        }

        else {

            this.item.total = +this.item.total.replace( /\D/g, '');
            event.target.value = this.item.total = '+' + this.item.total;
        }
    }


    replaceInputRangeValue () {

        var val = parseInt( this.item.total );

        if( isNaN( val ) || val < 0 ) val = 0;

        this.toPercent(this.inputRange, val, {min: 0, max: this.inputRange.max});
        this.changeProgres( true );

        this.item.total = '+' + parseInt( this.item.total ); ///////////////////////
    }


    getValue(rangeInput) {

        rangeInput = parseInt(rangeInput);

        var rng = this.findrange(rangeInput, this.ranges);

        if(rangeInput > 0 && rangeInput < this.settings.max) {

            var minp = rng.min;
            var maxp = rng.max;
            var minv = Math.log(rng.vmin > 0 ? rng.vmin : 1);
            var maxv = Math.log(rng.vmax);
            var scale = (maxv-minv) / (maxp-minp);
            var result = Math.ceil(Math.exp(minv + scale * (rangeInput-minp)));

            if( result > 1000 ) return Math.round(result/50)*50;

            else return Math.round(result/5)*5;

        }

        else if( rangeInput === this.settings.max ) return rng.vmax;

        else return rng.vmin;

    };


    toPercent(rangeInput, value, range) {

        value = parseInt(value);

        var temp;
        var mid = range.min + parseInt((range.max - range.min) / 2);

        rangeInput.value = mid;
        temp = this.getValue(rangeInput.value);

        if( ( temp === value ) || range.max - range.min < 3 ) return mid;

        else if(value < temp) {

            return this.toPercent(rangeInput, value, {min: range.min, max: mid});
        }
        else
            return this.toPercent(rangeInput, value, {min: mid, max: range.max});

    };


    setValue( val ){

        var that = this;

        setTimeout(function(){

            if( val ) return;

            that.item.total = '+' + that.getValue(that.inputRange.value);

        },0)
    };


    findrange (value, ranges){

        var rng = null;
        var i = ranges.length - 1;

        while(i >= 0 && value <= ranges[i].max) {

            rng = ranges[i];
            i--;
        }

        return rng;
    };
}