import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { componentUserPage }   from './component_user_page';
import { ComponentInputRange }   from './component_container_input_range';
import { ComponentContainerUserPhoto }   from './component_container_user_photo';
import { DataService } from './data.service';
import { DataServiceLanguage } from './data.service.language';
import { ComponentNavBar } from './component_nav_bar';
import { ComponentPayNow } from './component_pay_now';
import { componentDropDownMenu } from './component_drop_down_menu';
import { componentPageSupport } from './component_page_support';
import { componentMainPage } from './component_main_page';
import { ComponentUserInfo } from './component_user_info';


const appRoutes: Routes =[
    { path: '', component: componentUserPage },
    { path: 'support', component: componentPageSupport },
    { path: 'main', component: componentMainPage },
    { path: '**', redirectTo: 'main' }
];


@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes) ],
    declarations:
        [
            AppComponent,
            componentUserPage,
            ComponentInputRange,
            ComponentContainerUserPhoto,
            ComponentNavBar,
            ComponentPayNow,
            componentDropDownMenu,
            componentPageSupport,
            componentMainPage,
            ComponentUserInfo
        ],
    providers: [ DataService, DataServiceLanguage ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }