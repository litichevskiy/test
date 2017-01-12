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
var ComponentContainerUserPhoto = (function () {
    function ComponentContainerUserPhoto() {
        this.getTotalSum = new core_1.EventEmitter();
    }
    ComponentContainerUserPhoto.prototype.replaceState = function (event) {
        this.item.checked = !this.item.checked;
        this.emitSum();
        return false;
    };
    ComponentContainerUserPhoto.prototype.onChanged = function () {
        this.item.checked = true;
        this.emitSum();
    };
    ComponentContainerUserPhoto.prototype.emitSum = function () {
        this.getTotalSum.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComponentContainerUserPhoto.prototype, "item", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ComponentContainerUserPhoto.prototype, "getTotalSum", void 0);
    ComponentContainerUserPhoto = __decorate([
        core_1.Component({
            selector: 'ComponentContainerUserPhoto',
            templateUrl: 'app/template/component_container_user_photo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ComponentContainerUserPhoto);
    return ComponentContainerUserPhoto;
}());
exports.ComponentContainerUserPhoto = ComponentContainerUserPhoto;
