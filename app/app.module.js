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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var component_user_page_1 = require('./component_user_page');
var component_container_input_range_1 = require('./component_container_input_range');
var component_container_user_photo_1 = require('./component_container_user_photo');
var data_service_1 = require('./data.service');
var data_service_language_1 = require('./data.service.language');
var component_drop_down_menu_1 = require('./component_drop_down_menu');
var component_nav_bar_1 = require('./component_nav_bar');
var component_pay_now_1 = require('./component_pay_now');
var component_page_support_1 = require('./component_page_support');
var component_main_page_1 = require('./component_main_page');
var component_user_info_1 = require('./component_user_info');
var component_video_1 = require('./component_video');
var component_more_followers_1 = require('./component_more_followers');
var component_process_for_payment_1 = require('./component_process_for_payment');
var component_page_id_1 = require('./component_page_id');
var component_error_1 = require('./component_error');
var component_user_message_1 = require('./component_user_message');
var appRoutes = [
    { path: '', component: component_user_page_1.componentUserPage },
    { path: 'support', component: component_page_support_1.componentPageSupport },
    { path: 'main', component: component_main_page_1.componentMainPage },
    { path: 'id', component: component_page_id_1.componentPageId },
    { path: '**', redirectTo: 'main' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [
                app_component_1.AppComponent,
                component_user_page_1.componentUserPage,
                component_container_input_range_1.ComponentInputRange,
                component_container_user_photo_1.ComponentContainerUserPhoto,
                component_nav_bar_1.ComponentNavBar,
                component_pay_now_1.ComponentPayNow,
                component_drop_down_menu_1.componentDropDownMenu,
                component_page_support_1.componentPageSupport,
                component_main_page_1.componentMainPage,
                component_user_info_1.ComponentUserInfo,
                component_video_1.ComponentVideo,
                component_more_followers_1.componentMoreFollowers,
                component_process_for_payment_1.componentProcessForPayment,
                component_page_id_1.componentPageId,
                component_error_1.componentError,
                component_user_message_1.componentUserMessage
            ],
            providers: [data_service_1.DataService, data_service_language_1.DataServiceLanguage],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
