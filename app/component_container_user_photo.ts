import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Phone} from './phone';


@Component({
    selector: 'ComponentContainerUserPhoto',
    templateUrl: 'app/template/component_container_user_photo.html'
})

export class ComponentContainerUserPhoto {

    @Input() item: item;
    @Output() getTotalSum = new EventEmitter<number>();

    replaceState( event ){

        this.item.checked = !this.item.checked;

        this.emitSum();
        return false;
    }


    onChanged () {

        this.item.checked = true;
        this.emitSum();

    }

    emitSum() {

        this.getTotalSum.emit();
    }
}