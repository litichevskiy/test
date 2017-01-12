import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';
import { PubSub } from './pubSub';

@Component({
    selector: 'componentMoreFollowers',
    templateUrl: './app/template/component_more_followers.html'
})
export class componentMoreFollowers implements OnInit {

    @Output() getTotalSum = new EventEmitter<number>();

    constructor(
        private dataServiceLanguage : DataServiceLanguage ,
        private dataService : DataService
    ){
        this.data = dataService.dataMoreFollowers;
    }

    // ngOnInit() {

    // }

    onChanged () {
        debugger
        this.data.checked = true;
        PubSub.publish('changeSum', +this.data.Followers.total );

    }

    // emitSum() {
    //     debugger
    //     this.getTotalSum.emit();
    // }
}
