import { Component, EventEmitter, Output } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';

@Component({
    selector: 'componentMoreFollowers',
    templateUrl: './app/template/component_more_followers.html'
})
export class componentMoreFollowers {

    @Output() getTotalSum = new EventEmitter<number>();

    constructor(
        private dataServiceLanguage : DataServiceLanguage ,
        private dataService : DataService
    ){
        this.data = dataService.dataMoreFollowers;
    }

    onChanged () {

        this.getTotalSum.emit();

    }

}
