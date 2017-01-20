import { DataServiceLanguage } from './data.service.language';
import { DataService } from './data.service';
import { Component } from '@angular/core';


@Component({
    selector: 'ComponentUserInfo',
    templateUrl: 'app/template/component_user_info.html'
})

export class ComponentUserInfo {

    constructor(
        private dataServiceLanguage : DataServiceLanguage,
        private dataService : DataService
    ){};

    replaceStateChecked() {

        this.dataService.profileIsOpen = !this.dataService.profileIsOpen;

    }
}
