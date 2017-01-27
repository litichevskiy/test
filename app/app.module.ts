import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule }   from '@angular/http';

import { AppComponent }   from './app.component';
import { componentUserPage }   from './component_user_page';
import { ComponentInputRange }   from './component_container_input_range';
import { ComponentContainerUserPhoto }   from './component_container_user_photo';
import { PubSub } from './pubSub';
import { DataService } from './data.service';
import { ServerAPI } from './serverAPI';
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
import { componentPageId } from './component_page_id';
import { componentError } from './component_error';
import { componentUserMessage } from './component_user_message';


const appRoutes: Routes =[
    { path: '', component: componentUserPage },
    { path: 'support', component: componentPageSupport },
    { path: 'main', component: componentMainPage },
    { path: 'id', component: componentPageId },
    { path: '**', redirectTo: 'main' }
];


@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpModule ],
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
            componentProcessForPayment,
            componentPageId,
            componentError,
            componentUserMessage
        ],
    providers: [ PubSub, DataService, DataServiceLanguage, ServerAPI ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }