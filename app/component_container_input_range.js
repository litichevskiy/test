"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var pubSub_1 = require('./pubSub');
var ComponentInputRange = (function () {
    function ComponentInputRange() {
        this.onChanged = new core_1.EventEmitter();
        this.colorDefault = 'rgb(221,224,225)';
        this.colorSelect = 'rgb(37,197,204)';
        this.dataLang = {
            likes: {
                'en': 'likes',
                'ru': 'лайков'
            },
            coments: {
                'en': 'coments',
                'ru': 'комметариев'
            }
        };
    }
    ComponentInputRange.prototype.ngOnInit = function () {
        pubSub_1.PubSub.subscribe('newValue', this.replaceInputRangeValue.bind(this));
        pubSub_1.PubSub.subscribe('language', this.changeLanguages.bind(this));
        this.inputRange = this.input.nativeElement;
        this.inputRange.min = this.settings.min;
        this.inputRange.max = this.settings.max;
        this.inputRange.value = this.settings.currentValue;
        this.maxSum = this.ranges[this.ranges.length - 1].vmax;
        this.minSum = this.ranges[0].vmin;
        this.item.content = this.dataLang[this.item.name][this.language];
        if (this.item.total === 0 || this.checked === false) {
            this.item.total = this.getValue(this.inputRange.value);
            this.changeProgres();
        }
        else if (this.item.total > 0) {
            this.replaceInputRangeValue();
            this.changeProgres(true);
        }
    };
    ComponentInputRange.prototype.changeLanguages = function (key) {
        this.item.content = this.dataLang[this.item.name][key];
    };
    ComponentInputRange.prototype.change = function () {
        var that = this;
        setTimeout(function () {
            that.onChanged.emit();
        }, 1);
    };
    ComponentInputRange.prototype.changeProgres = function (bol) {
        var val = this.inputRange.value / 1000;
        this.inputRange.style.backgroundImage = '-webkit-gradient(' +
            'linear, left top, right top,' +
            'color-stop(' + val + ', ' + this.colorSelect + ' ),' +
            'color-stop(' + val + ', ' + this.colorDefault + ')' +
            ')';
        this.setValue(bol);
    };
    ComponentInputRange.prototype.checkDataEventInput = function (event) {
        if (!isNaN(+this.item.total)) {
            if (+this.item.total > this.maxSum) {
                event.target.value = this.item.total = '+' + this.maxSum;
                this.replaceInputRangeValue();
            }
            else {
                this.replaceInputRangeValue();
                event.target.value = this.item.total = '+' + +this.item.total;
            }
        }
        else {
            this.item.total = +this.item.total.replace(/\D/g, '');
            event.target.value = this.item.total = '+' + this.item.total;
        }
    };
    ComponentInputRange.prototype.replaceInputRangeValue = function () {
        var val = parseInt(this.item.total);
        if (isNaN(val) || val < 0)
            val = 0;
        this.toPercent(this.inputRange, val, { min: 0, max: this.inputRange.max });
        this.changeProgres(true);
    };
    ComponentInputRange.prototype.getValue = function (rangeInput) {
        rangeInput = parseInt(rangeInput);
        var rng = this.findrange(rangeInput, this.ranges);
        if (rangeInput > 0 && rangeInput < this.settings.max) {
            var minp = rng.min;
            var maxp = rng.max;
            var minv = Math.log(rng.vmin > 0 ? rng.vmin : 1);
            var maxv = Math.log(rng.vmax);
            var scale = (maxv - minv) / (maxp - minp);
            var result = Math.ceil(Math.exp(minv + scale * (rangeInput - minp)));
            if (result > 1000)
                return Math.round(result / 50) * 50;
            else
                return Math.round(result / 5) * 5;
        }
        else if (rangeInput === this.settings.max)
            return rng.vmax;
        else
            return rng.vmin;
    };
    ;
    ComponentInputRange.prototype.toPercent = function (rangeInput, value, range) {
        value = parseInt(value);
        var temp;
        var mid = range.min + parseInt((range.max - range.min) / 2);
        rangeInput.value = mid;
        temp = this.getValue(rangeInput.value);
        if ((temp === value) || range.max - range.min < 3)
            return mid;
        else if (value < temp) {
            return this.toPercent(rangeInput, value, { min: range.min, max: mid });
        }
        else
            return this.toPercent(rangeInput, value, { min: mid, max: range.max });
    };
    ;
    ComponentInputRange.prototype.setValue = function (x) {
        var that = this;
        setTimeout(function () {
            if (x)
                return;
            that.item.total = '+' + that.getValue(that.inputRange.value);
        }, 0);
    };
    ;
    ComponentInputRange.prototype.findrange = function (value, ranges) {
        var rng = null;
        var i = ranges.length - 1;
        while (i >= 0 && value <= ranges[i].max) {
            rng = ranges[i];
            i--;
        }
        return rng;
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentInputRange.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentInputRange.prototype, "ranges", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentInputRange.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentInputRange.prototype, "settings", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ComponentInputRange.prototype, "onChanged", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], ComponentInputRange.prototype, "input", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentInputRange.prototype, "language", void 0);
    ComponentInputRange = __decorate([
        core_1.Component({
            selector: 'ComponentInputRange',
            templateUrl: 'app/template/component_input_range.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentInputRange);
    return ComponentInputRange;
}());
exports.ComponentInputRange = ComponentInputRange;
