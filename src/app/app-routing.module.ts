import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUserComponent } from './all-user/all-user.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AddEventComponent } from './views/event/add-event/add-event.component';
import { ModifierPassComponent } from './views/edit-users/modifier-pass/modifier-pass.component';
// import { ModifierPassComponent } from './modifier-pass/modifier-pass.component';
// import { NewPasswordComponent } from './views/edit-users/new-password/new-password.component';
// import { UploadComponent } from './upload/upload.component';
import { NewPasswordComponent } from './views/edit-users/new-password/new-password.component';
import { ResetPasswordComponent } from './views/edit-users/reset-password/reset-password.component';
import { UploadComponent } from './views/edit-users/upload/upload.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AfficheEventComponent } from './views/event/affiche-event/affiche-event.component';
import { EditEventComponent } from './views/event/edit-event/edit-event.component';
import { NewReserveComponent } from './views/reserve/new-reserve/new-reserve.component';
import { UserEventComponent } from './views/user-event/user-event.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'all',
    component: AllUserComponent,
  },
  {
    path: 'UserEvent',
    component: UserEventComponent,
  },
  {
    path: 'event/:id',
    component: AfficheEventComponent,
  },
  {
    path: 'reserve',
    component: NewReserveComponent,
  },
  {
    path: 'agents/:id',
    component: EditEventComponent,
  },
  {
    path: 'add',
    component:AddEventComponent,
  },
  {
    path: 'newPass/:token/:id',
    component:NewPasswordComponent,
  },
  {
    path: 'users/:id',
    component: UploadComponent,
  },
  {
    path: 'register',
    component:RegisterComponent,
    data: {
      title: 'Register user'
    }
  },
  {
    path:'modifier/:id',
    component:ModifierPassComponent
  },
  {
    path:'event',
    component:AddEventComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'editors',
        loadChildren: () => import('./views/editors/editors.module').then(m => m.EditorsModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'google-maps',
        loadChildren: () => import('./views/google-maps/google-maps.module').then(m => m.GoogleMapsModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'plugins',
        loadChildren: () => import('./views/plugins/plugins.module').then(m => m.PluginsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
