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
import { componentDropDownMenu } from './component_drop_down_menu';
import { ComponentNavBar } from './component_nav_bar';
import { ComponentPayNow } from './component_pay_now';
import { componentPageSupport } from './component_page_support';
import { componentMainPage } from './component_main_page';
import { ComponentUserInfo } from './component_user_info';
import { ComponentVideo } from './component_video';
import { componentMoreFollowers } from './component_more_followers';
import { componentProcessForPayment } from './component_process_for_payment';


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
            ComponentUserInfo,
            ComponentVideo,
            componentMoreFollowers,
            componentProcessForPayment
        ],
    providers: [ DataService, DataServiceLanguage ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }