import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Import components
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { NewPasswordComponent } from './new-password/new-password.component';
import { AllUserComponent } from './all-user/all-user.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './views/edit-users/new-password/new-password.component';
import { UploadComponent } from './views/edit-users/upload/upload.component';
import { ModifierPassComponent } from './views/edit-users/modifier-pass/modifier-pass.component';
import { ResetPasswordComponent } from './views/edit-users/reset-password/reset-password.component';
import { AddEventComponent } from './views/event/add-event/add-event.component';
import { EditEventComponent } from './views/event/edit-event/edit-event.component';
import { AfficheEventComponent } from './views/event/affiche-event/affiche-event.component';
import { ToutReserveComponent } from './views/reserve/tout-reserve/tout-reserve.component';
import { NewReserveComponent } from './views/reserve/new-reserve/new-reserve.component';
import { UserEventComponent } from './views/user-event/user-event.component';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { ModifierPassComponent } from './modifier-pass/modifier-pass.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToasterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    AllUserComponent,
    UploadComponent,
    ModifierPassComponent,
    AddEventComponent,
    EditEventComponent,
    AfficheEventComponent,
    ToutReserveComponent,
    NewReserveComponent,
    UserEventComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  ToasterService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
