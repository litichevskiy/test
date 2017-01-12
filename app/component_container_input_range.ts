import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, ngOnInit } from '@angular/core';
import {PubSub} from './pubSub';

@Component({
    selector: 'ComponentInputRange',
    templateUrl: 'app/template/component_input_range.html'
})

export class ComponentInputRange implements ngOnInit {

    @Input() item: item;
    @Input() ranges: ranges;
    @Input() checked: checked;
    @Input() settings: settings;
    @Output() onChanged = new EventEmitter<number>();
    @ViewChild('input') input: ElementRef;
    @Input() language : any;

    colorDefault = 'rgb(221,224,225)';
    colorSelect = 'rgb(37,197,204)';
    inputRange;
    maxSum;
    minSum;

    dataLang = {

        likes : {

            'en' : 'likes',
            'ru' : 'лайков'
        },

        coments : {
            'en' : 'coments',
            'ru' : 'комметариев'
        }
    }


    ngOnInit() {

        PubSub.subscribe( 'newValue', this.replaceInputRangeValue.bind(this) );
        PubSub.subscribe( 'language', this.changeLanguages.bind(this) );

        this.inputRange = this.input.nativeElement;
        this.inputRange.min = this.settings.min;
        this.inputRange.max = this.settings.max;
        this.inputRange.value = this.settings.currentValue;

        this.maxSum = this.ranges[this.ranges.length-1].vmax;
        this.minSum = this.ranges[0].vmin;

        this.item.content = this.dataLang[this.item.name][this.language];

        if( this.item.total === 0 || this.checked === false ){

            this.item.total = this.getValue(this.inputRange.value);
            this.changeProgres();
        }

        else

            if( this.item.total > 0 ){

                this.replaceInputRangeValue();
                this.changeProgres(true);
            }
    }


    changeLanguages( key ){

        this.item.content = this.dataLang[this.item.name][key];
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
            'color-stop('+val+', '+this.colorSelect+' ),' +
            'color-stop('+val+', '+this.colorDefault+')' +
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


    setValue(x){

        var that = this;

        setTimeout(function(){

            if( x ) return;

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